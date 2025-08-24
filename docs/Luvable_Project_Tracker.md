# Lüvable Inc. Project Tracker
**Prepared for:** Sylvia LaFontaine (Founder & CEO)  
**Originally Created:** 2025-08-13  
**Maintained In-Repo Version:** Auto-synced via GitHub Action  
**Contact:** info@luvable.io | sylvia@luvable.io | +1 (905) 580-4824

**Last Synced:** (pending first automation run)

## Usage
- Primary source of truth for completion = GitHub Issues (one per ID). Closing an Issue auto-marks Status ✅ here.
- Add label "in progress" to move a task to 🚧; automation respects existing ✅.
- Manual edits allowed ONLY for Notes. Do not alter IDs once created.
- Sign Off is auto-filled with closure date the first time a task reaches ✅.

Legend:  
✅ complete | 🚧 in progress | ❌ not started | ⏳ blocked | 🧪 validation

| ID    | Task Description                                                    | Category      | Owner(s)           | Due Date   | Status | Sign Off | Notes |
|-------|---------------------------------------------------------------------|---------------|--------------------|------------|--------|----------|-------|
| PROD1 | Finalize MVP feature list & UX flows                                | Product       | Sylvia, Dev Team   | 2025-08-15 | ❌      |          | Will spawn sub-spec issues. |
| ENG1  | Build onboarding flow                                               | Engineering   | Dev Team           | 2025-08-18 | ❌      |          | Depends on PROD1 decisions. |
| ENG2  | Build user profiles module                                          | Engineering   | Dev Team           | 2025-08-18 | ❌      |          | Avatar, bio, preferences. |
| ENG3  | Implement matchmaking engine                                        | Engineering   | Dev Team           | 2025-08-18 | ❌      |          | Needs algorithm spec (PROD1). |
| ENG4  | Real-time chat (MVP)                                                | Engineering   | Dev Team           | 2025-08-18 | ❌      |          | WebSocket infra + moderation hooks. |
| ENG5  | Payments integration (provider + checkout)                          | Engineering   | Dev Team           | 2025-08-18 | ❌      |          | Blocked by LEGAL5 policies. |
| INT1  | MeetUp API integration (after approval)                             | Integration   | Sylvia, Dev Team   | 2025-08-22 | ❌      |          | Awaiting MeetUp approval. |
| ENG6  | Multilingual UI (Top 3 languages)                                   | Engineering   | Dev Team           | 2025-08-20 | ❌      |          | Framework selection required. |
| ENG7  | Admin & moderation dashboard                                        | Engineering   | Dev Team           | 2025-08-22 | ❌      |          | Flag review, user actions. |
| ENG8  | Mini-games feasibility / v2 decision                                | Engineering   | Dev Team           | 2025-08-24 | ❌      |          | May move to backlog. |
| QA1   | QA test plan authoring                                              | QA            | Dev Team, QA       | 2025-08-19 | ❌      |          | Precedes regression. |
| QA2   | Execute regression & file bugs                                      | QA            | Dev Team, QA       | 2025-08-26 | ❌      |          | Needs ENG1–ENG7 readiness. |
| DES1  | App store assets (screenshots, descriptions, policies)              | Design        | Designer           | 2025-08-23 | ❌      |          | Coordinate with LEGAL5. |
| LAUNCH1| Beta launch & structured feedback loop                            | Launch        | Sylvia, Dev Team   | 2025-08-27 | ❌      |          | Feedback form + analytics events. |
| LEGAL1| File trademarks (key markets)                                      | Legal         | Sylvia, Lawyer     | 2025-08-14 | ❌      |          | Urgent. |
| LEGAL2| Provisional patent filings                                         | Legal         | Sylvia, Lawyer     | 2025-08-14 | ❌      |          | Needs disclosure packet. |
| LEGAL3| Draft/execute NDAs                                                  | Legal         | Sylvia, Lawyer     | 2025-08-15 | ❌      |          | Track signatures. |
| LEGAL4| Draft & negotiate MeetUp MOU                                       | Legal         | Sylvia, Lawyer     | 2025-08-21 | ❌      |          | Supports INT1. |
| LEGAL5| Terms of Use, Privacy Policy, Data docs                            | Legal         | Sylvia, Lawyer     | 2025-08-19 | ❌      |          | Required for ENG5 + LAUNCH1. |
| LEGAL6| Employment / contractor agreements                                 | Legal         | Sylvia, Lawyer     | 2025-08-16 | ❌      |          | Onboarding dependency. |
| LEGAL7| ESOP + vesting schedules setup                                     | Legal/Finance | Sylvia, Lawyer     | 2025-08-18 | ❌      |          | Update cap table after. |
| FIN1  | Pitch deck, business plan, financial model                         | Finance       | Sylvia             | 2025-08-15 | ❌      |          | Investor outreach dependency. |
| FIN2  | Cap table & equity split updates                                   | Finance       | Sylvia, Lawyer     | 2025-08-16 | ❌      |          | After LEGAL7. |
| FIN3  | Use-of-funds allocation                                            | Finance       | Sylvia             | 2025-08-14 | ❌      |          | Input to FIN1. |
| DEMO1 | Investor demo/test accounts environment                            | Engineering   | Dev Team           | 2025-08-26 | ❌      |          | Mask sample data. |
| IR1   | Track & respond to investor outreach                               | Investor Rel. | Sylvia             | Ongoing    | ❌      |          | Maintain CRM/log. |
| IR2   | Schedule investor update calls post-launch                         | Investor Rel. | Sylvia             | 2025-08-30 | ❌      |          | After LAUNCH1. |
| BRAND1| Brand assets (logo, style guide, badges)                           | Design        | Designer           | 2025-08-16 | ❌      |          | Supports DES1, MKT1. |
| MKT1  | Launch campaign + influencer + MeetUp collabs                      | Marketing     | Marketing, Sylvia  | 2025-08-19 | ❌      |          | Needs BRAND1 baseline visuals. |
| MKT2  | Content calendar + social scheduling + PR kit                      | Marketing     | Marketing, Sylvia  | 2025-08-18 | ❌      |          | Press kit uses BRAND1. |
| ADS1  | Paid ad campaigns & ROAS tracking setup                            | Marketing     | Marketing          | 2025-08-20 | ❌      |          | Landing page copy required. |
| REF1  | Referral / loyalty program                                         | Growth        | Marketing, Dev     | 2025-08-20 | ❌      |          | Requires profiles + analytics. |
| OUT1  | Community partner / media outreach                                 | Marketing     | Sylvia, Marketing  | Ongoing    | ❌      |          | Tie to MKT1 & PR kit. |
| ENGAGE1| Engagement monitoring & campaign adjustments                      | Marketing     | Marketing          | Ongoing    | ❌      |          | Needs analytics dashboards. |
| HR1   | Onboarding checklist + welcome packet                              | People Ops    | Sylvia, HR         | 2025-08-16 | ❌      |          | After HR2 culture deck. |
| HR2   | Training guides / culture / values deck                            | People Ops    | Sylvia, HR         | 2025-08-17 | ❌      |          | Precedes HR1. |
| HR3   | Compensation plan (salary, equity, bonuses)                        | People Ops    | Sylvia, HR         | 2025-08-15 | ❌      |          | Inputs payroll (HR4). |
| HR4   | Payroll / HR software setup                                        | People Ops    | Sylvia, HR         | 2025-08-17 | ❌      |          | After HR3. |
| HR5   | Onboarding calls (new hires / advisors)                            | People Ops    | Sylvia, HR         | 2025-08-18 | ❌      |          | After HR1. |
| PM1   | Project management tool setup                                      | PM            | Sylvia             | 2025-08-14 | ❌      |          | Migrate tracker optional. |
| PM2   | Daily task & deadline tracking                                     | PM            | Sylvia, PM         | Daily      | ❌      |          | Operational routine. |
| PM3   | Standups & sprint reviews cadence                                  | PM            | Sylvia, PM         | Daily      | ❌      |          | Define agenda. |
| PM4   | Legal/compliance deadline monitoring                               | PM            | Sylvia, PM         | Ongoing    | ❌      |          | Aggregate from LEGAL tasks. |
| FINREP1| Quarterly reports (board/investors)                               | Finance       | Sylvia, CFO        | 2025-09-30 | ❌      |          | Needs instrumentation. |

---
Automation: Do not remove ID column. Add new tasks at bottom with new unique IDs.
Manual overrides: Status can be set manually; closing Issue enforces ✅.