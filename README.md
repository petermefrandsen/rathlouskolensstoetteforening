# Rathlouskolens Støtteforening — Developer & Content Manager Guide

A modern, fast, and Git-backed website for **Rathlouskolens Støtteforening** built with [Astro](https://astro.build), [Tailwind CSS](https://tailwindcss.com), and [Keystatic CMS](https://keystatic.com), deployed to [Cloudflare](https://cloudflare.com).

---

## 📋 Table of Contents
1. [Tech Stack & Architecture](#-tech-stack--architecture)
2. [Getting Started (Local Development)](#-getting-started-local-development)
3. [Content Management with Keystatic](#-content-management-with-keystatic)
4. [Design System & Styling](#-design-system--styling)
5. [Domain & Danish Characters (IDN / Punycode)](#-domain--danish-characters-idn--punycode)
6. [Cloudflare Deployment & CI/CD](#-cloudflare-deployment--cicd)
7. [Project Structure Overview](#-project-structure-overview)
8. [Common Tasks & Runbooks](#-common-tasks--runbooks)

---

## 🛠 Tech Stack & Architecture

- **Framework**: [Astro 5](https://astro.build) (Static HTML generation + Edge SSR API routes)
- **CMS**: [Keystatic](https://keystatic.com) (Git-backed content management)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com) (Configured with the custom *Academic Vitality* design tokens)
- **Deployment**: [Cloudflare Workers / Pages](https://developers.cloudflare.com/pages/) with `@astrojs/cloudflare`
- **Typography**: [Hanken Grotesk](https://fonts.google.com/specimen/Hanken+Grotesk) (Google Fonts)

---

## 💻 Getting Started (Local Development)

### Prerequisites
- Node.js `v20.x` or `v22.x`
- `npm` (or `pnpm` / `yarn`)
- Git

### Installation & Run

```bash
# 1. Clone the repository
git clone https://github.com/PretiumBusiness/rathlouskolensstoetteforening.git
cd rathlouskolensstoetteforening/setup

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

- **Frontend website**: [http://localhost:4321](http://localhost:4321)
- **Local Keystatic Admin CMS**: [http://localhost:4321/keystatic](http://localhost:4321/keystatic)

### Production Build Test

```bash
npm run build
npm run preview
```

---

## 📝 Content Management with Keystatic

All content is Git-backed. Changes saved in the admin UI are committed as code into `src/content/settings/index.yaml` and media files in `public/`.

### 1. Accessing the CMS in Production
- **URL**: `https://www.rathlouskolensstøtteforening.dk/keystatic`
- **Authentication**: Keystatic Cloud (`rath-stoetteforening/rathloustotte-site`). Sign in with any GitHub account that has **Collaborator / Write** permissions to the repository.

### 2. Available Content Fields
Under **Generelle Foreningsoplysninger** (Settings Singleton):

| Field | Description | Special Behavior / Placeholders |
|---|---|---|
| **Hero Title & Subtitle** | Main heading on the homepage banner | Displays on top of background image |
| **Om Støtteforeningen Tekst** | Multiline text for the About section | Preserves paragraphs cleanly |
| **Citater (Karrusel)** | Up to 5 quotes with quote text and author | Automatically rotates every 6s if > 1 quote. Static block if 1 quote. |
| **MobilePay Nummer / Boks** | Association MobilePay box (e.g. `86561844`) | Injected wherever `@mobilepay` placeholder is used |
| **MobilePay Instruktionstekst** | Instruction copy for payment | Use `@mobilepay` to automatically inject the bold number |
| **Indmeldelse Link (Knap URL)** | Web address for the membership CTA button | Direct link (e.g. MobilePay or Min Forening) |
| **Indmeldelse Knap Tekst** | Label text for the membership CTA button | Defaults to `Klik her og bliv medlem` |
| **Dokumenter (Vedtægter, Privatlivspolitik, Handelsbetingelser)** | Dual-support: Upload PDF file OR insert external link | **File upload takes strict precedence**. If file is removed, falls back to URL. Opens in new tab automatically. |
| **Galleri Sektion** | Array of images with captions and tags | **Auto-hides** from the page and top navigation menu if empty. When images exist, renders a paginated grid with a fullscreen lightbox modal. |
| **Kontakt Sektion** | Contact text, person name, email, phone, CVR, and address | Direct click-to-email and click-to-call action cards |

---

## 🎨 Design System & Styling

The site uses the **Academic Vitality** theme synchronized from Stitch:

### Brand Color Tokens (in `tailwind.config.mjs`)
- `primary`: `#006385` (Deep Sky Blue — headers, primary buttons, active states)
- `primary-container`: `#217da3`
- `secondary`: `#b6171e` (Crimson accent)
- `surface`: `#f7f9fd` (Light background)
- `surface-neutral`: `#F8F9FA` (Card backgrounds)
- `sky-tint`: `#EBF5FA` (Thematic section backgrounds & badge tints)
- `on-surface-variant`: `#3f484e` (Readable body prose)
- `inverse-surface`: `#2d3134` (Footer background)

### Responsive & Navigation Details
- Fixed 80px header with blur backdrop.
- Mobile title brand visible next to the logo.
- Automatic scroll-spy highlighting for desktop navigation links.
- Section anchor offsets (`scroll-mt-24 md:scroll-mt-28`) to prevent sticky header overlap.

---

## 🌐 Domain & Danish Characters (IDN / Punycode)

The official domain contains the Danish character **ø** (`rathlouskolensstøtteforening.dk`).

Because DNS and international OAuth services require ASCII (Punycode):

| Format | Domain String |
|---|---|
| **Unicode (Danish)** | `https://www.rathlouskolensstøtteforening.dk` |
| **Punycode (ACE)** | `https://www.xn--rathlouskolenssttteforening-q0c.dk` |
| **Apex (non-www) Punycode** | `https://xn--rathlouskolenssttteforening-q0c.dk` |

> ⚠️ **Important**: When configuring external services, OAuth apps, or Keystatic Cloud settings, **always use the Punycode format (`-q0c`)**.

---

## 🚀 Cloudflare Deployment & CI/CD

The project deploys automatically to Cloudflare when changes are merged into `main`.

### Build & Worker Configuration
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Configuration File**: [`wrangler.jsonc`](./wrangler.jsonc)
- **Static Assets Exclusions**: [`.assetsignore`](./public/.assetsignore) contains `_worker.js` to ensure the server worker code is isolated from static asset delivery.

```jsonc
{
  "name": "rathlouskolensstoetteforening",
  "main": "dist/_worker.js/index.js",
  "compatibility_date": "2026-08-20",
  "compatibility_flags": [
    "nodejs_compat"
  ],
  "assets": {
    "directory": "dist",
    "binding": "ASSETS"
  }
}
```

---

## 📂 Project Structure Overview

```text
.
├── public/
│   ├── .assetsignore             # Wrangler asset exclusions
│   ├── favicon.svg               # Site favicon
│   ├── files/                    # Target directory for uploaded PDFs/documents
│   └── images/
│       ├── uploads/              # General CMS uploads (QR codes, logos, etc.)
│       └── gallery/              # Gallery image uploads
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.astro      # Sticky topbar, responsive title, scroll-spy navigation
│   │   │   └── Footer.astro      # Association details, CVR, resolved legal doc links
│   │   └── home/
│   │       ├── QuoteCarousel.astro # Auto-cycling & static fallback quote block
│   │       ├── GallerySection.astro# Paginated gallery grid + fullscreen lightbox modal
│   │       └── ContactSection.astro# Direct email, call, and address action cards
│   ├── content/
│   │   └── settings/
│   │       └── index.yaml        # Git-persisted content data
│   ├── layouts/
│   │   └── Layout.astro          # Root HTML layout, SEO meta tags, Google Fonts
│   ├── pages/
│   │   ├── 404.astro             # Fallback 404 page
│   │   ├── index.astro           # Homepage reading directly from Keystatic reader
│   │   ├── api/keystatic/        # Keystatic backend API handlers
│   │   └── keystatic/            # Keystatic admin panel SPA
│   ├── styles/
│   │   └── global.css            # Tailwind directives and base typography
│   └── env.d.ts                  # TypeScript definitions for Astro
├── astro.config.mjs              # Astro configuration (Cloudflare, Tailwind, React, Keystatic)
├── keystatic.config.ts           # Schema definitions and Keystatic Cloud config
├── package.json                  # Node dependencies & build scripts
├── tailwind.config.mjs           # Tailwind theme configuration
├── tsconfig.json                 # TypeScript compiler options & path aliases (@/*)
└── wrangler.jsonc                # Cloudflare deployment manifest
```

---

## 🔧 Common Tasks & Runbooks

### 1. Adding a New Administrator to the CMS
1. Invite the user's GitHub account to the repository: [PretiumBusiness/rathlouskolensstoetteforening](https://github.com/PretiumBusiness/rathlouskolensstoetteforening) with **Write** (or Admin) access.
2. Ask them to navigate to `https://www.rathlouskolensstøtteforening.dk/keystatic` and log in with GitHub.

### 2. Adding a New Content Field
1. Open [`keystatic.config.ts`](./keystatic.config.ts).
2. Add the field under `schema: { ... }` using Keystatic's `fields.*` API.
3. Open [`src/pages/index.astro`](./src/pages/index.astro) to render the new field from `settings`.
4. Commit and push to `main` — Cloudflare will automatically build and deploy.

### 3. Updating the Association MobilePay QR Code or PDF Bylaws
1. Log in to `/keystatic`.
2. Click **Generelle Foreningsoplysninger**.
3. Drag & drop the new image or PDF under the respective field.
4. Click **Save** in the top right.
5. Keystatic commits the change to GitHub, and the live site automatically updates in ~1 minute!

---

*Maintained for Rathlouskolens Støtteforening.*
