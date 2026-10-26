<script setup lang="ts">
import { computed } from 'vue'
import { cva } from 'class-variance-authority'
import { Icon } from '@/components/ui/icon'

type Breakpoint = 'Web' | 'Tab' | 'Mobile'

const props = withDefaults(
  defineProps<{
    actionTrail?: boolean
    bordered?: boolean
    breakpoint?: Breakpoint
    menuExpanded?: boolean
    showLogo?: boolean
  }>(),
  {
    actionTrail: false,
    bordered: false,
    breakpoint: 'Web',
    menuExpanded: false,
    showLogo: false,
  },
)

const emit = defineEmits<{
  cartClick: []
  menuClick: []
}>()

// Below the xs breakpoint (<=600px, same as the sidebar mobile switch) every breakpoint behaves like Mobile, whatever the prop says.
const logoVariants = cva('flex-none', {
  variants: {
    breakpoint: {
      Web: 'block max-xs:hidden',
      Tab: 'block max-xs:hidden',
      Mobile: 'hidden',
    },
  },
})

const menuVariants = cva(
  'size-(--semantic-topbar-icon-size) shrink-0 cursor-pointer items-center justify-center p-0 text-icon-default focus-visible:rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
  {
    variants: {
      breakpoint: {
        Web: 'hidden max-xs:flex',
        Tab: 'hidden max-xs:flex',
        Mobile: 'flex',
      },
    },
  },
)

const dividerVariants = cva('absolute bottom-0 h-px bg-(--component-divider-default)', {
  variants: {
    breakpoint: {
      Web: 'inset-x-(--semantic-topbar-divider-inset) max-xs:inset-x-0',
      Tab: 'inset-x-0',
      Mobile: 'inset-x-0',
    },
  },
})

const logoClass = computed(() => logoVariants({ breakpoint: props.breakpoint }))
const menuClass = computed(() => menuVariants({ breakpoint: props.breakpoint }))
const dividerClass = computed(() => dividerVariants({ breakpoint: props.breakpoint }))
</script>

<template>
  <header
    class="relative h-(--semantic-topbar-height) w-full shrink-0 bg-surface font-sans text-default"
    :data-breakpoint="breakpoint.toLowerCase()"
  >
    <div
      class="flex h-full w-full items-center gap-(--semantic-topbar-gap) px-(--semantic-topbar-padding-inline)"
    >
      <img
        v-if="showLogo"
        :class="logoClass"
        src="/logo/logo-achilles-wordmark-black-24px.svg"
        alt="Achilles"
      />

      <button
        :class="menuClass"
        type="button"
        :aria-label="menuExpanded ? 'Close navigation menu' : 'Open navigation menu'"
        aria-controls="primary-navigation"
        :aria-expanded="menuExpanded"
        @click="emit('menuClick')"
      >
        <Icon name="ui-actions/menu" class="size-6" />
      </button>

      <span class="min-w-0 flex-1" aria-hidden="true"></span>

      <div v-if="actionTrail" class="flex flex-none items-center justify-end">
        <slot name="action-trail">
          <button
            class="grid size-(--semantic-topbar-action-size) shrink-0 cursor-pointer place-items-center rounded-full bg-surface p-0 text-icon-default hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            type="button"
            aria-label="Shopping cart"
            @click="emit('cartClick')"
          >
            <Icon name="business-payments/shopping-cart" class="size-(--semantic-topbar-action-icon-size)" />
          </button>
        </slot>
      </div>

      <div
        class="flex flex-none items-center gap-(--semantic-topbar-account-gap)"
        role="group"
        aria-label="Account"
      >
        <span
          class="grid size-(--semantic-topbar-avatar-size) shrink-0 place-items-center rounded-full bg-inverse text-sm leading-(--semantic-topbar-line-height) font-medium text-inverse"
          aria-hidden="true"
          >C</span
        >
        <span class="text-sm leading-(--semantic-topbar-line-height) font-medium whitespace-nowrap text-default"
          >CGI</span
        >
        <Icon name="hardware/keyboard-arrow-down" class="size-6 text-icon-default" />
      </div>
    </div>

    <div v-if="bordered" :class="dividerClass" aria-hidden="true"></div>
  </header>
</template>
