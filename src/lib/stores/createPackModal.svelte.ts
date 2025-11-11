import type { NDKEvent } from '@nostr-dev-kit/ndk';

let show = $state(false);
let data = $state<NDKEvent | null>(null);

export const createPackModal = {
  get show() {
    return show;
  },
  set show(value: boolean) {
    show = value;
  },
  get data() {
    return data;
  },
  set data(value: NDKEvent | null) {
    data = value;
  }
};
