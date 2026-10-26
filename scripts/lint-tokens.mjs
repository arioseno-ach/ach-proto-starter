import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'

const roots = ['src']
const files = []

async function collect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filePath = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      await collect(filePath)
    } else if (entry.isFile() && /\.(vue|ts|css)$/.test(filePath)) {
      if (filePath === path.join('src', 'styles', 'tokens', 'primitives.css')) continue
      files.push(filePath)
    }
  }
}

for (const root of roots) await collect(root)

const rawColorPattern = /#(?:[\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})\b|\b(?:rgb|rgba|hsl|hsla)\s*\(/gi
// Only Tailwind palette names trigger, so ACH utilities (shadow-xs, outline-brand, text-secondary) pass.
const paletteClassPattern = /(?<=^|[\s"'`:!])(?:bg|text|border-[trblxyse]|border|ring-offset|ring|outline|fill|stroke|decoration|shadow|divide|from|via|to|accent|placeholder|caret)-(?:black|white|slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)(?:-(?:50|[1-9]00|950))?(?:\/\d{1,3})?(?=$|[\s"'`!])/g
// Arbitrary-property one-offs such as `[margin:13px]`.
const arbitraryPropertyPxPattern = /\[[a-z-]+:-?\d+(?:\.\d+)?px\]/g
const arbitraryClassPattern = /\b[\w:-]+-\[[^\]\s]+\]/g

// These values implement the existing 600px mobile breakpoint and shadcn Sidebar layout math.
const allowedLayoutClasses = new Set([
  'min-[601px]',
  'transition-[width]',
  'transition-[width,height,padding]',
  'transition-[left,right,width]',
  'transition-[margin,opacity]',
  'w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]',
  'w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]',
  'left-[calc(var(--sidebar-width)*-1)]',
  'right-[calc(var(--sidebar-width)*-1)]',
])
// Variant-style prefixes whose bracket value is a selector or condition, not a design value.
// Matches the last segment before `-[`, e.g. `has`, `group-data`, `group-has-data`.
const selectorVariantPattern = /(?:^|-)(?:has|aria|data|supports|not)$/

// Arbitrary values stay on the token system when they are a lone `var(--x)` / `--spacing(n)`, or a calc()
// built only from those, percentages, unitless numbers and operators. Any unit (`13px`) is rejected.
const lonelyVariablePattern = /^\[(?:var\(--[\w-]+\)|--spacing\((?:[\d.]+|var\(--[\w-]+\))\))\]$/
const calcPattern = /^\[calc\((.+)\)\]$/
function isTokenCalc(value) {
  const match = calcPattern.exec(value)
  if (!match) return false
  const rest = match[1]
    .replace(/var\(--[\w-]+\)/g, '')
    .replace(/--spacing\((?:[\d.]+|var\(--[\w-]+\))\)/g, '')
    .replace(/\d+(?:\.\d+)?%?/g, '')
    .replace(/[\s+\-*/()]/g, '')
  return rest === '' && /var\(--|--spacing\(/.test(match[1])
}
// Centering offsets for absolutely positioned overlays (`top-[50%]`, `translate-x-[-50%]`) only.
const centeringUtilities = new Set(['top', 'bottom', 'left', 'right', 'inset', 'inset-x', 'inset-y', 'translate-x', 'translate-y'])
const centeringValuePattern = /^\[-?(?:50|100)%\]$/
// System colour keyword for the forced-colors (Windows high contrast) mode.
const forcedColorsValuePattern = /^\[(?:CanvasText|Canvas|LinkText|ButtonText|ButtonFace|Highlight|HighlightText|GrayText)\]$/

function isAllowedArbitrary(token) {
  if (allowedLayoutClasses.has(token)) return true
  const bracket = token.indexOf('-[')
  const prefix = token.slice(0, bracket)
  const value = token.slice(bracket + 1)
  // Drop leading variants (`md:`, `hover:`) to find the utility or variant keyword.
  const keyword = prefix.split(':').pop()
  if (selectorVariantPattern.test(keyword)) return true
  if (lonelyVariablePattern.test(value) || isTokenCalc(value)) return true
  // Property lists (`transition-[color,box-shadow]`) are structural, not design values.
  if (keyword === 'transition' && /^\[[a-z,-]+\]$/.test(value)) return true
  const variants = prefix.split(':').slice(0, -1)
  if (centeringUtilities.has(keyword) && centeringValuePattern.test(value)) return true
  if (variants.includes('forced-colors') && keyword === 'bg' && forcedColorsValuePattern.test(value)) return true
  return false
}

export function lintSource(source) {
  const problems = []

  for (const match of source.matchAll(rawColorPattern)) {
    problems.push(`raw color literal "${match[0]}"`)
  }

  for (const match of source.matchAll(paletteClassPattern)) {
    problems.push(`raw Tailwind palette class "${match[0].trim()}"`)
  }

  for (const match of source.matchAll(arbitraryPropertyPxPattern)) {
    problems.push(`arbitrary property px value "${match[0]}"`)
  }

  // Bracket-prefixed variants (`[&_svg]:`, `[&>svg]:`, `*:[...]:`, `[@media(...)]:`) never match this
  // pattern, so they pass. Only `utility-[value]` and `variant-[value]` forms are inspected.
  // The parens form (`max-h-(--reka-x)`, `origin-(--reka-x)`) is not arbitrary-bracket syntax and passes.
  for (const match of source.matchAll(arbitraryClassPattern)) {
    if (!isAllowedArbitrary(match[0])) problems.push(`arbitrary Tailwind value "${match[0]}"`)
  }

  return problems
}

if (process.argv.includes('--self-test')) {
  const cases = [
    // [source, shouldPass]
    ['class="text-secondary bg-surface border-subtle text-icon-subtle bg-fg-success text-error"', true],
    ['class="[&_svg]:pointer-events-none [&_svg:not([class*=\'size-\'])]:size-4 [&>svg]:shrink-0"', true],
    ['class="[&:has([data-slot=icon])]:px-2 [@media(hover:hover)]:hover:underline *:[span]:last:flex"', true],
    ['class="has-[>svg]:px-2 aria-[invalid=true]:border-error data-[state=open]:flex"', true],
    ['class="group-data-[collapsible=icon]:size-8! peer-data-[active=true]:flex supports-[backdrop-filter]:blur"', true],
    ['class="group-has-data-[sidebar=menu-action]/menu-item:pr-8"', true],
    ['class="h-[var(--reka-select-trigger-height)] max-h-[calc(var(--reka-popper-available-height)*0.5)]"', true],
    ['class="h-[calc(100%-(--spacing(0.25)))] max-w-[calc(100%-(--spacing(8)))] left-[calc(var(--sidebar-width)*-1)]"', true],
    ['class="forced-colors:bg-[CanvasText] top-[100%] inset-x-[50%]"', true],
    ['class="bg-red-500! text-slate-950 hover:bg-white!"', false],
    ['class="decoration-red-500"', false],
    ['class="shadow-blue-500/20"', false],
    ['class="divide-gray-200"', false],
    ['class="from-pink-500 via-purple-500 to-indigo-500"', false],
    ['class="accent-green-600 caret-black placeholder-gray-400"', false],
    ['class="border-t-red-500 border-x-blue-500"', false],
    ['class="ring-offset-white outline-red-500 fill-black stroke-cyan-300"', false],
    ['class="shadow-xs shadow-sm shadow-md outline-brand text-secondary bg-surface border-subtle ring-offset-background border-t-subtle"', true],
    ['class="mt-[calc(13px+var(--a))]"', false],
    ['class="max-h-[calc(var(--reka-popper-available-height)-8px)]"', false],
    ['class="mt-[calc(13px)]"', false],
    ['class="w-[var(--a)px] w-[var(--a,13px)]"', false],
    ['class="[--foo:13px]"', false],
    ['class="[margin:13px] [padding:-2.5px]"', false],
    ['class="w-[37%]"', false],
    ['class="top-[60%]"', false],
    ['class="w-[50%]"', false],
    ['class="[--my-var:var(--x)] gap-[--spacing(var(--gap))]"', true],
    ['class="bg-[CanvasText]"', false],
    ['class="forced-colors:bg-[#fff]"', false],
    ['class="max-h-(--reka-dropdown-menu-content-available-height) origin-(--reka-popover-content-transform-origin)"', true],
    ['class="w-[calc(var(--sidebar-width-icon)+--spacing(4))] min-w-[--spacing(4)]"', true],
    ['class="transition-[color,box-shadow] top-[50%] translate-x-[-50%]"', true],
    ['class="bg-red-500"', false],
    ['class="hover:text-white"', false],
    ['class="border-slate-200/50"', false],
    ['class="w-[123px]"', false],
    ['class="md:h-[40px]"', false],
    ['const color = "#ff0000"', false],
    ['color: rgb(0, 0, 0)', false],
  ]
  let failed = 0
  for (const [source, shouldPass] of cases) {
    const problems = lintSource(source)
    const passed = problems.length === 0
    const ok = passed === shouldPass
    if (!ok) failed += 1
    console.log(`${ok ? 'ok  ' : 'FAIL'} ${shouldPass ? 'pass' : 'ban '} ${source}${problems.length ? `  -> ${problems.join('; ')}` : ''}`)
  }
  console.log(failed ? `${failed} self-test case(s) failed.` : 'Self-test passed.')
  process.exit(failed ? 1 : 0)
}

const errors = []

for (const filePath of files) {
  const source = await readFile(filePath, 'utf8')
  const relativePath = path.relative(process.cwd(), filePath)
  for (const problem of lintSource(source)) errors.push(`${relativePath}: ${problem}`)
}

if (errors.length) {
  console.error('Design token guard failed:')
  for (const error of errors) console.error(`- ${error}`)
  process.exitCode = 1
} else {
  console.log(`Design token guard passed (${files.length} source files checked).`)
}
