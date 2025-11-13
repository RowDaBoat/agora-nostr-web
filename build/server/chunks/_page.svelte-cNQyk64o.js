import { g as store_get, e as ensure_array_like, u as unsubscribe_stores, a as attr_class } from './index2-DpBdzO5t.js';
import { p as page } from './stores-lKKGOiBk.js';
import { s as settings, n as ndk } from './ndk.svelte-BfhDBrJw.js';
import { NDKArticle, NDKKind } from '@nostr-dev-kit/ndk';
import 'clsx';
import '@nostr-dev-kit/wallet';
import '@nostr-dev-kit/wot';
import '@nostr-dev-kit/sessions';
import '@nostr-dev-kit/sync';
import { a as NoteCard } from './ComposeDialog-rF5DhufZ.js';
import './utils-KcIDVAAe.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './state.svelte-zw3OW0Pf.js';
import './url-healing-Vba5GwtC.js';
import './button2-JT-_T3Ay.js';
import { c as createLazyFeed, L as LoadMoreTrigger } from './lazyFeed.svelte-SHZfUyBO.js';
import './context-D7LG2f18.js';
import '@nostr-dev-kit/cache-sqlite-wasm';
import 'tty';
import 'util';
import 'os';
import './toast.svelte-BEvONWAz.js';
import './relayInfo.svelte-CrGOXzx2.js';
import './index3-DOo-Ka_h.js';
import './scroll-lock-YhRhLzPR.js';
import './events-CY0_bqjb.js';
import 'tailwind-merge';
import './button-DBIbgud-.js';
import './utils2-B05Dmz_H.js';
import './index4-D71bD0RT.js';
import './RelayPublishDropdownContent-CzmVdnh5.js';
import './RelayIcon-DEER5mbZ.js';
import './index5-D9xIoHLj.js';
import './event-content-COF8hoaI.js';
import './index.svelte-EYlAHNHC.js';
import './index-BCLI0M1W.js';
import './client-C1nnVzci.js';
import './index-BYTxiVRf.js';

function MediaTypeFilters($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<div class="flex justify-around lg:justify-start px-2 lg:px-4 overflow-x-auto"><button${attr_class(`flex items-center justify-center lg:justify-start gap-1.5 px-3 lg:px-4 py-3 font-medium whitespace-nowrap ${"text-primary border-b-2 border-primary"}`)} aria-label="Conversations"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg> <span class="hidden lg:inline">Conversations</span></button> <button${attr_class(`flex items-center justify-center lg:justify-start gap-1.5 px-3 lg:px-4 py-3 font-medium whitespace-nowrap ${"text-muted-foreground hover:text-muted-foreground"}`)} aria-label="Images"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> <span class="hidden lg:inline">Images</span></button>  <button${attr_class(`flex items-center justify-center lg:justify-start gap-1.5 px-3 lg:px-4 py-3 font-medium whitespace-nowrap ${"text-muted-foreground hover:text-muted-foreground"}`)} aria-label="Articles"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg> <span class="hidden lg:inline">Articles</span></button></div>`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const hashtag = store_get($$store_subs ??= {}, "$page", page).params.hashtag;
    const relaysToUse = settings.relays.filter((r) => r.enabled && r.read).map((r) => r.url);
    const notesFeed = createLazyFeed(
      ndk,
      () => {
        const currentHashtag = hashtag;
        if (!currentHashtag) return { filters: [] };
        const filter = {
          kinds: [NDKKind.Text],
          "#t": [currentHashtag.toLowerCase()],
          limit: 200
        };
        return {
          filters: [filter],
          relayUrls: relaysToUse.length > 0 ? relaysToUse : void 0
        };
      },
      { initialLimit: 20, pageSize: 20 }
    );
    const mediaFeed = createLazyFeed(
      ndk,
      () => {
        const currentHashtag = hashtag;
        if (!currentHashtag) return { filters: [] };
        const filter = {
          kinds: [
            NDKKind.Text,
            NDKKind.Image,
            NDKKind.Video,
            NDKKind.ShortVideo
          ],
          "#t": [currentHashtag.toLowerCase()],
          limit: 300
        };
        return {
          filters: [filter],
          relayUrls: relaysToUse.length > 0 ? relaysToUse : void 0
        };
      },
      { initialLimit: 30, pageSize: 30 }
    );
    const articlesFeed = createLazyFeed(
      ndk,
      () => {
        const currentHashtag = hashtag;
        if (!currentHashtag) return { filters: [] };
        const filter = {
          kinds: [NDKKind.Article],
          "#t": [currentHashtag.toLowerCase()],
          limit: 100
        };
        return {
          filters: [filter],
          cacheUsage: 1,
          // NDKSubscriptionCacheUsage.CACHE_FIRST
          relayUrls: relaysToUse.length > 0 ? relaysToUse : void 0
        };
      },
      { initialLimit: 10, pageSize: 10 }
    );
    const articles = (() => articlesFeed.events.map((e) => NDKArticle.from(e)))();
    (() => articles.filter((article) => article.title && article.content).sort((a, b) => (b.published_at ?? b.created_at ?? 0) - (a.published_at ?? a.created_at ?? 0)))();
    const events = notesFeed.events;
    const eosed = notesFeed.eosed;
    const hasMore = notesFeed.hasMore;
    const isLoading = notesFeed.isLoading;
    function handleLoadMore() {
      {
        notesFeed.loadMore();
      }
    }
    (() => {
      const authorCounts = /* @__PURE__ */ new Map();
      [
        ...notesFeed.events,
        ...mediaFeed.events,
        ...articlesFeed.events
      ].forEach((event) => {
        const count = authorCounts.get(event.pubkey) || 0;
        authorCounts.set(event.pubkey, count + 1);
      });
      return Array.from(authorCounts.entries()).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([pubkey, count]) => ({ pubkey, count }));
    })();
    $$renderer2.push(`<div class="max-w-full mx-auto"><div class="sticky top-0 z-10 bg-background/90 backdrop-blur-xl border-b border-border/50"><div class="px-4 py-4"><div class="flex items-center gap-3"><a href="/" class="flex items-center justify-center w-8 h-8 rounded-full hover:bg-neutral-800 transition-colors" aria-label="Back to home"><svg class="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg></a> <div><h1 class="text-xl font-bold text-foreground flex items-center gap-2"><span class="text-primary">#</span> ${escape_html(hashtag)}</h1> <p class="text-sm text-neutral-400">Posts tagged with #${escape_html(hashtag)}</p></div></div></div> `);
    MediaTypeFilters($$renderer2);
    $$renderer2.push(`<!----></div> <div class="divide-y divide-neutral-800/50">`);
    {
      $$renderer2.push("<!--[!-->");
      {
        $$renderer2.push("<!--[!-->");
        {
          $$renderer2.push("<!--[!-->");
          if (events.length === 0 && eosed) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<div class="p-8 text-center text-neutral-400">No notes found with #${escape_html(hashtag)}</div>`);
          } else {
            $$renderer2.push("<!--[!-->");
            if (events.length === 0) {
              $$renderer2.push("<!--[-->");
              $$renderer2.push(`<div class="p-8 text-center text-neutral-400">Loading notes...</div>`);
            } else {
              $$renderer2.push("<!--[!-->");
              $$renderer2.push(`<!--[-->`);
              const each_array_2 = ensure_array_like(events);
              for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
                let event = each_array_2[$$index_2];
                NoteCard($$renderer2, { event });
              }
              $$renderer2.push(`<!--]-->`);
            }
            $$renderer2.push(`<!--]-->`);
          }
          $$renderer2.push(`<!--]-->`);
        }
        $$renderer2.push(`<!--]--> `);
        LoadMoreTrigger($$renderer2, { onIntersect: handleLoadMore, hasMore, isLoading });
        $$renderer2.push(`<!---->`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-cNQyk64o.js.map
