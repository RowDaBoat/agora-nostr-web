import 'clsx';
import { a as attr_class, s as stringify } from './index2-DpBdzO5t.js';

function LoadingSpinner($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { size = "md", class: className = "" } = $$props;
    const sizeClasses = {
      xs: "w-3 h-3",
      sm: "w-4 h-4",
      md: "w-6 h-6",
      lg: "w-8 h-8",
      xl: "w-12 h-12"
    }[size];
    const borderWidth = {
      xs: "border",
      sm: "border-2",
      md: "border-2",
      lg: "border-3",
      xl: "border-4"
    }[size];
    $$renderer2.push(`<div${attr_class(`inline-block ${stringify(sizeClasses)} ${stringify(borderWidth)} border-current border-t-transparent rounded-full animate-spin ${stringify(className)}`)} role="status" aria-label="Loading"><span class="sr-only">Loading...</span></div>`);
  });
}
function LoadMoreTrigger($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { onIntersect, hasMore, isLoading = false } = $$props;
    if (
      // Trigger 200px before reaching the element
      hasMore
    ) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="p-4 text-center">`);
      if (isLoading) {
        $$renderer2.push("<!--[-->");
        LoadingSpinner($$renderer2, { size: "md" });
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<button class="px-4 py-2 text-muted-foreground hover:text-muted-foreground transition-colors">Load more</button>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function createLazyFeed(ndk, configGetter, options = {}) {
  const { initialLimit = 20, pageSize = 20 } = options;
  let subscription = ndk.$subscribe(configGetter);
  let displayLimit = initialLimit;
  let frozenEvents = [];
  let pendingEvents = [];
  const visibleEvents = frozenEvents.slice(0, displayLimit);
  const hasMore = displayLimit < frozenEvents.length;
  const isLoading = !subscription.eosed;
  function loadMore() {
    if (hasMore) {
      displayLimit = Math.min(displayLimit + pageSize, frozenEvents.length);
    }
  }
  function loadPendingEvents() {
    if (pendingEvents.length > 0) {
      const pendingCount = pendingEvents.length;
      frozenEvents = [...pendingEvents, ...frozenEvents];
      pendingEvents = [];
      displayLimit = displayLimit + pendingCount;
    }
  }
  return {
    get events() {
      return visibleEvents;
    },
    get allEvents() {
      return frozenEvents;
    },
    get pendingEvents() {
      return pendingEvents;
    },
    get hasMore() {
      return hasMore;
    },
    get isLoading() {
      return isLoading;
    },
    get eosed() {
      return subscription.eosed;
    },
    get count() {
      return subscription.count;
    },
    get totalCount() {
      return frozenEvents.length;
    },
    get visibleCount() {
      return visibleEvents.length;
    },
    get pendingCount() {
      return pendingEvents.length;
    },
    loadMore,
    loadPendingEvents
  };
}

export { LoadMoreTrigger as L, createLazyFeed as c };
//# sourceMappingURL=lazyFeed.svelte-SHZfUyBO.js.map
