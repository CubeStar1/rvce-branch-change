# RVCE Branch Change App

An application to view and analyze branch change results at RV College of Engineering. Built with Next.js 14, TypeScript, Tailwind CSS, and Supabase.

## Features

-  **Statistics**
  - Branch-wise inflow and outflow analysis
  - CGPA cutoff trends
  - Detailed statistics for each branch
  - Visual data representation using charts

-  **Merit Lists**
  - Complete merit lists for 2023 and 2024
  - Filter by USN
  - View student preferences
  - CGPA and backlog information

- **Allotment Results**
  - Final branch change allotments
  - Previous and new branch details
  - Student-wise results
  - Sortable and filterable tables


## Tech Stack

- **Framework**: Next.js 14 
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Database**: Supabase
- **Charts**: Recharts
- **Tables**: TanStack Table

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/CubeStar1/rvce-branch-change.git
cd rvce-branch-change
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env.local
```
Fill in your Supabase credentials in `.env.local`

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

### Merit List Table
```sql
create table public.merit_list_2025 (
  usn text not null,
  cgpa double precision null,
  backlog bigint null,
  puc double precision null,
  "O" bigint null,
  "A+" bigint null,
  "A" bigint null,
  "B+" bigint null,
  "B" bigint null,
  "C" bigint null,
  "P" bigint null,
  current_branch text null,
  preference_1 text null,
  preference_2 text null,
  preference_3 text null,
  preference_4 text null,
  constraint merit_list_2025_pkey primary key (usn)
) TABLESPACE pg_default;
```

### Allotment List Table
```sql
create table public.allotment_list_2024 (
  id bigint null,
  usn text not null,
  name text null,
  old_branch text null,
  new_branch text null,
  cgpa double precision null,
  backlog bigint null,
  puc double precision null,
  "O" bigint null,
  "A+" bigint null,
  "A" bigint null,
  "B+" bigint null,
  "B" bigint null,
  "C" bigint null,
  "P" bigint null,
  current_branch text null,
  preference_1 text null,
  preference_2 text null,
  preference_3 text null,
  preference_4 text null,
  constraint allotment_list_2024_pkey primary key (usn),
  constraint allotment_list_2024_usn_fkey foreign KEY (usn) references merit_list_2024 (usn) on update CASCADE on delete CASCADE
) TABLESPACE pg_default;
```

## Project Structure

```
├── app/
│   ├── allotment/
│   │   ├── [year]/
│   │   └── statistics/
│   ├── merit-list/
│   │   └── [year]/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── statistics/
│   │   ├── StatsOverview.tsx
│   │   └── branch-cards.tsx
│   ├── ui/
│   └── Header.tsx
└── lib/
    └── supabase/
```

