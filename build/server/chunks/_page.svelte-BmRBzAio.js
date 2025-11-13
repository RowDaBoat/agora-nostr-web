import { g as store_get, u as unsubscribe_stores } from './index2-DpBdzO5t.js';
import './ndk.svelte-BfhDBrJw.js';
import { p as page } from './stores-lKKGOiBk.js';
import './utils-KcIDVAAe.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import 'clsx';
import './state.svelte-zw3OW0Pf.js';
import '@nostr-dev-kit/ndk';
import '@nostr-dev-kit/wallet';
import './context-D7LG2f18.js';
import '@nostr-dev-kit/cache-sqlite-wasm';
import '@nostr-dev-kit/wot';
import '@nostr-dev-kit/sessions';
import '@nostr-dev-kit/sync';
import 'tty';
import 'util';
import 'os';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    store_get($$store_subs ??= {}, "$page", page).params.id;
    $$renderer2.push(`<div class="listing-detail-container svelte-17ht8x9"><div class="listing-header svelte-17ht8x9"><button class="back-btn svelte-17ht8x9"><svg class="w-6 h-6 svelte-17ht8x9" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg></button> <h1 class="svelte-17ht8x9">${escape_html("Listing")}</h1></div> <div class="listing-content svelte-17ht8x9">`);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-12"><p class="text-muted-foreground">Listing not found</p></div>`);
    }
    $$renderer2.push(`<!--]--></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BmRBzAio.js.map
