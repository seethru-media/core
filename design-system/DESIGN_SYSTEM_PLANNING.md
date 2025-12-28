# Design System Planning - seethru.media

**Created:** 2025-12-26  
**Purpose:** Design system architecture, tokens, and component library planning  
**Status:** 🟡 **Planning Phase**

---

## Design System Overview

The seethru.media design system will provide a consistent, accessible, and scalable foundation for all subdomains and the admin interface. It will be built as a shared package (`@seethru/design-system`) used across all apps.

---

## Core Principles

### 1. Consistency
- Unified visual language across all subdomains
- Consistent interaction patterns
- Shared component library

### 2. Flexibility
- Support for subdomain customization (themes)
- Configurable components
- Extensible token system

### 3. Accessibility
- WCAG 2.1 AA compliance minimum
- Keyboard navigation support
- Screen reader optimization
- High contrast mode support

### 4. Performance
- Lightweight components
- Tree-shakeable exports
- Minimal runtime overhead
- Optimized for Cloudflare edge

---

## Design Tokens

### Color System

#### Base Colors
```typescript
// Primary brand colors
primary: {
  50: '#...',  // Lightest
  100: '#...',
  200: '#...',
  300: '#...',
  400: '#...',
  500: '#...', // Base
  600: '#...',
  700: '#...',
  800: '#...',
  900: '#...', // Darkest
}

// Semantic colors
success: { ... }
warning: { ... }
error: { ... }
info: { ... }

// Neutral colors
gray: { ... }
```

#### Theme Support
- Light mode (default)
- Dark mode
- High contrast mode
- Per-subdomain theme customization

#### Usage
```css
/* Use tokens, never raw colors */
color: var(--color-primary-500);
background: var(--color-gray-50);
border-color: var(--color-error-300);
```

### Typography

#### Font Families
- **Primary:** System font stack (performance)
- **Headings:** [To be decided - consider variable font]
- **Monospace:** System monospace (code blocks)

#### Type Scale
```typescript
fontSize: {
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  base: '1rem',     // 16px
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem',  // 36px
  '5xl': '3rem',     // 48px
}

fontWeight: {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
}

lineHeight: {
  tight: 1.25,
  normal: 1.5,
  relaxed: 1.75,
}
```

### Spacing

```typescript
space: {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
}
```

### Layout

#### Breakpoints
```typescript
breakpoints: {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}
```

#### Container Widths
```typescript
container: {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  full: '100%',
}
```

### Shadows

```typescript
shadow: {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
}
```

### Border Radius

```typescript
radius: {
  none: '0',
  sm: '0.125rem',  // 2px
  base: '0.25rem', // 4px
  md: '0.375rem',  // 6px
  lg: '0.5rem',    // 8px
  xl: '0.75rem',   // 12px
  '2xl': '1rem',   // 16px
  full: '9999px',
}
```

---

## Component Library Structure

### Base Components

#### Button
- Variants: primary, secondary, outline, ghost, danger
- Sizes: sm, md, lg
- States: default, hover, active, disabled, loading
- Icons: left, right, icon-only
- Full width option

#### Input
- Types: text, email, password, number, search, textarea
- States: default, focus, error, disabled
- Sizes: sm, md, lg
- Labels, hints, errors
- Icons: left, right

#### Card
- Variants: default, elevated, outlined
- Header, body, footer sections
- Interactive (clickable) variant

#### Modal/Dialog
- Sizes: sm, md, lg, full
- Close button, backdrop
- Focus trap
- Animation

#### Dropdown/Select
- Single select
- Multi-select
- Searchable
- Grouped options

#### Form Components
- Checkbox
- Radio
- Switch/Toggle
- File upload
- Date picker
- Time picker

### Layout Components

#### Container
- Max width constraints
- Responsive padding
- Centered content

#### Grid
- Responsive grid system
- Column spans
- Gaps

#### Stack
- Vertical stacking
- Horizontal stacking
- Spacing variants
- Alignment options

#### Flex
- Flex container
- Direction, wrap, align, justify
- Gap support

### Navigation Components

#### Header
- Logo
- Navigation links
- User menu
- Search
- Mobile menu

#### Sidebar
- Collapsible
- Navigation items
- Active state
- Nested items

#### Breadcrumbs
- Hierarchical navigation
- Separator customization

#### Pagination
- Page numbers
- Previous/next
- First/last
- Page size selector

### Content Components

#### Typography
- Heading (h1-h6)
- Paragraph
- Link
- Code (inline, block)
- Blockquote
- List (ordered, unordered)

#### Table
- Sortable columns
- Selectable rows
- Pagination
- Responsive (mobile scroll)

#### Badge
- Variants: default, primary, success, warning, error
- Sizes: sm, md, lg

#### Avatar
- Image
- Initials fallback
- Sizes: sm, md, lg, xl

#### Tooltip
- Positions: top, bottom, left, right
- Trigger: hover, click, focus
- Delay options

#### Alert
- Variants: info, success, warning, error
- Dismissible
- Icons

### Admin-Specific Components

#### DataTable
- Sorting
- Filtering
- Selection (checkbox)
- Bulk actions
- Export
- Loading states

#### ModerationQueue
- Submission list
- Status badges
- Quick actions
- Filter/sort

#### ContentEditor
- Rich text editor
- Media embedding
- Code blocks
- Preview mode
- Save draft

#### VersionHistory
- Version list
- Diff view
- Rollback action
- Author info

#### UserManagement
- User list
- Role assignment
- Permission management
- Activity log

---

## Implementation Plan

### Phase 1: Foundation
- [ ] Set up design system package structure
- [ ] Implement design tokens (CSS variables)
- [ ] Create token documentation
- [ ] Set up Storybook/Ladle

### Phase 2: Base Components
- [ ] Button
- [ ] Input
- [ ] Card
- [ ] Modal
- [ ] Dropdown

### Phase 3: Layout Components
- [ ] Container
- [ ] Grid
- [ ] Stack
- [ ] Flex

### Phase 4: Navigation Components
- [ ] Header
- [ ] Sidebar
- [ ] Breadcrumbs
- [ ] Pagination

### Phase 5: Content Components
- [ ] Typography
- [ ] Table
- [ ] Badge
- [ ] Avatar
- [ ] Tooltip
- [ ] Alert

### Phase 6: Admin Components
- [ ] DataTable
- [ ] ModerationQueue
- [ ] ContentEditor
- [ ] VersionHistory
- [ ] UserManagement

### Phase 7: Documentation
- [ ] Component documentation
- [ ] Usage examples
- [ ] Accessibility guidelines
- [ ] Migration guide

---

## Technology Choices

### Framework
- **Option A:** React (larger ecosystem)
- **Option B:** Svelte (better performance, smaller bundle)
- **Option C:** Framework-agnostic (Web Components)

**Recommendation:** Start with React (larger component library ecosystem), consider Svelte later if needed.

### Styling
- **Option A:** CSS Modules
- **Option B:** Styled Components
- **Option C:** Tailwind CSS
- **Option D:** Vanilla Extract

**Recommendation:** CSS Modules + CSS Variables for tokens (simple, performant, no runtime).

### Documentation
- **Option A:** Storybook
- **Option B:** Ladle
- **Option C:** Custom docs site

**Recommendation:** Ladle (faster, simpler, better for Cloudflare).

---

## Accessibility Requirements

### WCAG 2.1 AA Compliance
- Color contrast ratios
- Keyboard navigation
- Screen reader support
- Focus indicators
- ARIA labels

### Testing
- Automated a11y testing (axe-core)
- Manual keyboard testing
- Screen reader testing
- Color blindness testing

---

## Theme Customization

### Subdomain Themes
- Allow subdomains to customize:
  - Primary color
  - Typography (fonts)
  - Spacing scale (optional)
  - Border radius (optional)

### Implementation
```typescript
// Theme configuration
interface SubdomainTheme {
  primaryColor: string;
  fontFamily: string;
  // ... other customizable tokens
}

// Apply theme via CSS variables
:root[data-theme="custom"] {
  --color-primary-500: #custom-color;
}
```

---

## Performance Considerations

### Bundle Size
- Tree-shakeable exports
- Code splitting
- Lazy loading for heavy components
- Minimal dependencies

### Runtime Performance
- CSS-only animations (no JS)
- Virtual scrolling for long lists
- Debounced search/filter
- Optimized re-renders

---

## Next Steps

1. **Design token values** (colors, typography, spacing)
2. **Choose component framework** (React vs Svelte)
3. **Set up package structure**
4. **Create first components** (Button, Input)
5. **Set up documentation** (Ladle/Storybook)

---

**Last Updated:** 2025-12-26

