import type { Snippet } from 'svelte';

export interface BackNavigation {
  label?: string;
  href?: string;
  onclick?: () => void;
}

export interface HeaderConfig {
  title: string;
  subtitle?: string;
  actions?: Snippet;
  backNav?: BackNavigation;
}

class HeaderStore {
  private _header = $state<Snippet | null>(null);
  private _headerConfig = $state<HeaderConfig | null>(null);
  private _backNav = $state<BackNavigation | null>(null);

  get header() {
    return this._header;
  }

  set header(header: Snippet | null) {
    this._header = header;
    this._headerConfig = null; // Clear config when using snippet
  }

  get headerConfig() {
    return this._headerConfig;
  }

  set headerConfig(config: HeaderConfig | null) {
    this._headerConfig = config;
    this._header = null; // Clear snippet when using config
  }

  get backNav() {
    return this._backNav;
  }

  set backNav(backNav: BackNavigation | null) {
    this._backNav = backNav;
  }

  clear() {
    this._header = null;
    this._headerConfig = null;
    this._backNav = null;
  }
}

export const headerStore = new HeaderStore();
