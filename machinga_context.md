# Machinga Website Context & Status (As of May 26, 2026)

This file contains the development context, recent changes, and project status for the Machinga website. It is designed to bridge context between AI coding assistant sessions.

---

## 🛠 Tech Stack & Configuration
- **Framework**: Next.js 16.2.4 (App Router)
- **Library**: React 19.2.4
- **Styling**: TailwindCSS v4 (`@tailwindcss/postcss`), with substantial custom styling in [src/app/globals.css](file:///Users/anandnair/Machinga%20Website%20Antigravity/src/app/globals.css).
- **Smooth Scroll**: Lenis (`^1.3.23`)
- **Vercel Deploy**: Linked to Vercel project, auto-deploying the `main` branch.
- **Domains**: 
  - Vercel: `machinga.vercel.app`
  - Custom Domain: `https://www.studiomachinga.com` (GoDaddy redirect from root `studiomachinga.com` to `www` verified and active).

---

## 🚀 Key Achievements & Changes (Yesterday's Work)

### 1. Case Study Headers & Asset Restoration
- **Fullscreen Video Splash Intros**: Kept the fullscreen video intro splash headers (`cs-fs-hero`) at the very top of `Hamleys`, `Appreciate`, `Contraband`, and `Aava` case study pages.
- **Editorial Layout Flow**: Positioned the complete white-background editorial hero sections (`cs-hero` / `#challenge`) directly underneath the fullscreen video overlays. When the user scrolls down or clicks the static vertical scroll cue line (`.cs-cue-line`), it slides smoothly into the full editorial layouts.
- **Restored Metadata Tables**: Re-instantiated the `cs-meta` grid for each page:
  - **Hamleys**: BRAND (`Hamleys India`), CAMPAIGN (`#SkipTheAwkward`), WORK (`Campaign Strategy`, `Creative`, `On-Ground Activation`), RESULT (`5M+ organic views. In one week.`).
  - **Appreciate**: BRAND (`Appreciate`), WORK (`Content Strategy`, `Engine Build`, `Ongoing Production`), PLATFORM (`Instagram-first`), DURATION (`18 months+ Ongoing`).
  - **Contraband**: BRAND (`Contraband`), WORK (`Campaign Concept`, `Script`, `Production`), PLATFORM (`Instagram`), RESULT (`88M+ views in two weeks. 1.1M likes.`).
  - **Aava**: BRAND (`AAVA`), WORK (`Brand Positioning`, `Campaign Strategy`, `Film Production`).
- **Media Asset Linking**: Correctly linked the first assets under each editorial header:
  - **Hamleys**: Vertically displayed bear video (`/assets/hamelys videos/Hamleys Vday Video 25  (1).mp4`).
  - **Appreciate**: Main animated GIF (`/assets/Appreciate case studies assets/Appreciate_hero.gif`).
  - **Contraband**: Cinematic wide video (`/assets/conntraband assets/contraband page video 1.mp4`).
  - **Aava**: Video asset `aava.mp4` depicting office scene.

### 2. Green Satellite Navigation Bubbles
- **Navigation Replaces Hero Loops**: Clicking the green bubbles now triggers native section scrolling rather than displaying hero video loops.
- **4 Micro-Satellites**: Scaled down to form a sparkling stellar particle aesthetic around the central composition:
  - **How We Work** (`34px`): `href="#statement"` (Top-right)
  - **About Machinga** (`14px`): `href="#about"` (Middle-right/above How We Work swapped coordinate cluster)
  - **beliefs** (`8px`): `href="#beliefs"` (Bottom-left)
  - **Let's Talk** (`16px`): `href="#contact"` (Bottom-right, nested under Appreciate)
- **Label Directional Reveals**: Text labels slide cleanly into empty outer spaces:
  - **How We Work**, **About Machinga**, **Let's Talk** slide pop-outs to the **right** (left-aligned text).
  - **beliefs** slides pop-out to the **left** (right-aligned text).
- **Responsive Tablet Clustering**: Custom coordinates preserve the non-overlapping Y-bands and layout on mobile/tablet viewports.
- **Logo Hover Reveal**: Hovering over the central Machinga Logo button automatically triggers the satellite bubbles' expansion.

### 3. Dynamic Transitions & Video Playhead Synchronization
- **Playhead Synchronization (Match-Cut Transition)**: When clicking a homepage circular case study bubble, its video `currentTime` is saved to `sessionStorage` (as `transitionVideoTime`). On navigation, the overlay and the newly loaded fullscreen case study video (`.cs-fs-hero-bg`) synchronize to this timestamp, ensuring seamless frame continuation.
- **Dissolve Fade Transition**: Replaced sudden visual pops with a smooth `0.6s` dissolve opacity transition overlay.
- **Transparent Sticky Header**: Configured the sticky navigation header to be completely transparent (`background: transparent !important; backdrop-filter: none !important`) when at the top of case study pages (`scrollY <= 10px`). It transitions dynamically to solid white when scrolled down or when the hamburger drawer is opened. Path matching is normalized to support Vercel trailing slashes.

### 4. Typography & Layout Animations
- **Fable Story Scroll Reveal**: Paragraphs are split into dynamic word spans (`.fable-word`). As the user scrolls, word opacity sweeps from `0.15` (ghost grey) to `1.0` (dark charcoal) from left to right.
- **Headline Sweep-Reveal**: Dynamic intersecting gradient reveals applied to main section titles:
  - **Pricing**: `"One size fits none."`
  - **Beliefs**: `"Things we believe to be true."`
  - **Contact**: `"Start the conversation."` (Staggered multi-line sweep reveal).
- **About Machinga Section Typographic Grid**:
  - Left Column (Literal dictionary definition of noun): Small, light grey font.
  - Right Column (Company "About Us" statement): Large, highly readable charcoal font.
  - Separated by a thin vertical line (transforms into horizontal line on mobile/tablet stack).

### 5. Final Copy & Asset Cleanups
- **About Copy**: Updated to *"An independent creative company. We work with brands the way long collaborators work. Slowly, with disagreement, and with a shared interest in the work being worth the time."*
- **Aava Asset & Copy Alignments**: Swapped background videos to a text-free `aava.mp4` asset. Synchronized headlines, sub-headlines (`"How the OG water brand won a category flooded with imposters."` / `"Two words. Uncopyable by design."`), and tag pills across all bubble views, grid cards, and splash pages.
- **Footer wrap fix**: Added `white-space: nowrap` to prevent *"Run."* from wrapping to a second line.
- **Hidden Testimonials**: Temporarily commented out/hidden testimonials section on the homepage as requested.

### 6. Case Study Refinements (Today's Work - May 26, 2026)
- **Appreciate Section Spacing**: Replaced `paddingTop: "0"` with `paddingTop: "6rem"` on the three-screens section wrapper in [src/app/appreciate/page.tsx](file:///Users/anandnair/Machinga%20Website%20Antigravity/src/app/appreciate/page.tsx) to provide proper separation from the grey split-section.
- **Vir Saini Video Swap**: Updated the second phone outline in [src/app/appreciate/page.tsx](file:///Users/anandnair/Machinga%20Website%20Antigravity/src/app/appreciate/page.tsx) to use the correct "American Keeda" video asset (`American_Keeda_ka_kuch_nahi_ho_sakta_...mp4`). The third phone serves as a placeholder until the user provides the Instagram link for the third clip.
- **Broken Cover Image Path Fix**: Removed the obsolete `/machinga-nextjs` prefix from `getAssetPath` in [src/components/Carousel.tsx](file:///Users/anandnair/Machinga%20Website%20Antigravity/src/components/Carousel.tsx), repairing the broken case study banner images at the bottom of case study pages.
- **3-Card Snap Carousel Redesign**: Re-engineered the marquee scrolling carousel in [src/components/Carousel.tsx](file:///Users/anandnair/Machinga%20Website%20Antigravity/src/components/Carousel.tsx) into a centered, state-driven 3-card snap slider with responsive viewport-based translation, smooth grayscale/blur transitions, explicit arrow navigation, and direct page routing on click of the active centered card.
- **Scroll Cue Text Update**: Updated the homepage scroll cue text in [src/app/page.tsx](file:///Users/anandnair/Machinga%20Website%20Antigravity/src/app/page.tsx) from `"Enter"` to `"explore"` (which renders as uppercase `"EXPLORE"`) to prevent keyboard-related interface confusion.

### 7. About Fable Reveal & Beliefs Sticky Alignment (Today's Work - May 27, 2026)
- **Fable Paragraph Word Reveal**: Dynamic `green-word` classes are only applied to the first 5 words of the third paragraph (`"A tiny coconut-fruit rolled in."`). In `HomeClientLogic.tsx`'s scroll handler, we transition their text color to green `#0FC823` in JavaScript upon reveal. The remaining words of the paragraph transition their opacity normally while maintaining their default black color.
- **Sticky Beliefs Alignment**: Reverted all changes to the `.beliefs-left` layout container to restore the original sticky centering effect (`position: sticky`, `top: 50vh`, `height: 60px`, `transform: translateY(-50%)`, and `overflow: hidden`). This preserves the original visual scroll effects and vertical alignment shifts, living with the initial entry alignment offset.

---

## 📂 Current File Directory Structure
- [src/app/page.tsx](file:///Users/anandnair/Machinga%20Website%20Antigravity/src/app/page.tsx): Main homepage layout containing Hero, Fable Story, Case Studies Grid, About/Definition, Pricing, Beliefs, and Contact Form.
- [src/app/globals.css](file:///Users/anandnair/Machinga%20Website%20Antigravity/src/app/globals.css): Custom variables, transition logic, typography styles, mobile queries, satellite bubble positioning, and sweep animations.
- [src/components/HomeClientLogic.tsx](file:///Users/anandnair/Machinga%20Website%20Antigravity/src/components/HomeClientLogic.tsx): Controls client-side homepage animations, scroll observers, satellite bubble expansions, and transition playhead captures.
- [src/components/FadeObserver.tsx](file:///Users/anandnair/Machinga%20Website%20Antigravity/src/components/FadeObserver.tsx): Global client-side route observer that synchronizes video playheads on page mount and initializes scroll-sweep animations.
- [src/components/Header.tsx](file:///Users/anandnair/Machinga%20Website%20Antigravity/src/components/Header.tsx): Navigation header with transparent scroll triggers on case studies.
- Case Study Pages:
  - [src/app/appreciate/page.tsx](file:///Users/anandnair/Machinga%20Website%20Antigravity/src/app/appreciate/page.tsx)
  - [src/app/hamleys/page.tsx](file:///Users/anandnair/Machinga%20Website%20Antigravity/src/app/hamleys/page.tsx)
  - [src/app/contraband/page.tsx](file:///Users/anandnair/Machinga%20Website%20Antigravity/src/app/contraband/page.tsx)
  - [src/app/aava/page.tsx](file:///Users/anandnair/Machinga%20Website%20Antigravity/src/app/aava/page.tsx)
