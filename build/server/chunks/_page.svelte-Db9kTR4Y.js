import { e as ensure_array_like, b as attr, a as attr_class, s as stringify } from './index2-DpBdzO5t.js';
import { g as goto } from './client-C1nnVzci.js';
import { n as ndk, a as relayFeeds, i as isAgoraRelay } from './ndk.svelte-BfhDBrJw.js';
import { u as useRelayInfoCached } from './relayInfo.svelte-CrGOXzx2.js';
import { R as RelayIcon } from './RelayIcon-DEER5mbZ.js';
import { U as User } from './index4-D71bD0RT.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import 'clsx';
import { NDKRelayFeedList, normalizeRelayUrl } from '@nostr-dev-kit/ndk';
import './context-D7LG2f18.js';
import './utils-KcIDVAAe.js';
import './index-BYTxiVRf.js';
import './state.svelte-zw3OW0Pf.js';
import '@nostr-dev-kit/cache-sqlite-wasm';
import '@nostr-dev-kit/wallet';
import '@nostr-dev-kit/wot';
import '@nostr-dev-kit/sessions';
import '@nostr-dev-kit/sync';
import 'tty';
import 'util';
import 'os';
import 'tailwind-merge';

function RelayCard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const {
      relayUrl,
      pubkeys = [],
      isFavorite = false,
      showFavoriteIcon = false,
      onclick,
      onFavoriteClick
    } = $$props;
    const relayInfo = useRelayInfoCached();
    $$renderer2.push(`<div${attr("role", onclick ? "button" : void 0)}${attr("tabindex", onclick ? 0 : void 0)}${attr_class(`p-4 bg-card rounded-lg border border-border hover:border-primary/50 transition-colors ${stringify(onclick ? "cursor-pointer" : "")}`)}><div class="flex items-start gap-3">`);
    RelayIcon($$renderer2, { relayUrl, size: "lg" });
    $$renderer2.push(`<!----> <div class="flex-1 min-w-0"><div class="flex items-center gap-2 mb-1 flex-wrap"><h3 class="text-sm font-semibold text-foreground truncate">${escape_html(relayInfo.info?.name || relayUrl.replace("wss://", "").replace("ws://", ""))}</h3> `);
    if (isAgoraRelay(relayUrl)) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span class="flex-shrink-0 px-1.5 py-0.5 text-[10px] font-semibold bg-primary/20 text-primary rounded uppercase tracking-wide">Agora</span>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (showFavoriteIcon && isFavorite) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<svg class="w-4 h-4 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <p class="text-xs text-muted-foreground mb-1">${escape_html(relayUrl)}</p> `);
    if (pubkeys.length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex -space-x-1.5 mb-2 items-center"><!--[-->`);
      const each_array = ensure_array_like(pubkeys.slice(0, 5));
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let pubkey = each_array[$$index];
        $$renderer2.push(`<!---->`);
        User.Root($$renderer2, {
          ndk,
          pubkey,
          children: ($$renderer3) => {
            $$renderer3.push(`<!---->`);
            User.Avatar($$renderer3, { class: "rounded-full border-2 border-background", size: 32 });
            $$renderer3.push(`<!---->`);
          },
          $$slots: { default: true }
        });
        $$renderer2.push(`<!---->`);
      }
      $$renderer2.push(`<!--]--> `);
      if (pubkeys.length > 5) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="w-5 h-5 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-medium text-muted-foreground">+${escape_html(pubkeys.length - 5)}</div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (relayInfo.info?.description) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p class="text-sm text-muted-foreground line-clamp-2">${escape_html(relayInfo.info.description)}</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    if (onFavoriteClick) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<button${attr_class(`flex-shrink-0 p-2 rounded-lg hover:bg-muted transition-colors ${stringify(isFavorite ? "text-primary" : "text-muted-foreground hover:text-primary")}`)}${attr("title", isFavorite ? "Remove from favorites" : "Add to favorites")}>`);
      if (isFavorite) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>`);
      }
      $$renderer2.push(`<!--]--></button>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div>`);
  });
}
function createFollowsRelayAggregator(ndk2) {
  const follows = ndk2.$sessions?.follows || /* @__PURE__ */ new Set();
  const followsArray = Array.from(follows);
  const subscription = ndk2.$subscribe(() => {
    if (followsArray.length === 0) return void 0;
    return {
      filters: [{ kinds: [10012], authors: followsArray }],
      subId: "follows-relay-lists",
      wrap: true
    };
  });
  const aggregatedRelays = (() => {
    const totalFollows = followsArray.length;
    if (totalFollows === 0) return [];
    const relayDataMap = /* @__PURE__ */ new Map();
    for (const event of subscription.events) {
      const relayList = event;
      const authorPubkey = event.pubkey;
      if (relayList.relayUrls) {
        for (const url of relayList.relayUrls) {
          const normalized = normalizeRelayUrl(url);
          const existing = relayDataMap.get(normalized);
          if (existing) {
            existing.count++;
            if (!existing.pubkeys.includes(authorPubkey)) {
              existing.pubkeys.push(authorPubkey);
            }
          } else {
            relayDataMap.set(normalized, { count: 1, pubkeys: [authorPubkey] });
          }
        }
      }
    }
    return Array.from(relayDataMap.entries()).map(([url, data]) => ({
      url,
      count: data.count,
      percentage: totalFollows > 0 ? data.count / totalFollows * 100 : 0,
      pubkeys: data.pubkeys
    })).sort((a, b) => b.count - a.count);
  })();
  return {
    get relays() {
      return aggregatedRelays;
    },
    get totalFollows() {
      return followsArray.length;
    },
    get eventsCount() {
      return subscription.events.length;
    },
    // Get top N relays by count
    getTopRelays(n = 10) {
      return aggregatedRelays.slice(0, n);
    },
    // Get relays used by at least X% of follows
    getRelaysByThreshold(minPercentage) {
      return aggregatedRelays.filter((r) => r.percentage >= minPercentage);
    }
  };
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const favoriteRelays = ndk.$sessionEvent(NDKRelayFeedList);
    const followsRelayAggregator = createFollowsRelayAggregator(ndk);
    const followsRelays = followsRelayAggregator.getTopRelays(20);
    async function toggleFavorite(relayUrl) {
      if (!relayFeeds) return;
      if (relayFeeds.isFavorite(relayUrl)) {
        await relayFeeds.removeRelay(relayUrl);
      } else {
        await relayFeeds.addRelay(relayUrl);
      }
    }
    function navigateToRelayFeed(relayUrl) {
      goto();
    }
    $$renderer2.push(`<div class="p-4 space-y-6">`);
    if (!ndk.$currentUser) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-12"><svg class="w-16 h-16 mx-auto mb-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg> <h3 class="text-lg font-semibold text-foreground mb-2">Login Required</h3> <p class="text-muted-foreground">Please login to manage your favorite relay feeds</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (favoriteRelays?.relayUrls.length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="space-y-3"><h2 class="text-lg font-semibold text-foreground flex items-center gap-2"><svg class="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg> Your Favorite Relays <span class="text-sm text-muted-foreground font-normal">(${escape_html(favoriteRelays.length)})</span></h2> <div class="grid gap-3"><!--[-->`);
        const each_array = ensure_array_like(favoriteRelays);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let relayUrl = each_array[$$index];
          RelayCard($$renderer2, {
            relayUrl,
            isFavorite: true,
            showFavoriteIcon: true,
            onclick: () => navigateToRelayFeed(),
            onFavoriteClick: () => toggleFavorite(relayUrl)
          });
        }
        $$renderer2.push(`<!--]--></div></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="space-y-3"><div class="flex items-center justify-between"><div><h2 class="text-lg font-semibold text-foreground flex items-center gap-2"><svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg> Follows' Relays</h2> <p class="text-sm text-muted-foreground mt-1">Popular relays used by ${escape_html(followsRelayAggregator.eventsCount)}/${escape_html(followsRelayAggregator.totalFollows)} of your follows</p></div></div> <div class="grid gap-3"><!--[-->`);
      const each_array_1 = ensure_array_like(followsRelays);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let relayData = each_array_1[$$index_1];
        const isFavorite = relayFeeds?.isFavorite(relayData.url) || false;
        RelayCard($$renderer2, {
          relayUrl: relayData.url,
          pubkeys: relayData.pubkeys,
          isFavorite,
          showFavoriteIcon: true,
          onclick: () => navigateToRelayFeed(relayData.url),
          onFavoriteClick: () => toggleFavorite(relayData.url)
        });
      }
      $$renderer2.push(`<!--]--></div></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-Db9kTR4Y.js.map
