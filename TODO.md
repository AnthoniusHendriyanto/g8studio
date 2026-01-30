# 📋 Project TODO List (Manual Actions)

This file contains all remaining manual steps required to fully configure the G8 Studio website for production.

## 🚀 Priority: Environment & Analytics
- [ ] **Google Analytics 4**: 
  - Create a GA4 property at [analytics.google.com](https://analytics.google.com/).
  - Add your Measurement ID to `.env` as `VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX`.
  - See [Analytics Setup Guide](file:///home/anthonius/.gemini/antigravity/brain/df9ae7da-1842-47d7-8212-86e85e57a9ea/google_analytics_setup.md) for details.

## 🔍 Priority: SEO & Domain
- [ ] **Domain Verification**: 
  - Current placeholder is `https://g8studio.id`.
  - Update `public/sitemap.xml` with your actual production domain.
  - Update `public/robots.txt` Sitemap URL with your actual production domain.
- [ ] **Search Console**: 
  - Once deployed, submit your `sitemap.xml` to [Google Search Console](https://search.google.com/search-console).

## 🎨 Priority: Branding & Assets
- [ ] **Favicon**: 
  - Replace the default Vite icon in `public/favicon.ico` with your brand's icon.
- [ ] **Social Media Preview**: 
  - Create a 1200x630px image and save it as `public/og-image.jpg` for high-quality sharing previews.

## 🔐 Priority: Supabase Backend
- [ ] **Auth Site URL**: 
  - In Supabase Dashboard > Authentication > URL Configuration: Update **Site URL** to your production domain.
- [ ] **Email Templates**: 
  - In Supabase Dashboard > Authentication > Email Templates: Customize the "Reset Password" and "Invite User" messages.

---

*Last Updated: 2026-01-30*
