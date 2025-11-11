let show = $state(false);

export const createListingModal = {
  get show() {
    return show;
  },
  set show(value: boolean) {
    show = value;
  }
};
