<script setup lang="ts">
import { ref } from 'vue'

type SidebarItem = {
  label: string
  icon: string
  subtitle?: string
  logo?: string
}

const activeItem = ref('Home')
const collapsed = ref(false)
const companySwitcher = ref<HTMLDetailsElement | null>(null)
const emit = defineEmits<{
  select: [label: string]
}>()

const platformItems: SidebarItem[] = [
  { label: 'Document', icon: '/icons/text-formatting/description.svg' },
  { label: 'Sales Transaction', icon: '/icons/custom/sales.svg' },
  { label: 'Purchase Transaction', icon: '/icons/custom/purchase.svg' },
]

const productItems: SidebarItem[] = [
  {
    label: 'Tax & Compliance',
    subtitle: 'by OnlinePajak',
    icon: '',
    logo: '/logo/logo-pajak-symbol-blue-20px.svg',
  },
  {
    label: 'Cash & Financing',
    subtitle: 'by Credor',
    icon: '',
    logo: '/logo/logo-credor-symbol-blue-24px.svg',
  },
  {
    label: 'Insights & Commerce',
    subtitle: 'by Covia',
    icon: '',
    logo: '/logo/logo-covia-symbol-blue-24px.svg',
  },
]

const footerItems: SidebarItem[] = [
  { label: 'Settings', icon: '/icons/ui-actions/settings.svg' },
  { label: 'Help & Support', icon: '/icons/communications/contact-support.svg' },
]

function selectItem(label: string) {
  activeItem.value = label
  emit('select', label)
}

function closeCompanySwitcher() {
  companySwitcher.value?.removeAttribute('open')
}
</script>

<template>
  <aside
    id="primary-navigation"
    class="sidebar"
    :class="{ 'sidebar--collapsed': collapsed }"
    :data-collapsed="collapsed"
    aria-label="Primary navigation"
  >
    <details ref="companySwitcher" class="sidebar__company-switcher" :class="{ 'sidebar__company-switcher--collapsed': collapsed }">
      <summary
        class="sidebar__company"
        :aria-label="collapsed ? 'PT Harapan Terakhir' : 'Switch company'"
        :title="collapsed ? 'PT Harapan Terakhir' : undefined"
      >
        <span class="sidebar__initials" aria-hidden="true">HT</span>
        <span v-if="!collapsed" class="sidebar__company-info">
          <span class="sidebar__company-name">PT Harapan Terakhir</span>
          <span class="sidebar__badge">Corporate</span>
          <span class="sidebar__company-id">092388209732087340000000</span>
        </span>
        <img
          v-if="!collapsed"
          class="sidebar__icon sidebar__company-chevron"
          src="/icons/ui-actions/expand-more.svg"
          alt=""
        />
      </summary>
      <div class="sidebar__company-menu" role="group" aria-label="Companies">
        <button class="sidebar__company-option" type="button" aria-current="true" @click="closeCompanySwitcher">
          PT Harapan Terakhir
        </button>
        <button class="sidebar__company-option" type="button" disabled>
          Switch company…
        </button>
      </div>
    </details>

    <nav class="sidebar__navigation" aria-label="Main menu">
      <button
        class="sidebar__item"
        :class="{ 'sidebar__item--active': activeItem === 'Home' }"
        type="button"
        :aria-label="collapsed ? 'Home' : undefined"
        :aria-current="activeItem === 'Home' ? 'page' : undefined"
        :title="collapsed ? 'Home' : undefined"
        @click="selectItem('Home')"
      >
        <img class="sidebar__icon" src="/icons/ui-actions/home.svg" alt="" />
        <span v-if="!collapsed" class="sidebar__item-label">Home</span>
      </button>

      <section class="sidebar__group" aria-label="Platform">
        <h2 v-if="!collapsed" class="sidebar__group-label">Platform</h2>
        <button
          v-for="item in platformItems"
          :key="item.label"
          class="sidebar__item"
          :class="{ 'sidebar__item--active': activeItem === item.label }"
          type="button"
          :aria-label="collapsed ? item.label : undefined"
          :aria-current="activeItem === item.label ? 'page' : undefined"
          :title="collapsed ? item.label : undefined"
          @click="selectItem(item.label)"
        >
          <img class="sidebar__icon" :src="item.icon" alt="" />
          <span v-if="!collapsed" class="sidebar__item-label">{{ item.label }}</span>
        </button>
      </section>

      <section class="sidebar__group" aria-label="Products">
        <h2 v-if="!collapsed" class="sidebar__group-label">Products</h2>
        <button
          v-for="item in productItems"
          :key="item.label"
          class="sidebar__item sidebar__product"
          :class="{ 'sidebar__item--active': activeItem === item.label }"
          type="button"
          :aria-label="collapsed ? item.label : undefined"
          :aria-current="activeItem === item.label ? 'page' : undefined"
          :title="collapsed ? item.label : undefined"
          @click="selectItem(item.label)"
        >
          <span class="sidebar__product-mark">
            <img :src="item.logo" alt="" />
          </span>
          <span v-if="!collapsed" class="sidebar__product-copy">
            <span class="sidebar__item-label">{{ item.label }}</span>
            <span class="sidebar__item-subtitle">{{ item.subtitle }}</span>
          </span>
        </button>
      </section>

      <button
        class="sidebar__item"
        :class="{ 'sidebar__item--active': activeItem === 'All Product' }"
        type="button"
        :aria-label="collapsed ? 'All Product' : undefined"
        :aria-current="activeItem === 'All Product' ? 'page' : undefined"
        :title="collapsed ? 'All Product' : undefined"
        @click="selectItem('All Product')"
      >
        <img class="sidebar__icon" src="/icons/ui-actions/apps.svg" alt="" />
        <span v-if="!collapsed" class="sidebar__item-label">All Product</span>
      </button>
    </nav>

    <nav class="sidebar__footer" aria-label="Settings and support">
      <button
        v-for="item in footerItems"
        :key="item.label"
        class="sidebar__item"
        :class="{ 'sidebar__item--active': activeItem === item.label }"
        type="button"
        :aria-label="collapsed ? item.label : undefined"
        :aria-current="activeItem === item.label ? 'page' : undefined"
        :title="collapsed ? item.label : undefined"
        @click="selectItem(item.label)"
      >
        <img class="sidebar__icon" :src="item.icon" alt="" />
        <span v-if="!collapsed" class="sidebar__item-label">{{ item.label }}</span>
        <img
          v-if="!collapsed"
          class="sidebar__icon sidebar__item-trailing"
          src="/icons/ui-actions/expand-less.svg"
          alt=""
        />
      </button>
      <button
        class="sidebar__item sidebar__collapse"
        type="button"
        :aria-label="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
        :title="collapsed ? 'Expand sidebar' : undefined"
        :aria-expanded="!collapsed"
        @click="collapsed = !collapsed"
      >
        <img
          class="sidebar__icon sidebar__collapse-icon"
          :class="{ 'sidebar__collapse-icon--rotated': collapsed }"
          src="/icons/ui-actions/chevron-left.svg"
          alt=""
        />
        <span v-if="!collapsed" class="sidebar__item-label">Collapse</span>
        <img
          v-if="!collapsed"
          class="sidebar__icon sidebar__item-trailing"
          src="/icons/ui-actions/expand-less.svg"
          alt=""
        />
      </button>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  box-sizing: border-box;
  display: flex;
  flex: 0 0 240px;
  flex-direction: column;
  gap: 16px;
  height: 100dvh;
  min-height: 480px;
  padding: 16px 8px;
  width: 240px;
  border-right: 1px solid var(--sidebar-border);
  background: var(--sidebar-background);
  color: var(--sidebar-item-text);
  transition: width 200ms ease-out, flex-basis 200ms ease-out;
}

.sidebar--collapsed {
  flex-basis: 62px;
  width: 62px;
}

.sidebar__company-switcher {
  position: relative;
  flex: 0 0 auto;
}

.sidebar__company {
  box-sizing: border-box;
  display: flex;
  min-height: 78px;
  align-items: flex-start;
  gap: 12px;
  padding: 8px;
  border: 1px solid var(--sidebar-profile-border);
  border-radius: 8px;
  background: var(--sidebar-profile-background);
  box-shadow: 0 1px 1px rgb(0 0 0 / 5%);
  cursor: pointer;
  list-style: none;
}

.sidebar__company::-webkit-details-marker {
  display: none;
}

.sidebar__company-switcher--collapsed .sidebar__company {
  width: 42px;
  min-height: 42px;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding: 4px;
}

.sidebar__initials {
  display: grid;
  width: 32px;
  height: 32px;
  flex: 0 0 32px;
  place-items: center;
  border-radius: 50%;
  background: var(--avatar-initials-background);
  color: var(--avatar-initials-text);
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
}

.sidebar__company-info,
.sidebar__product-copy {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
}

.sidebar__company-info {
  gap: 4px;
  justify-content: center;
}

.sidebar__company-name,
.sidebar__company-id,
.sidebar__item-label,
.sidebar__item-subtitle {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sidebar__company-name,
.sidebar__item-label {
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}

.sidebar__company-name {
  color: var(--sidebar-profile-text);
}

.sidebar__badge {
  align-self: flex-start;
  padding: 2px 8px;
  border-radius: 8px;
  background: var(--sidebar-badge-background);
  color: var(--sidebar-badge-text);
  font-size: 12px;
  font-weight: 500;
  line-height: 14px;
}

.sidebar__company-id {
  color: var(--sidebar-profile-secondary);
  font-size: 10px;
  font-weight: 500;
  line-height: 12px;
}

.sidebar__icon {
  display: block;
  width: 16px;
  height: 16px;
  flex: 0 0 16px;
}

.sidebar__company-chevron {
  margin-top: 4px;
}

.sidebar__company-menu {
  position: absolute;
  z-index: 2;
  top: calc(100% + 4px);
  left: 0;
  display: grid;
  width: 222px;
  gap: 2px;
  padding: 4px;
  border: 1px solid var(--sidebar-profile-border);
  border-radius: 8px;
  background: var(--sidebar-background);
  box-shadow: 0 4px 12px rgb(0 0 0 / 12%);
}

.sidebar__company-switcher--collapsed .sidebar__company-menu {
  top: 0;
  left: calc(100% + 4px);
}

.sidebar__company-option {
  padding: 8px;
  border: 0;
  border-radius: 4px;
  background: transparent;
  color: var(--sidebar-item-text);
  font: inherit;
  font-size: 14px;
  text-align: left;
}

.sidebar__company-option:not(:disabled) {
  cursor: pointer;
}

.sidebar__company-option:not(:disabled):hover,
.sidebar__company-option:not(:disabled):focus-visible {
  background: var(--sidebar-item-hover);
}

.sidebar__company-option:disabled {
  color: var(--sidebar-item-secondary);
  cursor: not-allowed;
}

.sidebar__navigation {
  display: flex;
  min-height: 0;
  flex: 1;
  flex-direction: column;
  gap: 16px;
  overflow-x: visible;
  overflow-y: auto;
  scrollbar-width: thin;
}

.sidebar__group {
  display: flex;
  flex-direction: column;
}

.sidebar__group-label {
  overflow: hidden;
  margin: 0;
  padding: 8px 12px;
  color: var(--sidebar-group-label-text);
  font-size: 10px;
  font-weight: 500;
  line-height: 12px;
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap;
}

.sidebar__item {
  position: relative;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  min-height: 34px;
  flex: 0 0 auto;
  align-items: center;
  gap: 8px;
  padding: 7px 8px 7px 12px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--sidebar-item-text);
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.sidebar__item:hover,
.sidebar__item:focus-visible {
  background: var(--sidebar-item-hover);
  outline: none;
}

.sidebar__item--active {
  background: var(--sidebar-item-active);
}

.sidebar__item--active:hover,
.sidebar__item--active:focus-visible {
  background: var(--sidebar-item-active);
}

.sidebar__item-label {
  min-width: 0;
  flex: 1;
}

.sidebar__product {
  min-height: 36px;
  padding-top: 6px;
  padding-bottom: 6px;
}

.sidebar__product-mark {
  display: grid;
  width: 24px;
  height: 24px;
  flex: 0 0 24px;
  place-items: center;
  overflow: hidden;
  border-radius: 8px;
  background: var(--avatar-logo-background);
}

.sidebar__product-mark img {
  display: block;
  width: 16px;
  height: 16px;
  object-fit: contain;
  filter: brightness(0) invert(1);
}

.sidebar__item-subtitle {
  color: var(--sidebar-item-secondary);
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
}

.sidebar__footer {
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
}

.sidebar__item-trailing {
  margin-left: auto;
}

.sidebar__collapse-icon {
  transition: transform 200ms ease-out;
}

.sidebar__collapse-icon--rotated {
  transform: rotate(180deg);
}

.sidebar--collapsed .sidebar__item {
  justify-content: center;
  padding: 7px;
}

@media (prefers-reduced-motion: reduce) {
  .sidebar,
  .sidebar__collapse-icon {
    transition: none;
  }
}
</style>