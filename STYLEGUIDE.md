# AutoParts-X Style Guide

This document defines the core visual and interaction design principles for AutoParts-X. These guidelines ensure consistency 
across all components, pages, and features.

### CSS Modules Usage
Every React component must have its own dedicated stylesheet using the `.module.css` extension.

*   **Importing:** Import styles into the component as a default object: 
    `import styles from './ProductCard.module.css';`
*   **Applying Classes:** Apply classes using bracket or dot notation: 
    `<div className={styles.cardContainer}>`
*  **Applying module.css** Applying module.css using the class names.
    `.cardContainer {
        border-radius: 25%;
    }`


## 1. Color Palette

The AutoParts-X palette consists of primary, secondary, and accent colors tailored to reflect the brand's identity and 
provide a clear visual hierarchy.

### Background Colors
*   **Primary Background (`#FFFFFF`)**: Used for main backgrounds and primary content areas.
*   **Secondary Background (`#F3F4F6`)**: Used for backgrounds behind product and category cards to provide depth.
*   **Header & Footer Background (`#0B132B`)**: Used to create immersive, high-contrast primary navigation and footer elements.

### Text Colors
*   **Primary Text (`#111827`)**: Used for main body text, primary headings, and product titles.
*   **Secondary Text (`#6B7280`)**: Used for descriptive body text, vehicle compatibility notes, and search bar placeholder text.

### Button & Action Colors
*   **Primary Action (`#0056D2`)**: Used for primary buttons (Search parts, Register account, Login), active category icons, and 
key subheadings.
*   **Secondary Action (`#E04935`)**: Used for secondary buttons, borders, and non-primary actions.

### Accent Colors
*   **Brand Red (`#DC143C`)**: Used for error messages, negative actions, and critical notification badges (e.g., cart counters).



## 2. Typography

AutoParts-X utilizes a clean, modern sans-serif typeface to maintain legibility and a professional e-commerce aesthetic.

*   **Primary Font:** `'Fira Sans', sans-serif`
*   **Heading 1 (H1) - Hero & Main Titles:** `2.5rem` (40px), Bold (700). Used for major page hooks and hero sections.
*   **Heading 2 (H2) - Section Titles:** `1.5rem` (24px), Bold (700), Primary Text color. Used for primary content dividers 
(e.g., "Featured Parts").
*   **Subheadings (H3):** `0.875rem` (14px), Bold (700), All-Caps. Used for category labels and overlines.
*   **Body Text:** `0.875rem` (14px), Regular (400). Used for standard descriptions and secondary text.



## 3. UI Components & Interaction

*   **Buttons:**
    *   **Primary:** Solid `#0056D2` background with `#FFFFFF` text. No borders, slightly rounded corners.
    *   **Secondary:** Solid `#E04935` background with `#FFFFFF` text. No borders, slightly rounded corners.
*   **Cards:**
    *   Use `#FFFFFF` backgrounds resting on the `#F3F4F6` secondary background. Apply a subtle drop shadow to lift them from 
    the page.
*   **Search Interface:**
    *   Large, prominent `#FFFFFF` search bar with `#6B7280` placeholder text, typically placed centrally on the dark `#0B132B` 
    hero background.



## 4. Accessibility Standards

*   **Color Contrast:** Primary Text (`#111827`) and Secondary Text (`#6B7280`) must maintain a minimum WCAG AA contrast ratio 
of 4.5:1 against the Primary Background (`#FFFFFF`).
*   **Focus States:** Keyboard navigation must be supported with a visible `2px solid #0056D2` focus ring on all links, 
buttons, and form inputs.
*   **Error States:** When using Brand Red (`#DC143C`) for errors, always pair the color change with an accompanying icon or 
text explanation to ensure colorblind accessibility.