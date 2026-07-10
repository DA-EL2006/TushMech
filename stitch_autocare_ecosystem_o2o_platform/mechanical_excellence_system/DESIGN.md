---
name: Mechanical Excellence System
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#44474d'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#75777e'
  outline-variant: '#c5c6cd'
  surface-tint: '#515f78'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#0d1c32'
  on-primary-container: '#76849f'
  inverse-primary: '#b9c7e4'
  secondary: '#0051d5'
  on-secondary: '#ffffff'
  secondary-container: '#316bf3'
  on-secondary-container: '#fefcff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#002113'
  on-tertiary-container: '#009668'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#b9c7e4'
  on-primary-fixed: '#0d1c32'
  on-primary-fixed-variant: '#39475f'
  secondary-fixed: '#dbe1ff'
  secondary-fixed-dim: '#b4c5ff'
  on-secondary-fixed: '#00174b'
  on-secondary-fixed-variant: '#003ea8'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  touch-target-min: 48px
---

## Brand & Style

The design system is engineered to pivot mechanical services from a "dirty garage" aesthetic to a "fintech-level OS" experience. It targets discerning vehicle owners and fleet managers who value precision, transparency, and premium reliability. 

The design style is **Corporate Modern** with a focus on high-fidelity utility. It utilizes a refined flat design language enhanced by subtle depth to establish trust. The UI must feel clinical yet premium—prioritizing clarity, high contrast for readability in varying light conditions (outdoor workshops), and a systematic structure that suggests technical mastery. 

**Key Principles:**
- **Clinical Precision:** Every element is aligned to a strict grid, reflecting mechanical accuracy.
- **Radical Transparency:** Information is tiered clearly, using "Verification Green" to signal system health and completed tasks.
- **Operational Luxury:** Generous whitespace and premium typography transform functional data into an editorial experience.

## Colors

The palette is anchored by **Deep Trust Navy**, providing a sophisticated, authoritative foundation. **Electric Action Blue** is reserved exclusively for primary interactions and critical pathways, ensuring high visibility.

**Functional Color Logic:**
- **Verification Green:** Used for "Job Complete," "System Healthy," or "Payment Verified" states.
- **Warning Orange:** Used for diagnostic alerts, pending maintenance, or urgent notifications.
- **Background Strategy:** The **Clean Off-White** (#F8FAFC) minimizes screen glare and provides a modern, airy canvas that separates the interface from the industrial environment.
- **Contrast:** High contrast ratios (7:1 minimum for body text) are maintained to ensure legibility for technicians working in bright outdoor or high-glare workshop settings.

## Typography

The design system exclusively utilizes **Inter**, a typeface chosen for its exceptional legibility at small sizes and its neutral, systematic character. 

- **Weight Strategy:** Headlines use Semi-Bold (600) and Bold (700) to communicate strength and hierarchy. Body text stays at Regular (400) for maximum flow.
- **Letter Spacing:** Headlines utilize slight negative tracking (-0.01em to -0.02em) to appear tighter and more "designed." Labels use positive tracking (0.01em) and uppercase styling for micro-information like VIN numbers or part IDs.
- **Mobile Adaptation:** Headlines scale down aggressively on mobile to ensure service names and diagnostic titles do not wrap awkwardly.

## Layout & Spacing

This design system follows a **12-column fluid grid** for desktop and a **4-column grid** for mobile. The spacing rhythm is based on a strict **8px base unit** to ensure mathematical harmony.

- **Tap Targets:** In line with the "modern mechanical" requirement, all interactive elements (buttons, toggles, list items) have a minimum height of 48px. This accommodates "on-the-move" usage and ensures accessibility in a workshop environment.
- **Whitespace:** Generous padding (minimum 24px) is applied inside cards and containers to prevent the UI from feeling cluttered or "greasy."
- **Breakpoints:** 
  - Mobile: < 600px (16px margins)
  - Tablet: 600px - 1024px (24px margins)
  - Desktop: > 1024px (40px margins, 1280px max-width)

## Elevation & Depth

To maintain the "Modern Flat" aesthetic while providing necessary depth for complex data, the design system uses **Tonal Layers** combined with **Ambient Shadows**.

- **Level 0 (Background):** Clean Off-White (#F8FAFC).
- **Level 1 (Cards/Surface):** Pure White (#FFFFFF) with a 1px border in #E2E8F0. This is the primary work surface.
- **Level 2 (Interactive/Floating):** Pure White with a "Soft Drop Shadow": `0 4px 6px -1px rgba(10, 25, 47, 0.05), 0 2px 4px -1px rgba(10, 25, 47, 0.03)`. The shadow is tinted with the Primary Navy to keep it grounded.
- **Overlay:** High-blur backdrop (8px) for modals to keep the focus on the task at hand.

## Shapes

The shape language is defined as **Rounded**, striking a balance between industrial structure and modern software approachability.

- **Standard Radius:** 0.5rem (8px) for primary buttons, input fields, and small cards.
- **Large Radius:** 1rem (16px) for main content containers and dashboard widgets.
- **Hard Rules:** Avoid 0px (too aggressive) and full pill-shapes (too casual), except for status chips.

## Components

### Buttons
- **Primary:** Deep Trust Navy background, White text. Heavy 600 weight.
- **Secondary:** Transparent background, 1px Border (Deep Trust Navy), Navy text.
- **Action:** Electric Action Blue background, used for "Book Service" or "Pay Now."

### Status Chips
- Small, rounded-pill indicators.
- **Success:** Verification Green background (10% opacity) with Green text.
- **Alert:** Warning Orange background (10% opacity) with Orange text.

### Input Fields
- 48px height minimum. 1px border (#E2E8F0). 
- Active state: 1px border (Electric Action Blue) with a subtle 2px blue outer glow.
- Labels are always visible above the field in `label-md` style.

### Service Cards
- White background, 1px border. 
- Use a 4px left-accent border in Verification Green or Warning Orange to denote status at a glance.

### Lists
- High-contrast dividers (#E2E8F0). 
- 16px vertical padding for list items to ensure they are easy to tap on mobile devices.

### Diagnostic Gauges
- Custom components using Electric Action Blue for progress and data visualization, avoiding "skeuomorphic dials" in favor of clean, linear progress bars.