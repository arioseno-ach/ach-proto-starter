<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import componentsDoc from '../../docs/design-system/components.md?raw'

// Count rows per Status value, reading the Status column by its header index.
function countByStatus(markdown: string): Record<string, number> {
  const counts: Record<string, number> = {}
  let statusIndex = -1
  for (const line of markdown.split('\n')) {
    if (!line.startsWith('|')) {
      statusIndex = -1
      continue
    }
    const cells = line.split('|').slice(1, -1).map((cell) => cell.trim())
    const headerIndex = cells.indexOf('Status')
    if (headerIndex !== -1) {
      statusIndex = headerIndex
      continue
    }
    if (statusIndex === -1 || cells.every((cell) => /^-+$/.test(cell))) continue
    const status = cells[statusIndex]?.match(/^[a-z]+/)?.[0]
    if (status) counts[status] = (counts[status] ?? 0) + 1
  }
  return counts
}

const counts = countByStatus(componentsDoc)
const achCount = counts.ach ?? 0
const upstreamCount = counts.upstream ?? 0

const prompt = [
  'Migrasi <Komponen> dari Figma: <link node Figma>',
  'Base: shadcn <name> | reka <Primitive> | custom',
  'Scope: <semua variant | ...>',
].join('\n')
</script>

<template>
  <div class="flex max-w-2xl flex-col gap-8">
    <header class="flex flex-col gap-2">
      <h1 class="text-2xl font-medium text-default">ACH Proto Starter</h1>
      <p class="text-secondary">
        Starter untuk prototipe ACH: shadcn-vue + reka-ui dengan token ACH.
      </p>
    </header>

    <ol class="flex flex-col gap-6">
      <li class="flex gap-4">
        <span class="w-4 shrink-0 text-subtle tabular-nums">1</span>
        <div class="flex flex-col items-start gap-1">
          <h2 class="font-medium text-default">Lihat komponen</h2>
          <p class="text-secondary">Semua komponen dengan varian dan state-nya.</p>
          <Button as-child variant="outline" class="mt-2">
            <RouterLink to="/playground">Buka playground</RouterLink>
          </Button>
        </div>
      </li>

      <li class="flex gap-4">
        <span class="w-4 shrink-0 text-subtle tabular-nums">2</span>
        <div class="flex min-w-0 flex-1 flex-col gap-1">
          <h2 class="font-medium text-default">Migrasi dari Figma</h2>
          <p class="text-secondary">Kirim prompt ini ke Claude:</p>
          <pre
            class="mt-2 overflow-x-auto rounded-md bg-surface-secondary p-3 font-mono text-sm text-default"
          ><code>{{ prompt }}</code></pre>
        </div>
      </li>

      <li class="flex gap-4">
        <span class="w-4 shrink-0 text-subtle tabular-nums">3</span>
        <div class="flex flex-col gap-1">
          <h2 class="font-medium text-default">Token dan utility</h2>
          <p class="text-secondary">
            Variable Figma dipetakan ke class Tailwind, lihat
            <code class="font-mono text-sm text-default">docs/design-system/tokens.md</code>.
          </p>
        </div>
      </li>
    </ol>

    <Separator />

    <p class="text-sm text-secondary">
      Komponen
      <span class="ml-2 text-default tabular-nums">
        {{ achCount }} ach · {{ upstreamCount }} upstream
      </span>
    </p>
  </div>
</template>
