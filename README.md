# G8 Studio - Interior Design Website

A modern, responsive interior design portfolio website built with React, Vite, and Tailwind CSS. This project showcases G8 Studio's services and portfolio with a premium, minimalist design.

## 🚀 Technologies

- **Framework:** [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Routing:** [React Router](https://reactrouter.com/)
- **Forms:** React Hook Form + Zod Validation
- **State Management:** React Context (for Language/Theme)

## 🛠️ Prerequisites

Before you begin, ensure you have met the following requirements:
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

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

## ✨ Key Features (Phase 1 Completed)

- **Premium Design:** Minimalist aesthetic with "Apple-like" animations using Framer Motion.
- **Interactive Portfolio:** Gallery lightbox with slideshow support for multiple project photos.
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
└── index.css      # Global styles and Tailwind directives
```

## 🔮 Roadmap (Phase 2 & Beyond)

We are transitioning to a dynamic, database-driven application.
For the detailed implementation plan (Supabase + Admin Dashboard), please refer to **[NEXT_PHASE.md](./NEXT_PHASE.md)**.

