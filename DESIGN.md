---
name: Heritage & Clarity
colors:
  surface: '#fbf9f8'
  surface-dim: '#dbdad9'
  surface-bright: '#fbf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f3'
  surface-container: '#efeded'
  surface-container-high: '#e9e8e7'
  surface-container-highest: '#e4e2e2'
  on-surface: '#1b1c1c'
  on-surface-variant: '#564240'
  inverse-surface: '#303031'
  inverse-on-surface: '#f2f0f0'
  outline: '#8a716f'
  outline-variant: '#ddc0bd'
  surface-tint: '#a23c36'
  primary: '#410002'
  on-primary: '#ffffff'
  primary-container: '#630d0d'
  on-primary-container: '#ec746a'
  inverse-primary: '#ffb4ac'
  secondary: '#5f5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e2dfde'
  on-secondary-container: '#636262'
  tertiary: '#1b1b1a'
  on-tertiary: '#ffffff'
  tertiary-container: '#30302f'
  on-tertiary-container: '#999796'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad6'
  primary-fixed-dim: '#ffb4ac'
  on-primary-fixed: '#410002'
  on-primary-fixed-variant: '#832521'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#e5e2e0'
  tertiary-fixed-dim: '#c8c6c4'
  on-tertiary-fixed: '#1b1c1b'
  on-tertiary-fixed-variant: '#474745'
  background: '#fbf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e2'
typography:
  display-lg:
    fontFamily: EB Garamond
    fontSize: 64px
    fontWeight: '500'
    lineHeight: 72px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: EB Garamond
    fontSize: 40px
    fontWeight: '500'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: EB Garamond
    fontSize: 48px
    fontWeight: '500'
    lineHeight: 56px
  headline-lg-mobile:
    fontFamily: EB Garamond
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
  headline-md:
    fontFamily: EB Garamond
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
  headline-sm:
    fontFamily: EB Garamond
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
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
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  xxl: 64px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 32px
---

## Brand & Style

The design system is defined by a sophisticated intersection of classical authority and modern precision. It is crafted for environments where heritage and institutional trust must coexist with high-performance digital utility. The brand personality is formal, intellectual, and composed, evoking the emotional response of a high-end editorial publication or a prestigious financial institution.

The visual style leans heavily into **Modern Minimalism** with an **Editorial** flair. It prioritizes generous whitespace, intentional typographic hierarchy, and a restrained use of decorative elements to allow the content to command full attention. The inclusion of full Vietnamese character support ensures that this elegance remains consistent across all linguistic nuances, maintaining a seamless experience for a global audience.

## Colors

The palette is centered around **Heritage Maroon**, a deep, saturated hue that signals stability and historical weight. This is supported by a range of nuanced neutrals.

- **Primary (Heritage Maroon):** Used for key brand moments, primary calls to action, and structural accents.
- **Secondary (Ink):** A near-black utilized for maximum legibility in typography and iconography.
- **Tertiary (Paper):** A warm, light neutral used for backgrounds to reduce eye strain and provide a more tactile, "editorial" feel compared to pure white.
- **Neutral (Slate):** Used for secondary text, borders, and disabled states.

## Typography

Typography is the cornerstone of this design system. It utilizes a high-contrast pairing to balance tradition with modernity.

- **EB Garamond** is used for all headlines and display text. Its classical serif structure and optimized Vietnamese diacritics provide an authoritative and literary tone. Use it for Hero sections and Section Titles to establish a clear information hierarchy.
- **Inter** is the workhorse for body copy, navigation, and labels. Its neutral, grotesque forms ensure maximum clarity at small sizes and provide a clean, technical counterpoint to the serif headlines.

All type scales should adhere to a strict baseline grid to maintain vertical rhythm. Display sizes use tighter tracking for a more "locked-in" editorial look, while smaller labels use increased tracking to improve legibility.

## Layout & Spacing

The layout philosophy follows a **Fixed Grid** system inspired by classical print layouts. 

- **Desktop:** A 12-column grid with a 1280px maximum container width. This creates a centered, focused reading experience.
- **Tablet:** An 8-column fluid grid for flexibility.
- **Mobile:** A 4-column fluid grid with 16px side margins.

The spacing rhythm is built on a 4px base unit. Larger increments (40px, 64px) are encouraged between major sections to emphasize the minimalist aesthetic and give the high-contrast typography room to breathe. Components should use consistent internal padding (usually `md` or `lg`) to maintain a sense of structured openness.

## Elevation & Depth

To maintain a formal and high-end feel, this design system avoids aggressive shadows. Depth is conveyed primarily through **Tonal Layers** and **Low-Contrast Outlines**.

- **Surface Tiers:** Use the Tertiary color (Paper) as the base canvas. Elevated elements like cards or modals should use pure white (#FFFFFF) to subtly lift them from the background.
- **Outlines:** Use thin (1px) borders in a light neutral shade for containers. This provides structure without the "heaviness" of a drop shadow.
- **Shadows:** When absolutely necessary for critical UI interactions (like dropdown menus), use a single, highly diffused "Ambient Shadow" with 4% opacity and no color tinting.

## Shapes

The shape language is **Soft**. It uses a very subtle corner radius (4px) to take the edge off the "brutalist" sharp corner while remaining significantly more formal than rounded or pill-shaped systems. This slight rounding suggests a modern touch within a traditional framework. Larger components like cards or modals may utilize `rounded-lg` (8px) to feel more approachable, but primary interactive elements like buttons should remain consistent with the base 4px radius.

## Components

- **Buttons:** Primary buttons use a solid Heritage Maroon background with white Inter-medium labels. Secondary buttons use a transparent background with a 1px Heritage Maroon border.
- **Cards:** White backgrounds on Tertiary (Paper) canvas, featuring a 1px neutral border. Headlines within cards must use EB Garamond.
- **Input Fields:** Use Inter for labels and input text. The focus state is signaled by a 1px Heritage Maroon border and a very subtle inner shadow.
- **Chips:** Highly functional and minimal. Use a light neutral fill with Inter-label-md typography. No bold colors unless indicating a specific status.
- **Lists:** Separated by thin, low-contrast horizontal rules. Inter-body-md is the default for list items to ensure rapid scanning.
- **Navigation:** Top-tier navigation uses Inter-label-lg in all caps with 0.05em letter spacing for an elegant, architectural feel.