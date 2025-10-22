import type { Snippet } from 'svelte';

class SidebarStore {
  private _rightSidebar = $state<Snippet | null>(null);
  private _showOnMobile = $state<boolean>(false);

  get rightSidebar() {
    return this._rightSidebar;
  }

  set rightSidebar(sidebar: Snippet | null) {
    this._rightSidebar = sidebar;
  }

  get showOnMobile() {
    return this._showOnMobile;
  }

  set showOnMobile(value: boolean) {
    this._showOnMobile = value;
  }

  clear() {
    this._rightSidebar = null;
    this._showOnMobile = false;
  }
}

export const sidebarStore = new SidebarStore();
