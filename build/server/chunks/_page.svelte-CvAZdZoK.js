import { g as store_get, u as unsubscribe_stores } from './index2-DpBdzO5t.js';
import { p as page } from './stores-lKKGOiBk.js';
import './utils-KcIDVAAe.js';
import 'clsx';
import './state.svelte-zw3OW0Pf.js';
import { n as ndk } from './ndk.svelte-BfhDBrJw.js';
import '@nostr-dev-kit/messages';
import '@nostr-dev-kit/wallet';
import '@nostr-dev-kit/wot';
import '@nostr-dev-kit/ndk';
import '@nostr-dev-kit/sessions';
import '@nostr-dev-kit/sync';
import './context-D7LG2f18.js';
import './escaping-CqgfEcN3.js';
import '@nostr-dev-kit/cache-sqlite-wasm';
import 'tty';
import 'util';
import 'os';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    store_get($$store_subs ??= {}, "$page", page).params.npub;
    $$renderer2.push(`<div class="h-screen fixed top-0 left-0 right-0 bottom-0 z-[10000] md:h-full md:relative md:z-auto flex flex-col"><div class="sticky top-0 z-10 bg-black border-b border-neutral-800/50 px-4 py-3"><div class="flex items-center gap-3"><button class="p-2 rounded-lg hover:bg-neutral-800/50 transition-colors text-neutral-400 hover:text-white" aria-label="Back to messages"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg></button> `);
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="flex-1"><div class="h-5 w-32 bg-neutral-800 rounded animate-pulse"></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div> `);
    if (!ndk.$currentUser) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex-1 flex items-center justify-center px-6 text-center"><div><svg class="w-20 h-20 text-neutral-700 mb-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg> <h3 class="text-xl font-semibold text-white mb-2">Sign in required</h3> <p class="text-neutral-400 max-w-sm">Please sign in to view and send direct messages</p></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex-1 flex items-center justify-center"><svg class="w-8 h-8 text-primary animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></div>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CvAZdZoK.js.map
