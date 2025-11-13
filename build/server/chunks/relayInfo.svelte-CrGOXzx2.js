import 'clsx';

function useRelayInfoCached(relayUrl) {
  let info = null;
  let loading = false;
  return {
    get info() {
      return info;
    },
    get loading() {
      return loading;
    }
  };
}

export { useRelayInfoCached as u };
//# sourceMappingURL=relayInfo.svelte-CrGOXzx2.js.map
