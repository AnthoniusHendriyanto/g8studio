# Phase 2 Implementation Plan: Dynamic Content & Control Center

## Goal
Transition G8 Studio from a static website to a dynamic, database-driven application. This allows the owner to manage Portfolio projects and Partner brands easily via a secure Admin Dashboard without touching code.

## Tech Stack
- **Frontend**: existing React + Vite + Tailwind
- **Backend/DB**: Supabase (PostgreSQL + Auth + Storage)
- **State Management**: React Query (TanStack Query)

## 🏗️ Core Architecture

### 1. Database Schema (Supabase)
We will create 3 main tables:

**`partners`**
- `id`: uuid
- `name`: text
- `logo_url`: text
- `created_at`: timestamp

**`portfolio_items`**
- `id`: uuid
- `title`: text
- `category`: text (Residential, Commercial, Office, etc.)
- `year`: text (e.g., "2024")
- `description`: text
- `images`: jsonb (Array of image URLs to support gallery)
- `created_at`: timestamp

**`leads`** (Optional - for Contact Form)
- `id`: uuid
- `name`: text
- `contact`: text
- `message`: text
- `status`: text (New, Contacted, Closed)

### 2. Admin Dashboard
A secure area for content management.
- **Route**: `/admin`
- **Features**:
  - **Login Screen**: Secure email/password authentication.
  - **Dashboard Layout**: Sidebar navigation (Portfolio, Partners, Leads).
  - **Portfolio Manager**: Add, Edit, Delete projects. Image upload handling.
  - **Partner Manager**: Add, Remove partner logos.

## � Step-by-Step Implementation

### Step 1: Supabase Setup (✅ Completed)
- [x] Create Supabase Project
- [x] Set up Database Tables (`partners` created, `portfolio_items` pending)
- [x] Configure Storage Buckets for images (`portfolio-images`, `partner-logos`)
- [x] Set up Row Level Security (RLS) policies (Public read, Admin write)
- [x] Install dependencies: `@supabase/supabase-js`, `@tanstack/react-query`

### Step 2: Authentication (✅ Completed)
- [x] Create `AuthContext` to handle user session
- [x] Build Login Page (`/admin/login`)
- [x] Protect Admin Routes (Redirect to login if not authenticated)

### Step 3: Partner Management (✅ Completed)
- [x] Create API service for Partners (fetch, create, delete)
- [x] Build Admin Partner View (List + Upload Form)
- [x] **Frontend Update**: Replace static Partner Carousel with dynamic fetch

### Step 4: Portfolio Management (👉 NEXT FOCUS)
- [ ] Create API service for Portfolio
- [ ] Build Admin Portfolio View (Grid List + Add/Edit Form)
- [ ] Implement Image Upload functionality
- [ ] **Frontend Update**: Connect main `/portfolio` page to Supabase data

### Step 5: Leads & Contact (Optional)
- [ ] Store contact form submissions in `leads` table
- [ ] View leads in Admin Dashboard

## 🚀 Verification Plan
1.  **Auth**: Try accessing `/admin` without login -> Redirected.
2.  **CRUD**: Create a new Portfolio item -> Verify it appears on the public `/portfolio` page.
3.  **Storage**: Upload an image -> Verify it loads correctly from the CDN.
4.  **Responsive**: Ensure Admin Dashboard works on tablet/mobile for on-the-go updates.
