# G8 Studio - Interior Design Website

A modern, responsive interior design portfolio website built with React, Vite, and Tailwind CSS. This project showcases G8 Studio's services and portfolio with a premium, minimalist design.

## 🚀 Technologies

- **Framework:** [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Routing:** [React Router](https://reactrouter.com/)
- **Forms:** React Hook Form + Zod Validation
- **State Management:** React Query (Server State) + React Context (Client State)

## 🛠️ Prerequisites

Before you begin, ensure you have met the following requirements:
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Supabase Account**: For backend database and authentication.

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd g8studio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   - Copy the example environment file:
     ```bash
     cp .env.example .env
     ```
   - Fill in your Supabase credentials in `.env`:
     ```env
     VITE_SUPABASE_URL=your_supabase_project_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```
   - For full database setup, see the **Database Setup** section below.

## 🗄️ Database Setup

To set up the Supabase database for this project, follow these steps:

1.  **Create a Supabase Project**.
2.  **Go to the SQL Editor** and run the following script to create all necessary tables and policies:

```sql
-- ==========================================
-- G8 STUDIO - COMPLETE SUPABASE SETUP
-- ==========================================

-- 1. EXTENSIONS
create extension if not exists "uuid-ossp";

-- ==========================================
-- 2. PARTNERS TABLE (Phase 2)
-- ==========================================
create table if not exists partners (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  logo_url text not null,
  display_order serial,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table partners enable row level security;

-- Policies
create policy "Public can view partners"
  on partners for select
  to public
  using (true);

create policy "Authenticated users can manage partners"
  on partners for all
  to authenticated
  using (true)
  with check (true);

-- ==========================================
-- 3. PORTFOLIO TABLE (Phase 3)
-- ==========================================
create table if not exists portfolio_items (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  category text not null,
  year text,
  description text,
  location text default 'Bandung, Indonesia',
  client text default 'Private Client',
  status text default 'Completed',
  images jsonb default '[]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table portfolio_items enable row level security;

-- Policies
create policy "Public can view portfolio"
  on portfolio_items for select
  to public
  using (true);

create policy "Authenticated users can manage portfolio"
  on portfolio_items for all
  to authenticated
  using (true)
  with check (true);
```

3.  **Configure Storage Buckets (Manual Step)**:
    Since storage policies must often be set via the UI, follow these steps in the Supabase Dashboard:

    *   **Go to Storage** and create two **Public** buckets: `partner-logos` and `portfolio-images`.
    *   **For each bucket**, go to the **Policies** tab and add:
        *   **Public Access**: Allow `SELECT` for role `public`.
        *   **Authenticated Access**: Allow `INSERT`, `UPDATE`, `DELETE` for role `authenticated`.

## 💻 Development

Start the development server with hot-reload:
```bash
npm run dev
```
Access the app at `http://localhost:8080` (or the port shown in your terminal).

## 🏗️ Build

Build the project for production:
```bash
npm run build
```
The output files will be in the `dist` directory.

To preview the production build locally:
```bash
npm run preview
```

## ✨ Key Features

- **Premium Design:** Minimalist aesthetic with "Apple-like" animations using Framer Motion.
- **Admin Dashboard:** Secure area (`/admin`) to manage content dynamically.
- **Partner Management:** Dynamically add/remove partner logos via the Admin Dashboard.
- **Dynamic Portfolio:** Full CRUD management for projects including multi-image uploads, status tracking, and details.
- **WhatsApp Integration:** Direct connection for "Start Your Project" and floating chat button.
- **Linktree Page:** Dedicated mobile-friendly links page (`/links`) for social bio.
- **Contact Wizard:** "Project Kickstarter" form that pre-fills WhatsApp messages.
- **Location:** Embedded Google Maps integration for easier office finding.
- **SEO Ready:** Basic meta tags and Open Graph setup.

## 📁 Project Structure

```
src/
├── assets/        # Static assets (images, fonts)
├── components/    # Reusable UI components
│   ├── home/      # Home page specific sections
│   ├── layout/    # Layout components (Navbar, Footer with Contact Info)
│   └── ui/        # shadcn/ui primitives & buttons
├── contexts/      # React contexts (Language, Theme)
├── hooks/         # Custom React hooks
├── lib/           # Utility functions
├── pages/         # Route pages (Home, Portfolio, Links, Contact)
├── services/      # API services (Supabase integration)
└── index.css      # Global styles and Tailwind directives
```

## 🔮 Roadmap (Phase 2 & Beyond)

We are transitioning to a dynamic, database-driven application.

**Current Status (Phase 3 Complete):**
- [x] **Phase 1: Foundation (Completed)** - Supabase integration and Authentication.
- [x] **Phase 2: Partner Management (Completed)** - Dynamic partner logo management.
- [x] **Phase 3: Portfolio Management (Completed)** - Dynamic project portfolio with details and status.

For the detailed implementation plan (Supabase + Admin Dashboard), please refer to **[NEXT_PHASE.md](./NEXT_PHASE.md)**.

