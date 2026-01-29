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

-- ==========================================
-- 4. STORAGE BUCKETS SETUP (MANUAL STEPS)
-- ==========================================

-- To ensure proper storage functionality, please follow these steps in the Supabase Dashboard:

-- 1. GO TO STORAGE:
--    - Navigate to the 'Storage' tab in your Supabase project sidebar.

-- 2. CREATE BUCKETS:
--    - Click 'New bucket'.
--    - Name: "partner-logos", set to "Public".
--    - Click 'New bucket'.
--    - Name: "portfolio-images", set to "Public".

-- 3. CONFIGURE POLICIES FOR 'partner-logos':
--    - Select 'partner-logos' bucket -> 'Policies'.
--    - Add a policy for "Public Access":
--      - Name: "Public Read"
--      - Allowed operations: SELECT
--      - Target roles: public
--    - Add a policy for "Authenticated Uploads":
--      - Name: "Authenticated Manage"
--      - Allowed operations: INSERT, UPDATE, DELETE
--      - Target roles: authenticated

-- 4. CONFIGURE POLICIES FOR 'portfolio-images':
--    - Select 'portfolio-images' bucket -> 'Policies'.
--    - Add a policy for "Public Access":
--      - Name: "Public Read"
--      - Allowed operations: SELECT
--      - Target roles: public
--    - Add a policy for "Authenticated Uploads":
--      - Name: "Authenticated Manage"
--      - Allowed operations: INSERT, UPDATE, DELETE
--      - Target roles: authenticated
