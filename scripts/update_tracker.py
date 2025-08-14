# Normalization script for project tracker.
# Currently ensures default status cell is not blank; placeholder for future expansion.
import sys, re
from pathlib import Path
STATUS_DEFAULT = "❌"

def split_row(row: str):
    return [c.strip() for c in row.strip().strip("|").split("|")]

def build_row(cells):
    return "| " + " | ".join(cells) + " |\n"

def find_table(lines):
    start=None
    for i,l in enumerate(lines):
        if l.strip().startswith("| ID") and "Task Description" in l:
            start=i; break
    if start is None: return None
    collected=[]
    for j in range(start, len(lines)):
        if lines[j].strip()=="" and j>start+1: break
        if not lines[j].startswith("|") and j>start+1: break
        collected.append(lines[j])
    return start, start+len(collected), collected

def normalize(table_lines):
    header, divider, *data = table_lines
    header_cols = split_row(header)
    try:
        status_idx = [i for i,c in enumerate(header_cols) if c.lower().startswith("status")][0]
    except IndexError:
        return table_lines, []
    changes=[]
    new_rows=[]
    for row in data:
        if not row.startswith("|") or re.match(r"^\|[-: ]+\|$", row.strip()):
            new_rows.append(row); continue
        cells=split_row(row)
        if len(cells)<len(header_cols):
            cells += [""]*(len(header_cols)-len(cells))
        if not cells[status_idx].strip():
            cells[status_idx]=STATUS_DEFAULT
            changes.append(f"Defaulted status for {cells[0]}")
        new_rows.append(build_row(cells))
    return [header, divider]+new_rows, changes

def main(path):
    content=Path(path).read_text(encoding="utf-8").splitlines(keepends=True)
    found=find_table(content)
    if not found:
        print("No table found; exiting."); return
    start,end,table = found
    new_table,changes = normalize(table)
    if changes:
        result=content[:start]+new_table+content[end:]
        Path(path).write_text("".join(result), encoding="utf-8")
        print(f"Applied {len(changes)} normalization change(s).")
    else:
        print("No normalization changes needed.")
if __name__ == "__main__":
    target = sys.argv[1] if len(sys.argv)>1 else "docs/Luvable_Project_Tracker.md"
    main(target)