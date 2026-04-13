<template>
  <aside class="sidebar-nav" :class="{ collapsed: isCollapsed }">
    <div class="sidebar-header">
      <div class="logo" v-show="!isCollapsed">
        <h1>{{ t('nav.companyName') }}</h1>
        <span class="subtitle">{{ t('nav.subtitle') }}</span>
      </div>
      <button class="collapse-btn" @click="toggle" :aria-label="isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8">
          <path d="M11 5l-5 5 5 5M16 5l-5 5 5 5" />
        </svg>
      </button>
    </div>

    <nav class="nav-items">
      <router-link
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="nav-item"
        :title="isCollapsed ? t(item.label) : null"
      >
        <span class="nav-icon" v-html="item.icon" />
        <span class="nav-label">{{ t(item.label) }}</span>
      </router-link>
    </nav>

    <div class="sidebar-footer">
      <LanguageSwitcher v-show="!isCollapsed" />
      <ProfileMenu
        @show-profile-details="$emit('show-profile-details')"
        @show-tasks="$emit('show-tasks')"
      />
    </div>
  </aside>
</template>

<script>
import { useSidebar } from '../composables/useSidebar'
import { useI18n } from '../composables/useI18n'
import LanguageSwitcher from './LanguageSwitcher.vue'
import ProfileMenu from './ProfileMenu.vue'

const ICONS = {
  dashboard: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="6" height="8" rx="1"/><rect x="11" y="3" width="6" height="5" rx="1"/><rect x="11" y="10" width="6" height="7" rx="1"/><rect x="3" y="13" width="6" height="4" rx="1"/></svg>',
  package: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10 2l7 4v8l-7 4-7-4V6l7-4z"/><path d="M3 6l7 4 7-4M10 10v8"/></svg>',
  cart: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 3h2l2 10h8l2-7H6"/><circle cx="8" cy="16" r="1.5"/><circle cx="14" cy="16" r="1.5"/></svg>',
  dollar: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10 3v14M13 6H8.5a2.5 2.5 0 000 5h3a2.5 2.5 0 010 5H6"/></svg>',
  trending: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 14l4-4 3 3 7-7"/><path d="M13 6h4v4"/></svg>',
  file: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M11 3H5a1 1 0 00-1 1v12a1 1 0 001 1h10a1 1 0 001-1V8l-5-5z"/><path d="M11 3v5h5M7 11h6M7 14h6"/></svg>'
}

export default {
  name: 'SidebarNav',
  components: { LanguageSwitcher, ProfileMenu },
  emits: ['show-profile-details', 'show-tasks'],
  setup() {
    const { isCollapsed, toggle } = useSidebar()
    const { t } = useI18n()

    const navItems = [
      { path: '/', label: 'nav.overview', icon: ICONS.dashboard },
      { path: '/inventory', label: 'nav.inventory', icon: ICONS.package },
      { path: '/orders', label: 'nav.orders', icon: ICONS.cart },
      { path: '/spending', label: 'nav.finance', icon: ICONS.dollar },
      { path: '/demand', label: 'nav.demandForecast', icon: ICONS.trending },
      { path: '/reports', label: 'nav.reports', icon: ICONS.file }
    ]

    return { isCollapsed, toggle, t, navItems }
  }
}
</script>

<style scoped>
.sidebar-nav {
  display: flex;
  flex-direction: column;
  background: var(--surface);
  border-right: 1px solid var(--border);
  height: 100vh;
  position: sticky;
  top: 0;
  overflow: hidden;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-5) var(--space-4);
  border-bottom: 1px solid var(--border);
  min-height: 70px;
}

.logo h1 {
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.025em;
}

.logo .subtitle {
  display: block;
  font-size: var(--text-xs);
  color: var(--text-muted);
  margin-top: 2px;
}

.collapse-btn {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--surface);
  color: var(--text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition);
}

.collapse-btn:hover {
  background: var(--surface-hover);
  color: var(--text);
}

.collapse-btn svg {
  width: 14px;
  height: 14px;
}

.collapsed .collapse-btn svg {
  transform: rotate(180deg);
}

.nav-items {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  padding: var(--space-3);
  overflow-y: auto;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  color: var(--text-muted);
  text-decoration: none;
  font-size: var(--text-sm);
  font-weight: 500;
  transition: all var(--transition);
  position: relative;
}

.nav-item:hover {
  background: var(--surface-hover);
  color: var(--text);
}

.nav-item.router-link-exact-active {
  background: var(--accent-subtle);
  color: var(--accent);
}

.nav-item.router-link-exact-active::before {
  content: '';
  position: absolute;
  left: calc(-1 * var(--space-3));
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--accent);
  border-radius: 0 2px 2px 0;
}

.nav-icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  display: flex;
}

.nav-icon :deep(svg) {
  width: 100%;
  height: 100%;
}

.nav-label {
  white-space: nowrap;
  overflow: hidden;
}

.collapsed .nav-label {
  display: none;
}

.collapsed .nav-item {
  justify-content: center;
  padding: var(--space-2);
}

.sidebar-footer {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-4);
  border-top: 1px solid var(--border);
}

.collapsed .sidebar-header {
  justify-content: center;
}
</style>
