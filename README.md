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
cp .env.example .env.local
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
CREATE TABLE merit_list_2024 (
  id INTEGER PRIMARY KEY,
  usn TEXT,
  cgpa NUMERIC,
  backlog INTEGER,
  current_branch TEXT,
  preference_1 TEXT,
  preference_2 TEXT,
  preference_3 TEXT,
  preference_4 TEXT
);
```

### Allotment List Table
```sql
CREATE TABLE allotment_list_2024 (
  id INTEGER PRIMARY KEY,
  usn TEXT,
  name TEXT,
  old_branch TEXT,
  new_branch TEXT,
  cgpa NUMERIC,
  backlog INTEGER
);
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

