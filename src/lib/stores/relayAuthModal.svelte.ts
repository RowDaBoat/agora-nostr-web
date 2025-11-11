interface RelayAuthRequest {
  relayUrl: string;
  onConfirm: () => void;
  onReject: () => void;
}

let show = $state(false);
let request = $state<RelayAuthRequest | null>(null);

export const relayAuthModal = {
  get show() {
    return show;
  },
  set show(value: boolean) {
    show = value;
  },
  get request() {
    return request;
  },
  set request(value: RelayAuthRequest | null) {
    request = value;
  },

  confirm() {
    if (request) {
      request.onConfirm();
      show = false;
      request = null;
    }
  },

  reject() {
    if (request) {
      request.onReject();
      show = false;
      request = null;
    }
  }
};
