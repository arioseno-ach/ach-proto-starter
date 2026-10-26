<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Icon } from '@/components/ui/icon'
import {
  Sidebar as SidebarPrimitive,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'

type SidebarItem = {
  label: string
  icon: string
}

const activeItem = ref('Home')
const { state, isMobile, openMobile, toggleSidebar } = useSidebar()
const iconMode = computed(() => state.value === 'collapsed' && !isMobile.value)
// In the mobile sheet the toggle closes the sheet; on desktop it collapses to icons.
const collapsed = computed(() => !isMobile.value && state.value === 'collapsed')
const toggleLabel = computed(() => (isMobile.value ? 'Close sidebar' : collapsed.value ? 'Expand sidebar' : 'Collapse sidebar'))
const toggleExpanded = computed(() => (isMobile.value ? openMobile.value : !collapsed.value))

const platformItems: SidebarItem[] = [
  { label: 'Document', icon: 'text-formatting/description' },
  { label: 'Sales Transaction', icon: 'custom/e-faktur' },
  { label: 'Purchase Transaction', icon: 'business-payments/receipt-long' },
]

const footerItems: SidebarItem[] = [
  { label: 'Settings', icon: 'ui-actions/settings' },
  { label: 'Help & Support', icon: 'communications/contact-support' },
]

const emit = defineEmits<{
  select: [label: string]
}>()

function selectItem(label: string) {
  activeItem.value = label
  emit('select', label)
}

// Overrides on top of the ui/sidebar menu button: 34px row, 12px leading inset, active surface that survives hover.
const menuButtonClass =
  'h-8.5 min-h-8.5 gap-2 rounded-md py-1 pr-2 pl-3 text-sm text-default data-[active=true]:bg-surface-active data-[active=true]:hover:bg-surface-active group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:justify-center'

const menuItemClass =
  'cursor-pointer rounded-sm p-2 text-sm text-default focus:bg-surface-hover focus:text-default data-[disabled]:pointer-events-auto data-[disabled]:cursor-not-allowed data-[disabled]:text-secondary data-[disabled]:opacity-100'
</script>

<template>
  <SidebarPrimitive
    id="primary-navigation"
    class="border-sidebar-border"
    collapsible="icon"
    aria-label="Primary navigation"
  >
    <SidebarHeader class="gap-0 py-4">
      <DropdownMenu>
        <DropdownMenuTrigger
          class="flex min-h-19.5 w-full cursor-pointer items-start gap-3 rounded-md border border-default bg-surface p-2 text-left text-default shadow-xs group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:size-10 group-data-[collapsible=icon]:min-h-10 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-1"
          aria-label="Switch company"
        >
          <span
            class="grid size-8 shrink-0 place-items-center rounded-full bg-inverse text-sm font-medium text-inverse"
            aria-hidden="true"
          >
            HT
          </span>
          <span class="flex min-w-0 flex-1 flex-col justify-center gap-1 group-data-[collapsible=icon]:hidden">
            <span class="truncate text-sm font-normal">PT Harapan Terakhir</span>
            <span
              class="self-start rounded-md bg-surface-active px-2 py-1 text-xs font-medium text-default"
            >
              Corporate
            </span>
            <span class="truncate text-2xs leading-4 font-medium text-secondary">092388209732087340000000</span>
          </span>
          <Icon
            name="ui-actions/expand-more"
            class="mt-1 text-icon-default group-data-[collapsible=icon]:hidden"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          class="grid w-55.5 gap-1 border-default bg-surface shadow-md"
          :side="iconMode ? 'right' : 'bottom'"
          align="start"
          :side-offset="iconMode ? 8 : 4"
        >
          <DropdownMenuItem :class="menuItemClass" aria-current="true">
            PT Harapan Terakhir
          </DropdownMenuItem>
          <DropdownMenuItem :class="menuItemClass" disabled>
            Switch company…
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarHeader>

    <SidebarContent class="gap-2 px-2 [scrollbar-width:thin]">
      <nav class="flex flex-col gap-4" aria-label="Main menu">
        <SidebarMenu class="gap-0">
          <SidebarMenuItem>
            <SidebarMenuButton
              :class="menuButtonClass"
              :is-active="activeItem === 'Home'"
              aria-label="Home"
              :aria-current="activeItem === 'Home' ? 'page' : undefined"
              tooltip="Home"
              @click="selectItem('Home')"
            >
              <Icon name="ui-actions/home" class="text-icon-default" />
              <span class="group-data-[collapsible=icon]:hidden">Home</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarGroup class="gap-0 p-0">
          <SidebarGroupLabel as="h2" class="h-7 px-3 text-xs font-medium text-subtle uppercase">
            Platform
          </SidebarGroupLabel>
          <SidebarMenu class="gap-0">
            <SidebarMenuItem v-for="item in platformItems" :key="item.label">
              <SidebarMenuButton
                :class="menuButtonClass"
                :is-active="activeItem === item.label"
                :aria-label="item.label"
                :aria-current="activeItem === item.label ? 'page' : undefined"
                :tooltip="item.label"
                @click="selectItem(item.label)"
              >
                <Icon :name="item.icon" class="text-icon-default" />
                <span class="group-data-[collapsible=icon]:hidden">{{ item.label }}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarMenu class="gap-0">
          <SidebarMenuItem>
            <SidebarMenuButton
              :class="menuButtonClass"
              :is-active="activeItem === 'All Product'"
              aria-label="All Product"
              :aria-current="activeItem === 'All Product' ? 'page' : undefined"
              tooltip="All Product"
              @click="selectItem('All Product')"
            >
              <Icon name="ui-actions/apps" class="text-icon-default" />
              <span class="group-data-[collapsible=icon]:hidden">All Product</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </nav>
    </SidebarContent>

    <SidebarFooter class="gap-0 py-4">
      <SidebarMenu class="gap-0">
        <SidebarMenuItem v-for="item in footerItems" :key="item.label">
          <SidebarMenuButton
            :class="menuButtonClass"
            :is-active="activeItem === item.label"
            :aria-label="item.label"
            :aria-current="activeItem === item.label ? 'page' : undefined"
            :tooltip="item.label"
            @click="selectItem(item.label)"
          >
            <Icon :name="item.icon" class="text-icon-default" />
            <span class="group-data-[collapsible=icon]:hidden">{{ item.label }}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton
            :class="menuButtonClass"
            :aria-label="toggleLabel"
            :aria-expanded="toggleExpanded"
            :tooltip="toggleLabel"
            @click="toggleSidebar"
          >
            <Icon
              name="ui-actions/chevron-left"
              class="text-icon-default transition-transform duration-base ease-emphasized motion-reduce:transition-none"
              :class="{ 'rotate-180': collapsed }"
            />
            <span class="group-data-[collapsible=icon]:hidden">{{ isMobile ? 'Close' : collapsed ? 'Expand' : 'Collapse' }}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </SidebarPrimitive>
</template>
