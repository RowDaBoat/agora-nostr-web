type LoginState = 'signup' | 'login';

let show = $state(false);
let state = $state<LoginState>('signup');

export const loginModal = {
  get show() {
    return show;
  },
  set show(value: boolean) {
    show = value;
  },
  get state() {
    return state;
  },
  set state(value: LoginState) {
    state = value;
  }
};
