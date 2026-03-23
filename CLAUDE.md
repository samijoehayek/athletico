# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Athletico is a sports club website built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS 4. It is a static/client-rendered site with no API routes, database, or authentication. All content data is hardcoded in components.

## Commands

- `npm run dev` — Start development server (port 3000)
- `npm run build` — Production build
- `npm start` — Start production server
- `npm run lint` — Run ESLint

No test framework is configured.

## Architecture

**Routing:** Next.js App Router with pages at `app/*/page.tsx`. Routes include `/`, `/inside-athletico`, `/team`, `/contact`, `/achievement`, `/alumni`, `/olympique-lyonnais`.

**Components:** All in `app/components/`, organized by page (e.g., `contact/`, `team/`, `careers/`). Every interactive component uses `"use client"`. State is managed with React hooks only — no external state library.

**Styling:** Tailwind CSS 4 with utility classes. Custom theme variables defined in `app/globals.css`. Primary brand color is `#3050FD` (blue). Responsive design uses Tailwind breakpoints plus `isMobile` state checks for layout switching in complex components.

**Animation (dual-library approach):**
- **Framer Motion** — Component transitions, carousels (`AnimatePresence`), infinite scrolling banners. Used in Stories, OurClubSection, Footer.
- **GSAP + ScrollTrigger** — Scroll-pinned horizontal carousels and scroll-triggered effects. Used in Activities, Achievement page.

**Navbar:** Two variants exist — `Navbar.tsx` (light) and `NavbarDark.tsx` (dark). Active route detected via `usePathname()`.

**Images:** Mix of local assets in `public/` and remote Unsplash URLs. `next.config.ts` allows `images.unsplash.com` as a remote pattern. Use `next/image` with proper `sizes` and `priority` props.

**Font:** Outfit (Google Font) loaded in `app/layout.tsx` with CSS variable `--font-outfit`.

**Path alias:** `@/*` maps to the project root (configured in `tsconfig.json`).

**WhatsApp integration:** Floating button in root layout links to `wa.me/96170202030` with pre-filled message.
