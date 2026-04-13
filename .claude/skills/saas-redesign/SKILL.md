---
name: saas-redesign
description: Redesign the inventory app into a Stripe-style SaaS UI with a collapsible left sidebar, CSS design tokens, and consistent spacing. Use when asked to modernize the UI, switch to sidebar navigation, or apply a SaaS dashboard look.
---

# SaaS Redesign — Stripe-style Sidebar Layout

This skill converts the Factory Inventory app from a horizontal top-nav layout to a modern SaaS interface with a **collapsible left sidebar**, **design-token spacing**, and **Stripe-inspired polish** (light surfaces, soft borders, indigo accent, generous whitespace).

Target aesthetic: Stripe Dashboard — all-light, white sidebar, `#635bff` indigo accent, subtle shadows, rounded-lg cards.

## Bundled Assets

Read these files from this skill directory before making changes:

| File | Use |
|---|---|
| `design-tokens.md` | Complete `:root` CSS-variable block + migration map |
| `sidebar-template.vue` | Reference implementation for `SidebarNav.vue` |

## Workflow — Follow In Order

### Phase 1: Audit

1. Read `client/src/App.vue` — note the current `<header class="top-nav">` block, the router-link list, and the global `<style>` section.
2. Confirm these components exist (they will be relocated, not modified):
   - `client/src/components/LanguageSwitcher.vue`
   - `client/src/components/ProfileMenu.vue`
   - `client/src/components/FilterBar.vue`
3. List view files: `ls client/src/views/` — these get a spacing pass in Phase 5.

### Phase 2: Install Design Tokens

1. Read `.claude/skills/saas-redesign/design-tokens.md`.
2. Edit `client/src/App.vue` — insert the full `:root { ... }` block at the top of the `<style>` tag, immediately before the `*` reset.
3. Update `body` to use tokens: `background: var(--surface-subtle); color: var(--text);`

### Phase 3: Create `useSidebar` Composable

Create `client/src/composables/useSidebar.js` (follow the singleton pattern used in `useFilters.js`):

```js
import { ref } from 'vue'

const STORAGE_KEY = 'sidebar-collapsed'
const isCollapsed = ref(localStorage.getItem(STORAGE_KEY) === 'true')

export function useSidebar() {
  const toggle = () => {
    isCollapsed.value = !isCollapsed.value
    localStorage.setItem(STORAGE_KEY, isCollapsed.value)
  }
  return { isCollapsed, toggle }
}
```

### Phase 4: Create `SidebarNav` Component

**MANDATORY:** Per project `CLAUDE.md`, creating a new `.vue` file must be delegated to the **vue-expert** subagent.

Spawn `vue-expert` with this brief:

> Create `client/src/components/SidebarNav.vue` using `.claude/skills/saas-redesign/sidebar-template.vue` as the starting point. Copy it verbatim, then verify:
> - All 6 routes match `client/src/App.vue` router-links (`/`, `/inventory`, `/orders`, `/spending`, `/demand`, `/reports`)
> - `nav.reports` i18n key exists in `client/src/locales/` — if not, fall back to literal `'Reports'`
> - Imports resolve (`useSidebar`, `useI18n`, `LanguageSwitcher`, `ProfileMenu`)
> - Emits `show-profile-details` and `show-tasks` pass through from `ProfileMenu`

### Phase 5: Restructure `App.vue` Layout

**MANDATORY:** This is a significant `.vue` modification — delegate to **vue-expert**.

Target template:

```html
<template>
  <div class="app" :class="{ 'sidebar-collapsed': isCollapsed }">
    <SidebarNav
      @show-profile-details="showProfileDetails = true"
      @show-tasks="showTasks = true"
    />
    <div class="app-main">
      <FilterBar />
      <main class="main-content">
        <router-view />
      </main>
    </div>
    <ProfileDetailsModal :is-open="showProfileDetails" @close="showProfileDetails = false" />
    <TasksModal ... />  <!-- keep existing props/handlers unchanged -->
  </div>
</template>
```

Script changes:
- Import `SidebarNav` and `useSidebar`; register `SidebarNav` in `components`
- In `setup()`: add `const { isCollapsed } = useSidebar()` and return `isCollapsed`
- Remove `LanguageSwitcher` and `ProfileMenu` from imports/components (now owned by `SidebarNav`)
- **Do not touch** task/modal logic (`tasks`, `addTask`, `deleteTask`, `toggleTask`, `loadTasks`)

Style changes — replace the `.app`, `.top-nav`, `.nav-container`, `.nav-tabs*`, `.logo`, `.subtitle` rules with:

```css
.app {
  display: grid;
  grid-template-columns: var(--sidebar-w) 1fr;
  min-height: 100vh;
  transition: grid-template-columns var(--transition);
}

.app.sidebar-collapsed {
  grid-template-columns: var(--sidebar-w-rail) 1fr;
}

.app-main {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.main-content {
  flex: 1;
  max-width: var(--content-max-w);
  width: 100%;
  margin: 0 auto;
  padding: var(--space-6) var(--space-8);
}
```

Then retrofit the remaining global rules (`.page-header`, `.stats-grid`, `.stat-card`, `.card`, `table`, `.badge`, `.loading`, `.error`) using the **migration map** in `design-tokens.md`. Specific adjustments:
- `.card`, `.stat-card`: `border-radius: var(--radius-lg); box-shadow: var(--shadow-sm); border: 1px solid var(--border);` — shadow always-on, drop the hover-only shadow
- `.stat-card:hover`: `box-shadow: var(--shadow-md);` only
- `.page-header`: `margin-bottom: var(--space-6)`
- `.stats-grid`, `.card`: gap/margin → `var(--space-5)`

### Phase 6: Spacing & Polish Pass

For `client/src/components/FilterBar.vue` and each file in `client/src/views/`:

1. In scoped `<style>` blocks, apply the migration map from `design-tokens.md` — replace literal hex colors, rem spacing, and px radii with token vars.
2. FilterBar specifically: wrap in a white card (`background: var(--surface)`, `border-bottom: 1px solid var(--border)`, `padding: var(--space-4) var(--space-8)`).
3. **Retrofit only** — do not change templates, scripts, or computed logic. Style edits only.

Delegate any file with >20 lines of style changes to **vue-expert**.

### Phase 7: Verify

1. Start dev server: `cd client && npm run dev` (port 3000).
2. Use Playwright MCP (`mcp__playwright__*`):
   - Navigate to each route: `/`, `/inventory`, `/orders`, `/spending`, `/demand`, `/reports`
   - Screenshot each; assert `.sidebar-nav` is visible and the matching `.nav-item` has `router-link-exact-active`
   - Click `.collapse-btn` → assert `.app` has class `sidebar-collapsed` and `.nav-label` elements are hidden
   - Reload page → assert collapsed state persists (localStorage)
   - Change a FilterBar select → confirm dashboard stat values change (filter pipeline intact)
3. Check browser console: zero Vue warnings or errors.
4. Set viewport to 1280×800 → assert no horizontal scrollbar.

## Rules

**Do**
- Use **vue-expert** subagent for every `.vue` file creation or significant edit
- Keep all i18n keys (`t('nav.*')`) — add `nav.reports` to locales if missing
- Use inline SVG for icons (provided in `sidebar-template.vue`)
- Preserve all existing functionality: filters, modals, tasks, language switching

**Don't**
- Add npm dependencies (no icon libraries, no Tailwind, no UI kits)
- Use emoji anywhere in the UI
- Touch `server/`, `client/src/api.js`, or any composable except the new `useSidebar.js`
- Rewrite view component logic — Phase 6 is style-only

## Quick Reference

| Item | Value |
|---|---|
| Sidebar width (expanded) | `240px` |
| Sidebar width (rail) | `64px` |
| Accent color | `#635bff` |
| Card padding | `var(--space-5)` |
| Grid gap | `var(--space-5)` |
| Page padding | `var(--space-6) var(--space-8)` |
| Card radius | `var(--radius-lg)` (8px) |
| Default shadow | `var(--shadow-sm)` |
