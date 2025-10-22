import type { Snippet } from 'svelte';

export interface BackNavigation {
  label?: string;
  href?: string;
  onclick?: () => void;
}

class HeaderStore {
  private _header = $state<Snippet | null>(null);
  private _backNav = $state<BackNavigation | null>(null);

  get header() {
    return this._header;
  }

  set header(header: Snippet | null) {
    this._header = header;
  }

  get backNav() {
    return this._backNav;
  }

  set backNav(backNav: BackNavigation | null) {
    this._backNav = backNav;
  }

  clear() {
    this._header = null;
    this._backNav = null;
  }
}

export const headerStore = new HeaderStore();
