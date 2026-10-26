<script setup lang="ts">
import { computed, ref } from "vue"
import { Slider } from "@/components/ui/slider"
import { useShareLink } from "@/composables/useShareLink"
import { useSegmentedIndicator } from "@/composables/useSegmentedIndicator"
import LoanCalculatorItemList from "@/components/financing/LoanCalculatorItemList.vue"
import type { CredorFinancingItem } from "@/components/credor/financing-items"
import {
  defaultLoanAmount,
  formatNumber,
  formatRupiah,
  loanAmountRange,
  loanRateRange,
  loanTerms,
} from "@/lib/loan-calculator"

export type CalculatorTab = "amount" | "invoice" | "purchase"

const props = defineProps<{
  amount: number
  term: number
  rate: number
  tab: CalculatorTab
  invoices: CredorFinancingItem[]
  purchases: CredorFinancingItem[]
  selectedItemId: string | null
}>()

const emit = defineEmits<{
  (e: "update:amount", payload: number): void
  (e: "update:term", payload: number): void
  (e: "update:rate", payload: number): void
  (e: "update:tab", payload: CalculatorTab): void
  (e: "select-item", payload: CredorFinancingItem): void
}>()

const tabs: { id: CalculatorTab; label: string }[] = [
  { id: "amount", label: "Enter Amount" },
  { id: "invoice", label: "Invoice" },
  { id: "purchase", label: "Purchase" },
]

const { share } = useShareLink()

const tablist = ref<HTMLElement | null>(null)
const { indicatorStyle, ready } = useSegmentedIndicator(tablist, () => props.tab)

const amountValue = computed(() => formatNumber(props.amount))

const activeItems = computed(() =>
  props.tab === "purchase" ? props.purchases : props.invoices,
)

const emptyCopy = computed(() =>
  props.tab === "purchase"
    ? {
        title: "No purchase selected yet",
        description: "Pick a purchase from Purchase Transaction to simulate the financing.",
        action: "Open Purchase Transaction",
        numberLabel: "Purchase",
      }
    : {
        title: "No invoice selected yet",
        description: "Pick an invoice from Sales Transaction to simulate the financing.",
        action: "Open Sales Transaction",
        numberLabel: "Invoice",
      },
)

function onAmountInput(event: Event) {
  const digits = (event.target as HTMLInputElement).value.replace(/\D/g, "")
  const next = Number(digits)
  emit("update:amount", Number.isFinite(next) && next > 0 ? next : defaultLoanAmount)
}

function onRateInput(event: Event) {
  const next = Number((event.target as HTMLInputElement).value)
  emit("update:rate", Number.isFinite(next) ? next : loanRateRange.min)
}
</script>

<template>
  <div class="calculator-form">
    <div class="calculator-form__top">
      <p class="calculator-form__label">Enter transaction amount</p>

      <div ref="tablist" class="calculator-form__tabs" role="tablist" aria-label="Amount source">
        <span
          class="calculator-form__tab-indicator"
          :class="{ 'calculator-form__tab-indicator--animated': ready }"
          aria-hidden="true"
          :style="indicatorStyle"
        ></span>
        <button
          v-for="item in tabs"
          :key="item.id"
          type="button"
          role="tab"
          class="calculator-form__tab"
          :class="{ 'calculator-form__tab--active': item.id === props.tab }"
          :aria-selected="item.id === props.tab"
          @click="emit('update:tab', item.id)"
        >
          {{ item.label }}
        </button>
      </div>
    </div>

    <Transition name="calculator-panel" mode="out-in">
    <div v-if="props.tab === 'amount'" key="amount" class="calculator-form__panel">
      <div class="calculator-form__value">
        <input
          class="calculator-form__value-input"
          :value="amountValue"
          inputmode="numeric"
          aria-label="Transaction amount in rupiah"
          @input="onAmountInput"
        >
        <span class="calculator-form__value-suffix">Rp</span>
      </div>

      <Slider
        :model-value="props.amount"
        :min="loanAmountRange.min"
        :max="loanAmountRange.max"
        :step="loanAmountRange.step"
        aria-label="Transaction amount"
        @update:model-value="emit('update:amount', $event)"
      />

      <div class="calculator-form__range">
        <span>{{ formatRupiah(loanAmountRange.min) }}</span>
        <span>{{ formatRupiah(loanAmountRange.max) }}</span>
      </div>
    </div>

    <div v-else key="list" class="calculator-form__list">
      <LoanCalculatorItemList
        :items="activeItems"
        :selected-id="props.selectedItemId"
        :number-label="emptyCopy.numberLabel"
        :empty-title="emptyCopy.title"
        :empty-description="emptyCopy.description"
        :empty-action="emptyCopy.action"
        @select="emit('select-item', $event)"
      />
    </div>
    </Transition>

    <hr class="calculator-form__divider">

    <div class="calculator-form__field">
      <p class="calculator-form__label">
        Repayment term
        <span class="calculator-form__hint" aria-hidden="true">
          <img src="/icons/hardware/perm-device-information.svg" alt="" />
        </span>
      </p>

      <div class="calculator-form__chips">
        <button
          v-for="item in loanTerms"
          :key="item"
          type="button"
          class="calculator-form__chip"
          :class="{ 'calculator-form__chip--active': item === props.term }"
          :aria-pressed="item === props.term"
          @click="emit('update:term', item)"
        >
          {{ item }} days
        </button>
      </div>
    </div>

    <hr class="calculator-form__divider">

    <div class="calculator-form__field">
      <p class="calculator-form__label">
        Interest rate (% / month)
        <span class="calculator-form__hint" aria-hidden="true">
          <img src="/icons/hardware/perm-device-information.svg" alt="" />
        </span>
      </p>

      <div class="calculator-form__value calculator-form__value--small">
        <input
          class="calculator-form__value-input calculator-form__value-input--small"
          :value="props.rate"
          inputmode="numeric"
          aria-label="Interest rate per month"
          @input="onRateInput"
        >
        <span class="calculator-form__value-suffix">% / month</span>
      </div>

      <Slider
        :model-value="props.rate"
        :min="loanRateRange.min"
        :max="loanRateRange.max"
        :step="loanRateRange.step"
        aria-label="Interest rate"
        @update:model-value="emit('update:rate', $event)"
      />

      <div class="calculator-form__range">
        <span>{{ loanRateRange.min }}</span>
        <span>{{ loanRateRange.max }}</span>
      </div>
    </div>

    <div class="calculator-form__help">
      <p class="calculator-form__help-title">Need help getting started?</p>
      <div class="calculator-form__help-actions">
        <button type="button" class="calculator-form__help-button">
          <span class="calculator-form__help-icon calculator-form__help-icon--support" aria-hidden="true"></span>
          Contact an expert
        </button>
        <button type="button" class="calculator-form__help-button" @click="share">
          <span class="calculator-form__help-icon calculator-form__help-icon--share" aria-hidden="true"></span>
          Share this page
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calculator-form {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: var(--primitives-padding-3);
  padding: var(--primitives-padding-5) var(--primitives-padding-6);
}

.calculator-form__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--primitives-padding-3);
}

.calculator-form__label {
  display: inline-flex;
  align-items: center;
  gap: var(--primitives-padding-1);
  margin: 0;
  color: var(--semantic-text-ach-color-text-secondary);
  font-size: var(--primitives-font-sizes-sm);
  font-weight: 400;
  line-height: var(--primitives-line-heights-sm);
}

.calculator-form__hint img {
  display: block;
  width: 14px;
  height: 14px;
  filter: invert(38%) sepia(6%) saturate(600%) hue-rotate(180deg) brightness(92%);
}

.calculator-form__tabs {
  position: relative;
  display: inline-flex;
  flex: 0 0 auto;
  padding: var(--primitives-padding-1);
  border-radius: var(--primitives-border-radius-md);
  background: var(--semantic-bg-ach-color-bg-surface-secondary);
}

.calculator-form__tab {
  position: relative;
  z-index: 1;
  min-height: 28px;
  padding: 0 var(--primitives-padding-2);
  border: 0;
  border-radius: var(--primitives-border-radius-sm);
  background: none;
  color: var(--component-tabs-line-item-text-inactive);
  cursor: pointer;
  font-family: inherit;
  font-size: var(--primitives-font-sizes-sm);
  font-weight: 500;
  line-height: var(--primitives-line-heights-xs);
  white-space: nowrap;
}

.calculator-form__tab--active {
  color: var(--component-tabs-segmented-item-text);
}

.calculator-form__tab-indicator {
  position: absolute;
  top: var(--primitives-padding-1);
  bottom: var(--primitives-padding-1);
  left: 0;
  border-radius: var(--primitives-border-radius-sm);
  background: var(--component-tabs-segmented-item-background-active);
  box-shadow:
    calc(var(--primitives-shadows-sm-shadow-1-x) * 1px)
      calc(var(--primitives-shadows-sm-shadow-1-y) * 1px)
      calc(var(--primitives-shadows-sm-shadow-1-blur) * 1px)
      var(--primitives-shadows-sm-color),
    calc(var(--primitives-shadows-sm-shadow-2-x) * 1px)
      calc(var(--primitives-shadows-sm-shadow-2-y) * 1px)
      calc(var(--primitives-shadows-sm-shadow-2-blur) * 1px)
      var(--primitives-shadows-sm-color);
  pointer-events: none;
}

.calculator-form__tab-indicator--animated {
  transition:
    transform var(--component-tabs-indicator-duration) var(--component-tabs-indicator-easing),
    width var(--component-tabs-indicator-duration) var(--component-tabs-indicator-easing);
}

@media (prefers-reduced-motion: reduce) {
  .calculator-form__tab-indicator--animated {
    transition: none;
  }
}

.calculator-form__panel {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: var(--primitives-padding-3);
}

.calculator-panel-enter-active {
  transition:
    opacity var(--component-tabs-panel-enter-duration) var(--component-tabs-indicator-easing),
    transform var(--component-tabs-panel-enter-duration) var(--component-tabs-indicator-easing);
}

.calculator-panel-leave-active {
  transition: opacity var(--component-tabs-panel-exit-duration) var(--component-tabs-panel-exit-easing);
}

.calculator-panel-enter-from {
  opacity: 0;
  transform: translateY(4px);
}

.calculator-panel-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .calculator-panel-enter-active,
  .calculator-panel-leave-active {
    transition: none;
  }
}

.calculator-form__value {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--primitives-padding-3);
}

.calculator-form__value-input {
  width: 100%;
  min-width: 0;
  padding: 0;
  border: 0;
  background: none;
  color: var(--semantic-text-ach-color-text-default);
  font-family: var(--primitives-font-families-display), sans-serif;
  font-size: var(--primitives-font-sizes-4xl);
  font-weight: 500;
  line-height: var(--primitives-line-heights-4xl);
  font-variant-numeric: tabular-nums;
}

.calculator-form__value-input:focus {
  outline: none;
}

.calculator-form__value-input--small {
  font-size: var(--primitives-font-sizes-3xl);
  line-height: var(--primitives-line-heights-3xl);
}

.calculator-form__value-suffix {
  flex: 0 0 auto;
  color: var(--semantic-text-ach-color-text-secondary);
  font-size: var(--primitives-font-sizes-xs);
  line-height: var(--primitives-line-heights-2xs);
}

.calculator-form__range {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: calc(-1 * var(--primitives-padding-2));
  color: var(--semantic-text-ach-color-text-subtle);
  font-size: var(--primitives-font-sizes-xs);
  line-height: var(--primitives-line-heights-2xs);
}

.calculator-form__divider {
  height: 1px;
  margin: var(--primitives-padding-2) 0;
  border: 0;
  background: var(--semantic-border-ach-color-border-default);
}

.calculator-form__field {
  display: flex;
  flex-direction: column;
  gap: var(--primitives-padding-2);
}

.calculator-form__chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--primitives-padding-2);
}

.calculator-form__chip {
  min-height: 32px;
  padding: 0 var(--primitives-padding-4);
  border: var(--primitives-border-width-default) solid
    var(--semantic-border-ach-color-border-default);
  border-radius: var(--primitives-border-radius-infinite);
  background: none;
  color: var(--semantic-text-ach-color-text-default);
  cursor: pointer;
  font-family: inherit;
  font-size: var(--primitives-font-sizes-sm);
  font-weight: 500;
  line-height: var(--primitives-line-heights-xs);
}

.calculator-form__chip--active {
  border-color: var(--semantic-brand-ach-color-brand-default);
  color: var(--semantic-brand-ach-color-brand-default);
}

.calculator-form__chip:focus-visible,
.calculator-form__tab:focus-visible,
.calculator-form__help-button:focus-visible,
.calculator-form__empty-action:focus-visible {
  outline: var(--primitives-border-width-2) solid var(--semantic-text-ach-color-text-link);
  outline-offset: var(--primitives-border-width-2);
}

.calculator-form__help {
  display: flex;
  flex-direction: column;
  gap: var(--primitives-padding-3);
  margin-top: var(--primitives-padding-2);
}

.calculator-form__help-title {
  margin: 0;
  color: var(--semantic-text-ach-color-text-default);
  font-size: var(--primitives-font-sizes-sm);
  font-weight: 500;
  line-height: var(--primitives-line-heights-sm);
}

.calculator-form__help-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--primitives-padding-2);
}

.calculator-form__help-button {
  display: inline-flex;
  min-height: 32px;
  align-items: center;
  gap: var(--primitives-padding-2);
  padding: 0 var(--primitives-padding-4);
  border: var(--primitives-border-width-default) solid
    var(--semantic-border-ach-color-border-default);
  border-radius: var(--primitives-border-radius-infinite);
  background: none;
  color: var(--semantic-text-ach-color-text-default);
  cursor: pointer;
  font-family: inherit;
  font-size: var(--primitives-font-sizes-sm);
  font-weight: 500;
  line-height: var(--primitives-line-heights-xs);
}

.calculator-form__help-icon {
  width: 16px;
  height: 16px;
  flex: 0 0 16px;
  background: var(--semantic-text-ach-color-text-default);
}

.calculator-form__help-icon--support {
  mask: url('/icons/social/support-agent.svg') center / contain no-repeat;
  -webkit-mask: url('/icons/social/support-agent.svg') center / contain no-repeat;
}

.calculator-form__help-icon--share {
  mask: url('/icons/others/share-reviews.svg') center / contain no-repeat;
  -webkit-mask: url('/icons/others/share-reviews.svg') center / contain no-repeat;
}

.calculator-form__list {
  width: 100%;
}

.calculator-form__empty {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--primitives-padding-2);
  padding-block: var(--primitives-padding-6);
}

.calculator-form__empty-title {
  margin: 0;
  color: var(--semantic-text-ach-color-text-default);
  font-size: var(--primitives-font-sizes-sm);
  font-weight: 500;
  line-height: var(--primitives-line-heights-sm);
}

.calculator-form__empty-description {
  margin: 0;
  color: var(--semantic-text-ach-color-text-secondary);
  font-size: var(--primitives-font-sizes-xs);
  line-height: var(--primitives-line-heights-2xs);
}

.calculator-form__empty-action {
  min-height: 32px;
  margin-top: var(--primitives-padding-2);
  padding: 0 var(--primitives-padding-4);
  border: 0;
  border-radius: var(--primitives-border-radius-infinite);
  background: var(--semantic-text-ach-color-text-default);
  color: var(--semantic-text-ach-color-text-inverse);
  cursor: pointer;
  font-family: inherit;
  font-size: var(--primitives-font-sizes-xs);
  font-weight: 500;
  line-height: var(--primitives-line-heights-3xs);
}
</style>
