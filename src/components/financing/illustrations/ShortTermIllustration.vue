<script setup lang="ts">
import { buildQuotes, formatRupiah } from '@/lib/loan-calculator'

// Mirrors the Loan Simulation result: total repayment, the cost breakdown and a term comparison.
const AMOUNT = 10_000_000
const RATE = 1
const TERM = 30

const quotes = buildQuotes(AMOUNT, RATE).filter((quote) => [30, 60, 90].includes(quote.term))
const selected = quotes.find((quote) => quote.term === TERM) ?? quotes[0]
</script>

<template>
  <div class="illustration illustration--short-term">
    <div class="stt__zoom">
      <div class="stt__panel">
        <div class="stt__feature">
          <p class="stt__caption">Total repayment for a {{ TERM }}-day term</p>
          <p class="stt__total">{{ formatRupiah(selected.total) }}</p>

          <dl class="stt__stats">
            <div class="stt__stat">
              <dt>Transaction amount</dt>
              <dd>{{ formatRupiah(AMOUNT) }}</dd>
            </div>
            <div class="stt__stat">
              <dt>Interest</dt>
              <dd>{{ formatRupiah(selected.interest) }}</dd>
            </div>
            <div class="stt__stat">
              <dt>Rate</dt>
              <dd>{{ RATE }}% / month</dd>
            </div>
          </dl>
        </div>

        <ul class="stt__quotes">
          <li
            v-for="quote in quotes"
            :key="quote.term"
            class="stt__quote"
            :class="{ 'stt__quote--active': quote.term === TERM }"
          >
            <span class="stt__quote-term">{{ quote.term }} days</span>
            <span class="stt__quote-value">{{ formatRupiah(quote.total) }}</span>
            <span class="stt__quote-bar">
              <span class="stt__quote-fill" :style="{ width: `${Math.max(8, quote.fillRatio * 100)}%` }"></span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.illustration {
  position: absolute;
  top: 0;
  left: 0;
  width: 720px;
  height: 480px;
  color: var(--semantic-text-ach-color-text-default);
  font-family: var(--primitives-font-families-body), sans-serif;
  pointer-events: none;
}

/* Laid out at the real summary's size, then enlarged so it bleeds off the right and bottom edges. */
.stt__zoom {
  position: absolute;
  top: 28px;
  left: 36px;
  width: 560px;
  transform: scale(1.45);
  transform-origin: top left;
}

.stt__panel {
  box-sizing: border-box;
  padding: var(--primitives-padding-3);
  border: var(--primitives-border-width-default) solid var(--semantic-border-ach-color-border-default);
  border-radius: var(--primitives-border-radius-lg);
  background: var(--semantic-bg-ach-color-bg-surface);
}

/* The highlighted block: a soft brand tint with the figure in brand colour, so it leads without shouting. */
.stt__feature {
  padding: var(--primitives-padding-5) var(--primitives-padding-4) var(--primitives-padding-4);
  border-radius: var(--primitives-border-radius-md);
  background: var(--semantic-brand-ach-color-brand-subtle);
  color: var(--semantic-text-ach-color-text-default);
}

.stt__caption {
  margin: 0;
  color: var(--semantic-text-ach-color-text-secondary);
  font-size: var(--primitives-font-sizes-xs);
  line-height: var(--primitives-line-heights-2xs);
}

.stt__total {
  margin: var(--primitives-padding-2) 0 var(--primitives-padding-4);
  font-family: var(--primitives-font-families-display), sans-serif;
  font-size: var(--primitives-font-sizes-4xl);
  font-weight: 700;
  line-height: var(--primitives-line-heights-4xl);
  font-variant-numeric: tabular-nums;
}

.stt__stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--primitives-padding-2);
  margin: 0;
}

.stt__stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: var(--primitives-padding-2) var(--primitives-padding-3);
  border-radius: var(--primitives-border-radius-sm);
  background: var(--semantic-bg-ach-color-bg-surface);
}

.stt__stat dt {
  color: var(--semantic-text-ach-color-text-secondary);
  font-size: var(--primitives-font-sizes-xs);
  line-height: var(--primitives-line-heights-2xs);
}

.stt__stat dd {
  margin: 0;
  font-size: var(--primitives-font-sizes-sm);
  font-weight: 500;
  line-height: var(--primitives-line-heights-sm);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.stt__quotes {
  display: flex;
  flex-direction: column;
  gap: var(--primitives-padding-1);
  margin: var(--primitives-padding-3) 0 0;
  padding: 0;
  list-style: none;
}

.stt__quote:not(.stt__quote--active) {
  opacity: 0.5;
}

.stt__quote {
  display: grid;
  grid-template-columns: 64px 96px minmax(0, 1fr);
  align-items: center;
  gap: var(--primitives-padding-3);
  padding: var(--primitives-padding-2) var(--primitives-padding-3);
  border: var(--primitives-border-width-default) solid transparent;
  border-radius: var(--primitives-border-radius-sm);
}

.stt__quote--active {
  border-color: var(--semantic-border-ach-color-border-default);
  background: var(--semantic-brand-ach-color-brand-subtle);
}

.stt__quote-term,
.stt__quote-value {
  font-size: var(--primitives-font-sizes-sm);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.stt__quote-bar {
  display: block;
  height: 6px;
  overflow: hidden;
  border-radius: var(--primitives-border-radius-infinite);
  background: var(--primitives-colors-neutral-200);
}

.stt__quote-fill {
  display: block;
  height: 100%;
  border-radius: var(--primitives-border-radius-infinite);
  background: var(--semantic-brand-ach-color-brand-default);
}
</style>
