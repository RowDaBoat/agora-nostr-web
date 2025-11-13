import 'clsx';
import { a9 as hasContext, W as getContext } from './context-D7LG2f18.js';

const NDK_CONTEXT_KEY = "ndk";
function resolveNDK(providedNDK) {
  if (providedNDK) return providedNDK;
  try {
    if (hasContext(NDK_CONTEXT_KEY)) {
      const contextNDK = getContext(NDK_CONTEXT_KEY);
      if (contextNDK) return contextNDK;
    }
  } catch {
  }
  throw new Error(`NDK not found. Either:
1. Provide as second parameter: createBuilder(() => config, ndk)
2. Set in Svelte context: setContext('${NDK_CONTEXT_KEY}', ndk)`);
}

export { resolveNDK as r };
//# sourceMappingURL=index.svelte-EYlAHNHC.js.map
