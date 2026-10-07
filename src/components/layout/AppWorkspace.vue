<script setup lang="ts">
import { computed } from 'vue'
import { SidebarInset, useSidebar } from '@/components/ui/sidebar'
import AccordionShowcase from '@/examples/AccordionShowcase.vue'
import ControlsShowcase from '@/examples/ControlsShowcase.vue'
import Sidebar from '@/components/layout/Sidebar.vue'
import TopBar from '@/components/layout/TopBar.vue'

const { isMobile, openMobile, setOpenMobile, toggleSidebar } = useSidebar()
const mobileNavOpen = computed(() => isMobile.value && openMobile.value)

function closeMobileNav() {
  if (isMobile.value) setOpenMobile(false)
}
</script>

<template>
  <div class="app-shell">
    <Sidebar @select="closeMobileNav" />
    <SidebarInset class="app-workspace">
      <TopBar :menu-expanded="mobileNavOpen" @menu-click="toggleSidebar" />
      <div class="app-content" aria-label="Component showcase">
        <AccordionShowcase />
        <ControlsShowcase />
      </div>
    </SidebarInset>
  </div>
</template>

<style scoped>
.app-shell {
  display: flex;
  width: 100%;
  min-height: 100vh;
}

.app-workspace {
  min-width: 0;
  min-height: 100vh;
  flex: 1;
  flex-direction: column;
}

.app-content {
  box-sizing: border-box;
  display: grid;
  min-height: 0;
  flex: 1;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 528px), 1fr));
  align-content: start;
  gap: var(--primitives-padding-8);
  padding: var(--primitives-padding-6);
}

@media (max-width: 600px) {
  .app-content {
    grid-template-columns: minmax(0, 1fr);
    gap: var(--primitives-padding-6);
    padding: var(--primitives-padding-4);
  }
}
</style>
