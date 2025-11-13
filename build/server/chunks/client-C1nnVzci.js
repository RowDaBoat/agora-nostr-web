import './utils-KcIDVAAe.js';
import { w as writable } from './index-BYTxiVRf.js';
import 'clsx';
import './state.svelte-zw3OW0Pf.js';

function create_updated_store() {
  const { set, subscribe } = writable(false);
  {
    return {
      subscribe,
      // eslint-disable-next-line @typescript-eslint/require-await
      check: async () => false
    };
  }
}
const stores = {
  updated: /* @__PURE__ */ create_updated_store()
};
function goto(url, opts = {}) {
  {
    throw new Error("Cannot call goto(...) on the server");
  }
}

export { goto as g, stores as s };
//# sourceMappingURL=client-C1nnVzci.js.map
