import { g as store_get, u as unsubscribe_stores } from './index2-DpBdzO5t.js';
import { p as page } from './stores-lKKGOiBk.js';
import './ndk.svelte-BfhDBrJw.js';
import '@nostr-dev-kit/ndk';
import 'clsx';
import '@nostr-dev-kit/wallet';
import '@nostr-dev-kit/wot';
import '@nostr-dev-kit/sessions';
import '@nostr-dev-kit/sync';
import './index3-DOo-Ka_h.js';
import 'tailwind-merge';
import './button2-JT-_T3Ay.js';
import './url-healing-Vba5GwtC.js';
import './RelayPublishDropdownContent-CzmVdnh5.js';
import './utils-KcIDVAAe.js';
import './state.svelte-zw3OW0Pf.js';
import './scroll-lock-YhRhLzPR.js';
import './popover-BWwSCSLf.js';
import './runtime-9tjL5BFW.js';
import 'nostr-tools';
import './context-D7LG2f18.js';
import './escaping-CqgfEcN3.js';
import '@nostr-dev-kit/cache-sqlite-wasm';
import 'tty';
import 'util';
import 'os';
import './index-BCLI0M1W.js';
import './relayInfo.svelte-CrGOXzx2.js';
import './button-DBIbgud-.js';
import './utils2-B05Dmz_H.js';
import './RelayIcon-DEER5mbZ.js';
import './events-CY0_bqjb.js';
import './floating-layer-anchor-DIntB4dN.js';
import './index-BYTxiVRf.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    store_get($$store_subs ??= {}, "$page", page).params.nevent;
    $$renderer2.push(`<div class="min-h-screen bg-background"><header class="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border"><div class="flex items-center gap-4 px-4 py-3"><button class="p-2 hover:bg-neutral-900 rounded-lg transition-colors" aria-label="Go back"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg></button> <h1 class="text-xl font-semibold">Thread</h1></div></header> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex flex-col items-center justify-center mt-20"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div> <p class="mt-4 text-neutral-400">Loading thread...</p></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BTJYh8m2.js.map
