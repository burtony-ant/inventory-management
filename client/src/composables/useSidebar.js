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
