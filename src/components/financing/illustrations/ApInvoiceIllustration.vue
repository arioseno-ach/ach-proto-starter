<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { credorTransactionTabs } from '@/components/credor/transactions'

// Mirrors the Purchases rows of the transactions list, so the card previews what the product shows.
const purchases = credorTransactionTabs.find((tab) => tab.id === 'purchases')
const purchaseRows = purchases?.rows.slice(0, 3) ?? []

// Two quieter rows above and below fill the card, so the highlighted row sits mid-list.
const topRow = {
  id: 'ap-ghost-top',
  counterparty: 'CV Mitra Baja',
  invoiceNumber: '#BILL-2026-0291',
  dueDate: '12 Nov',
  dueNote: '21 days left',
  overdue: false,
  amount: 48500000,
}
const bottomRow = {
  id: 'ap-ghost-bottom',
  counterparty: 'UD Tani Jaya',
  invoiceNumber: '#BILL-2026-0287',
  dueDate: '21 Nov',
  dueNote: '30 days left',
  overdue: false,
  amount: 21300000,
}
const rows = [topRow, ...purchaseRows, bottomRow]
const FEATURE_INDEX = 2

const formatAmount = (amount: number) => `Rp${amount.toLocaleString('id-ID')}`

const initials = (name: string) =>
  name
    .split(' ')
    .filter((word) => !/^(pt|cv|ud|tb|co)$/i.test(word))
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
</script>

<template>
  <div class="illustration illustration--ap">
    <div class="ap__zoom">
      <div class="ap__rows">
        <article
          v-for="(row, index) in rows"
          :key="row.id"
          class="ap__card"
          :class="{
            'ap__card--feature': index === FEATURE_INDEX,
            'ap__card--faded': index !== FEATURE_INDEX && index > 0 && index < rows.length - 1,
            'ap__card--ghost': index === 0 || index === rows.length - 1,
          }"
        >
          <Avatar :initials="initials(row.counterparty)" />

          <div class="ap__identity">
            <p class="ap__counterparty">{{ row.counterparty }}</p>
            <p class="ap__invoice">{{ row.invoiceNumber }}</p>
          </div>

          <div class="ap__due">
            <span class="ap__dot" :class="{ 'ap__dot--overdue': row.overdue }" aria-hidden="true"></span>
            <div>
              <p class="ap__due-note" :class="{ 'ap__due-note--overdue': row.overdue }">{{ row.dueNote }}</p>
              <p class="ap__due-date">{{ row.dueDate }}</p>
            </div>
          </div>

          <p class="ap__amount">{{ formatAmount(row.amount) }}</p>

          <Button variant="outline" color="neutral" size="small" type="button" tabindex="-1" class="ap__action">
            {{ purchases?.actionLabel }}
          </Button>
        </article>
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

/* Rows are laid out at the real list's size, then enlarged to fill the 720px stage. */
.ap__zoom {
  position: absolute;
  top: 6px;
  left: 22px;
  width: 520px;
  transform: scale(1.3);
  transform-origin: top left;
}

.ap__rows {
  display: flex;
  flex-direction: column;
}

.ap__card {
  display: grid;
  box-sizing: border-box;
  grid-template-columns: auto minmax(0, 1fr) 108px 100px 76px;
  align-items: center;
  gap: var(--primitives-padding-2);
  padding: var(--primitives-padding-4) var(--primitives-padding-3);
  border: var(--primitives-border-width-default) solid transparent;
}

.ap__card--faded {
  opacity: 0.5;
}

.ap__card--ghost {
  opacity: 0.22;
}

/* The one highlighted row: same anatomy, lifted onto its own bordered surface. */
.ap__card--feature {
  border-color: var(--semantic-border-ach-color-border-default);
  border-radius: var(--primitives-border-radius-lg);
  background: var(--semantic-bg-ach-color-bg-surface);
}

.ap__identity {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 2px;
}

.ap__counterparty,
.ap__invoice,
.ap__due-note,
.ap__due-date,
.ap__amount {
  margin: 0;
}

.ap__counterparty {
  overflow: hidden;
  font-size: var(--primitives-font-sizes-sm);
  font-weight: 500;
  line-height: var(--primitives-line-heights-sm);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ap__invoice,
.ap__due-date {
  color: var(--semantic-text-ach-color-text-secondary);
  font-size: var(--primitives-font-sizes-xs);
  line-height: var(--primitives-line-heights-2xs);
}

.ap__due {
  display: flex;
  align-items: flex-start;
  gap: var(--primitives-padding-2);
}

.ap__dot {
  width: 6px;
  height: 6px;
  flex: 0 0 6px;
  margin-top: 7px;
  border-radius: var(--primitives-border-radius-infinite);
  background: var(--semantic-text-ach-color-text-disabled);
}

.ap__dot--overdue {
  background: var(--semantic-fg-error-ach-color-fg-error);
}

.ap__due-note {
  font-size: var(--primitives-font-sizes-xs);
  font-weight: 500;
  line-height: var(--primitives-line-heights-sm);
  white-space: nowrap;
}

.ap__due-note--overdue {
  color: var(--semantic-text-error-ach-color-text-error);
}

.ap__amount {
  font-size: var(--primitives-font-sizes-xs);
  font-weight: 500;
  line-height: var(--primitives-line-heights-sm);
  font-variant-numeric: tabular-nums;
  text-align: right;
  white-space: nowrap;
}

.ap__action {
  width: 100%;
  background: transparent;
}
</style>
