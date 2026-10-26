import { nextTick, onBeforeUnmount, onMounted, ref, watch, type Ref } from 'vue'

// Tracks the selected tab button of a segmented control so a single indicator
// element can slide behind it. Uses offsetLeft/offsetWidth, which are layout
// values and ignore transforms (safe inside a scaling dialog).
// `ready` flips true only after the first measurement has painted, so the
// indicator appears in place instead of sliding in from 0.
export function useSegmentedIndicator(
  tablist: Ref<HTMLElement | null>,
  activeKey: () => unknown,
) {
  const left = ref(0)
  const width = ref(0)
  const ready = ref(false)
  let observer: ResizeObserver | null = null
  let readyScheduled = false

  function measure() {
    const active = tablist.value?.querySelector<HTMLElement>('[role="tab"][aria-selected="true"]')
    if (!active) return
    left.value = active.offsetLeft
    width.value = active.offsetWidth
  }

  const indicatorStyle = ref<Record<string, string>>({ opacity: '0' })

  function sync() {
    measure()
    indicatorStyle.value = width.value
      ? { transform: `translateX(${left.value}px)`, width: `${width.value}px` }
      : { opacity: '0' }
    // Enable transitions only after a non-zero measurement has been applied and painted,
    // so a tablist mounted hidden does not slide in from x=0 later.
    if (width.value && !ready.value && !readyScheduled) {
      readyScheduled = true
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ready.value = true
        })
      })
    }
  }

  onMounted(() => {
    sync()
    if (tablist.value && typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(sync)
      observer.observe(tablist.value)
    }
  })

  watch(activeKey, () => nextTick(sync))

  onBeforeUnmount(() => {
    observer?.disconnect()
    observer = null
  })

  return { indicatorStyle, ready }
}
