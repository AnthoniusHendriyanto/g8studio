-- G8 Studio Supabase Setup Script

-- 1. Enable UUID extension
create extension if not exists "uuid-ossp";

-- ==========================================
-- 2. PARTNERS TABLE
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
-- Allow public read access
create policy "Public can view partners"
  on partners for select
  to public
  using (true);

-- Allow authenticated users to insert, update, delete
create policy "Authenticated users can manage partners"
  on partners for all
  to authenticated
  using (true)
  with check (true);


-- ==========================================
-- 3. STORAGE BUCKETS
-- ==========================================
-- Instructions: Create a public bucket named 'partner-logos' in the Supabase Dashboard.

-- Storage Policies (Run these if you want to set via SQL, or set via Dashboard)

-- Allow public read access to partner-logos
-- (This is usually a checkbox "Public Bucket" when creating the bucket)

-- Allow authenticated users to upload to partner-logos
insert into storage.policies (name, bucket_id, definition, check, allowed_operations)
values (
  'Authenticated users can upload',
  'partner-logos',
  '(auth.role() = ''authenticated'')',
  '(auth.role() = ''authenticated'')',
  '{INSERT}'
);

-- Allow authenticated users to delete from partner-logos
insert into storage.policies (name, bucket_id, definition, allowed_operations)
values (
  'Authenticated users can delete',
  'partner-logos',
  '(auth.role() = ''authenticated'')',
  '{DELETE}'
);
