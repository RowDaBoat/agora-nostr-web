import 'clsx';
import { g as goto } from './client-C1nnVzci.js';
import { C as ComposeDialog } from './ComposeDialog-rF5DhufZ.js';
import './utils-KcIDVAAe.js';
import './index-BYTxiVRf.js';
import './context-D7LG2f18.js';
import './state.svelte-zw3OW0Pf.js';
import './index2-DpBdzO5t.js';
import './escaping-CqgfEcN3.js';
import './ndk.svelte-BfhDBrJw.js';
import '@nostr-dev-kit/cache-sqlite-wasm';
import '@nostr-dev-kit/wallet';
import '@nostr-dev-kit/wot';
import '@nostr-dev-kit/ndk';
import '@nostr-dev-kit/sessions';
import '@nostr-dev-kit/sync';
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
import './button2-JT-_T3Ay.js';
import './index-BCLI0M1W.js';
import './url-healing-Vba5GwtC.js';
import './index4-D71bD0RT.js';
import './RelayPublishDropdownContent-CzmVdnh5.js';
import './RelayIcon-DEER5mbZ.js';
import './index5-D9xIoHLj.js';
import './event-content-COF8hoaI.js';
import './index.svelte-EYlAHNHC.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let showDialog = true;
    function handleClose() {
      goto();
    }
    function handlePublished() {
      goto();
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      ComposeDialog($$renderer3, {
        onClose: handleClose,
        onPublished: handlePublished,
        get open() {
          return showDialog;
        },
        set open($$value) {
          showDialog = $$value;
          $$settled = false;
        }
      });
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
//# sourceMappingURL=_page.svelte-DE_yhmzR.js.map
