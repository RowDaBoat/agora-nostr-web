import { b as attr, a as attr_class, s as stringify, e as ensure_array_like, d as attr_style } from './index2-DpBdzO5t.js';
import { n as ndk } from './ndk.svelte-BfhDBrJw.js';
import './utils-KcIDVAAe.js';
import './state.svelte-zw3OW0Pf.js';
import { U as User } from './index4-D71bD0RT.js';
import { C as CreateFollowPackDialog } from './CreateFollowPackDialog-gBFXSaz2.js';
import { c as createLazyFeed, L as LoadMoreTrigger } from './lazyFeed.svelte-SHZfUyBO.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './context-D7LG2f18.js';
import 'clsx';
import '@nostr-dev-kit/cache-sqlite-wasm';
import '@nostr-dev-kit/wallet';
import '@nostr-dev-kit/wot';
import '@nostr-dev-kit/ndk';
import '@nostr-dev-kit/sessions';
import '@nostr-dev-kit/sync';
import 'tty';
import 'util';
import 'os';
import 'tailwind-merge';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let showCreatePackModal = false;
    let searchQuery = "";
    let activeFilter = "all";
    const filterLabels = {
      all: "All Packs",
      mine: "My Packs",
      follows: "From Follows",
      "include-me": "Include Me"
    };
    const packsFeed = createLazyFeed(ndk, () => ({ filters: [{ kinds: [39089, 39092] }], bufferMs: 100 }), { initialLimit: 12, pageSize: 12 });
    const packEvents = packsFeed.allEvents;
    packsFeed.eosed;
    let allPacks = packEvents;
    let filteredPacks = /* @__PURE__ */ (() => {
      let filtered = allPacks;
      return filtered;
    })();
    let displayLimit = 12;
    const visiblePacks = filteredPacks.slice(0, displayLimit);
    const hasMore = displayLimit < filteredPacks.length;
    const isLoading = packsFeed.isLoading;
    function handleLoadMore() {
      if (hasMore) {
        displayLimit = Math.min(displayLimit + 12, filteredPacks.length);
      }
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div class="w-full lg:max-w-6xl mx-auto px-4 py-8"><div class="mb-6"><div class="flex gap-3 flex-col sm:flex-row"><div class="relative flex-1"><svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg> <input type="search" placeholder="Search follow packs..."${attr("value", searchQuery)} class="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"/></div> `);
      if (ndk.$currentUser) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="relative flex-shrink-0 filter-dropdown"><button class="px-4 py-3 bg-card border border-border rounded-lg text-foreground hover:border-border transition-colors flex items-center gap-2 min-w-[160px] justify-between"><div class="flex items-center gap-2"><svg class="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg> <span class="text-sm font-medium">${escape_html(filterLabels[activeFilter])}</span></div> <svg${attr_class(`w-4 h-4 text-muted-foreground transition-transform ${stringify("")}`)} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button> `);
        {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--></div></div> <div><h2 class="text-xl font-semibold text-foreground mb-4">Popular Packs</h2> `);
      if (visiblePacks.length > 0) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3"><!--[-->`);
        const each_array = ensure_array_like(visiblePacks);
        for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
          let pack = each_array[$$index_1];
          const packImage = pack.tagValue("image");
          const packTitle = pack.tagValue("title") || "Untitled Pack";
          const packDescription = pack.tagValue("description");
          const packPubkeys = pack.tags.filter((t) => t[0] === "p").map((t) => t[1]);
          $$renderer3.push(`<div role="button" tabindex="0" class="block bg-card border border-border rounded-xl overflow-hidden hover:border-border transition-colors group cursor-pointer">`);
          if (packImage) {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<div class="h-32 w-full"><img${attr("src", packImage)}${attr("alt", packTitle)} class="w-full h-full object-cover"/></div>`);
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]--> <div class="p-5"><div class="mb-4"><h3 class="font-semibold text-foreground group-hover:text-primary transition-colors">${escape_html(packTitle)}</h3> <p class="text-sm text-muted-foreground mt-1">${escape_html(packPubkeys.length)} members</p></div> `);
          if (packDescription) {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<p class="text-sm text-muted-foreground mb-4 line-clamp-2">${escape_html(packDescription)}</p>`);
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]--> <div class="flex -space-x-2"><!--[-->`);
          const each_array_1 = ensure_array_like(packPubkeys.slice(0, 4));
          for (let index = 0, $$length2 = each_array_1.length; index < $$length2; index++) {
            let pubkey = each_array_1[index];
            $$renderer3.push(`<button type="button" class="relative cursor-pointer"${attr_style(`z-index: ${stringify(4 - index)}`)}><!---->`);
            User.Root($$renderer3, {
              ndk,
              pubkey,
              children: ($$renderer4) => {
                $$renderer4.push(`<!---->`);
                User.Avatar($$renderer4, {
                  class: "w-8 h-8 rounded-full ring-2 ring-neutral-900 hover:opacity-80 transition-opacity"
                });
                $$renderer4.push(`<!---->`);
              },
              $$slots: { default: true }
            });
            $$renderer3.push(`<!----></button>`);
          }
          $$renderer3.push(`<!--]--> `);
          if (packPubkeys.length > 4) {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<div class="w-8 h-8 rounded-full bg-muted ring-2 ring-neutral-900 flex items-center justify-center"><span class="text-xs text-muted-foreground">+${escape_html(packPubkeys.length - 4)}</span></div>`);
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]--></div></div></div>`);
        }
        $$renderer3.push(`<!--]--></div> `);
        LoadMoreTrigger($$renderer3, { onIntersect: handleLoadMore, hasMore, isLoading });
        $$renderer3.push(`<!---->`);
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push(`<div class="text-center py-12"><svg class="w-16 h-16 text-muted-foreground mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg> <p class="text-muted-foreground">No follow packs found</p></div>`);
      }
      $$renderer3.push(`<!--]--></div> `);
      CreateFollowPackDialog($$renderer3, {
        get open() {
          return showCreatePackModal;
        },
        set open($$value) {
          showCreatePackModal = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----></div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BQgKHdYs.js.map
