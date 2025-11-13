import { e as escape_html } from './escaping-CqgfEcN3.js';
import 'clsx';
import './state.svelte-zw3OW0Pf.js';
import { s as stores } from './client-C1nnVzci.js';
import { W as getContext } from './context-D7LG2f18.js';
import './utils-KcIDVAAe.js';
import './index-BYTxiVRf.js';

({
  check: stores.updated.check
});
function context() {
  return getContext("__request__");
}
const page$1 = {
  get error() {
    return context().page.error;
  },
  get status() {
    return context().page.status;
  }
};
const page = page$1;
function Error$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<h1>${escape_html(page.status)}</h1> <p>${escape_html(page.error?.message)}</p>`);
  });
}

export { Error$1 as default };
//# sourceMappingURL=error.svelte-D9nHkWDn.js.map
