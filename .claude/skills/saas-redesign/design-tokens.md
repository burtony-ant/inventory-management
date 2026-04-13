# Design Tokens — Stripe-style SaaS

Paste this block at the **top** of the global `<style>` tag in `client/src/App.vue` (immediately after the opening `<style>` line, before the `*` reset).

```css
:root {
  /* Surfaces */
  --surface: #ffffff;
  --surface-subtle: #f6f8fa;
  --surface-hover: #f0f3f7;

  /* Borders */
  --border: #e3e8ee;
  --border-strong: #d5dbe1;

  /* Text */
  --text: #1a1f36;
  --text-muted: #697386;
  --text-subtle: #8792a2;

  /* Accent (Stripe indigo) */
  --accent: #635bff;
  --accent-hover: #5349e0;
  --accent-subtle: #f5f4ff;

  /* Status */
  --success: #0e6245;
  --success-bg: #d7f7c2;
  --warning: #983705;
  --warning-bg: #fcedb9;
  --danger: #a41c4e;
  --danger-bg: #ffe7f2;
  --info: #3d4eac;
  --info-bg: #e6e6fc;

  /* Spacing (4px grid) */
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */

  /* Radius */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;

  /* Shadow */
  --shadow-sm: 0 1px 3px rgba(26, 31, 54, 0.08);
  --shadow-md: 0 4px 12px rgba(26, 31, 54, 0.1);
  --shadow-lg: 0 12px 32px rgba(26, 31, 54, 0.12);

  /* Typography */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 0.938rem;
  --text-lg: 1.125rem;
  --text-xl: 1.375rem;
  --text-2xl: 1.75rem;

  /* Layout */
  --sidebar-w: 240px;
  --sidebar-w-rail: 64px;
  --content-max-w: 1400px;

  /* Motion */
  --transition: 0.18s ease;
}
```

## Migration Map

When retrofitting existing styles in `App.vue` and view files, replace literals with tokens:

| Old value | Token |
|---|---|
| `#ffffff`, `white` | `var(--surface)` |
| `#f8fafc` | `var(--surface-subtle)` |
| `#f1f5f9` | `var(--surface-hover)` |
| `#e2e8f0` | `var(--border)` |
| `#cbd5e1` | `var(--border-strong)` |
| `#0f172a`, `#1e293b`, `#334155` | `var(--text)` |
| `#64748b`, `#475569` | `var(--text-muted)` |
| `#2563eb` | `var(--accent)` |
| `#eff6ff` | `var(--accent-subtle)` |
| `0.25rem` | `var(--space-1)` |
| `0.5rem` | `var(--space-2)` |
| `0.75rem` | `var(--space-3)` |
| `1rem` | `var(--space-4)` |
| `1.25rem` | `var(--space-5)` |
| `1.5rem` | `var(--space-6)` |
| `2rem` | `var(--space-8)` |
| `6px` (radius) | `var(--radius-md)` |
| `8px`, `10px` (radius) | `var(--radius-lg)` |
| `0 1px 3px ...`, `0 4px 12px ...` | `var(--shadow-sm)`, `var(--shadow-md)` |

**Status badges** — remap existing `.badge.*` and `.stat-card.*` color classes to the status tokens above (e.g. `.badge.success { background: var(--success-bg); color: var(--success); }`).

Only replace values used for **spacing, color, radius, and shadow**. Leave font-weights, letter-spacing, and percentage widths as-is.
