let show = $state(false);

export const createInviteModal = {
  get show() {
    return show;
  },
  set show(value: boolean) {
    show = value;
  }
};
