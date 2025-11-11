let show = $state(false);

export const createTradeModal = {
  get show() {
    return show;
  },
  set show(value: boolean) {
    show = value;
  }
};
