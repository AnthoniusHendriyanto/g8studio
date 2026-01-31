# G8 Studio - Interior Design Website

A modern, responsive interior design portfolio website built with React, Vite, and Tailwind CSS. This project showcases G8 Studio's services and portfolio with a premium, minimalist design.

## 🚀 Technologies

- **Framework:** [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Routing:** [React Router](https://reactrouter.com/)
- **Email:** [EmailJS](https://www.emailjs.com/) (Lead Generation)
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

### SQL Setup Script
Instead of running commands manually, you can run the provided SQL script which contains all table definitions and policies.

1.  Open `supabase_complete_setup.sql` in this repository.
2.  Copy the contents.
3.  Paste and run it in your **Supabase SQL Editor**.

3.  **Configure Storage Buckets (Manual Step)**:
    Since storage policies must often be set via the UI, follow these steps in the Supabase Dashboard:

    *   **Go to Storage** and create three **Public** buckets: `partner-logos`, `portfolio-images`, and `hero-images`.
    *   **For each bucket**, go to the **Policies** tab and add:
        *   **Public Access**: Allow `SELECT` for role `public`.
        *   **Authenticated Access**: Allow all operations (`INSERT`, `UPDATE`, `DELETE`, `SELECT`) for role `authenticated`.

## 📧 Email Integration

We use **EmailJS** for contact form submissions. This allows you to receive professional, branded emails directly in your inbox.

1.  **Create an EmailJS account** at [emailjs.com](https://www.emailjs.com/).
2.  **Follow the [EmailJS Setup Guide](./.gemini/antigravity/brain/19f243c3-5870-43f1-8e1c-747baef03c7a/emailjs_setup_guide.md)** to:
    *   Connect your Gmail service.
    *   Set up the responsive HTML email template using the example at [`src/templates/contact-email.html`](./src/templates/contact-email.html).
    *   Configure variable mapping (`{{from_name}}`, `{{from_email}}`, etc.).
3.  **Update your `.env` file** with the following keys:
    ```env
    VITE_EMAILJS_SERVICE_ID=your_service_id
    VITE_EMAILJS_TEMPLATE_ID=your_template_id
    VITE_EMAILJS_PUBLIC_KEY=your_public_key
    ```

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
- **Dynamic Hero Slider:** Auto-sliding homepage background with customizable overlays and randomized transitions.
- **Quick Links Manager:** Linktree-style page (`/links`) fully manageable from the dashboard with GA tracking.
- **Admin Dashboard:** Secure area (`/admin`) to manage content dynamically.
- **Partner Management:** Dynamically add/remove partner logos via the Admin Dashboard.
- **Dynamic Portfolio:** Full CRUD management for projects including multi-image uploads, status tracking, and details.
- **WhatsApp Integration:** Direct connection for "Start Your Project" and floating chat button.
- **Contact Wizard:** Real functional contact form with **EmailJS** integration.
- **Email Templates:** Mobile-responsive, professional HTML inquiries sent directly to your inbox.
- **Location:** Embedded Google Maps integration for easier office finding.
- **SEO Maximized:** Full `sitemap.xml`, `robots.txt`, and synchronized Open Graph metadata across all pages.
- **Analytics:** Integrated Google Analytics 4 tracking for page views and link clicks.

## 🔐 Authentication Behavior

We utilize Supabase Auth with **sessionStorage** for enhanced security.

*   **Session Storage (Default)**:
    *   Sessions are stored in the browser's `sessionStorage`.
    *   **Behavior**: When you close the tab or window, the session is **immediately destroyed**. This ensures that public/shared computers do not retain admin access after the tab is closed.
    *   **Inactivity**: If the tab remains open, the session token will automatically refresh in the background (per Supabase defaults) until you explicitly log out or close the tab.

*   **Admin Access**:
    *   Routes under `/admin` are protected.
    *   Accessing them without a valid session will redirect you to `/admin/login`.

## ⚡ Performance Improvements

We significantly optimized the application by implementing **Code Splitting (Lazy Loading)** and removing unused localization code.

| Metric | Before Optimization | After Optimization | Improvement |
| :--- | :--- | :--- | :--- |
| **Main Bundle Size** | 765.11 kB | **700.81 kB** | **-8.4%** (Faster Load) |
| **Admin Code** | Loaded Instantly | **Loaded On-Demand** | **Saved ~66 kB** |
| **Codebase Size** | Included i18n logic | **English Only** | **-300+ Lines** |
| **Session Security** | LocalStorage (Forever) | **SessionStorage** | **Auto-Expiry** |

*   **Public Users** no longer download the Admin Dashboard code (Login, Portfolio Manager, etc.) during initial load.
*   **Admin Code** is only fetched when you actually visit `/admin`.

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

**Current Status (Phase 5 In Progress):**
- [x] **Phase 1: Foundation (Completed)** - Supabase integration and Authentication.
- [x] **Phase 2: Partner Management (Completed)** - Dynamic partner logo management.
- [x] **Phase 3: Portfolio Management (Completed)** - Dynamic project portfolio with details and status.
- [x] **Phase 4: Core Improvements (Completed)** - Security, localization cleanup, and performance.
- [x] **Phase 5: Growth & Hardening (Completed)**
    - [x] Functional Contact Form (EmailJS) with branded templates.
    - [x] Security & Auth UX Hardening (Generic errors, auto-focus, loading states).
    - [x] SEO Maximization (Sitemap, Robots.txt, Dynamic OG).
    - [x] Dynamic Hero Slider (Admin manageable).
    - [x] Quick Links Manager (Linktree-style dash).
    - [x] Google Analytics 4 Integration.

**Next Priority:** UI/UX Polish (Dark Mode, Skeleton Loaders).

For the detailed Phase 5 plan, refer to **[NEXT_PHASE.md](./NEXT_PHASE.md)**.

---

### 📋 **Important Note for Admins**
Please refer to the **[TODO.md](./TODO.md)** for a consolidated list of manual configuration steps required for production (Analytics, Domains, Supabase, etc.).

