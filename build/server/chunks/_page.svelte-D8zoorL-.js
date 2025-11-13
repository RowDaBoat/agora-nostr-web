import { g as store_get, u as unsubscribe_stores } from './index2-DpBdzO5t.js';
import { p as page } from './stores-lKKGOiBk.js';
import './utils-KcIDVAAe.js';
import 'clsx';
import './state.svelte-zw3OW0Pf.js';
import './ndk.svelte-BfhDBrJw.js';
import '@nostr-dev-kit/ndk';
import './context-D7LG2f18.js';
import './escaping-CqgfEcN3.js';
import '@nostr-dev-kit/cache-sqlite-wasm';
import '@nostr-dev-kit/wallet';
import '@nostr-dev-kit/wot';
import '@nostr-dev-kit/sessions';
import '@nostr-dev-kit/sync';
import 'tty';
import 'util';
import 'os';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    store_get($$store_subs ??= {}, "$page", page).params.nip05;
    store_get($$store_subs ??= {}, "$page", page).params.identifier;
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex flex-col items-center justify-center min-h-screen bg-background"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div> <p class="mt-4 text-muted-foreground">Redirecting...</p></div>`);
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-D8zoorL-.js.map
