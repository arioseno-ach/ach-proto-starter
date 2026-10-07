<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from '@/components/layout/Sidebar.vue'
import TopBar from '@/components/layout/TopBar.vue'
import AccordionShowcase from '@/examples/AccordionShowcase.vue'

const mobileNavOpen = ref(false)

function closeMobileNav() {
  mobileNavOpen.value = false
}
</script>

<template>
  <div
    class="app-shell"
    :class="{ 'app-shell--mobile-nav-open': mobileNavOpen }"
    @keydown.esc="closeMobileNav"
  >
    <div class="app-sidebar">
      <Sidebar id="primary-navigation" @select="closeMobileNav" />
    </div>
    <button
      v-if="mobileNavOpen"
      class="app-nav-backdrop"
      type="button"
      aria-label="Close navigation menu"
      @click="closeMobileNav"
    ></button>
    <div class="app-workspace">
      <TopBar :menu-expanded="mobileNavOpen" @menu-click="mobileNavOpen = !mobileNavOpen" />
      <main class="app-content" aria-label="Workspace">
        <AccordionShowcase />
      </main>
    </div>
  </div>
</template>

<style scoped>
.app-shell {
  display: flex;
  min-height: 100vh;
  background: var(--semantic-bg-ach-color-bg-surface);
}

.app-workspace {
  display: flex;
  min-height: 100vh;
  min-width: 0;
  flex: 1;
  flex-direction: column;
}

.app-sidebar {
  display: flex;
  flex: 0 0 auto;
}

.app-nav-backdrop {
  display: none;
}

.app-content {
  box-sizing: border-box;
  display: flex;
  min-height: 0;
  flex: 1;
  justify-content: center;
  padding: var(--primitives-padding-6);
}

@media (max-width: 600px) {
  .app-content {
    padding: var(--primitives-padding-4);
  }
}

@media (max-width: 600px) {
  .app-sidebar {
    display: none;
  }

  .app-shell--mobile-nav-open .app-sidebar {
    position: fixed;
    z-index: 21;
    inset: 0 auto 0 0;
    display: block;
  }

  .app-nav-backdrop {
    position: fixed;
    z-index: 20;
    inset: 0;
    display: block;
    border: 0;
    background: color-mix(in srgb, var(--semantic-bg-ach-color-bg-inverse) 40%, transparent);
  }
}
</style>