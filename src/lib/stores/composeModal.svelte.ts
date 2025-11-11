let show = $state(false);

export const composeModal = {
  get show() {
    return show;
  },
  set show(value: boolean) {
    show = value;
  }
};
