#!/usr/bin/env node
// Pulls shadcn-vue (registry style new-york-v4) components into src/components/ui.
// The shadcn-vue CLI is unavailable here, so this script talks to the registry directly.
//
// Usage: node scripts/ui-add.mjs <name...> [--force] [--allow-gaps] [--dry-run] [--verbose]
// (--verbose prints rewritten file contents during --dry-run)
//
// Rewrites applied to every pulled file:
//   - `from "cn"` and registry utils imports            -> the `utils` alias (@/lib/utils)
//   - `@/registry/new-york-v4/ui/`                      -> the `ui` alias (@/components/ui/)
//   - lucide imports (`lucide-vue-next`, `@lucide/vue`) are removed; `<ChevronDown />` usages become
//     `<Icon name="ui-actions/expand-more" />` (mask icons from public/icons) with one Icon import.
//     Unmapped lucide icons are listed under "Icon gaps". If any file of a component has one, the WHOLE
//     component is refused (none of its files are written) and the script exits 1, unless --allow-gaps
//     is passed, which writes every file with `<Icon name="TODO-<Name>" />` for the gaps.
//   - Class-string selectors that target svg (`[&_svg`, `[&>svg`, `has-[>svg]`, `*:[svg]`) are rewritten
//     to target `[data-slot=icon]`, because Icon renders a span, not an svg.
// Components whose folder already exists are skipped. --force overwrites only components named on the
// command line, never transitive registry dependencies (so a customised ui/button is never replaced). npm dependencies missing from
// package.json are printed as a `pnpm add` command; nothing is installed.

import { mkdir, readFile, writeFile, access } from 'node:fs/promises'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const REGISTRY = 'https://www.shadcn-vue.com/r/styles/new-york-v4'
const REGISTRY_UI_PREFIX = 'registry/new-york-v4/ui/'

// lucide name (without "Icon" suffix) -> path under public/icons (no .svg)
const ICON_MAP = {
  ChevronDown: 'ui-actions/expand-more',
  ChevronUp: 'ui-actions/expand-less',
  ChevronLeft: 'ui-actions/chevron-left',
  ChevronRight: 'ui-actions/chevron-right',
  ChevronsUpDown: 'ui-actions/unfold-more',
  Check: 'ui-actions/check',
  X: 'ui-actions/close',
  MoreHorizontal: 'ui-actions/more-horiz',
  Ellipsis: 'ui-actions/more-horiz',
  MoreVertical: 'ui-actions/more-vert',
  Search: 'ui-actions/search',
  Circle: 'ui-actions/radio-button-unchecked',
  Dot: 'photo-image/circle',
  Minus: 'ui-actions/remove',
  Plus: 'ui-actions/add',
  GripVertical: 'ui-actions/drag-indicator',
  ArrowLeft: 'ui-actions/arrow-back',
  ArrowRight: 'ui-actions/arrow-forward',
  ArrowUp: 'ui-actions/arrow-upward',
  ArrowDown: 'ui-actions/arrow-downward',
}
// Circle used as a filled dot (`fill-current`) needs the filled glyph, not the outline.
const FILLED_CIRCLE = 'photo-image/circle'

const args = process.argv.slice(2)
const force = args.includes('--force')
const allowGaps = args.includes('--allow-gaps')
const dryRun = args.includes('--dry-run')
const verbose = args.includes('--verbose')
const requested = args.filter((arg) => !arg.startsWith('--'))

if (!requested.length) {
  console.error('Usage: node scripts/ui-add.mjs <name...> [--force] [--allow-gaps] [--dry-run]')
  process.exit(1)
}

const components = JSON.parse(await readFile(path.join(root, 'components.json'), 'utf8'))
const uiAlias = components.aliases?.ui ?? '@/components/ui'
const utilsAlias = components.aliases?.utils ?? '@/lib/utils'
const uiDir = path.join(root, uiAlias.replace(/^@\//, 'src/'))

const pkg = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'))
const installed = new Set([...Object.keys(pkg.dependencies ?? {}), ...Object.keys(pkg.devDependencies ?? {})])

const exists = (target) => access(target).then(() => true, () => false)
const baseName = (entry) => path.basename(String(entry)).replace(/\.json$/, '')
const packageName = (spec) => spec.replace(/^(@?[^@]+)@.*$/, '$1')
const isLucide = (spec) => /^(lucide-vue-next|@lucide\/vue|lucide)$/.test(packageName(spec))

async function fetchItem(name) {
  const url = `${REGISTRY}/${name}.json`
  let response
  try {
    response = await fetch(url)
  } catch (error) {
    throw new Error(`fetch failed for ${url}: ${error.message}`)
  }
  if (!response.ok) throw new Error(`fetch failed for ${url}: HTTP ${response.status}`)
  return response.json()
}

function resolveIcon(lucideName, attrs) {
  const base = ICON_MAP[lucideName] ? lucideName : lucideName.replace(/Icon$/, '')
  let target = ICON_MAP[base]
  if (base === 'Circle' && /fill-current/.test(attrs)) target = FILLED_CIRCLE
  return target ?? null
}

function rewriteContent(content, file, gaps) {
  let out = content
    .replace(/from\s+(["'])cn\1/g, `from "${utilsAlias}"`)
    .replaceAll('@/registry/new-york-v4/lib/utils', utilsAlias)
    .replaceAll('@/registry/new-york-v4/ui/', `${uiAlias}/`)

  // Lucide imports -> Icon component.
  const importPattern = /import\s+(?:type\s+)?\{([^}]*)\}\s+from\s+["'](?:lucide-vue-next|@lucide\/vue)["']\s*;?[ \t]*\n?/g
  const names = []
  out = out.replace(importPattern, (_, list) => {
    for (const part of list.split(',')) {
      const name = part.trim().replace(/^type\s+/, '').split(/\s+as\s+/).pop().trim()
      if (name) names.push(name)
    }
    return '\u0000ICON_IMPORT\u0000'
  })

  let replaced = 0
  for (const name of names) {
    const open = new RegExp(`<${name}\\b((?:[^>"']|"[^"]*"|'[^']*')*?)(/?)>`, 'g')
    out = out.replace(open, (_, attrs, selfClose) => {
      const target = resolveIcon(name, attrs)
      replaced += 1
      let iconName = target
      if (!target) {
        iconName = `TODO-${name}`
        gaps.add(`${name} (${file})`)
      }
      const tail = attrs.replace(/\s+$/, '')
      return `<Icon name="${iconName}"${tail}${selfClose ? ' />' : '>'}`
    })
    out = out.replaceAll(`</${name}>`, '</Icon>')
    if (new RegExp(`\\b${name}\\b`).test(out.replace(/\u0000ICON_IMPORT\u0000|name="TODO-\w+"/g, ''))) {
      console.warn(`warn: ${file}: "${name}" is still referenced outside the template; replace it by hand`)
    }
  }
  // Keep exactly one Icon import per file, in place of the first lucide import.
  let placed = false
  out = out.replace(/\u0000ICON_IMPORT\u0000/g, () => {
    if (placed || !replaced) return ''
    placed = true
    return 'import { Icon } from "@/components/ui/icon"\n'
  })

  // svg selectors in class strings -> icon span selectors.
  out = out
    .replace(/(\[&[_>])svg\b/g, '$1[data-slot=icon]')
    .replace(/has-\[(>?)svg\]/g, 'has-[$1[data-slot=icon]]')
    .replace(/\*:\[svg\]/g, '*:[[data-slot=icon]]')

  if (/@\/registry\//.test(out)) {
    console.warn(`warn: ${file}: unresolved "@/registry/" import remains; fix by hand`)
  }
  return out
}

const visited = new Set()
const plan = []
const gaps = new Set()
const npmDeps = new Set()

async function collect(name) {
  if (visited.has(name)) return
  visited.add(name)
  if (!(force && requested.includes(name)) && (await exists(path.join(uiDir, name)))) {
    console.log(`skip ${name} (exists)`)
    return
  }
  const item = await fetchItem(name)
  for (const dep of item.dependencies ?? []) npmDeps.add(dep)
  for (const file of item.files ?? []) {
    if (!file.path.startsWith(REGISTRY_UI_PREFIX)) {
      console.warn(`warn: ${name}: skipping non-ui file ${file.path}`)
      continue
    }
    const target = path.join(uiDir, file.path.slice(REGISTRY_UI_PREFIX.length))
    const fileGaps = new Set()
    const content = rewriteContent(file.content, path.relative(root, target), fileGaps)
    for (const gap of fileGaps) gaps.add(gap)
    plan.push({ component: name, target, content, gaps: fileGaps })
  }
  for (const dep of item.registryDependencies ?? []) await collect(baseName(dep))
}

try {
  for (const name of requested) await collect(name)
} catch (error) {
  console.error(error.message)
  process.exit(1)
}

if (gaps.size && !allowGaps) {
  console.log('Refused: unmapped icons found. No files written.')
  console.log('\nIcon gaps (no mapped file in public/icons):')
  for (const gap of gaps) console.log(`- ${gap}`)
  console.log('Add the icon mapping to ICON_MAP or re-run with --allow-gaps to write TODO icons.')
  process.exit(1)
}

for (const { target, content } of plan) {
  const relative = path.relative(root, target)
  if (dryRun) {
    console.log(`would write ${relative} (${Buffer.byteLength(content)} bytes)`)
    if (verbose) console.log(content)
    continue
  }
  await mkdir(path.dirname(target), { recursive: true })
  await writeFile(target, content)
  console.log(`wrote ${relative}`)
}

if (gaps.size) {
  console.log('\nIcon gaps (no mapped file in public/icons, written as TODO-<Name>):')
  for (const gap of gaps) console.log(`- ${gap}`)
}

const missing = [...npmDeps]
  .filter((dep) => dep !== 'cn' && !isLucide(dep))
  .filter((dep) => !installed.has(packageName(dep)))
if (missing.length) {
  console.log('\nMissing npm dependencies:')
  console.log(`pnpm add ${missing.join(' ')}`)
}
