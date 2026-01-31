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
-- 4. HERO SLIDES TABLE (Phase 5)
-- ==========================================
create table if not exists hero_slides (
    id uuid default uuid_generate_v4() primary key,
    image_url text not null,
    title text,
    subtitle text,
    order_index integer default 0,
    use_random boolean default false,
    is_global_text boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table hero_slides enable row level security;

-- Policies
create policy "Anyone can view hero slides"
    on hero_slides for select
    to public
    using (true);

create policy "Admins can manage hero slides"
    on hero_slides for all
    to authenticated
    using (true)
    with check (true);

-- ==========================================
-- 5. QUICK LINKS TABLE (Phase 5)
-- ==========================================
create table if not exists quick_links (
    id uuid default uuid_generate_v4() primary key,
    title text not null,
    url text not null,
    icon_name text not null,
    color text not null,
    order_index integer default 0,
    is_active boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table quick_links enable row level security;

-- Policies
create policy "Anyone can view active quick links"
    on quick_links for select
    to public
    using (is_active = true);

create policy "Admins can manage quick links"
    on quick_links for all
    to authenticated
    using (true)
    with check (true);

-- ==========================================
-- 6. STORAGE BUCKETS SETUP (MANUAL STEPS)
-- ==========================================

-- To ensure proper storage functionality, please follow these steps in the Supabase Dashboard:

-- 1. GO TO STORAGE:
--    - Navigate to the 'Storage' tab in your Supabase project sidebar.

-- 2. CREATE BUCKETS:
--    - Click 'New bucket'. Name: "partner-logos", set to "Public".
--    - Click 'New bucket'. Name: "portfolio-images", set to "Public".
--    - Click 'New bucket'. Name: "hero-images", set to "Public".

-- 3. CONFIGURE POLICIES (Repeat for ALL buckets):
--    - Select bucket -> 'Policies'.
--    - Add policy "Public Read": Allowed operations: SELECT, Target roles: public.
--    - Add policy "Authenticated Manage": Allowed operations: ALL (INSERT, UPDATE, DELETE), Target roles: authenticated.

-- ==========================================
-- 7. SEED DATA (Optional)
-- ==========================================

-- Insert sample hero slide
insert into hero_slides (title, subtitle, image_url, order_index, is_global_text)
values (
    'Designing Dreams, Building Reality',
    'Premium interior design solutions and high-quality HPL materials for residential and commercial spaces in Bandung.',
    '/placeholder-hero.jpg',
    1,
    true
);

-- Insert sample quick links
insert into quick_links (title, url, icon_name, color, order_index)
values 
    ('Chat on WhatsApp', 'https://wa.me/628111906879?text=Halo%20G8%20Studio', 'MessageCircle', '#25D366', 1),
    ('View Portfolio', '/portfolio', 'Briefcase', '#FF6B35', 2),
    ('Visit Our Studio', '/contact', 'MapPin', '#004E89', 3),
    ('Shop on Shopee', 'https://shopee.co.id/', 'ShoppingBag', '#EE4D2D', 4);
