# Engineering & Design Conventions

These standards ensure **La Locanda dei Mori** maintains a digital presence that matches its physical excellence.

---

## 1. Clean Code & Performance
- **Modular Architecture**: Separate logic, UI, and data fetching (e.g., Services/Components/Hooks).
- **TypeScript Strict Mode**: No `any`. Explicit interfaces for all data models.
- **Performance**: 100/100 Lighthouse scores. Image optimization (WebP/AVIF), lazy loading, and critical CSS are mandatory.

## 2. Security Protocol (Latest Standards)
- **Sanitization**: All user inputs must be sanitized using modern libraries (e.g., DOMPurify).
- **Security Headers**: Strict CSP, HSTS, X-Frame-Options, and X-Content-Type-Options.
- **Authentication**: Use JWT with short-lived tokens and secure cookie storage (HttpOnly/SameSite=Strict).
- **Dependency Audits**: Monthly automated audits for vulnerabilities.

## 3. "Anti-AI Slob" Design System
- **Typography**: Minimum two pairings (Headings vs Body). Avoid standard system fonts.
- **Micro-animations**: Use framer-motion or GSAP for subtle entrance and hover states.
- **Color Palettes**: Derived from Taormina's landscape (Etna lava blacks, Mediterranean blues, lemon yellows).
- **Consistency**: 8px grid system for all spacing and layout.

## 4. Expert Error Logging
- **Structured Logs**: Every error must include `timestamp`, `severity`, `context`, and `stacktrace`.
- **Global Error Boundary**: All UI components must be wrapped in error boundaries to prevent total app crashes.
- **Telemetry**: Integration with monitoring tools (Sentry/LogRocket) for production environments.

## 5. Marketing & SEO
- **Semantic HTML**: Proper `h1`-`h6` hierarchy for SEO indexing.
- **Local SEO**: Inclusion of Schema.org JSON-LD for "Restaurant" type.
- **Accessibility**: WCAG 2.1 Level AA compliance (Aria labels, contrast ratios).
