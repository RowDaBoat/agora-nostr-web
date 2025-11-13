import { g as store_get, u as unsubscribe_stores } from './index2-DpBdzO5t.js';
import { n as ndk } from './ndk.svelte-BfhDBrJw.js';
import { p as page } from './stores-lKKGOiBk.js';
import './utils-KcIDVAAe.js';
import 'clsx';
import './state.svelte-zw3OW0Pf.js';
import { NDKKind } from '@nostr-dev-kit/ndk';
import '@nostr-dev-kit/wallet';
import '@nostr-dev-kit/wot';
import '@nostr-dev-kit/sessions';
import '@nostr-dev-kit/sync';
import './button2-JT-_T3Ay.js';
import './url-healing-Vba5GwtC.js';
import { C as CreateFollowPackDialog } from './CreateFollowPackDialog-gBFXSaz2.js';
import './context-D7LG2f18.js';
import './escaping-CqgfEcN3.js';
import '@nostr-dev-kit/cache-sqlite-wasm';
import 'tty';
import 'util';
import 'os';
import './index-BCLI0M1W.js';
import 'tailwind-merge';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let showEditPackModal = false;
    let editingPack = null;
    store_get($$store_subs ??= {}, "$page", page).params.packId;
    let pubkeys = [];
    const feedSubscription = (() => {
      if (pubkeys.length > 0) {
        console.log(`[FollowPackDetail] Creating subscription for ${pubkeys.length} members`);
        return ndk.$subscribe(() => ({
          filters: [{ kinds: [NDKKind.Text], authors: pubkeys, limit: 50 }],
          bufferMs: 100
        }));
      }
      return null;
    })();
    feedSubscription?.events || [];
    feedSubscription?.eosed || false;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div class="pack-detail-container svelte-1xwqwht"><div class="pack-header svelte-1xwqwht"><button class="back-btn svelte-1xwqwht"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg> <span>Back to Packs</span></button></div> <div class="pack-content svelte-1xwqwht">`);
      {
        $$renderer3.push("<!--[!-->");
        {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<div class="text-center py-12"><div class="inline-block w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4"></div> <p class="text-muted-foreground">Loading follow pack...</p></div>`);
        }
        $$renderer3.push(`<!--]-->`);
      }
      $$renderer3.push(`<!--]--> `);
      CreateFollowPackDialog($$renderer3, {
        editingPack,
        get open() {
          return showEditPackModal;
        },
        set open($$value) {
          showEditPackModal = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----></div></div>`);
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
//# sourceMappingURL=_page.svelte-BZauRGbL.js.map
