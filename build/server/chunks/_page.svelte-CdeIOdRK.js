import { g as store_get, u as unsubscribe_stores } from './index2-DpBdzO5t.js';
import { p as page } from './stores-lKKGOiBk.js';
import './utils-KcIDVAAe.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import 'clsx';
import './state.svelte-zw3OW0Pf.js';
import { n as ndk, A as AGORA_RELAYS } from './ndk.svelte-BfhDBrJw.js';
import '@nostr-dev-kit/wallet';
import '@nostr-dev-kit/wot';
import { NDKSubscriptionCacheUsage } from '@nostr-dev-kit/ndk';
import '@nostr-dev-kit/sessions';
import '@nostr-dev-kit/sync';
import { $ as $format } from './runtime-9tjL5BFW.js';
import './npubcash.svelte-CJyS_ttu.js';
import './button2-JT-_T3Ay.js';
import './context-D7LG2f18.js';
import '@nostr-dev-kit/cache-sqlite-wasm';
import 'tty';
import 'util';
import 'os';
import './index-BYTxiVRf.js';
import './index-BCLI0M1W.js';
import 'tailwind-merge';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const code = store_get($$store_subs ??= {}, "$page", page).params.code;
    const dTag = code ? code.slice(0, 12) : null;
    code && code.length > 12 ? code.slice(12) : null;
    const inviteSubscription = ndk.$subscribe(() => ({
      filters: { kinds: [513], "#d": [dTag], limit: 1 },
      relayUrls: [...AGORA_RELAYS],
      subId: "invite",
      cacheUsage: NDKSubscriptionCacheUsage.ONLY_RELAY,
      closeOnEose: true
    }));
    (() => {
      if (!code) return store_get($$store_subs ??= {}, "$t", $format)("onboarding.invite.inviteNotFound");
      if (inviteSubscription.events.length === 0 && inviteSubscription.eosed) return store_get($$store_subs ??= {}, "$t", $format)("onboarding.invite.inviteNotFound");
      return null;
    })();
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div class="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900 flex items-center justify-center p-4"><div class="w-full max-w-xl">`);
      {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="relative bg-card dark:bg-neutral-900 rounded-2xl shadow-xl overflow-hidden p-8"><div class="text-center"><div class="animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-orange-600 mx-auto mb-4"></div> <p class="text-muted-foreground">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("onboarding.invite.loadingInvite"))}</p></div></div>`);
      }
      $$renderer3.push(`<!--]--></div></div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CdeIOdRK.js.map
