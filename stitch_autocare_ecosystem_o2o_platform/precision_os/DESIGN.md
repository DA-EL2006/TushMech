---
name: Precision OS
colors:
  surface: '#fbf9fb'
  surface-dim: '#dbd9db'
  surface-bright: '#fbf9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f5'
  surface-container: '#efedef'
  surface-container-high: '#eae7ea'
  surface-container-highest: '#e4e2e4'
  on-surface: '#1b1b1d'
  on-surface-variant: '#44474d'
  inverse-surface: '#303032'
  inverse-on-surface: '#f2f0f2'
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
  background: '#fbf9fb'
  on-background: '#1b1b1d'
  surface-variant: '#e4e2e4'
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
  base-unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  tap-target-min: 48px
---

## Brand & Style
The design system is engineered to bridge the gap between heavy industrial utility and high-end fintech precision. It departs from traditional automotive aesthetics by prioritizing "clean-room" clarity, eliminating visual clutter often associated with mechanical software. The target audience includes fleet managers, precision technicians, and vehicle owners who require absolute data integrity and reliability.

The visual style is **Corporate Modern with a "Fintech-Edge"**. It utilizes a flat design foundation enhanced by high-performance elevation cues. This creates a UI that feels like a premium operating system—authoritative, transparent, and technologically advanced. The interface focuses on "glanceability," ensuring that critical automotive diagnostics are legible in high-intensity environments or outdoor sunlight.

## Colors
The palette is rooted in **Deep Trust Navy**, providing a solid, professional foundation that anchors the experience. **Electric Action Blue** is reserved strictly for primary interactions and "active" states, ensuring a high-contrast signal for user intent. 

Functional signaling is handled by **Verification Green** (system health/success) and **Warning Orange** (diagnostics/attention), both calibrated for maximum visibility against the **Off-White** background. Neutral scales should leverage cool grays to maintain the technical, high-tech feel without appearing "muddy."

## Typography
**Inter** is utilized for its systematic, utilitarian nature and exceptional legibility at small sizes—crucial for technical specifications and diagnostic readouts. 

For high-level dashboards, use **Display-LG** with tight tracking to evoke a sense of precision engineering. **Labels** are designed to be distinct from body text; use semi-bold weights and slight tracking increases for uppercase variants to ensure they are readable at a distance or in vibrating vehicle environments.

## Layout & Spacing
This design system employs a **12-column fluid grid** for desktop and a **4-column grid** for mobile. The spacing rhythm is strictly based on a **4px baseline**, with a heavy emphasis on generous whitespace to reduce cognitive load during complex tasks.

Key layout principles:
- **Tap Targets:** No interactive element should be smaller than 48x48px to accommodate technicians using the app in mobile settings.
- **Safe Areas:** Maintain a minimum 24px margin on mobile devices to prevent interaction fatigue at the screen edges.
- **Information Density:** Use `xl` (32px) and `xxl` (48px) spacing to separate major logical sections, while using `sm` (8px) for related data points within a card.

## Elevation & Depth
Depth is conveyed through **Ambient Shadows** and tonal layering. This system avoids heavy skeuomorphism in favor of subtle, diffused shadows that lift interactive components off the background.

- **Level 0 (Floor):** The Clean Off-White background.
- **Level 1 (Cards):** Surface color #FFFFFF with a 4px blur, 2% opacity Navy shadow. Used for standard data containers.
- **Level 2 (Interactive/Hover):** Surface color #FFFFFF with an 8px blur, 5% opacity Navy shadow. Used for buttons and active cards.
- **Level 3 (Modals/Overlays):** 16px blur, 10% opacity Navy shadow to create a distinct focus layer.

Use **Low-contrast outlines** (#E2E8F0) for inactive states or secondary borders, ensuring the UI remains clean and flat until interaction is required.

## Shapes
The design system uses a **Rounded (Level 2)** shape language. This provides a approachable, modern feel that softens the "coldness" of technical data without feeling juvenile. 

- **Standard Elements (Buttons/Inputs):** 0.5rem (8px) corner radius.
- **Large Containers (Cards/Modals):** 1rem (16px) corner radius.
- **Status Indicators (Pills):** Full roundedness (circular ends) to distinguish them from interactive buttons.

## Components

### Buttons
- **Primary:** Deep Trust Navy background with White text. Use for the main objective of the screen.
- **Action:** Electric Action Blue for secondary tasks or "Add" actions. 
- **Physicality:** Use a 1px inner stroke on buttons to give them a subtle "pressed" or "machined" look without full skeuomorphism.

### Cards
Cards are the primary container for vehicle data. They must feature a white background with a 1px #E2E8F0 border and a Level 1 shadow. Header areas within cards should have a subtle #F1F5F9 background to separate metadata from primary content.

### Input Fields
Inputs use a white background with a 1px border. On focus, the border shifts to Electric Action Blue with a 2px outer "glow" (shadow) of the same color at 10% opacity. Labels must always be visible above the field (never floating inside) to ensure accessibility.

### Chips & Status Indicators
Status indicators (e.g., "Service Required," "Part Ordered") use the full pill shape. Use a light tinted background (10% opacity of the status color) with high-contrast bold text of the primary color (e.g., Light Green background with Dark Green text).

### Lists
Lists should be "spacious," with a minimum item height of 64px. Use dividers only where necessary; otherwise, use whitespace to define rows. Each row should have a subtle hover state shift to #F1F5F9.

### Diagnostic Gauges
Custom component: Use semi-circular or linear progress bars in Electric Action Blue to represent fluid levels or battery health, ensuring a high-contrast visual that mimics digital vehicle clusters.