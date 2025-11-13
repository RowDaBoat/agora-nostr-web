import 'clsx';
import { n as setContext } from './context-D7LG2f18.js';
import { n as ndk, g as getRelaysToUse, s as settings, i as isAgoraRelay, a as relayFeeds } from './ndk.svelte-BfhDBrJw.js';
import '@nostr-dev-kit/messages';
import './npubcash.svelte-CJyS_ttu.js';
import { M as MediaQuery } from './scroll-lock-YhRhLzPR.js';
import { g as store_get, a as attr_class, s as stringify, b as attr, e as ensure_array_like, u as unsubscribe_stores, f as bind_props, h as spread_props, c as clsx } from './index2-DpBdzO5t.js';
import { p as page } from './stores-lKKGOiBk.js';
import { $ as $format } from './runtime-9tjL5BFW.js';
import { NDKSubscriptionCacheUsage, NDKKind, NDKArticle, NDKClassified, NDKEvent, NDKRelaySet } from '@nostr-dev-kit/ndk';
import { U as User_search_combobox, m as messagesStore } from './user-search-combobox-BJgb5eB_.js';
import { c as createNotificationsManager } from './useNotifications.svelte-DLvlGrAk.js';
import './utils-KcIDVAAe.js';
import './state.svelte-zw3OW0Pf.js';
import { u as useRelayInfoCached } from './relayInfo.svelte-CrGOXzx2.js';
import { R as RelayIcon } from './RelayIcon-DEER5mbZ.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import { U as User$1 } from './index4-D71bD0RT.js';
import { I as Icon, L as Label } from './RelayPublishDropdownContent-CzmVdnh5.js';
import { N as NewMemberCard } from './NewMemberCard-33LCI8Hd.js';
import { U as User } from './User-DEyHoCXN.js';
import { g as goto } from './client-C1nnVzci.js';
import { R as Root, D as Dialog_content, a as Dialog_title } from './index3-DOo-Ka_h.js';
import { D as Dialog_header } from './dialog-header-DSVdIrOb.js';
import { C as ComposeDialog, N as NDKBlossom } from './ComposeDialog-rF5DhufZ.js';
import { t as toast } from './toast.svelte-BEvONWAz.js';
import { B as Button } from './button-DBIbgud-.js';
import { I as Input, D as Dialog_footer } from './input-BbRZJqts.js';
import { T as Textarea } from './textarea-DfKFjAUT.js';
import './url-healing-Vba5GwtC.js';
import '@nostr-dev-kit/wallet';
import '@nostr-dev-kit/wot';
import { c as createBlossomUpload } from './blossom-upload.svelte-Bf1gqD-l.js';
import '@nostr-dev-kit/sessions';
import '@nostr-dev-kit/sync';
import { D as Dialog_description } from './dialog-description-C9BRLaT0.js';
import { C as CreateOrderModal } from './CreateOrderModal-Bzte9lJq.js';
import '@nostr-dev-kit/cache-sqlite-wasm';
import 'tty';
import 'util';
import 'os';
import './events-CY0_bqjb.js';
import './index-BYTxiVRf.js';
import './index.svelte-EYlAHNHC.js';
import './floating-layer-anchor-DIntB4dN.js';
import './popper-layer-force-mount-B4z1kw84.js';
import './nostr-UslzAMIC.js';
import 'tailwind-merge';
import './utils2-B05Dmz_H.js';
import './follow-button-btj2XHXB.js';
import './index-BCLI0M1W.js';
import './popover-BWwSCSLf.js';
import './index5-D9xIoHLj.js';
import './event-content-COF8hoaI.js';
import './button2-JT-_T3Ay.js';

class SidebarStore {
  _rightSidebar = null;
  _showOnMobile = false;
  get rightSidebar() {
    return this._rightSidebar;
  }
  set rightSidebar(sidebar) {
    this._rightSidebar = sidebar;
  }
  get showOnMobile() {
    return this._showOnMobile;
  }
  set showOnMobile(value) {
    this._showOnMobile = value;
  }
  clear() {
    this._rightSidebar = null;
    this._showOnMobile = false;
  }
}
const sidebarStore = new SidebarStore();
class HeaderStore {
  _header = null;
  _headerConfig = null;
  _backNav = null;
  get header() {
    return this._header;
  }
  set header(header) {
    this._header = header;
    this._headerConfig = null;
  }
  get headerConfig() {
    return this._headerConfig;
  }
  set headerConfig(config) {
    this._headerConfig = config;
    this._header = null;
  }
  get backNav() {
    return this._backNav;
  }
  set backNav(backNav) {
    this._backNav = backNav;
  }
  clear() {
    this._header = null;
    this._headerConfig = null;
    this._backNav = null;
  }
}
const headerStore = new HeaderStore();
class LayoutModeStore {
  _mode = "default";
  get mode() {
    return this._mode;
  }
  setArticleMode() {
    this._mode = "article";
  }
  setProfileMode() {
    this._mode = "profile";
  }
  setReadsMode() {
    this._mode = "reads";
  }
  setDefaultMode() {
    this._mode = "default";
  }
  reset() {
    this._mode = "default";
  }
}
const layoutMode = new LayoutModeStore();
class LayoutStore {
  // Sidebar collapse state
  sidebarCollapsed = false;
  // Right sidebar visibility
  rightSidebarVisible = true;
  // Mobile sidebar visibility (for responsive behavior)
  mobileSidebarOpen = false;
  constructor() {
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("sidebarCollapsed");
      if (savedState !== null) {
        this.sidebarCollapsed = savedState === "true";
      }
    }
  }
  /**
   * Toggle sidebar collapsed state
   */
  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
    this.persistCollapseState();
  }
  /**
   * Collapse the sidebar
   */
  collapseSidebar() {
    if (!this.sidebarCollapsed) {
      this.sidebarCollapsed = true;
      this.persistCollapseState();
    }
  }
  /**
   * Expand the sidebar
   */
  expandSidebar() {
    if (this.sidebarCollapsed) {
      this.sidebarCollapsed = false;
      this.persistCollapseState();
    }
  }
  /**
   * Set right sidebar visibility
   */
  setRightSidebarVisibility(visible) {
    this.rightSidebarVisible = visible;
  }
  /**
   * Toggle mobile sidebar
   */
  toggleMobileSidebar() {
    this.mobileSidebarOpen = !this.mobileSidebarOpen;
  }
  /**
   * Close mobile sidebar
   */
  closeMobileSidebar() {
    this.mobileSidebarOpen = false;
  }
  /**
   * Auto-collapse for article mode
   */
  setArticleMode() {
    this.collapseSidebar();
    this.setRightSidebarVisibility(false);
  }
  /**
   * Reset to default layout
   */
  reset() {
    this.expandSidebar();
    this.setRightSidebarVisibility(true);
    this.closeMobileSidebar();
  }
  /**
   * Persist collapse state to localStorage
   */
  persistCollapseState() {
    if (typeof window !== "undefined") {
      localStorage.setItem("sidebarCollapsed", String(this.sidebarCollapsed));
    }
  }
}
const layoutStore = new LayoutStore();
function getContentUrl(content, author, fallbackPrefix = "item") {
  return `/${fallbackPrefix}/${content.encode()}`;
}
function getArticleUrl(article, author) {
  return getContentUrl(article, author, "article");
}
function formatBalance(sats) {
  if (sats === 0) return "0";
  if (sats >= 1e6) return `${(sats / 1e6).toFixed(1)}M`;
  if (sats >= 1e3) return `${(sats / 1e3).toFixed(1)}k`;
  return new Intl.NumberFormat("en-US").format(sats);
}
function RelaySelector($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { active = false, collapsed = false, iconOnly = false } = $$props;
    const follows = ndk.$sessions?.follows || [];
    const hasFollows = follows.size > 0;
    !!ndk.$currentUser && hasFollows;
    let favoritePackEvents = [];
    let userCreatedPackEvents = [];
    const allPacks = (() => {
      const packMap = /* @__PURE__ */ new Map();
      for (const pack of userCreatedPackEvents) {
        packMap.set(pack.id, pack);
      }
      for (const pack of favoritePackEvents) {
        packMap.set(pack.id, pack);
      }
      return Array.from(packMap.values());
    })();
    const selectedRelayInfo = (() => {
      if (!settings.selectedRelay) return null;
      if (isFollowPackSelection(settings.selectedRelay)) return null;
      return useRelayInfoCached(settings.selectedRelay);
    })();
    function isFollowPackSelection(value) {
      return value?.startsWith("followpack:") ?? false;
    }
    const selectedFollowPack = (() => {
      if (!settings.selectedRelay || !isFollowPackSelection(settings.selectedRelay)) return null;
      const packId = settings.selectedRelay.replace("followpack:", "");
      return allPacks.find((e) => e.id === packId || e.encode() === packId);
    })();
    const displayName = (() => {
      if (isFollowPackSelection(settings.selectedRelay) && selectedFollowPack) {
        return selectedFollowPack.tagValue("title") || "Untitled Pack";
      }
      if (settings.selectedRelay && selectedRelayInfo?.info?.name) {
        return selectedRelayInfo.info.name;
      }
      if (settings.selectedRelay) {
        return settings.selectedRelay.replace("wss://", "").replace("ws://", "");
      }
      return "Following";
    })();
    $$renderer2.push(`<div class="relative"><button${attr_class(iconOnly ? "flex items-center justify-center w-8 h-8 rounded-full hover:bg-muted/50 transition-colors" : collapsed ? "flex items-center justify-center p-3 rounded-lg transition-colors w-full " + (active ? "text-primary bg-primary/10 text-primary" : "text-foreground hover:bg-muted/50") : "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full " + (active ? "text-primary bg-primary/10" : "text-foreground hover:bg-muted/50"))}${attr("aria-label", settings.selectedRelay ? "Change filter" : "Change following filter")}${attr("title", collapsed ? displayName : void 0)}>`);
    if (isFollowPackSelection(settings.selectedRelay)) {
      $$renderer2.push("<!--[-->");
      if (selectedFollowPack?.tagValue("image")) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<img${attr("src", selectedFollowPack.tagValue("image"))} alt=""${attr_class(`${stringify(iconOnly ? "w-5 h-5" : "w-6 h-6")} rounded flex-shrink-0`)}/>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<div${attr_class(`${stringify(iconOnly ? "w-5 h-5" : "w-6 h-6")} rounded bg-primary flex items-center justify-center flex-shrink-0`)}><svg${attr_class(`${stringify(iconOnly ? "w-3 h-3" : "w-4 h-4")} text-foreground`)} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg></div>`);
      }
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (settings.selectedRelay) {
        $$renderer2.push("<!--[-->");
        RelayIcon($$renderer2, {
          relayUrl: settings.selectedRelay,
          size: iconOnly ? "md" : "lg"
        });
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<svg${attr_class(iconOnly ? "w-5 h-5 text-muted-foreground" : "w-6 h-6")} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--> `);
    if (!collapsed && !iconOnly) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span class="font-medium flex-1 text-left whitespace-nowrap overflow-hidden text-ellipsis">${escape_html(displayName)}</span> <svg${attr_class(`w-4 h-4 transition-transform ${stringify("")}`)} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></button>  `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function LoginButton($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const {
      class: className = "px-4 py-2 bg-primary hover:bg-accent-dark text-foreground rounded-lg transition-colors font-semibold"
    } = $$props;
    const displayName = "Anon";
    if (ndk.$currentUser) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<button class="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted text-foreground rounded-lg transition-colors">`);
      {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<div class="w-6 h-6 rounded-full bg-primary flex items-center justify-center"><span class="text-xs font-bold">${escape_html(displayName.charAt(0).toUpperCase())}</span></div>`);
      }
      $$renderer2.push(`<!--]--> <span>${escape_html(displayName)}</span> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg></button>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<button${attr_class(clsx(className))}><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg> <span>Login</span></button>`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function UserMenu($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { collapsed = false } = $$props;
    const displayName = "Anonymous";
    const npub = ndk.$currentUser?.npub;
    if (ndk.$currentUser) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<button${attr_class(`w-full flex items-center ${stringify(collapsed ? "justify-center p-3" : "gap-3 px-2 py-2")} rounded-lg hover:bg-muted transition-colors cursor-pointer`)}${attr("title", collapsed ? displayName : void 0)}><!---->`);
      User$1.Root($$renderer2, {
        ndk,
        pubkey: ndk.$currentUser.pubkey,
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->`);
          User$1.Avatar($$renderer3, { class: "w-10 h-10" });
          $$renderer3.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----> `);
      if (!collapsed) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex-1 min-w-0 text-left"><p class="font-medium text-sm truncate text-foreground">${escape_html(displayName)}</p> <p class="text-xs text-muted-foreground truncate">${escape_html(npub ? `${npub.slice(0, 16)}...` : "")}</p></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></button>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function Badge($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const {
      variant = "primary",
      size = "sm",
      indicator = false,
      class: className = "",
      children
    } = $$props;
    const variantClasses = {
      primary: "bg-primary text-primary-foreground",
      secondary: "bg-primary/20 text-primary"
    }[variant];
    const sizeClasses = indicator ? "w-2 h-2" : {
      xs: "min-w-[18px] h-[18px] px-1 text-[10px] font-bold",
      sm: "px-2 py-1 text-xs font-medium"
    }[size];
    $$renderer2.push(`<span${attr_class(`rounded-full flex items-center justify-center ${stringify(variantClasses)} ${stringify(sizeClasses)} ${stringify(className)}`)}>`);
    if (!indicator && children) {
      $$renderer2.push("<!--[-->");
      children($$renderer2);
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></span>`);
  });
}
function SidebarNav($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const {
      collapsed = false,
      onSearchClick,
      onPrimaryAction
    } = $$props;
    const wallet = ndk.$wallet;
    const notificationsManager = createNotificationsManager(ndk);
    const currentPath = store_get($$store_subs ??= {}, "$page", page).url.pathname;
    const navItems = [
      {
        type: "component",
        component: RelaySelector,
        componentProps: { active: currentPath === "/", collapsed }
      },
      {
        type: "link",
        href: "/messages",
        icon: "message",
        label: "navigation.messages",
        active: (path) => path.startsWith("/messages"),
        badge: () => messagesStore.totalUnreadCount || null
      },
      {
        type: "button",
        icon: "search",
        label: "Search",
        onClick: onSearchClick
      },
      {
        type: "link",
        href: "/notifications",
        icon: "bell",
        label: "Notifications",
        active: (path) => path.startsWith("/notifications"),
        badge: () => notificationsManager.counts.all || null
      },
      {
        type: "link",
        href: "/wallet",
        icon: "wallet",
        label: "Wallet",
        active: (path) => path.startsWith("/wallet"),
        rightContent: () => wallet?.balance && wallet.balance > 0 ? formatBalance(wallet.balance) : null
      },
      {
        type: "link",
        href: "/agora/invites",
        icon: "users",
        label: "Community Invites",
        active: (path) => path.startsWith("/agora/invites"),
        visible: () => settings.selectedRelay ? isAgoraRelay(settings.selectedRelay) : false
      },
      {
        type: "link",
        href: "/packs",
        icon: "packs",
        label: "navigation.followPacks",
        active: (path) => path.startsWith("/packs")
      },
      {
        type: "link",
        href: "/relay-feeds",
        icon: "relay",
        label: "Relay Feeds",
        active: (path) => path.startsWith("/relay-feeds"),
        visible: () => relayFeeds?.relays.length > 0,
        rightContent: () => relayFeeds?.relays.length ? String(relayFeeds.relays.length) : null
      },
      {
        type: "link",
        href: "/trades",
        icon: "trades",
        label: "navigation.trades",
        active: (path) => path === "/trades"
      },
      {
        type: "link",
        href: "/marketplace",
        icon: "marketplace",
        label: "navigation.marketplace",
        active: (path) => path === "/marketplace"
      }
    ];
    const visibleNavItems = navItems.filter((item) => !item.visible || item.visible());
    const primaryActionConfig = (() => {
      if (currentPath === "/marketplace") {
        return {
          icon: "plus",
          label: store_get($$store_subs ??= {}, "$t", $format)("classifieds.createListing")
        };
      } else if (currentPath === "/trades") {
        return { icon: "plus", label: "Create Trade" };
      } else if (currentPath === "/agora/invites") {
        return { icon: "invite", label: "Create Invite" };
      } else {
        return {
          icon: "edit",
          label: store_get($$store_subs ??= {}, "$t", $format)("navigation.compose")
        };
      }
    })();
    $$renderer2.push(`<aside${attr_class(`hidden lg:flex ${stringify(collapsed ? "w-16" : "w-64")} p-2 flex-col border-r border-border fixed left-0 top-0 bottom-0 overflow-y-auto overflow-x-visible transition-all duration-300 ease-in-out bg-background`)}><div${attr_class(`mb-6 flex items-center ${stringify(collapsed ? "justify-center" : "justify-between")} gap-2`)}><div${attr_class(`px-2 ${stringify(collapsed ? "hidden" : "flex-1")} transition-opacity duration-300 text-foreground`)}><svg viewBox="0 0 686 250" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg"><style>
          .st0{fill:#F68E1D;}
          .st1{fill:currentColor;}
          .st2{fill:currentColor;opacity:0.9;}
        </style><path class="st0" d="M109.5,196.1h66.7c17.5,0,31.6-14.2,31.6-31.6V97.8c0-17.5-14.2-31.6-31.6-31.6h-66.7
          c-17.5,0-31.6,14.2-31.6,31.6v66.7C77.9,182,92,196.1,109.5,196.1z"></path><g><path class="st1" d="M233.9,165.4v-0.9c3.6-0.3,6.4-1.1,8.4-2.4c2-1.3,3.5-3.2,4.7-5.8l24.2-54.9h3.8l28.5,57.6
            c0.7,1.4,1.7,2.6,3.2,3.6c1.4,1,3.6,1.6,6.4,1.9v0.9h-27.7v-0.9c2.9-0.3,4.7-0.9,5.4-1.9c0.8-1,0.8-2.2,0.1-3.6l-21.5-44.6
            L251,156.3c-1.1,2.6-0.9,4.5,0.5,5.8c1.4,1.3,3.9,2.1,7.6,2.4v0.9H233.9z M273.1,87.7h8.8l-7.8,9.2h-3L273.1,87.7z"></path><path class="st1" d="M358.3,135.2c0-1.5-0.6-2.7-1.8-3.7c-1.2-0.9-3.3-1.5-6.1-1.8v-0.9H378v0.9c-2.9,0.3-4.9,0.9-6.1,1.8
            c-1.2,0.9-1.8,2.1-1.8,3.7v32.9c0,1.5,0.6,2.7,1.8,3.7c1.2,0.9,3.3,1.5,6.1,1.8v0.9h-29v-0.9c3.5-0.3,5.9-0.9,7.2-1.8
            c1.3-0.9,2-2.1,2-3.7v-11.1c-1.5,2.9-3.7,5.2-6.7,6.7c-2.9,1.6-6.8,2.3-11.5,2.3c-4.5,0-8.7-0.7-12.3-2.2c-3.7-1.5-6.8-3.6-9.4-6.4
            c-2.6-2.8-4.6-6.2-6-10.2c-1.4-4-2.1-8.6-2.1-13.6c0-5.1,0.7-9.6,2.2-13.7c1.5-4.1,3.7-7.5,6.6-10.4c2.9-2.9,6.5-5.1,10.9-6.7
            c4.4-1.6,9.4-2.3,15.1-2.3c3.8,0,7.5,0.3,11.2,1c3.7,0.7,7.2,1.7,10.6,3v15.6h-1.3c-1.1-2.5-2.3-4.8-3.7-6.8c-1.4-2-3-3.8-4.7-5.3
            c-1.8-1.5-3.7-2.6-5.9-3.4c-2.2-0.8-4.6-1.2-7.3-1.2c-3.6,0-6.8,0.7-9.5,2.1c-2.7,1.4-4.9,3.4-6.7,6c-1.8,2.6-3.2,5.7-4,9.3
            c-0.9,3.6-1.3,7.7-1.3,12.2c0,9.2,1.8,16.2,5.5,20.8c3.7,4.7,8.6,7,14.6,7c4.8,0,8.5-1.6,11.3-4.8c2.7-3.2,4.2-8.5,4.5-15.8V135.2z
            "></path><path class="st1" d="M480.2,101.4c12.3,0,21.4,1.4,27.3,4.3c5.8,2.9,8.8,6.9,8.8,12.1c0,3.8-1.6,7.1-4.7,9.7
            c-3.2,2.6-8,4.5-14.7,5.6l19,25.9c0.9,1.3,2.2,2.4,3.8,3.5c1.6,1,3.8,1.7,6.7,2v0.9h-27.7v-0.9c2.9-0.3,4.5-1,4.8-2
            c0.3-1,0-2.2-0.9-3.5l-17.9-24.8c-0.7,0.1-1.4,0.1-2.1,0.1c-0.8,0-1.5,0-2.3,0h-7.1V159c0,1.5,0.6,2.7,1.8,3.7
            c1.2,0.9,3.3,1.5,6.1,1.8v0.9h-27.7v-0.9c2.9-0.3,4.9-0.9,6.1-1.8c1.2-0.9,1.8-2.1,1.8-3.7v-51.2c0-1.5-0.6-2.7-1.8-3.7
            c-1.2-0.9-3.3-1.5-6.1-1.8v-0.9H480.2z M480.2,131.6c8.2,0,14.3-1.2,18.1-3.5c3.8-2.3,5.7-5.7,5.7-10.2c0-4.5-1.9-7.9-5.7-10.2
            c-3.8-2.3-9.8-3.5-18.1-3.5h-7.1v27.5H480.2z"></path><path class="st1" d="M528.9,165.4v-0.9c3.6-0.3,6.4-1.1,8.4-2.4c2-1.3,3.5-3.2,4.7-5.8l24.2-54.9h3.8l28.5,57.6
            c0.7,1.4,1.7,2.6,3.2,3.6c1.4,1,3.6,1.6,6.4,1.9v0.9h-27.7v-0.9c2.9-0.3,4.7-0.9,5.4-1.9c0.8-1,0.8-2.2,0.1-3.6l-21.5-44.6
            L546,156.3c-1.1,2.6-0.9,4.5,0.5,5.8c1.4,1.3,3.9,2.1,7.6,2.4v0.9H528.9z"></path><path class="st1" d="M445.1,120c-1.5-4-3.7-7.5-6.5-10.3c-2.8-2.9-6.2-5.1-10.1-6.6c-4-1.6-8.4-2.3-13.4-2.3
            c-4.9,0-9.3,0.8-13.3,2.3c-4,1.6-7.4,3.8-10.2,6.6c-2.8,2.9-5,6.3-6.5,10.3c-1.5,4-2.3,8.5-2.3,13.5s0.8,9.4,2.3,13.5
            c1.5,4,3.7,7.5,6.5,10.3c2.8,2.9,6.2,5.1,10.2,6.6c4,1.6,8.4,2.3,13.3,2.3c5,0,9.4-0.8,13.4-2.3c3.9-1.6,7.3-3.8,10.1-6.6
            c2.8-2.9,5-6.3,6.5-10.3c1.5-4,2.3-8.5,2.3-13.5S446.6,124,445.1,120z M415,163.4c-12.4,0-20.9-13.4-20.9-30s8.2-30,20.9-30
            c13,0,20.9,13.4,20.9,30S428,163.4,415,163.4z"></path></g><path d="M144.2,133.4h-2.9v0.1C142.3,133.5,143.3,133.5,144.2,133.4z"></path><polygon class="st2" points="143.9,97.2 101,109.3 101,113.8 186.8,113.8 186.8,109.3 "></polygon><polygon class="st2" points="104.4,115.4 106,117.6 181.2,117.6 182.6,115.4 "></polygon><path class="st2" d="M125,120.4h-11.8h-0.8h-11.8l-1.5,1.8l6.4,4.6h0.1v34.7h14.6v-34.7h0.1l6.4-4.6L125,120.4z M111.2,157h-2.6
          v-29.2h2.6V157z M117.1,157h-2.6v-29.2h2.6V157z"></path><path class="st2" d="M185.3,120.4h-11.8h-0.8h-11.8l-1.5,1.8l6.4,4.6h0.1v34.7h14.6v-34.7h0.1l6.4-4.6L185.3,120.4z M171.4,157h-2.6
          v-29.2h2.6V157z M177.3,157h-2.6v-29.2h2.6V157z"></path><path class="st2" d="M155.2,120.4h-11.8h-0.8h-11.8l-1.5,1.8l6.4,4.6h0.1v34.7h14.6v-34.7h0.1l6.4-4.6L155.2,120.4z M141.3,157h-2.6
          v-29.2h2.6V157z M147.2,157h-2.6v-29.2h2.6V157z"></path><path class="st1" d="M284.4,150.2h-2.6v0.1C282.7,150.3,283.6,150.3,284.4,150.2z"></path></svg></div> <button class="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-primary flex-shrink-0"${attr("aria-label", collapsed ? "Expand sidebar" : "Collapse sidebar")}>`);
    if (collapsed) {
      $$renderer2.push("<!--[-->");
      Icon($$renderer2, { name: "chevron-right", size: "md" });
    } else {
      $$renderer2.push("<!--[!-->");
      Icon($$renderer2, { name: "chevron-left", size: "md" });
    }
    $$renderer2.push(`<!--]--></button></div> <nav class="flex-1 space-y-2"><!--[-->`);
    const each_array = ensure_array_like(visibleNavItems);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let item = each_array[$$index];
      if (item.type === "component" && item.component) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<!---->`);
        item.component?.($$renderer2, spread_props([item.componentProps]));
        $$renderer2.push(`<!---->`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (item.type === "link" && item.href) {
          $$renderer2.push("<!--[-->");
          const isActive = item.active ? item.active(currentPath) : false;
          $$renderer2.push(`<a${attr("href", item.href)}${attr_class(`flex items-center ${stringify(collapsed ? "justify-center p-3" : "justify-between px-4 py-3")} rounded-lg transition-colors ${stringify(isActive ? "text-primary bg-primary/10" : "text-foreground hover:bg-muted")} relative`)}${attr("title", collapsed && item.label ? store_get($$store_subs ??= {}, "$t", $format)(item.label) : void 0)}><div${attr_class(`flex items-center ${stringify(collapsed ? "" : "gap-3")}`)}>`);
          if (item.icon) {
            $$renderer2.push("<!--[-->");
            Icon($$renderer2, { name: item.icon, size: "lg" });
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--> `);
          if (!collapsed && item.label) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<span class="font-medium">${escape_html(store_get($$store_subs ??= {}, "$t", $format)(item.label))}</span>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--></div> `);
          if (item.badge && item.badge() !== null) {
            $$renderer2.push("<!--[-->");
            const badgeValue = item.badge();
            if (collapsed) {
              $$renderer2.push("<!--[-->");
              Badge($$renderer2, {
                size: "xs",
                class: "absolute top-1.5 right-1.5",
                children: ($$renderer3) => {
                  $$renderer3.push(`<!---->${escape_html(badgeValue > 9 ? "9+" : badgeValue)}`);
                }
              });
            } else {
              $$renderer2.push("<!--[!-->");
              Badge($$renderer2, {
                size: "sm",
                children: ($$renderer3) => {
                  $$renderer3.push(`<!---->${escape_html(badgeValue > 99 ? "99+" : badgeValue)}`);
                }
              });
            }
            $$renderer2.push(`<!--]-->`);
          } else {
            $$renderer2.push("<!--[!-->");
            if (!collapsed && item.rightContent && item.rightContent()) {
              $$renderer2.push("<!--[-->");
              if (item.href === "/relay-feeds") {
                $$renderer2.push("<!--[-->");
                Badge($$renderer2, {
                  variant: "secondary",
                  size: "sm",
                  class: "gap-1",
                  children: ($$renderer3) => {
                    Icon($$renderer3, { name: "trending", size: "xs" });
                    $$renderer3.push(`<!----> ${escape_html(item.rightContent())}`);
                  }
                });
              } else {
                $$renderer2.push("<!--[!-->");
                $$renderer2.push(`<span class="text-xs text-muted-foreground font-medium">${escape_html(item.rightContent())}</span>`);
              }
              $$renderer2.push(`<!--]-->`);
            } else {
              $$renderer2.push("<!--[!-->");
            }
            $$renderer2.push(`<!--]-->`);
          }
          $$renderer2.push(`<!--]--></a>`);
        } else {
          $$renderer2.push("<!--[!-->");
          if (item.type === "button" && item.onClick) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<button${attr_class(`w-full flex items-center ${stringify(collapsed ? "justify-center p-3" : "gap-3 px-4 py-3")} rounded-lg transition-colors text-foreground hover:bg-muted`)}${attr("title", collapsed && item.label ? item.label : void 0)}>`);
            if (item.icon) {
              $$renderer2.push("<!--[-->");
              Icon($$renderer2, { name: item.icon, size: "lg" });
            } else {
              $$renderer2.push("<!--[!-->");
            }
            $$renderer2.push(`<!--]--> `);
            if (!collapsed && item.label) {
              $$renderer2.push("<!--[-->");
              $$renderer2.push(`<span class="font-medium">${escape_html(item.label)}</span>`);
            } else {
              $$renderer2.push("<!--[!-->");
            }
            $$renderer2.push(`<!--]--></button>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]-->`);
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--> `);
    if (ndk.$currentUser && onPrimaryAction) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<button${attr_class(`w-full flex items-center justify-center ${stringify(collapsed ? "p-3" : "gap-2 px-6 py-3")} bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full transition-colors mt-4`)}${attr("title", collapsed ? primaryActionConfig.label : void 0)}>`);
      Icon($$renderer2, { name: primaryActionConfig.icon, size: "md" });
      $$renderer2.push(`<!----> `);
      if (!collapsed) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span>${escape_html(primaryActionConfig.label)}</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></button>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></nav> <div class="mt-auto pt-4 border-t border-border">`);
    if (ndk.$currentUser) {
      $$renderer2.push("<!--[-->");
      UserMenu($$renderer2, { collapsed });
    } else {
      $$renderer2.push("<!--[!-->");
      LoginButton($$renderer2, {
        class: `w-full flex items-center justify-center ${stringify(collapsed ? "p-3" : "gap-2 px-4 py-3")} bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full transition-colors`
      });
    }
    $$renderer2.push(`<!--]--></div></aside>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function NewMembersWidget($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const shouldShow = !!settings.selectedRelay;
    const newMembersSubscription = (() => {
      if (!settings.selectedRelay) return null;
      return ndk.$subscribe(() => ({
        filters: [{ kinds: [514], limit: 10 }],
        relayUrls: [settings.selectedRelay],
        cacheUsage: NDKSubscriptionCacheUsage.ONLY_RELAY,
        subId: "new-members-514"
      }));
    })();
    const newMembers = (() => {
      if (!newMembersSubscription) return [];
      const events = newMembersSubscription.events;
      const members = events.map((event) => {
        const inviterPubkey = event.tagValue("p");
        return {
          memberPubkey: event.pubkey,
          inviterPubkey,
          joinedAt: event.created_at || 0
        };
      }).sort((a, b) => b.joinedAt - a.joinedAt).slice(0, 5);
      return members;
    })();
    if (shouldShow && newMembers.length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="p-4"><div class="flex items-center gap-2 mb-4"><svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg> <h2 class="text-lg font-semibold text-card-foreground">New Members</h2></div> <div class="space-y-3"><!--[-->`);
      const each_array = ensure_array_like(newMembers);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let member = each_array[$$index];
        NewMemberCard($$renderer2, {
          memberPubkey: member.memberPubkey,
          inviterPubkey: member.inviterPubkey,
          joinedAt: member.joinedAt
        });
      }
      $$renderer2.push(`<!--]--></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function JournalistsSidebar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const relaysToUse = getRelaysToUse(settings.selectedRelay, settings.relays.filter((r) => r.enabled && r.read).map((r) => r.url));
    const articlesSubscription = ndk.$subscribe(() => ({
      filters: [{ kinds: [NDKKind.Article], limit: 50 }],
      bufferMs: 500,
      relayUrls: relaysToUse.length > 0 ? relaysToUse : void 0,
      cacheUsage: relaysToUse.length > 0 ? NDKSubscriptionCacheUsage.ONLY_RELAY : NDKSubscriptionCacheUsage.CACHE_FIRST,
      closeOnEose: true
    }));
    const journalists = (() => {
      const authorMap = /* @__PURE__ */ new Map();
      for (const event of articlesSubscription.events) {
        const count = authorMap.get(event.pubkey) || 0;
        authorMap.set(event.pubkey, count + 1);
      }
      return Array.from(authorMap.entries()).map(([pubkey, articleCount]) => ({ pubkey, articleCount })).sort((a, b) => b.articleCount - a.articleCount).slice(0, 5);
    })();
    function isFollowing(pubkey) {
      return ndk.$follows.includes(pubkey);
    }
    $$renderer2.push(`<div class="p-4"><div class="flex items-center gap-2 mb-4"><svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg> <h2 class="text-lg font-semibold text-card-foreground">Journalists</h2></div> <div class="space-y-3">`);
    if (journalists.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-4 text-sm text-muted-foreground">No journalists found yet</div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<!--[-->`);
      const each_array = ensure_array_like(journalists);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let journalist = each_array[$$index];
        isFollowing(journalist.pubkey);
        $$renderer2.push(`<div class="flex items-center gap-3">`);
        User($$renderer2, {
          pubkey: journalist.pubkey,
          variant: "avatar-name-meta",
          avatarSize: "w-10 h-10",
          nameSize: "text-sm font-medium",
          class: "flex-1 min-w-0"
        });
        $$renderer2.push(`<!----></div>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div></div>`);
  });
}
function MarketplaceSidebar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const relaysToUse = getRelaysToUse(settings.selectedRelay, settings.relays.filter((r) => r.enabled && r.read).map((r) => r.url));
    const subscription = ndk.$subscribe(() => ({
      filters: [{ kinds: [30402], limit: 5 }],
      // NDKKind.Classified
      bufferMs: 100,
      relayUrls: relaysToUse.length > 0 ? relaysToUse : void 0,
      cacheUsage: relaysToUse.length > 0 ? NDKSubscriptionCacheUsage.ONLY_RELAY : NDKSubscriptionCacheUsage.PARALLEL
    }));
    const recentListings = subscription.events.filter((event) => {
      const status = event.tagValue("status") || "active";
      return status === "active";
    }).slice(0, 5);
    function getListingImage(listing) {
      return listing.tagValue("image");
    }
    function getListingPrice(listing) {
      const priceTag = listing.tags.find((t) => t[0] === "price");
      if (!priceTag || !priceTag[1] || !priceTag[2]) return null;
      return { amount: priceTag[1], currency: priceTag[2] };
    }
    if (recentListings.length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex items-center justify-between mb-4"><div class="flex items-center gap-2"><svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg> <h3 class="text-lg font-semibold text-card-foreground">Recent Marketplace</h3></div> <button class="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">View All <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></button></div> <div class="space-y-3"><!--[-->`);
      const each_array = ensure_array_like(recentListings);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let listing = each_array[$$index];
        const price = getListingPrice(listing);
        $$renderer2.push(`<button class="w-full bg-muted/50 rounded-lg p-3 transition-all hover:bg-muted hover:scale-[1.02] text-left"><div class="flex gap-3">`);
        if (getListingImage(listing)) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="w-12 h-12 bg-muted rounded-lg overflow-hidden flex-shrink-0"><img${attr("src", getListingImage(listing))}${attr("alt", listing.tagValue("title") || "Listing")} class="w-full h-full object-cover"/></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> <div class="flex-1 min-w-0"><h4 class="text-sm font-medium text-card-foreground truncate">${escape_html(listing.tagValue("title") || "Untitled")}</h4> `);
        if (price) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<p class="text-xs text-muted-foreground mt-1">${escape_html(price.amount)} ${escape_html(price.currency)}</p>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div></div></button>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function DesktopLayout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const { children, onSearchClick, onPrimaryAction } = $$props;
    const path = store_get($$store_subs ??= {}, "$page", page).url.pathname;
    const hideRightSidebar = layoutMode.mode === "article" || layoutMode.mode === "profile" || layoutMode.mode === "reads" || path.startsWith("/note/") || path.startsWith("/messages/") || path.startsWith("/packs") || path.startsWith("/agora/invites") || !layoutStore.rightSidebarVisible;
    const sidebarRelaysToUse = getRelaysToUse(settings.selectedRelay, settings.relays.filter((r) => r.enabled && r.read).map((r) => r.url));
    const recentArticlesSubscription = (() => {
      if (!hideRightSidebar && !sidebarStore.rightSidebar) {
        return ndk.$subscribe(() => ({
          filters: [{ kinds: [NDKKind.Article], limit: 5 }],
          bufferMs: 500,
          relayUrls: sidebarRelaysToUse.length > 0 ? sidebarRelaysToUse : void 0,
          cacheUsage: sidebarRelaysToUse.length > 0 ? NDKSubscriptionCacheUsage.ONLY_RELAY : NDKSubscriptionCacheUsage.CACHE_FIRST,
          closeOnEose: true
        }));
      }
      return null;
    })();
    const recentArticles = (() => {
      if (!recentArticlesSubscription) return [];
      return recentArticlesSubscription.events.map((e) => NDKArticle.from(e)).filter((article) => article.title && article.content).sort((a, b) => (b.published_at ?? b.created_at ?? 0) - (a.published_at ?? a.created_at ?? 0)).slice(0, 5);
    })();
    $$renderer2.push(`<div${attr_class(`flex w-full max-w-full relative ${stringify(layoutStore.sidebarCollapsed ? "lg:pl-16" : "lg:pl-64")} ${stringify(hideRightSidebar ? "" : "xl:pr-80")} transition-all duration-300`)}>`);
    SidebarNav($$renderer2, {
      collapsed: layoutStore.sidebarCollapsed,
      onSearchClick,
      onPrimaryAction
    });
    $$renderer2.push(`<!----> <div class="w-full lg:flex-1 min-w-0 flex flex-col h-full"><main class="flex-1 pb-20 lg:pb-0 bg-background max-w-3xl 2xl:max-w-3xl w-full mx-auto border-x border-border min-h-screen">`);
    if (headerStore.headerConfig) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="border-b border-border bg-background"><div class="px-4 sm:px-6 lg:px-8 py-3"><div class="flex items-center gap-3">`);
      if (headerStore.headerConfig.backNav) {
        $$renderer2.push("<!--[-->");
        const backNav = headerStore.headerConfig.backNav;
        if (backNav.href) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<a${attr("href", backNav.href)} class="inline-flex items-center justify-center p-2 rounded-lg hover:bg-muted transition-colors text-foreground">`);
          Icon($$renderer2, { name: "arrow-left", size: "lg" });
          $$renderer2.push(`<!----></a>`);
        } else {
          $$renderer2.push("<!--[!-->");
          if (backNav.onclick) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<button class="inline-flex items-center justify-center p-2 rounded-lg hover:bg-muted transition-colors text-foreground">`);
            Icon($$renderer2, { name: "arrow-left", size: "lg" });
            $$renderer2.push(`<!----></button>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]-->`);
        }
        $$renderer2.push(`<!--]-->`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="flex-1"><h1 class="text-2xl font-bold text-foreground">${escape_html(headerStore.headerConfig.title)}</h1> `);
      if (headerStore.headerConfig.subtitle) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<p class="text-sm text-muted-foreground mt-1">${escape_html(headerStore.headerConfig.subtitle)}</p>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div> `);
      if (headerStore.headerConfig.actions) {
        $$renderer2.push("<!--[-->");
        headerStore.headerConfig.actions($$renderer2);
        $$renderer2.push(`<!---->`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (headerStore.header) {
        $$renderer2.push("<!--[-->");
        headerStore.header($$renderer2);
        $$renderer2.push(`<!---->`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (headerStore.backNav) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="border-b border-border bg-background"><div class="px-4 sm:px-6 lg:px-8 py-3">`);
          if (headerStore.backNav.href) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<a${attr("href", headerStore.backNav.href)} class="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors">`);
            Icon($$renderer2, { name: "arrow-left", size: "lg" });
            $$renderer2.push(`<!----> `);
            if (headerStore.backNav.label) {
              $$renderer2.push("<!--[-->");
              $$renderer2.push(`<span class="font-medium">${escape_html(headerStore.backNav.label)}</span>`);
            } else {
              $$renderer2.push("<!--[!-->");
            }
            $$renderer2.push(`<!--]--></a>`);
          } else {
            $$renderer2.push("<!--[!-->");
            if (headerStore.backNav.onclick) {
              $$renderer2.push("<!--[-->");
              $$renderer2.push(`<button class="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors">`);
              Icon($$renderer2, { name: "arrow-left", size: "lg" });
              $$renderer2.push(`<!----> `);
              if (headerStore.backNav.label) {
                $$renderer2.push("<!--[-->");
                $$renderer2.push(`<span class="font-medium">${escape_html(headerStore.backNav.label)}</span>`);
              } else {
                $$renderer2.push("<!--[!-->");
              }
              $$renderer2.push(`<!--]--></button>`);
            } else {
              $$renderer2.push("<!--[!-->");
            }
            $$renderer2.push(`<!--]-->`);
          }
          $$renderer2.push(`<!--]--></div></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--> `);
    children($$renderer2);
    $$renderer2.push(`<!----></main></div> `);
    if (!hideRightSidebar) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<aside class="hidden xl:block w-80 border-l border-border fixed top-0 right-0 bottom-0"><div class="flex flex-col divide-border divide-y">`);
      if (sidebarStore.rightSidebar) {
        $$renderer2.push("<!--[-->");
        sidebarStore.rightSidebar($$renderer2);
        $$renderer2.push(`<!---->`);
      } else {
        $$renderer2.push("<!--[!-->");
        NewMembersWidget($$renderer2);
        $$renderer2.push(`<!----> <div class="p-4"><div class="flex items-center gap-2 mb-4"><svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg> <h2 class="text-lg font-semibold text-card-foreground">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("feed.mediaTypes.articles"))}</h2></div> <div class="space-y-3">`);
        if (recentArticles.length === 0) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="h-4 bg-muted rounded animate-pulse"></div> <div class="h-4 bg-muted rounded animate-pulse w-3/4"></div> <div class="h-4 bg-muted rounded animate-pulse"></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push(`<!--[-->`);
          const each_array = ensure_array_like(recentArticles);
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let article = each_array[$$index];
            $$renderer2.push(`<a${attr("href", getArticleUrl(article, article.author))} class="block text-sm text-muted-foreground hover:text-primary transition-colors line-clamp-2">${escape_html(article.title)}</a>`);
          }
          $$renderer2.push(`<!--]-->`);
        }
        $$renderer2.push(`<!--]--></div></div> `);
        JournalistsSidebar($$renderer2);
        $$renderer2.push(`<!----> `);
        MarketplaceSidebar($$renderer2);
        $$renderer2.push(`<!---->`);
      }
      $$renderer2.push(`<!--]--></div></aside>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function MobileBottomNav($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const currentPath = store_get($$store_subs ??= {}, "$page", page).url.pathname;
    ndk.$wallet;
    const notificationsManager = createNotificationsManager(ndk);
    const isActive = (path) => {
      if (path === "/") return currentPath === "/";
      return currentPath.startsWith(path);
    };
    const selectedRelayInfo = (() => {
      if (!settings.selectedRelay) return null;
      return useRelayInfoCached(settings.selectedRelay);
    })();
    ndk.$currentUser?.npub;
    $$renderer2.push(`<nav class="block lg:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-xl border-t border-border z-[1000]"><div class="flex justify-around items-center px-2 py-3 safe-bottom svelte-2rf3uy"><a href="/"${attr_class(`flex items-center justify-center p-3 rounded-lg transition-colors ${stringify(isActive("/") ? "text-primary" : "text-muted-foreground")}`)} aria-label="Home">`);
    if (settings.selectedRelay && selectedRelayInfo?.info?.icon) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<img${attr("src", selectedRelayInfo.info.icon)} alt="" class="w-6 h-6 rounded"/>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (settings.selectedRelay) {
        $$renderer2.push("<!--[-->");
        Icon($$renderer2, { name: "relay", size: "lg" });
      } else {
        $$renderer2.push("<!--[!-->");
        Icon($$renderer2, { name: "users", size: "lg" });
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></a> <button${attr_class(`flex items-center justify-center p-3 rounded-lg transition-colors ${stringify(isActive("/messages") ? "text-primary" : "text-muted-foreground")} relative`)} aria-label="Messages">`);
    Icon($$renderer2, { name: "message", size: "lg" });
    $$renderer2.push(`<!----> `);
    if (messagesStore.totalUnreadCount > 0) {
      $$renderer2.push("<!--[-->");
      Badge($$renderer2, { indicator: true, class: "absolute top-1.5 right-1.5" });
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></button> <button${attr_class(`flex items-center justify-center p-3 rounded-lg transition-colors ${stringify(isActive("/notifications") ? "text-primary" : "text-muted-foreground")} relative`)} aria-label="Notifications">`);
    Icon($$renderer2, { name: "bell", size: "lg" });
    $$renderer2.push(`<!----> `);
    if (notificationsManager.counts.all > 0) {
      $$renderer2.push("<!--[-->");
      Badge($$renderer2, { indicator: true, class: "absolute top-1.5 right-1.5" });
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></button> <button${attr_class(`flex items-center justify-center p-3 rounded-lg transition-colors ${stringify(isActive("/wallet") ? "text-primary" : "text-muted-foreground")}`)} aria-label="Wallet">`);
    Icon($$renderer2, { name: "wallet", size: "lg" });
    $$renderer2.push(`<!----></button> <button class="flex items-center justify-center p-2 rounded-lg transition-colors" aria-label="Profile">`);
    if (ndk.$currentUser) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<!---->`);
      User$1.Root($$renderer2, {
        ndk,
        pubkey: ndk.$currentUser.pubkey,
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->`);
          User$1.Avatar($$renderer3, { class: "w-8 h-8 rounded-full" });
          $$renderer3.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
      Icon($$renderer2, { name: "user", size: "lg", class: "text-muted-foreground" });
    }
    $$renderer2.push(`<!--]--></button></div></nav> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function SmartFAB($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const {
      onComposeClick = () => {
      },
      onListingClick = () => {
      },
      onInviteClick = () => {
      },
      onTradeClick = () => {
      }
    } = $$props;
    const currentPath = store_get($$store_subs ??= {}, "$page", page).url.pathname;
    const fabConfig = {
      "/": { icon: "edit", label: "Compose", action: onComposeClick },
      "/marketplace": {
        icon: "plus",
        label: "Create Listing",
        action: onListingClick
      },
      "/agora/invites": { icon: "users", label: "Create Invite", action: onInviteClick },
      "/trades": { icon: "plus", label: "Create Order", action: onTradeClick }
    };
    const currentConfig = fabConfig[currentPath];
    const shouldShow = currentConfig !== void 0;
    if (shouldShow && currentConfig) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<button class="fixed bottom-24 right-4 z-[500] bg-primary hover:bg-primary/90 active:scale-95 text-primary-foreground p-4 rounded-full shadow-lg transition-all lg:hidden"${attr("aria-label", currentConfig.label || "Floating action button")}>`);
      if (currentConfig.icon === "edit") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>`);
      } else {
        $$renderer2.push("<!--[!-->");
        Icon($$renderer2, { name: currentConfig.icon, size: "lg" });
      }
      $$renderer2.push(`<!--]--></button>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function MobileLayout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const {
      children,
      onComposeClick,
      onListingClick,
      onInviteClick,
      onTradeClick
    } = $$props;
    const path = store_get($$store_subs ??= {}, "$page", page).url.pathname;
    const hideRightSidebar = layoutMode.mode === "article" || layoutMode.mode === "profile" || layoutMode.mode === "reads" || path.startsWith("/note/") || path.startsWith("/messages/") || path.startsWith("/packs") || path.startsWith("/agora/invites");
    $$renderer2.push(`<div class="bg-background"><div class="flex flex-col min-h-screen"><main class="flex-1 pb-20 bg-background">`);
    if (headerStore.headerConfig) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="border-b border-border bg-background"><div class="px-4 py-3"><div class="flex items-center gap-3">`);
      if (headerStore.headerConfig.backNav) {
        $$renderer2.push("<!--[-->");
        const backNav = headerStore.headerConfig.backNav;
        if (backNav.href) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<a${attr("href", backNav.href)} class="inline-flex items-center justify-center p-2 rounded-lg hover:bg-muted transition-colors text-foreground">`);
          Icon($$renderer2, { name: "arrow-left", size: "lg" });
          $$renderer2.push(`<!----></a>`);
        } else {
          $$renderer2.push("<!--[!-->");
          if (backNav.onclick) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<button class="inline-flex items-center justify-center p-2 rounded-lg hover:bg-muted transition-colors text-foreground">`);
            Icon($$renderer2, { name: "arrow-left", size: "lg" });
            $$renderer2.push(`<!----></button>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]-->`);
        }
        $$renderer2.push(`<!--]-->`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="flex-1"><h1 class="text-xl font-bold text-foreground">${escape_html(headerStore.headerConfig.title)}</h1> `);
      if (headerStore.headerConfig.subtitle) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<p class="text-sm text-muted-foreground mt-1">${escape_html(headerStore.headerConfig.subtitle)}</p>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div> `);
      if (headerStore.headerConfig.actions) {
        $$renderer2.push("<!--[-->");
        headerStore.headerConfig.actions($$renderer2);
        $$renderer2.push(`<!---->`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (headerStore.header) {
        $$renderer2.push("<!--[-->");
        headerStore.header($$renderer2);
        $$renderer2.push(`<!---->`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (headerStore.backNav) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="border-b border-border bg-background"><div class="px-4 py-3">`);
          if (headerStore.backNav.href) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<a${attr("href", headerStore.backNav.href)} class="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors">`);
            Icon($$renderer2, { name: "arrow-left", size: "lg" });
            $$renderer2.push(`<!----> `);
            if (headerStore.backNav.label) {
              $$renderer2.push("<!--[-->");
              $$renderer2.push(`<span class="font-medium">${escape_html(headerStore.backNav.label)}</span>`);
            } else {
              $$renderer2.push("<!--[!-->");
            }
            $$renderer2.push(`<!--]--></a>`);
          } else {
            $$renderer2.push("<!--[!-->");
            if (headerStore.backNav.onclick) {
              $$renderer2.push("<!--[-->");
              $$renderer2.push(`<button class="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors">`);
              Icon($$renderer2, { name: "arrow-left", size: "lg" });
              $$renderer2.push(`<!----> `);
              if (headerStore.backNav.label) {
                $$renderer2.push("<!--[-->");
                $$renderer2.push(`<span class="font-medium">${escape_html(headerStore.backNav.label)}</span>`);
              } else {
                $$renderer2.push("<!--[!-->");
              }
              $$renderer2.push(`<!--]--></button>`);
            } else {
              $$renderer2.push("<!--[!-->");
            }
            $$renderer2.push(`<!--]-->`);
          }
          $$renderer2.push(`<!--]--></div></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--> `);
    if (sidebarStore.showOnMobile && sidebarStore.rightSidebar && !hideRightSidebar) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="p-3 border-b border-border bg-background">`);
      sidebarStore.rightSidebar($$renderer2);
      $$renderer2.push(`<!----></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    children($$renderer2);
    $$renderer2.push(`<!----></main> `);
    MobileBottomNav($$renderer2);
    $$renderer2.push(`<!----> `);
    SmartFAB($$renderer2, { onComposeClick, onListingClick, onInviteClick, onTradeClick });
    $$renderer2.push(`<!----></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function UserSearchModal($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { isOpen, onClose } = $$props;
    function handleUserSelect(user) {
      goto(`/p/${user.npub}`);
      onClose();
    }
    $$renderer2.push(`<!---->`);
    Root($$renderer2, {
      open: isOpen,
      onOpenChange: (newOpen) => {
        if (!newOpen) onClose();
      },
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->`);
        Dialog_content($$renderer3, {
          class: "max-w-md",
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->`);
            Dialog_header($$renderer4, {
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->`);
                Dialog_title($$renderer5, {
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Search Users`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!---->`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> `);
            User_search_combobox($$renderer4, {
              ndk,
              onSelect: handleUserSelect,
              placeholder: "Search by name, NIP-05, or paste npub..."
            });
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!---->`);
  });
}
function useImageUpload(ndk2, options = {}) {
  const blossom = new NDKBlossom(ndk2);
  const upload = createBlossomUpload(blossom);
  let uploadedImages = [];
  let currentImageIndex = 0;
  let isDragging = false;
  async function uploadFile(file) {
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    try {
      await upload.upload(file, {
        fallbackServer: options.fallbackServer || "https://blossom.primal.net"
      });
      if (upload.result?.url) {
        const img = new Image();
        const dimensions = await new Promise((resolve) => {
          img.onload = () => resolve({ width: img.width, height: img.height });
          img.src = URL.createObjectURL(file);
        });
        const hash = Array.isArray(upload.result.sha256) ? upload.result.sha256[0] : upload.result.sha256 || "";
        uploadedImages = [
          ...uploadedImages,
          {
            url: upload.result.url,
            mimeType: file.type,
            hash,
            blurhash: upload.result.blurhash,
            dimensions
          }
        ];
        currentImageIndex = uploadedImages.length - 1;
      }
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to upload image");
    }
  }
  function handleFileInputChange(event) {
    const input = event.target;
    const files = input.files;
    if (files) {
      Array.from(files).forEach((file) => uploadFile(file));
    }
  }
  function handleDragOver(event) {
    event.preventDefault();
    isDragging = true;
  }
  function handleDragLeave() {
    isDragging = false;
  }
  async function handleDrop(event) {
    event.preventDefault();
    isDragging = false;
    const files = event.dataTransfer?.files;
    if (files) {
      Array.from(files).forEach((file) => uploadFile(file));
    }
  }
  function removeImage(index) {
    uploadedImages = uploadedImages.filter((_, i) => i !== index);
    if (currentImageIndex >= uploadedImages.length) {
      currentImageIndex = Math.max(0, uploadedImages.length - 1);
    }
  }
  function reset() {
    uploadedImages = [];
    currentImageIndex = 0;
    isDragging = false;
  }
  return {
    get uploadedImages() {
      return uploadedImages;
    },
    set uploadedImages(value) {
      uploadedImages = value;
    },
    get currentImageIndex() {
      return currentImageIndex;
    },
    set currentImageIndex(value) {
      currentImageIndex = value;
    },
    get isDragging() {
      return isDragging;
    },
    get uploadStatus() {
      return upload.status;
    },
    get uploadProgress() {
      return upload.progress;
    },
    uploadFile,
    handleFileInputChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    removeImage,
    reset
  };
}
function CreateListingModal($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { open = false, onClose } = $$props;
    let isPublishing = false;
    let title = "";
    let summary = "";
    let content = "";
    let location = "";
    let priceAmount = "";
    let priceCurrency = "USD";
    let priceFrequency = void 0;
    let categories = [];
    let newCategory = "";
    const imageUpload = useImageUpload(ndk, { fallbackServer: "https://blossom.primal.net" });
    const COMMON_CATEGORIES = [
      "electronics",
      "furniture",
      "clothing",
      "books",
      "services",
      "vehicles",
      "real-estate",
      "jobs",
      "free",
      "wanted"
    ];
    const CURRENCIES = ["USD", "EUR", "GBP", "BTC", "SATS"];
    function addCategory() {
      if (newCategory && !categories.includes(newCategory.toLowerCase())) {
        categories = [...categories, newCategory.toLowerCase()];
        newCategory = "";
      }
    }
    async function publishListing() {
      if (!title.trim() || !content.trim() || isPublishing) {
        toast.error("Please provide a title and description");
        return;
      }
      if (!ndk.$currentUser) {
        toast.error("Please log in to create a listing");
        return;
      }
      try {
        isPublishing = true;
        const listing = new NDKClassified(ndk);
        listing.title = title.trim();
        listing.summary = summary.trim() || void 0;
        listing.content = content.trim();
        listing.location = location.trim() || void 0;
        listing.published_at = Math.floor(Date.now() / 1e3);
        listing.tags.push(["status", "active"]);
        if (priceAmount.trim()) {
          listing.price = {
            amount: parseFloat(priceAmount),
            currency: priceCurrency,
            frequency: priceFrequency && priceFrequency !== "once" ? priceFrequency : void 0
          };
        }
        categories.forEach((category) => {
          listing.tags.push(["t", category]);
        });
        imageUpload.uploadedImages.forEach((image) => {
          listing.tags.push(["image", image.url]);
        });
        await listing.sign();
        await listing.publish();
        if (listing.publishStatus === "error") {
          const error = listing.publishError;
          const relayErrors = error?.relayErrors || {};
          const errorMessages = Object.entries(relayErrors).map(([relay, err]) => `${relay}: ${err}`).join("\n");
          toast.error(`Failed to publish:
${errorMessages || "Unknown error"}`);
          return;
        }
        toast.success("Listing created successfully");
        resetForm();
        open = false;
        onClose?.();
        goto("/marketplace");
      } catch (error) {
        console.error("Failed to publish listing:", error);
        toast.error(`Failed to create listing: ${error instanceof Error ? error.message : "Unknown error"}`);
      } finally {
        isPublishing = false;
      }
    }
    function resetForm() {
      title = "";
      summary = "";
      content = "";
      location = "";
      priceAmount = "";
      priceCurrency = "USD";
      priceFrequency = void 0;
      categories = [];
      newCategory = "";
      imageUpload.reset();
    }
    function handleClose() {
      if (!isPublishing) {
        resetForm();
        open = false;
        onClose?.();
      }
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<!---->`);
      Root($$renderer3, {
        open,
        onOpenChange: (newOpen) => {
          open = newOpen;
          if (!newOpen) handleClose();
        },
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->`);
          Dialog_content($$renderer4, {
            class: "max-w-4xl max-h-[90vh] overflow-y-auto",
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->`);
              Dialog_header($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<div class="flex items-center gap-2"><svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg> <!---->`);
                  Dialog_title($$renderer6, {
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->Create Listing`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----></div>`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> <div class="space-y-6"><div class="space-y-5"><div>`);
              Label($$renderer5, {
                for: "title",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Title <span class="text-red-500">*</span>`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Input($$renderer5, {
                id: "title",
                type: "text",
                placeholder: "What are you listing?",
                maxlength: 200,
                class: "mt-2",
                get value() {
                  return title;
                },
                set value($$value) {
                  title = $$value;
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----></div> <div>`);
              Label($$renderer5, {
                for: "summary",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Summary`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Input($$renderer5, {
                id: "summary",
                type: "text",
                placeholder: "Brief description",
                maxlength: 200,
                class: "mt-2",
                get value() {
                  return summary;
                },
                set value($$value) {
                  summary = $$value;
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----></div> <div>`);
              Label($$renderer5, {
                for: "content",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Description <span class="text-red-500">*</span>`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Textarea($$renderer5, {
                id: "content",
                placeholder: "Detailed description (Markdown supported)",
                rows: 6,
                class: "mt-2 resize-none",
                get value() {
                  return content;
                },
                set value($$value) {
                  content = $$value;
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----></div> <div>`);
              Label($$renderer5, {
                for: "location",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Location`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Input($$renderer5, {
                id: "location",
                type: "text",
                placeholder: "City, State or Country",
                class: "mt-2",
                get value() {
                  return location;
                },
                set value($$value) {
                  location = $$value;
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----></div></div> <div class="bg-muted/30 rounded-lg p-5 border border-border"><h3 class="text-lg font-semibold text-foreground mb-4">Pricing</h3> <div class="grid grid-cols-1 md:grid-cols-3 gap-4"><div>`);
              Label($$renderer5, {
                for: "price-amount",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Amount`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Input($$renderer5, {
                id: "price-amount",
                type: "text",
                placeholder: "0.00",
                class: "mt-2",
                get value() {
                  return priceAmount;
                },
                set value($$value) {
                  priceAmount = $$value;
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----></div> <div>`);
              Label($$renderer5, {
                for: "currency",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Currency`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              $$renderer5.select(
                {
                  id: "currency",
                  value: priceCurrency,
                  class: "mt-2 w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors"
                },
                ($$renderer6) => {
                  $$renderer6.push(`<!--[-->`);
                  const each_array = ensure_array_like(CURRENCIES);
                  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                    let currency = each_array[$$index];
                    $$renderer6.option({ value: currency }, ($$renderer7) => {
                      $$renderer7.push(`${escape_html(currency)}`);
                    });
                  }
                  $$renderer6.push(`<!--]-->`);
                }
              );
              $$renderer5.push(`</div> <div>`);
              Label($$renderer5, {
                for: "frequency",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Frequency`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              $$renderer5.select(
                {
                  id: "frequency",
                  value: priceFrequency,
                  class: "mt-2 w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors"
                },
                ($$renderer6) => {
                  $$renderer6.option({ value: void 0 }, ($$renderer7) => {
                    $$renderer7.push(`One time`);
                  });
                  $$renderer6.option({ value: "hour" }, ($$renderer7) => {
                    $$renderer7.push(`Per hour`);
                  });
                  $$renderer6.option({ value: "day" }, ($$renderer7) => {
                    $$renderer7.push(`Per day`);
                  });
                  $$renderer6.option({ value: "week" }, ($$renderer7) => {
                    $$renderer7.push(`Per week`);
                  });
                  $$renderer6.option({ value: "month" }, ($$renderer7) => {
                    $$renderer7.push(`Per month`);
                  });
                  $$renderer6.option({ value: "year" }, ($$renderer7) => {
                    $$renderer7.push(`Per year`);
                  });
                }
              );
              $$renderer5.push(`</div></div></div> <div class="bg-muted/30 rounded-lg p-5 border border-border"><h3 class="text-lg font-semibold text-foreground mb-4">Categories</h3> <div class="space-y-4"><div class="flex gap-2">`);
              $$renderer5.select(
                {
                  value: newCategory,
                  class: "flex-1 px-4 py-3 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors"
                },
                ($$renderer6) => {
                  $$renderer6.option({ value: "" }, ($$renderer7) => {
                    $$renderer7.push(`Select a category`);
                  });
                  $$renderer6.push(`<!--[-->`);
                  const each_array_1 = ensure_array_like(COMMON_CATEGORIES);
                  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
                    let cat = each_array_1[$$index_1];
                    $$renderer6.option({ value: cat }, ($$renderer7) => {
                      $$renderer7.push(`${escape_html(cat.charAt(0).toUpperCase() + cat.slice(1))}`);
                    });
                  }
                  $$renderer6.push(`<!--]-->`);
                }
              );
              $$renderer5.push(` `);
              Input($$renderer5, {
                type: "text",
                placeholder: "Or type custom",
                class: "flex-1",
                onkeydown: (e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addCategory();
                  }
                },
                get value() {
                  return newCategory;
                },
                set value($$value) {
                  newCategory = $$value;
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----> `);
              Button($$renderer5, {
                type: "button",
                onclick: addCategory,
                size: "icon",
                children: ($$renderer6) => {
                  $$renderer6.push(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----></div> `);
              if (categories.length > 0) {
                $$renderer5.push("<!--[-->");
                $$renderer5.push(`<div class="flex flex-wrap gap-2"><!--[-->`);
                const each_array_2 = ensure_array_like(categories);
                for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
                  let category = each_array_2[$$index_2];
                  $$renderer5.push(`<div class="inline-flex items-center gap-1 px-3 py-1 bg-primary/20 text-primary rounded-full text-sm"><span>${escape_html(category)}</span> <button type="button" class="hover:text-primary"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div>`);
                }
                $$renderer5.push(`<!--]--></div>`);
              } else {
                $$renderer5.push("<!--[!-->");
              }
              $$renderer5.push(`<!--]--></div></div> <div class="bg-muted/30 rounded-lg p-5 border border-border"><h3 class="text-lg font-semibold text-foreground mb-4">Images</h3> <div class="space-y-4"><input type="file" accept="image/*" multiple class="hidden"/> <button type="button"${attr("disabled", imageUpload.uploadStatus === "uploading", true)}${attr_class(`w-full h-32 rounded-lg border-2 border-dashed transition-colors flex flex-col items-center justify-center gap-2 ${imageUpload.isDragging ? "border-primary bg-muted/40" : "border-border hover:border-primary bg-muted/20 hover:bg-muted/40"}`)}>`);
              if (imageUpload.uploadStatus === "uploading") {
                $$renderer5.push("<!--[-->");
                $$renderer5.push(`<div class="flex flex-col items-center gap-2"><div class="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div> <span class="text-sm text-muted-foreground">${escape_html(imageUpload.uploadProgress?.percentage || 0)}%</span></div>`);
              } else {
                $$renderer5.push("<!--[!-->");
                $$renderer5.push(`<svg class="w-10 h-10 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> <span class="text-sm text-muted-foreground">Click to upload or drag and drop</span> <span class="text-xs text-muted-foreground">Multiple images supported</span>`);
              }
              $$renderer5.push(`<!--]--></button> `);
              if (imageUpload.uploadedImages.length > 0) {
                $$renderer5.push("<!--[-->");
                $$renderer5.push(`<div class="grid grid-cols-2 md:grid-cols-3 gap-4"><!--[-->`);
                const each_array_3 = ensure_array_like(imageUpload.uploadedImages);
                for (let index = 0, $$length = each_array_3.length; index < $$length; index++) {
                  let image = each_array_3[index];
                  $$renderer5.push(`<div class="relative group"><img${attr("src", image.url)}${attr("alt", `Listing image ${index + 1}`)} class="w-full h-32 object-cover rounded-lg border border-border"/> <button type="button" class="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div>`);
                }
                $$renderer5.push(`<!--]--></div>`);
              } else {
                $$renderer5.push("<!--[!-->");
              }
              $$renderer5.push(`<!--]--></div></div></div> <!---->`);
              Dialog_footer($$renderer5, {
                class: "flex gap-3 sm:space-x-0",
                children: ($$renderer6) => {
                  Button($$renderer6, {
                    variant: "outline",
                    onclick: handleClose,
                    disabled: isPublishing,
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->Cancel`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Button($$renderer6, {
                    onclick: publishListing,
                    disabled: !title.trim() || !content.trim() || isPublishing,
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->${escape_html(isPublishing ? "Publishing..." : "Publish Listing")}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!---->`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!---->`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!---->`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { open });
  });
}
const IV_LENGTH = 12;
function generateEncryptionKey() {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 24; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
function generateDTag() {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 12; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
function generateInviteCode() {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 24; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
async function stringKeyToCryptoKey(keyString) {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(keyString.padEnd(32, "0").slice(0, 32));
  return crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}
async function encryptInvitePayload(data, keyString) {
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
  const key = await stringKeyToCryptoKey(keyString);
  const encoder = new TextEncoder();
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoder.encode(data)
  );
  const combined = new Uint8Array(IV_LENGTH + encrypted.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(encrypted), IV_LENGTH);
  return btoa(String.fromCharCode(...combined));
}
function CreateInviteModal($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { isOpen = void 0, onClose } = $$props;
    const DEFAULT_WELCOME_MESSAGE = `Welcome to Agora! 🎉

I'm inviting you to join Agora, a new kind of social network where you own your identity and content. No algorithms, no ads, just authentic connections.

Looking forward to connecting with you on the open social web!`;
    let welcomeMessage = DEFAULT_WELCOME_MESSAGE;
    let isPersonalized = false;
    let recipientName = "";
    let cashuAmount = "";
    let maxUses = 10;
    let inviteLink = "";
    let isGenerating = false;
    let isCopied = false;
    let selectedRelayUrls = [];
    let isRelayDropdownOpen = false;
    const agoraRelays = settings.relays.filter((r) => r.enabled && r.write && isAgoraRelay(r.url));
    const selectedRelayInfo = (() => {
      if (selectedRelayUrls.length === 0) return null;
      if (selectedRelayUrls.length === 1) {
        return {
          url: selectedRelayUrls[0],
          info: useRelayInfoCached(selectedRelayUrls[0])
        };
      }
      return null;
    })();
    const selectedRelayName = (() => {
      if (selectedRelayUrls.length === 0) return "Select Agora...";
      if (selectedRelayUrls.length === 1) {
        const relayInfo = useRelayInfoCached(selectedRelayUrls[0]);
        return relayInfo.info?.name || selectedRelayUrls[0].replace("wss://", "").replace("ws://", "");
      }
      return `${selectedRelayUrls.length} Agoras selected`;
    })();
    async function generateInvite() {
      if (!ndk.$currentUser) {
        console.error("No user logged in");
        return;
      }
      if (selectedRelayUrls.length === 0) {
        alert("Please select at least one Agora to publish the invite to.");
        return;
      }
      isGenerating = true;
      try {
        const encryptionKey = isPersonalized ? generateEncryptionKey() : "";
        const inviteCodes = [];
        for (let i = 0; i < maxUses; i++) {
          inviteCodes.push(generateInviteCode());
        }
        const payload = {
          welcomeMessage,
          recipientName: isPersonalized ? recipientName : void 0,
          cashuToken: isPersonalized && cashuAmount ? `cashu:${cashuAmount}` : void 0,
          createdAt: Date.now(),
          inviter: ndk.$currentUser.pubkey
        };
        const content = isPersonalized ? await encryptInvitePayload(JSON.stringify(payload), encryptionKey) : JSON.stringify(payload);
        const inviteEvent = new NDKEvent(ndk);
        inviteEvent.kind = 513;
        inviteEvent.content = content;
        inviteEvent.tags = [...inviteCodes.map((code2) => ["code", code2])];
        inviteEvent.dTag = generateDTag();
        inviteEvent.isProtected = true;
        inviteEvent.isProtected = true;
        console.log("Publishing invite event to selected Agoras...", inviteEvent.id, selectedRelayUrls);
        const relays = /* @__PURE__ */ new Set();
        for (const url of selectedRelayUrls) {
          const relay = ndk.pool.getRelay(url, true);
          if (relay) {
            relays.add(relay);
          }
        }
        await inviteEvent.sign();
        const relaySet = new NDKRelaySet(relays, ndk);
        try {
          await inviteEvent.publish(relaySet);
        } catch (e) {
          console.log("going with the auth hack");
          await inviteEvent.publish(relaySet);
        }
        const dTag = inviteEvent.dTag;
        const code = isPersonalized ? `${dTag}${encryptionKey}` : dTag;
        const link = `${window.location.origin}/i/${code}`;
        inviteLink = link;
        console.log("Invite created:", link);
      } catch (error) {
        console.error("Failed to generate invite:", error);
        alert("Failed to generate invite. Check console for details.");
      } finally {
        isGenerating = false;
      }
    }
    async function copyToClipboard() {
      try {
        await navigator.clipboard.writeText(inviteLink);
        isCopied = true;
        setTimeout(() => isCopied = false, 2e3);
      } catch (error) {
        console.error("Failed to copy:", error);
      }
    }
    async function shareInvite() {
      if (!navigator.share) {
        console.log("Web Share API not supported, falling back to copy");
        await copyToClipboard();
        return;
      }
      try {
        await navigator.share({
          title: "Join Agora",
          text: isPersonalized && recipientName ? `${recipientName}, you're invited to join Agora!` : "You're invited to join Agora, a new kind of social network!",
          url: inviteLink
        });
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Failed to share:", error);
        }
      }
    }
    function handleClose() {
      welcomeMessage = DEFAULT_WELCOME_MESSAGE;
      isPersonalized = false;
      recipientName = "";
      cashuAmount = "";
      maxUses = 10;
      inviteLink = "";
      selectedRelayUrls = [];
      isRelayDropdownOpen = false;
      onClose();
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<!---->`);
      Root($$renderer3, {
        open: isOpen,
        onOpenChange: (newOpen) => {
          isOpen = newOpen;
          if (!newOpen) handleClose();
        },
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->`);
          Dialog_content($$renderer4, {
            class: "max-w-lg max-h-[90vh] overflow-y-auto",
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->`);
              Dialog_header($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->`);
                  Dialog_title($$renderer6, {
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->Create an Invite`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> <!---->`);
                  Dialog_description($$renderer6, {
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->Invite someone to join Agora with a personal message`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!---->`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> <div class="space-y-6">`);
              if (!inviteLink) {
                $$renderer5.push("<!--[-->");
                $$renderer5.push(`<div>`);
                Label($$renderer5, {
                  for: "welcome-message",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Welcome Message`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Textarea($$renderer5, {
                  id: "welcome-message",
                  rows: 6,
                  placeholder: "Write a welcome message...",
                  class: "mt-2 resize-none",
                  get value() {
                    return welcomeMessage;
                  },
                  set value($$value) {
                    welcomeMessage = $$value;
                    $$settled = false;
                  }
                });
                $$renderer5.push(`<!----></div> <div class="relative"><label class="block text-sm font-medium text-muted-foreground mb-2">Invite to Agora</label> <button type="button" class="w-full px-4 py-2.5 text-left rounded-lg bg-muted/50 text-muted-foreground hover:bg-muted transition-colors flex items-center gap-3 group">`);
                if (selectedRelayUrls.length === 0) {
                  $$renderer5.push("<!--[-->");
                  $$renderer5.push(`<img src="/logo-icon.svg" alt="Agora" class="w-6 h-6 flex-shrink-0"/> <span class="text-sm text-muted-foreground flex-1">Select Agora...</span>`);
                } else {
                  $$renderer5.push("<!--[!-->");
                  if (selectedRelayUrls.length === 1 && selectedRelayInfo) {
                    $$renderer5.push("<!--[-->");
                    RelayIcon($$renderer5, { relayUrl: selectedRelayInfo.url, size: "lg" });
                    $$renderer5.push(`<!----> <span class="text-sm text-muted-foreground flex-1">${escape_html(selectedRelayName)}</span>`);
                  } else {
                    $$renderer5.push("<!--[!-->");
                    $$renderer5.push(`<img src="/logo-icon.svg" alt="Agora" class="w-6 h-6 flex-shrink-0"/> <span class="text-sm text-muted-foreground flex-1">${escape_html(selectedRelayUrls.length)} Agoras selected</span>`);
                  }
                  $$renderer5.push(`<!--]-->`);
                }
                $$renderer5.push(`<!--]--> <svg${attr_class(`w-4 h-4 text-muted-foreground transition-transform flex-shrink-0 ${stringify(isRelayDropdownOpen ? "rotate-180" : "")}`)} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button> `);
                if (isRelayDropdownOpen) {
                  $$renderer5.push("<!--[-->");
                  $$renderer5.push(`<div class="absolute z-[60] mt-1 w-full bg-popover border border-border rounded-xl shadow-lg max-h-64 overflow-y-auto">`);
                  if (agoraRelays.length === 0) {
                    $$renderer5.push("<!--[-->");
                    $$renderer5.push(`<p class="text-sm text-muted-foreground text-center py-4">No Agora relays configured</p>`);
                  } else {
                    $$renderer5.push("<!--[!-->");
                    $$renderer5.push(`<!--[-->`);
                    const each_array = ensure_array_like(agoraRelays);
                    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                      let relay = each_array[$$index];
                      const relayInfo = useRelayInfoCached(relay.url);
                      $$renderer5.push(`<button type="button" class="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-muted cursor-pointer transition-colors text-left"><input type="checkbox"${attr("checked", selectedRelayUrls.includes(relay.url), true)} class="w-4 h-4 text-primary border rounded focus:ring-orange-500 pointer-events-none"/> `);
                      RelayIcon($$renderer5, { relayUrl: relay.url, size: "md" });
                      $$renderer5.push(`<!----> <div class="flex-1 min-w-0"><div class="flex items-center gap-1.5"><div class="text-sm font-medium text-foreground truncate">${escape_html(relayInfo.info?.name || relay.url.replace("wss://", "").replace("ws://", ""))}</div> <span class="flex-shrink-0 px-1.5 py-0.5 text-[10px] font-semibold bg-primary/20 text-primary rounded uppercase tracking-wide">Agora</span></div> `);
                      if (relayInfo.info?.description) {
                        $$renderer5.push("<!--[-->");
                        $$renderer5.push(`<div class="text-xs text-muted-foreground truncate">${escape_html(relayInfo.info.description)}</div>`);
                      } else {
                        $$renderer5.push("<!--[!-->");
                      }
                      $$renderer5.push(`<!--]--></div></button>`);
                    }
                    $$renderer5.push(`<!--]-->`);
                  }
                  $$renderer5.push(`<!--]--></div>`);
                } else {
                  $$renderer5.push("<!--[!-->");
                }
                $$renderer5.push(`<!--]--> `);
                if (selectedRelayUrls.length > 1) {
                  $$renderer5.push("<!--[-->");
                  $$renderer5.push(`<p class="mt-1 text-xs text-muted-foreground">${escape_html(selectedRelayUrls.length)} Agoras selected</p>`);
                } else {
                  $$renderer5.push("<!--[!-->");
                }
                $$renderer5.push(`<!--]--></div> <div>`);
                Label($$renderer5, {
                  for: "max-uses",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Maximum Uses`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Input($$renderer5, {
                  id: "max-uses",
                  type: "number",
                  min: "1",
                  max: "500",
                  class: "mt-2",
                  get value() {
                    return maxUses;
                  },
                  set value($$value) {
                    maxUses = $$value;
                    $$settled = false;
                  }
                });
                $$renderer5.push(`<!----> <p class="mt-1 text-xs text-muted-foreground">How many people can use this invite (1-500)</p></div> <div class="flex items-center space-x-3"><input type="checkbox" id="personalize"${attr("checked", isPersonalized, true)} class="w-5 h-5 text-primary border rounded focus:ring-orange-500"/> <label for="personalize" class="text-sm font-medium text-muted-foreground cursor-pointer">Personalize this invite</label></div> `);
                if (isPersonalized) {
                  $$renderer5.push("<!--[-->");
                  $$renderer5.push(`<div class="space-y-4 border-l-4 border-primary pl-4"><div>`);
                  Label($$renderer5, {
                    for: "recipient-name",
                    class: "flex items-center gap-2",
                    children: ($$renderer6) => {
                      $$renderer6.push(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg> Recipient's Name`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer5.push(`<!----> `);
                  Input($$renderer5, {
                    id: "recipient-name",
                    type: "text",
                    placeholder: "John Doe",
                    class: "mt-2",
                    get value() {
                      return recipientName;
                    },
                    set value($$value) {
                      recipientName = $$value;
                      $$settled = false;
                    }
                  });
                  $$renderer5.push(`<!----></div> <div>`);
                  Label($$renderer5, {
                    for: "cashu-amount",
                    class: "flex items-center gap-2",
                    children: ($$renderer6) => {
                      $$renderer6.push(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg> Include Cashu Token (sats)`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer5.push(`<!----> `);
                  Input($$renderer5, {
                    id: "cashu-amount",
                    type: "number",
                    placeholder: "Amount in sats (optional)",
                    class: "mt-2",
                    get value() {
                      return cashuAmount;
                    },
                    set value($$value) {
                      cashuAmount = $$value;
                      $$settled = false;
                    }
                  });
                  $$renderer5.push(`<!----> <p class="mt-1 text-xs text-muted-foreground">Add sats to help them get started on Nostr</p></div></div>`);
                } else {
                  $$renderer5.push("<!--[!-->");
                }
                $$renderer5.push(`<!--]--> `);
                Button($$renderer5, {
                  onclick: generateInvite,
                  disabled: isGenerating || !welcomeMessage.trim() || selectedRelayUrls.length === 0,
                  class: "w-full",
                  children: ($$renderer6) => {
                    if (isGenerating) {
                      $$renderer6.push("<!--[-->");
                      $$renderer6.push(`<div class="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div> Generating Invite...`);
                    } else {
                      $$renderer6.push("<!--[!-->");
                      $$renderer6.push(`Generate Invite Link`);
                    }
                    $$renderer6.push(`<!--]-->`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!---->`);
              } else {
                $$renderer5.push("<!--[!-->");
                $$renderer5.push(`<div class="space-y-6"><div class="text-center py-8"><div class="w-16 h-16 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4"><svg class="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg></div> <h3 class="text-lg font-semibold text-foreground mb-2">Invite Created!</h3> <p class="text-sm text-muted-foreground">${escape_html(isPersonalized && recipientName ? `Your personalized invite for ${recipientName} is ready` : "Your invite link is ready to share")}</p></div> <div class="bg-muted rounded-xl p-4 space-y-3"><div class="flex items-center space-x-2">`);
                Input($$renderer5, {
                  type: "text",
                  value: inviteLink,
                  readonly: true,
                  class: "flex-1 bg-transparent"
                });
                $$renderer5.push(`<!----> `);
                Button($$renderer5, {
                  onclick: copyToClipboard,
                  size: "sm",
                  children: ($$renderer6) => {
                    if (isCopied) {
                      $$renderer6.push("<!--[-->");
                      $$renderer6.push(`<svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Copied!`);
                    } else {
                      $$renderer6.push("<!--[!-->");
                      $$renderer6.push(`<svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg> Copy`);
                    }
                    $$renderer6.push(`<!--]-->`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----></div> `);
                Button($$renderer5, {
                  onclick: shareInvite,
                  variant: "outline",
                  class: "w-full",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg> Share`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----></div> <!---->`);
                Dialog_footer($$renderer5, {
                  class: "flex gap-3 sm:space-x-0",
                  children: ($$renderer6) => {
                    Button($$renderer6, {
                      variant: "outline",
                      onclick: () => inviteLink = "",
                      class: "flex-1",
                      children: ($$renderer7) => {
                        $$renderer7.push(`<!---->Create Another`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer6.push(`<!----> `);
                    Button($$renderer6, {
                      onclick: handleClose,
                      class: "flex-1",
                      children: ($$renderer7) => {
                        $$renderer7.push(`<!---->Done`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer6.push(`<!---->`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----></div>`);
              }
              $$renderer5.push(`<!--]--></div>`);
            },
            $$slots: { default: true }
          });
          $$renderer4.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!---->`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    bind_props($$props, { isOpen });
  });
}
function Layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { children } = $$props;
    setContext("ndk", ndk);
    const isDesktop = new MediaQuery("(min-width: 1024px)");
    let isSearchModalOpen = false;
    let isComposeModalOpen = false;
    let isCreateListingModalOpen = false;
    let isCreateInviteModalOpen = false;
    let isCreateOrderModalOpen = false;
    const handleSearchClick = () => {
      isSearchModalOpen = true;
    };
    const handleComposeClick = () => {
      isComposeModalOpen = true;
    };
    const handleListingClick = () => {
      isCreateListingModalOpen = true;
    };
    const handleInviteClick = () => {
      isCreateInviteModalOpen = true;
    };
    const handleTradeClick = () => {
      isCreateOrderModalOpen = true;
    };
    const handlePrimaryAction = () => {
      const path = window.location.pathname;
      if (path === "/marketplace") {
        handleListingClick();
      } else if (path === "/trades") {
        handleTradeClick();
      } else if (path === "/agora/invites") {
        handleInviteClick();
      } else {
        handleComposeClick();
      }
    };
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div class="bg-background">`);
      if (isDesktop.current) {
        $$renderer3.push("<!--[-->");
        DesktopLayout($$renderer3, {
          onSearchClick: handleSearchClick,
          onPrimaryAction: handlePrimaryAction,
          children: ($$renderer4) => {
            children($$renderer4);
            $$renderer4.push(`<!---->`);
          }
        });
      } else {
        $$renderer3.push("<!--[!-->");
        MobileLayout($$renderer3, {
          onComposeClick: handleComposeClick,
          onListingClick: handleListingClick,
          onInviteClick: handleInviteClick,
          onTradeClick: handleTradeClick,
          children: ($$renderer4) => {
            children($$renderer4);
            $$renderer4.push(`<!---->`);
          }
        });
      }
      $$renderer3.push(`<!--]-->  `);
      UserSearchModal($$renderer3, {
        isOpen: isSearchModalOpen,
        onClose: () => isSearchModalOpen = false
      });
      $$renderer3.push(`<!----> `);
      ComposeDialog($$renderer3, {
        get open() {
          return isComposeModalOpen;
        },
        set open($$value) {
          isComposeModalOpen = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----> `);
      CreateListingModal($$renderer3, {
        get open() {
          return isCreateListingModalOpen;
        },
        set open($$value) {
          isCreateListingModalOpen = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----> `);
      CreateInviteModal($$renderer3, {
        onClose: () => isCreateInviteModalOpen = false,
        get isOpen() {
          return isCreateInviteModalOpen;
        },
        set isOpen($$value) {
          isCreateInviteModalOpen = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----> `);
      if (isCreateOrderModalOpen) {
        $$renderer3.push("<!--[-->");
        CreateOrderModal($$renderer3, { onClose: () => isCreateOrderModalOpen = false });
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--></div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
  });
}
function _layout($$renderer, $$props) {
  const { children } = $$props;
  Layout($$renderer, {
    children: ($$renderer2) => {
      children($$renderer2);
      $$renderer2.push(`<!---->`);
    }
  });
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte-DX435Hpo.js.map
