# Project Memory: Portfolio Website

This file maintains a structured record of the project's architecture, implemented features, completed tasks, important decisions, current progress, pending work, and relevant context. **Incoming agents must read this file at the start of any session and update it at the end of their task.**

---

## Metadata
- **Last Updated**: 2026-07-18
- **Project Phase**: Initialization & Architecture Setup
- **Next Immediate Milestone**: Gather user design specifications & initialize framework

---

## 1. Project Overview & Architecture

### Purpose
To design and build a distinctive, high-fidelity personal portfolio website that showcases the user's work, experience, and skills with premium, production-grade aesthetics and custom interaction patterns.

### Technical Stack (Proposed Defaults)
- **Core**: HTML5, Vanilla JavaScript.
- **Styling**: Vanilla CSS utilizing modern specifications (OKLCH, fluid typography, responsive layout/container queries, custom easing curves).
- **Structure**: Static page setup, or migration to a framework (Vite/Next.js) if required for complex applications.
- **Libraries**: No third-party UI libraries (e.g. TailwindCSS, Radix) unless explicitly requested. Maximize visual fidelity and custom details using custom CSS.

### Directory Structure
```
c:\Users\akash\Desktop\PORTFOLIO\
├── .agent/                  # Custom workflows and skills configurations
│   ├── skills/              # Specialized agent skill sets (e.g., frontend-design)
│   └── workflows/           # Systematic workflow files (adapt, polish, etc.)
├── .agents/                 # Workspace-specific agent rules
│   └── AGENTS.md            # Rule forcing agents to read/write project_memory.md
└── project_memory.md        # This persistent state file
```

---

## 2. Implemented Features
- **Light Sky Blue Theme**: Refactored the entire portfolio to use a beautiful, light-themed Sky Blue color scheme by default. Removed the dark/light theme toggle button, changed the navbar links to a prominent solid Black color, and increased their font size. Increased the header logo font size, removed the "Freelance Developer" logo subtext, and renamed the main hero button from "HIRE ME" to "CONTACT US".
- **Interactive Project Modals**: Multi-viewport preview mockups (Desktop browser, iPad tablet, iPhone mobile) rendered inside hardware frames with fluid layout transformations. Detailed project features, tech stacks, and source links are integrated.
- **Scroll Progress & Floating Actions**: Embedded progress tracking bar in a relative solid header Navbar box (`bg-dark-bg`) that matches the Light Sky Blue page background and scrolls with the page, and a scroll-triggered floating Back-to-Top button that fades in.
- **Animated Counters & Brand SVGs**: Dynamic count-ups for statistics (years of experience, projects, client satisfaction) and official colored SVGs for all technical skills.
- **Video Background with Audio**: Integrated a full-screen background video in the Hero section, default autoplay-muted with a custom floating toggle button to unmute/mute audio. Set video to fill the screen offset below the header using `object-cover object-top` to prioritize face/head visibility, and increased Hero min-height to `min-h-[calc(110vh-76px)]` to prevent cropping.
- **WhatsApp Integration & Redesigned Contact Section**: Redesigned the Contact Me card layout to stack contact and social icons cleanly in a row at the top with hover tooltips, and positioned the message form fields (Name, Email, Message, Send button) in a clean single-column layout below. Also integrated a persistent, pulsing floating WhatsApp button in the bottom right corner of the page that overlays cleanly and works responsively on all device viewports. In addition, simplified the Footer layout by removing unnecessary navigation and Next.js branding links, and added legal link items for Privacy Policy and Terms & Conditions alongside the copyright text.
- **Admin Panel & 2FA Cookie Session Auth**: Integrated a secure administrative dashboard at `/admin` protected by stateless Web Crypto HMAC-SHA256 session signature cookie validation. Added a secure three-stage registration (`/admin/register`) wizard with 6-digit Email OTP Code and Google Authenticator TOTP 2FA.
- **Zero-Code Secure Admin Dashboard & Dynamic MongoDB Sync**: Built a modern control center at `/admin` for zero-code management of all portfolio content:
  1. **Dashboard Overview**: Metrics KPI cards for Total Projects, Featured Projects, Services, Skills, Inquiries, and Website Analytics (visits, page views, device breakdown, top pages).
  2. **Project Management**: Full CRUD operations (Add, Edit, Delete, Duplicate, Archive, Featured Toggle, Drag & Drop Display Order) with all 21 fields, image/media uploads (Hero, Gallery, Thumbnail, Video, Logo), and display badges.
  3. **Skills, Services, Testimonials & FAQs Management**: Complete CRUD modules for skills (proficiency, colors, categories), services (pricing, icons), client testimonials (ratings, avatars, reviews), and FAQ accordions.
  4. **Messages Inbox & Global Site Settings**: Interactive inquiry viewer with unread badges, email reply trigger, and settings editor for Personal Info, About bio, Resume PDF, Social Links, Contact Info, SEO metadata, Google Analytics ID, Meta Pixel ID, Favicon, and Logo.
  5. **Dynamic Portfolio Provider (`PortfolioDataProvider.tsx`)**: Synchronized `Hero`, `About`, `Projects`, `Services`, `TestimonialsFaqContact`, `Navbar`, and `Footer` to render database data dynamically in real time without writing code, with fail-safe local JSON storage fallback.
- **Reference Image Layout Refactoring**: Restructured the entire site layout and content to match the provided reference image while maintaining the Light Sky Blue theme:
  1. **Hero Section**: Refactored layout to span `max-w-4xl` for headline, MERN developer details, and actions, removing circular developer portrait completely. Set the background video container to `inset-0` with no gradient overlays and set its opacity to `95%` so that the video content is displayed with absolute visual clarity and sharpness. Added user's uploaded resume at `public/resume.pdf` linked to 'Download Resume' button.
  2. **About Me & Skills**: Split into two columns (bio and stats counters on left; categorized skill grid without progress bars on right).
  3. **Freelancing Services**: Updated to show 9 specific services (Business Website, Portfolio Website, Landing Page, E-commerce Website, Admin Dashboard, MERN Stack Web Apps, API Integration, Website Redesign, Performance Optimization) in a grid.
  4. **Projects Catalog**: Restructured into 4 Featured Client Projects (vertical mockup cards) and 4 Other Projects (horizontal icon cards) with interactive case study modals.
  5. **Process & Why Work With Me**: 2-column side-by-side layout (6-step timeline path on left, 8-benefit grid on right).
  6. **Unified Bottom Row**: 2-column layout on desktop (FAQ Accordion on left spanning 6/12 with 'Got Questions?' subtitle removed, and Contact Me card on right spanning 6/12 with 'Get In Touch' subtitle removed, featuring circular social link buttons on top and form inputs stacked directly below).
  7. **Footer Layout**: Restructured with branding/subtext on left, no nav links on right, and socials, copyright, 'Privacy Policy', 'Terms & Conditions', 'Admin Portal', and the floating bouncing WhatsApp button at `bottom-6 right-6`.
  8. **Navbar Layout**: Restored to original state (retaining ADMIN and CONTACT US buttons), fixed to `h-[76px]`, set to a `fixed` document flow, and styled with the matching website background color (`bg-[#cdebf7] border-b border-slate-300 shadow-md`) to visually separate it from the Hero section.
  9. **Introduction Video Section**: Removed (video content is hosted as a sharp background element inside the Hero section).

---

## 3. Important Decisions & Context

### Zero-Code Content Management Architecture
- **Decision**: Implemented `PortfolioDataProvider` client context and `/api/portfolio/content` unified endpoint to serve live database content to all public frontend components.
- **Rationale**: Enables non-technical site management directly from `/admin` without requiring code modifications or rebuilds while retaining fast client rendering with local JSON fallback.

### Unified Light Sky Blue Branding
- **Decision**: Configured the site to default permanently to a soft Light Sky Blue theme (`oklch(91% 0.045 220)`) and removed the toggles.
- **Rationale**: Clean, unified branding with high-contrast slate-blue text on a sky-blue backdrop creates a more memorable and cohesive aesthetic than a dual-mode setup.

### Robust MongoDB Connection Caching and Failover
- **Decision**: Redesigned the MongoDB connection caching to only store the client in the global cache after a successful connection is established. Added an explicit error-catching wrapper with `serverSelectionTimeoutMS: 5000` to prevent database unreachable states from throwing unhandled exceptions.
- **Rationale**: The previous connection code called `client.connect()` on every request and threw uncaught exceptions when the database was offline or credentials invalid, which crashed serverless routes. With this change, it fails fast (5s) and automatically defaults to the secure local file-based storage.

---

## 4. Current State & Active Focus
- **Current State**: Refactored the entire portfolio layouts, columns, grids, and content to match the reference image exactly, utilizing the active Light Sky Blue theme and background video.
- **Active Focus**: None, development and layout refactoring verified.

---

## 5. Task Board / Backlog

### Phase 1: Setup & Initialization
- [x] Create project memory file (`project_memory.md`)
- [x] Configure workspace custom agent rules (`.agents/AGENTS.md`)
- [x] Gather UX/design requirements and aesthetic choices using `/teach-impeccable` or direct discussion.
- [x] Set up and initialize target tech framework (standard static directories vs Vite/React structure).

### Phase 2: Design System & Foundation
- [x] Implement core design system in `globals.css` (color tokens, fluid typography scales, spacing).
- [x] Create layout template components (Header, Footer, Navigation).

### Phase 3: Page & Content Development
- [x] Develop Hero section with bold typography and custom entrance animation.
- [x] Develop Projects showcase section with progressive disclosure interactive cards.
- [x] Develop Experience/Resume timeline.
- [x] Develop Contact form and clean inputs with responsive error states.
- [x] Integrate WhatsApp and update primary contact phone number.


### Phase 4: Animations & Polishing
- [x] Integrate micro-animations and custom hover transitions.
- [x] Run quality audit (`/audit`) for accessibility, performance, and responsive behavior.
- [x] Conduct styling and layout polish pass (`/polish`).
