"""Synchronize tracker Status & Sign Off columns from GitHub Issues.
Rules:
- Match issue if title starts with `[ID]` or `ID` (ID = first column in tracker)
- Closed issue -> Status = ✅; if Sign Off empty set closure date (UTC)
- Open + label 'in progress' -> Status = 🚧 (unless already ✅)
- Open without 'in progress' and blank status -> ❌
- Do not overwrite existing Sign Off when already set.
"""
import os, re, sys, datetime, requests
from pathlib import Path
REPO = os.environ.get("GITHUB_REPOSITORY")
TOKEN = os.environ.get("GITHUB_TOKEN")
TRACKER_PATH = "docs/Luvable_Project_Tracker.md"
API = "https://api.github.com"

def gh(path, params=None):
    headers={"Authorization":f"Bearer {TOKEN}","Accept":"application/vnd.github+json"}
    r=requests.get(f"{API}/repos/{REPO}/{path}", headers=headers, params=params)
    r.raise_for_status(); return r.json()

def list_issues():
    out=[]; page=1
    while True:
        batch=gh("issues", params={"state":"all","per_page":100,"page":page})
        if not batch: break
        for it in batch:
            if "pull_request" in it: continue
            out.append({
                "number": it["number"],
                "title": it["title"],
                "state": it["state"],
                "labels": [l["name"] for l in it["labels"]],
                "closed_at": it["closed_at"],
            })
        page+=1
    return out

def parse_tracker(text:str):
    lines=text.splitlines(keepends=True)
    start=None
    for i,l in enumerate(lines):
        if l.strip().startswith("| ID") and "Task Description" in l:
            start=i; break
    if start is None: return lines, None, []
    tbl=[]
    for j in range(start, len(lines)):
        if lines[j].strip()=="" and j>start+1: break
        if not lines[j].startswith("|") and j>start+1: break
        tbl.append((j, lines[j]))
    return lines, start, tbl

def split_row(row): return [c.strip() for c in row.strip().strip("|").split("|")]

def build_row(cells): return "| " + " | ".join(cells) + " |\n"

def extract_id_map(issues):
    mapping={}
    for iss in issues:
        m=re.match(r"^\[?([A-Z0-9]+)\]?\s+", iss["title"].strip())
        if m:
            mapping.setdefault(m.group(1).upper(), []).append(iss)
    return mapping

def main():
    if not TOKEN or not REPO:
        print("Missing env vars."); sys.exit(1)
    tracker_text=Path(TRACKER_PATH).read_text(encoding="utf-8")
    lines, start, rows = parse_tracker(tracker_text)
    if not rows:
        print("No table rows found."); return
    issues=list_issues(); id_map=extract_id_map(issues)
    header_cols = split_row(rows[0][1])
    def col_index(name):
        lname=name.lower()
        for i,c in enumerate(header_cols):
            if lname in c.lower(): return i
        return None
    status_idx=col_index("status")
    signoff_idx=col_index("sign off")
    changed=0
    for (line_index, row_txt) in rows[2:]:
        if not row_txt.startswith("|"): continue
        cells=split_row(row_txt)
        if len(cells)<len(header_cols): continue
        row_id=cells[0].strip().upper()
        if row_id not in id_map: continue
        related=id_map[row_id]
        open_issues=[i for i in related if i["state"]=="open"]
        if open_issues:
            primary=open_issues[0]
        else:
            closed_sorted=sorted(related, key=lambda x: x["closed_at"] or "", reverse=True)
            primary=closed_sorted[0]
        old_status, old_signoff = cells[status_idx], cells[signoff_idx]
        new_status, new_signoff = old_status, old_signoff
        if primary["state"]=="closed":
            new_status="✅"
            if not old_signoff.strip():
                closed_date=(primary["closed_at"] or datetime.datetime.utcnow().isoformat())[:10]
                new_signoff=closed_date
        else:
            labels=[l.lower() for l in primary["labels"]]
            if "in progress" in labels and old_status!="✅":
                new_status="🚧"
            elif not old_status.strip():
                new_status="❌"
        if new_status!=old_status or new_signoff!=old_signoff:
            cells[status_idx]=new_status; cells[signoff_idx]=new_signoff
            lines[line_index]=build_row(cells); changed+=1
    if changed:
        Path(TRACKER_PATH).write_text("".join(lines), encoding="utf-8")
        print(f"Updated {changed} row(s).")
    else:
        print("No tracker updates needed.")
if __name__ == '__main__':
    main()