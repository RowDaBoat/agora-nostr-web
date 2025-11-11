let show = $state(false);

export const createMediaPostModal = {
  get show() {
    return show;
  },
  set show(value: boolean) {
    show = value;
  }
};
