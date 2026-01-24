# Next Phase Recommendations

This document outlines the recommended roadmap for taking the G8 Studio project from its current static state to a production-ready, dynamic web application.

## 🚨 Immediate Priorities (Phase 1)
*Focus on fixing placeholders and ensuring basic functionality.*

### 1. Contact Form Integration
- **Current Status**: The form simulates submission with a timeout.
- **Recommendation**: Integrate a real email service.
- **Options**:
  - **EmailJS**: Client-side only, easy to setup (Free tier available).
  - **Formspree**: Simple endpoint integration.
  - **Netlify Forms**: If deploying to Netlify, this is zero-config.

### 2. Update Placeholders
- **WhatsApp**: Update the placeholder number in `src/pages/Contact.tsx`.
- **Maps**: Replace the static map placeholder with:
  - An embedded Google Maps `iframe` (Simplest).
  - Or a custom map using `@react-google-maps/api` (More control/styling).
- **Social Links**: Ensure all footer/header social links point to real G8 Studio profiles.

### 3. SEO Basics
- **Metadata**: Review `react-helmet-async` tags in all pages to ensure unique titles and descriptions.
- **Manifest**: Create `public/manifest.json` for PWA capabilities or basic browser recognition.
- **Favicon**: Ensure `public/favicon.ico` and other icon resolutions are present.

---

## 🚀 Short-Term Improvements (Phase 2)
*Focus on content management and user experience.*

### 1. Dynamic Portfolio (CMS)
- **Problem**: Portfolio items are currently likely hardcoded in components or JSON files.
- **Recommendation**: Move content to a Headless CMS.
- **Tools**:
  - **Sanity.io**: Excellent developer experience, generous free tier.
  - **Contentful**: Industry standard, solid free tier.
  - **Supabase**: If you prefer a SQL database approach (Postgres).

### 2. Image Optimization
- **Current**: Standard `<img>` tags are used.
- **Recommendation**:
  - Convert all assets to **WebP** format for smaller file sizes.
  - Implement **Lazy Loading** explicitly for below-the-fold images.
  - Use a `Cloudinary` or `Imgix` for on-the-fly resizing/optimization if keeping valid CMS.

---

## 🧪 Long-Term & DevOps (Phase 3)
*Focus on scalability and maintainability.*

### 1. Testing
- **Unit Testing**: Expand `vitest` coverage for utility functions and complex logic.
- **E2E Testing**: Add **Playwright** or **Cypress** to test critical flows (Contact Form, Navigation).

### 2. CI/CD Integration
- Set up **GitHub Actions** to:
  - Run linting (`npm run lint`) on Pull Request.
  - Run build (`npm run build`) to catch errors early.
  - Auto-deploy to hosting provider (Vercel/Netlify) on merge to `main`.

### 3. Analytics
- Integrate **Google Analytics 4 (GA4)** or valid privacy-focused alternatives like **Plausible** to track user engagement.

---

## 📝 Implementation Notes
- **Dependencies**: Keep an eye on `package.json` size. Remove unused libraries.
- **Code Quality**: Continue using `eslint` and `prettier` to maintain code consistency.
