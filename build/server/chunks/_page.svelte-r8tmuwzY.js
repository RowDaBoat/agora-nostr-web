import { g as store_get, e as ensure_array_like, b as attr, a as attr_class, s as stringify, u as unsubscribe_stores, d as attr_style, f as bind_props } from './index2-DpBdzO5t.js';
import { $ as $format } from './runtime-9tjL5BFW.js';
import { b as hashtagInterests, s as settings, n as ndk } from './ndk.svelte-BfhDBrJw.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import { u as useRelayInfoCached } from './relayInfo.svelte-CrGOXzx2.js';
import { NDKPrivateKeySigner } from '@nostr-dev-kit/ndk';
import 'shamirs-secret-sharing-ts';
import 'clsx';
import { createMintDiscoveryStore } from '@nostr-dev-kit/wallet';
import '@nostr-dev-kit/wot';
import '@nostr-dev-kit/sessions';
import '@nostr-dev-kit/sync';
import { R as Root, D as Dialog_content, a as Dialog_title } from './index3-DOo-Ka_h.js';
import { B as Button } from './button-DBIbgud-.js';
import { D as Dialog_header } from './dialog-header-DSVdIrOb.js';
import { n as npubCash } from './npubcash.svelte-CJyS_ttu.js';
import './context-D7LG2f18.js';
import './index-BYTxiVRf.js';
import '@nostr-dev-kit/cache-sqlite-wasm';
import 'tty';
import 'util';
import 'os';
import './scroll-lock-YhRhLzPR.js';
import './events-CY0_bqjb.js';
import 'tailwind-merge';
import './utils2-B05Dmz_H.js';
import './button2-JT-_T3Ay.js';
import './index-BCLI0M1W.js';

function RelayDetailsComponent($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { relay, status, connectionStatus } = $$props;
    let { info } = useRelayInfoCached(relay.url);
    $$renderer2.push(`<div class="flex-1 min-w-0"><div class="flex flex-wrap items-center gap-2">`);
    if (info?.limitation?.payment_required) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<svg class="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (info?.limitation?.auth_required) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (info?.software) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg>`);
        } else {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push(`<svg class="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`);
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--> <span class="font-mono text-xs md:text-sm text-foreground break-all">${escape_html(relay.url)}</span> `);
    if (status === "connected") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span class="text-xs bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full">Connected</span>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (status === "disconnected" && connectionStatus[relay.url] !== void 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span class="text-xs bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400 px-2 py-0.5 rounded-full">Offline</span>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (status === "testing") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span class="text-xs bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-400 px-2 py-0.5 rounded-full">Testing...</span>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    if (info) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="mt-2 space-y-1">`);
      if (info.name) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex items-start gap-2"><span class="text-xs font-medium text-muted-foreground min-w-[60px]">Name:</span> <span class="text-sm font-semibold text-foreground">${escape_html(info.name)}</span></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (info.description) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex items-start gap-2"><span class="text-xs font-medium text-muted-foreground min-w-[60px]">About:</span> <span class="text-sm text-muted-foreground">${escape_html(info.description)}</span></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (info.software || info.version) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex items-start gap-2"><span class="text-xs font-medium text-muted-foreground min-w-[60px]">Software:</span> <span class="text-sm text-muted-foreground">${escape_html(info.software)}${escape_html(info.version ? ` v${info.version}` : "")}</span></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (info.relay_countries && info.relay_countries.length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex items-start gap-2"><svg class="w-3 h-3 text-muted-foreground mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> <span class="text-sm text-muted-foreground">${escape_html(info.relay_countries.join(", "))}</span></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (info.supported_nips && info.supported_nips.length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex items-start gap-2"><svg class="w-3 h-3 text-muted-foreground mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> <div class="flex-1"><span class="text-xs text-muted-foreground">Supports ${escape_html(info.supported_nips.length)} NIPs: ${escape_html(info.supported_nips.slice(0, 5).join(", "))} `);
        if (info.supported_nips.length > 5) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`...`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></span></div></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="flex flex-wrap gap-2 mt-2">`);
      if (info.limitation?.payment_required) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="text-xs bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-400 px-2 py-0.5 rounded-full">💰 Paid</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (info.limitation?.auth_required) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="text-xs bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded-full">🔐 Auth Required</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (info.contact) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="text-xs bg-neutral-100 dark:bg-muted text-muted-foreground px-2 py-0.5 rounded-full">📧 ${escape_html(info.contact)}</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="flex items-center gap-4 mt-3"><label class="flex items-center gap-2 cursor-pointer"><input type="checkbox"${attr("checked", relay.read, true)} class="w-4 h-4 text-primary rounded focus:ring-orange-500"/> <span class="text-sm text-muted-foreground">Read</span></label> <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox"${attr("checked", relay.write, true)} class="w-4 h-4 text-primary rounded focus:ring-orange-500"/> <span class="text-sm text-muted-foreground">Write</span></label></div></div>`);
  });
}
function RelaySettings($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let testingRelay = null;
    let connectionStatus = {};
    function getRelayStatus(url) {
      if (testingRelay === url) return "testing";
      return connectionStatus[url] || "disconnected";
    }
    let relays = settings.relays;
    $$renderer2.push(`<div class="space-y-6"><div><h2 class="text-xl font-semibold text-foreground mb-2">Relay Configuration</h2> <p class="text-sm text-muted-foreground">Configure which Nostr relays your app connects to for reading and publishing events.</p></div> <div class="bg-card border rounded-lg p-4"><div class="flex items-start gap-3"><svg class="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg> <div class="flex-1"><h3 class="font-medium text-foreground mb-1">Relay Authentication</h3> <p class="text-sm text-muted-foreground mb-3">Control how to handle relays that require authentication</p> <div class="space-y-2"><label class="flex items-start gap-3 cursor-pointer group"><input type="radio" name="authMode" value="always"${attr("checked", settings.relayAuth.mode === "always", true)} class="w-4 h-4 text-primary mt-0.5 focus:ring-2 focus:ring-primary"/> <div class="flex-1"><span class="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Always authenticate</span> <p class="text-xs text-muted-foreground mt-0.5">Automatically authenticate to any relay that requests it</p></div></label> <label class="flex items-start gap-3 cursor-pointer group"><input type="radio" name="authMode" value="ask"${attr("checked", settings.relayAuth.mode === "ask", true)} class="w-4 h-4 text-primary mt-0.5 focus:ring-2 focus:ring-primary"/> <div class="flex-1"><span class="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Ask each time</span> <p class="text-xs text-muted-foreground mt-0.5">Show a confirmation dialog before authenticating to relays</p></div></label></div></div></div></div> <div class="grid grid-cols-3 gap-2 md:gap-4"><div class="bg-neutral-50 dark:bg-background rounded-lg p-3 md:p-4"><div class="flex items-center gap-1 md:gap-2 text-green-600 dark:text-green-400 mb-1"><svg class="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"></path></svg> <span class="text-xs md:text-sm font-medium">Active</span></div> <div class="text-xl md:text-2xl font-bold text-foreground">${escape_html(relays.filter((r) => r.enabled).length)}</div></div> <div class="bg-neutral-50 dark:bg-background rounded-lg p-3 md:p-4"><div class="flex items-center gap-1 md:gap-2 text-blue-600 dark:text-blue-400 mb-1"><svg class="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg> <span class="text-xs md:text-sm font-medium">Read</span></div> <div class="text-xl md:text-2xl font-bold text-foreground">${escape_html(relays.filter((r) => r.enabled && r.read).length)}</div></div> <div class="bg-neutral-50 dark:bg-background rounded-lg p-3 md:p-4"><div class="flex items-center gap-1 md:gap-2 text-primary dark:text-primary mb-1"><svg class="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg> <span class="text-xs md:text-sm font-medium">Write</span></div> <div class="text-xl md:text-2xl font-bold text-foreground">${escape_html(relays.filter((r) => r.enabled && r.write).length)}</div></div></div> <div class="space-y-2"><!--[-->`);
    const each_array = ensure_array_like(relays);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let relay = each_array[$$index];
      const status = getRelayStatus(relay.url);
      $$renderer2.push(`<div${attr_class(`border rounded-lg p-4 transition-all ${stringify(relay.enabled ? "bg-card border" : "bg-neutral-50 dark:bg-background border opacity-60")}`)}><div class="flex flex-col md:flex-row md:items-start md:justify-between gap-3"><div class="flex-1"><div class="flex items-start md:items-center gap-3"><button${attr_class(`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 mt-0.5 md:mt-0 ${stringify(relay.enabled ? "bg-primary border-primary" : "bg-card border dark:border")}`)}>`);
      if (relay.enabled) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<svg class="w-3 h-3 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></button> `);
      RelayDetailsComponent($$renderer2, { relay, status, connectionStatus });
      $$renderer2.push(`<!----></div></div> <div class="flex items-center gap-2 ml-8 md:ml-0"><button${attr("disabled", testingRelay === relay.url, true)} class="p-1.5 md:p-2 hover:bg-neutral-100 dark:hover:bg-card rounded-lg transition-colors disabled:opacity-50" title="Test connection"><svg class="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg></button> <button class="p-1.5 md:p-2 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors group" title="Remove relay"><svg class="w-4 h-4 text-muted-foreground group-hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button></div></div></div>`);
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<button class="w-full border-2 border-dashed border rounded-lg p-4 hover:border-primary dark:hover:border-primary transition-colors group"><div class="flex items-center justify-center gap-2 text-muted-foreground group-hover:text-primary dark:group-hover:text-primary"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg> <span class="font-medium">Add Relay</span></div></button>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4"><div class="flex gap-3"><svg class="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg> <div class="text-sm text-yellow-800 dark:text-yellow-300"><p class="font-medium mb-1">Important</p> <p>Changes to relay configuration will take effect after refreshing the app.</p></div></div></div></div>`);
  });
}
function ThemeSettings($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const colorOptions = [
      {
        id: "orange",
        name: "Orange",
        hex: "#FF6B35",
        description: "Warm orange"
      },
      {
        id: "red",
        name: "Red",
        hex: "#E4104D",
        description: "Magenta / Raspberry red"
      },
      {
        id: "cyan",
        name: "Cyan",
        hex: "#00B7D3",
        description: "Bright cyan / Turquoise"
      },
      {
        id: "yellow",
        name: "Yellow",
        hex: "#FFD900",
        description: "Vivid yellow"
      },
      {
        id: "lime",
        name: "Lime",
        hex: "#97BF0D",
        description: "Lime green"
      }
    ];
    $$renderer2.push(`<div class="space-y-6"><div><h2 class="text-lg font-semibold text-foreground mb-4">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("settings.sections.appearance.title"))}</h2> <p class="text-sm text-muted-foreground mb-6">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("settings.sections.appearance.description"))}</p></div> <div class="border-b border pb-6"><div class="flex items-center gap-3 mb-4"><svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> <h3 class="text-base font-medium text-foreground">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("settings.sections.appearance.language"))}</h3></div> <p class="text-sm text-muted-foreground mb-4">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("settings.sections.appearance.languageDescription"))}</p> <div class="grid grid-cols-2 gap-3"><button${attr_class(`px-4 py-3 rounded-lg transition-all ${stringify(settings.language === "en" ? "bg-primary-50 dark:bg-primary-950/30 text-primary dark:text-primary" : "bg-card text-muted-foreground hover:bg-accent")}`)}><div class="flex items-center justify-center gap-2"><span class="text-lg">🇺🇸</span> <span class="font-medium">English</span></div></button> <button${attr_class(`px-4 py-3 rounded-lg transition-all ${stringify(settings.language === "es" ? "bg-primary-50 dark:bg-primary-950/30 text-primary dark:text-primary" : "bg-card text-muted-foreground hover:bg-accent")}`)}><div class="flex items-center justify-center gap-2"><span class="text-lg">🇪🇸</span> <span class="font-medium">Español</span></div></button> <button${attr_class(`px-4 py-3 rounded-lg transition-all ${stringify(settings.language === "fa" ? "bg-primary-50 dark:bg-primary-950/30 text-primary dark:text-primary" : "bg-card text-muted-foreground hover:bg-accent")}`)}><div class="flex items-center justify-center gap-2"><span class="text-lg">🇮🇷</span> <span class="font-medium">فارسی</span></div></button> <button${attr_class(`px-4 py-3 rounded-lg transition-all ${stringify(settings.language === "km" ? "bg-primary-50 dark:bg-primary-950/30 text-primary dark:text-primary" : "bg-card text-muted-foreground hover:bg-accent")}`)}><div class="flex items-center justify-center gap-2"><span class="text-lg">🇰🇭</span> <span class="font-medium">ខ្មែរ</span></div></button> <button${attr_class(`px-4 py-3 rounded-lg transition-all ${stringify(settings.language === "sn" ? "bg-primary-50 dark:bg-primary-950/30 text-primary dark:text-primary" : "bg-card text-muted-foreground hover:bg-accent")}`)}><div class="flex items-center justify-center gap-2"><span class="text-lg">🇿🇼</span> <span class="font-medium">Shona</span></div></button></div></div> <div class="border-b border pb-6"><div class="flex items-center gap-3 mb-4"><svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg> <h3 class="text-base font-medium text-foreground">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("settings.sections.appearance.theme"))}</h3></div> <p class="text-sm text-muted-foreground mb-4">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("settings.sections.appearance.themeDescription"))}</p> <div class="grid grid-cols-3 gap-3"><button${attr_class(`px-4 py-3 rounded-lg transition-all ${stringify(settings.theme === "light" ? "bg-primary-50 dark:bg-primary-950/30 text-primary dark:text-primary" : "bg-card text-muted-foreground hover:bg-accent")}`)}><div class="flex flex-col items-center gap-2"><span class="text-2xl">☀️</span> <span class="text-sm font-medium">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("settings.sections.appearance.themes.light"))}</span></div></button> <button${attr_class(`px-4 py-3 rounded-lg transition-all ${stringify(settings.theme === "dark" ? "bg-primary-50 dark:bg-primary-950/30 text-primary dark:text-primary" : "bg-card text-muted-foreground hover:bg-accent")}`)}><div class="flex flex-col items-center gap-2"><span class="text-2xl">🌙</span> <span class="text-sm font-medium">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("settings.sections.appearance.themes.dark"))}</span></div></button> <button${attr_class(`px-4 py-3 rounded-lg transition-all ${stringify(settings.theme === "system" ? "bg-primary-50 dark:bg-primary-950/30 text-primary dark:text-primary" : "bg-card text-muted-foreground hover:bg-accent")}`)}><div class="flex flex-col items-center gap-2"><span class="text-2xl">💻</span> <span class="text-sm font-medium">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("settings.sections.appearance.themes.system"))}</span></div></button></div></div> <div><div class="flex items-center gap-3 mb-4"><svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg> <h3 class="text-base font-medium text-foreground">Accent Color</h3></div> <p class="text-sm text-muted-foreground mb-4">Choose your preferred accent color</p> <div class="grid grid-cols-2 gap-3"><!--[-->`);
    const each_array = ensure_array_like(colorOptions);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let option = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`px-4 py-3 rounded-lg transition-all ${stringify(settings.themeColor === option.id ? "bg-primary-50 dark:bg-primary-950/30" : "bg-card hover:bg-accent")}`)}><div class="flex items-center gap-3"><div class="w-8 h-8 rounded-full flex-shrink-0"${attr_style(`background-color: ${stringify(option.hex)}`)}></div> <div class="flex flex-col items-start"><span class="font-medium text-foreground">${escape_html(option.name)}</span> <span class="text-xs text-muted-foreground">${escape_html(option.description)}</span></div></div></button>`);
    }
    $$renderer2.push(`<!--]--></div></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function BlossomSettings($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const DEFAULT_SERVERS = [
      "https://blossom.primal.net",
      "https://blossom.nostr.hu",
      "https://blossom.oxtr.dev"
    ];
    let servers = [];
    let pendingServers = [];
    let isSaving = false;
    let hasChanges = (() => {
      return servers.length > 0 && pendingServers.length > 0;
    })();
    $$renderer2.push(`<div class="space-y-6"><div><h3 class="text-lg font-semibold mb-2">Blossom Media Servers</h3> <p class="text-sm text-muted-foreground mb-4">Configure your Blossom servers for uploading images and media. The first server is your primary upload destination, and additional servers are used as mirrors for redundancy.</p></div> `);
    if (hasChanges) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg"><div class="flex items-center space-x-2 text-sm text-orange-800 dark:text-orange-200"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg> <span>You have unsaved changes</span></div> <div class="flex space-x-2"><button${attr("disabled", isSaving, true)} class="px-3 py-1.5 text-sm border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Discard</button> <button${attr("disabled", isSaving, true)} class="px-3 py-1.5 text-sm bg-primary hover:bg-accent-dark text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2">`);
      {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<span>Save Changes</span>`);
      }
      $$renderer2.push(`<!--]--></button></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="space-y-3"><label class="text-sm font-medium">Your Blossom Servers</label> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex items-center justify-center p-8"><svg class="animate-spin h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></div>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<button class="flex items-center space-x-2 px-4 py-2 text-primary dark:text-primary hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg> <span>Add Server</span></button>`);
    }
    $$renderer2.push(`<!--]--> <div class="border-t border pt-4"><label class="text-sm font-medium block mb-3">Suggested Servers</label> <p class="text-sm text-muted-foreground mb-3">Popular public Blossom servers you can add to your list</p> <div class="space-y-2"><!--[-->`);
    const each_array_1 = ensure_array_like(DEFAULT_SERVERS.filter((s) => !pendingServers.includes(s)));
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let server = each_array_1[$$index_1];
      $$renderer2.push(`<div class="flex items-center justify-between p-3 bg-neutral-50 dark:bg-background rounded-lg"><span class="text-sm">${escape_html(server)}</span> <button class="text-sm text-primary dark:text-primary hover:text-accent-dark dark:hover:text-primary-300">Add</button></div>`);
    }
    $$renderer2.push(`<!--]--> `);
    if (DEFAULT_SERVERS.every((s) => pendingServers.includes(s))) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p class="text-sm text-muted-foreground">All suggested servers have been added</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div></div>`);
  });
}
function KeyManagementSettings($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const isPrivateKeySigner = ndk.signer instanceof NDKPrivateKeySigner;
    const nsec = (() => {
      if (!isPrivateKeySigner || !ndk.signer) return null;
      const signer = ndk.signer;
      return signer.nsec;
    })();
    if (isPrivateKeySigner && nsec) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="space-y-6"><div class="flex gap-2 p-1 bg-neutral-100 dark:bg-card rounded-lg"><button${attr_class(`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${stringify(
        "bg-white dark:bg-muted text-foreground shadow-sm"
      )}`)}>View Key</button> <button${attr_class(`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${stringify("text-muted-foreground hover:text-neutral-900 dark:hover:text-foreground")}`)}>Create Backup</button></div> `);
      {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="space-y-6"><div class="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-lg p-4"><div class="flex items-start gap-3"><svg class="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg> <div class="flex-1"><h3 class="text-sm font-semibold text-red-900 dark:text-red-100 mb-1">Critical Security Warning</h3> <p class="text-xs text-red-800 dark:text-red-200">Your private key (nsec) is the only way to access your account. Anyone with access to this key has full control of your identity. Never share it with anyone and store it securely offline.</p></div></div></div> <div class="space-y-4"><div><h3 class="text-sm font-medium text-foreground mb-1">Your Private Key (nsec)</h3> <p class="text-xs text-muted-foreground">You are logged in with a private key signer. Save this key somewhere safe.</p></div> <div class="space-y-3"><div class="relative"><div class="bg-neutral-100 dark:bg-card border border rounded-lg p-4">`);
        {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push(`<div class="text-xs text-muted-foreground font-mono">${escape_html("•".repeat(63))}</div>`);
        }
        $$renderer2.push(`<!--]--></div></div> <div class="flex gap-2"><button class="flex-1 px-4 py-2 bg-neutral-200 dark:bg-muted text-muted-foreground rounded-lg hover:bg-neutral-300 dark:hover:bg-muted transition-colors text-sm font-medium flex items-center justify-center gap-2">`);
        {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg> Show Key`);
        }
        $$renderer2.push(`<!--]--></button> <button${attr("disabled", true, true)} class="flex-1 px-4 py-2 bg-primary text-foreground rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">`);
        {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg> Copy Key`);
        }
        $$renderer2.push(`<!--]--></button></div> <p class="text-xs text-muted-foreground text-center">Make sure nobody is watching your screen before revealing your key</p></div></div> <div class="bg-neutral-50 dark:bg-card border border rounded-lg p-4"><h4 class="text-sm font-medium text-foreground mb-2">Security Best Practices</h4> <ul class="space-y-2 text-xs text-muted-foreground"><li class="flex items-start gap-2"><svg class="w-4 h-4 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> <span>Write down your nsec on paper and store it in a safe place</span></li> <li class="flex items-start gap-2"><svg class="w-4 h-4 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> <span>Never share your nsec via email, messaging apps, or websites</span></li> <li class="flex items-start gap-2"><svg class="w-4 h-4 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> <span>Use the "Create Backup" tab to create encrypted shards with trusted contacts</span></li></ul></div></div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="text-center py-8"><div class="w-16 h-16 bg-neutral-100 dark:bg-card rounded-full flex items-center justify-center mx-auto mb-4"><svg class="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div> <h3 class="text-sm font-medium text-foreground mb-2">Not Using Private Key Signer</h3> <p class="text-xs text-muted-foreground max-w-sm mx-auto">You are not logged in with a private key signer. This section is only available for users who logged in with an nsec.</p></div>`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function DebugSettings($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<div class="space-y-6"><div class="flex items-center justify-between"><div><h2 class="text-lg font-semibold text-foreground">Cache Statistics</h2> <p class="text-sm text-muted-foreground mt-1">Local database cache information</p></div> <button class="p-2 hover:bg-neutral-200/50 dark:hover:bg-muted/30 rounded-lg transition-all" title="Refresh"><svg class="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg></button></div> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex flex-col items-center justify-center py-12 gap-3"><div class="w-10 h-10 border-4 border border-t-orange-500 rounded-full animate-spin"></div> <p class="text-sm text-muted-foreground">Loading cache statistics...</p></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function ZapSettings($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const amounts = [10, 21, 50, 100, 500, 1e3, 2100, 5e3];
    function formatAmount(amount) {
      if (amount >= 1e3) {
        return `${(amount / 1e3).toFixed(amount % 1e3 === 0 ? 0 : 1)}K`;
      }
      return amount.toString();
    }
    $$renderer2.push(`<div class="space-y-6"><div><h3 class="text-lg font-semibold text-foreground mb-4">Default Zap Amount</h3> <p class="text-sm text-muted-foreground mb-4">Choose the default amount for quick zaps. Long-press the zap button to choose a custom amount.</p> <div class="grid grid-cols-4 gap-3"><!--[-->`);
    const each_array = ensure_array_like(amounts);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let amount = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`relative overflow-hidden rounded-xl p-4 transition-all duration-200 ${stringify(settings.zap.defaultAmount === amount ? "bg-gradient-to-br from-primary-600 to-primary-700 dark:bg-primary text-foreground shadow-lg shadow-primary/30 dark:shadow-primary/50 scale-105" : "bg-neutral-100 dark:bg-muted hover:bg-neutral-200 dark:hover:bg-muted text-foreground hover:scale-105")}`)} type="button"><div class="flex flex-col items-center gap-2"><span class="text-xl">⚡</span> <span class="text-sm font-bold">${escape_html(formatAmount(amount))}</span></div></button>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="mt-4">`);
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<button class="w-full px-4 py-3 bg-neutral-100 dark:bg-muted hover:bg-neutral-200 dark:hover:bg-muted border-2 border-dashed border dark:border rounded-xl text-muted-foreground font-semibold transition-all flex items-center justify-center gap-2" type="button"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg> Custom Amount</button>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="p-4 bg-neutral-100 dark:bg-card border border rounded-xl"><div class="flex items-start gap-3"><div class="mt-0.5"><svg class="w-5 h-5 text-primary dark:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div> <div class="flex-1"><h4 class="text-sm font-semibold text-foreground mb-1">How to Zap</h4> <ul class="text-sm text-muted-foreground space-y-1"><li><strong>Tap:</strong> Send default zap amount (${escape_html(settings.zap.defaultAmount)} sats)</li> <li><strong>Long-press:</strong> Choose custom amount from modal</li></ul></div></div></div> <div class="p-4 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800/30 rounded-xl"><div class="flex items-center gap-2 mb-2"><span class="text-2xl">⚡</span> <h4 class="text-sm font-semibold text-primary-900 dark:text-primary-100">Current Default</h4></div> <p class="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">${escape_html(settings.zap.defaultAmount.toLocaleString())} sats</p></div></div>`);
  });
}
function MintBrowser($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { open = false, onSelectMints, onClose } = $$props;
    createMintDiscoveryStore(ndk, {
      network: "mainnet",
      timeout: 0
      // No auto-timeout
    });
    let discoveredMints = [];
    let selectedMints = /* @__PURE__ */ new Set();
    function getHostnameFromUrl(url) {
      try {
        return new URL(url).hostname;
      } catch {
        return url;
      }
    }
    function handleAddSelected() {
      if (selectedMints.size === 0) return;
      onSelectMints(Array.from(selectedMints));
      open = false;
    }
    function handleClose() {
      open = false;
      onClose();
    }
    const customMints = Array.from(selectedMints).filter((mintUrl) => !discoveredMints.some((m) => m.url === mintUrl));
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<!---->`);
      Root($$renderer3, {
        open,
        onOpenChange: (newOpen) => {
          if (!newOpen) handleClose();
        },
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->`);
          Dialog_content($$renderer4, {
            class: "max-w-2xl max-h-[90vh] flex flex-col p-0",
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->`);
              Dialog_header($$renderer5, {
                class: "px-6 py-4 border-b border-border",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->`);
                  Dialog_title($$renderer6, {
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->Browse Mints`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!---->`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> <div class="flex-1 overflow-y-auto px-6 py-4 space-y-4"><div class="flex gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg"><div class="text-lg flex-shrink-0">ℹ️</div> <div class="text-sm text-muted-foreground">Mints are custodial services that issue ecash tokens. Select multiple mints to spread risk.</div></div> <div class="flex flex-col gap-3 p-4 bg-muted/30 border border-border rounded-lg"><button class="flex items-center gap-2 text-left font-semibold text-foreground"><span class="flex items-center justify-center w-6 h-6 bg-primary/20 text-primary rounded text-lg font-bold">${escape_html("+")}</span> Add Custom Mint</button> `);
              {
                $$renderer5.push("<!--[!-->");
              }
              $$renderer5.push(`<!--]--></div> `);
              if (discoveredMints.length > 0) {
                $$renderer5.push("<!--[-->");
                $$renderer5.push(`<div class="space-y-3"><!--[-->`);
                const each_array = ensure_array_like(discoveredMints);
                for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                  let mint = each_array[$$index];
                  $$renderer5.push(`<button${attr_class(`w-full flex items-start gap-4 p-4 bg-muted/30 border rounded-lg text-left transition-all hover:bg-muted/50 hover:border-primary/30 ${stringify(selectedMints.has(mint.url) ? "bg-primary/15 border-primary/50" : "border-border")}`)}><div class="flex items-center pt-0.5"><div${attr_class(`w-6 h-6 border-2 rounded flex items-center justify-center transition-all ${stringify(selectedMints.has(mint.url) ? "bg-primary border-primary" : "border-muted-foreground/30 bg-muted/50")}`)}>`);
                  if (selectedMints.has(mint.url)) {
                    $$renderer5.push("<!--[-->");
                    $$renderer5.push(`<span class="text-primary-foreground text-sm font-bold">✓</span>`);
                  } else {
                    $$renderer5.push("<!--[!-->");
                  }
                  $$renderer5.push(`<!--]--></div></div> <div class="w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden bg-primary/20 flex items-center justify-center">`);
                  if (mint.icon) {
                    $$renderer5.push("<!--[-->");
                    $$renderer5.push(`<img${attr("src", mint.icon)}${attr("alt", mint.name || mint.url)} class="w-full h-full object-cover"/>`);
                  } else {
                    $$renderer5.push("<!--[!-->");
                    $$renderer5.push(`<span class="text-2xl">🏦</span>`);
                  }
                  $$renderer5.push(`<!--]--></div> <div class="flex-1 min-w-0"><div class="font-semibold text-foreground mb-1">${escape_html(mint.name || getHostnameFromUrl(mint.url))}</div> `);
                  if (mint.description) {
                    $$renderer5.push("<!--[-->");
                    $$renderer5.push(`<div class="text-sm text-muted-foreground mb-1 line-clamp-2">${escape_html(mint.description)}</div>`);
                  } else {
                    $$renderer5.push("<!--[!-->");
                  }
                  $$renderer5.push(`<!--]--> <div class="text-xs font-mono text-muted-foreground truncate">${escape_html(mint.url)}</div> `);
                  if (mint.recommendations.length > 0) {
                    $$renderer5.push("<!--[-->");
                    $$renderer5.push(`<div class="text-xs text-yellow-500 mt-1">⭐ Recommended by ${escape_html(mint.recommendations.length)} user${escape_html(mint.recommendations.length === 1 ? "" : "s")}</div>`);
                  } else {
                    $$renderer5.push("<!--[!-->");
                  }
                  $$renderer5.push(`<!--]--> `);
                  if (mint.isOnline !== void 0) {
                    $$renderer5.push("<!--[-->");
                    $$renderer5.push(`<div${attr_class(`text-xs mt-1 ${stringify(mint.isOnline ? "text-green-400" : "text-red-400")}`)}>${escape_html(mint.isOnline ? "🟢 Online" : "🔴 Offline")}</div>`);
                  } else {
                    $$renderer5.push("<!--[!-->");
                  }
                  $$renderer5.push(`<!--]--></div></button>`);
                }
                $$renderer5.push(`<!--]--></div>`);
              } else {
                $$renderer5.push("<!--[!-->");
                $$renderer5.push(`<div class="flex flex-col items-center justify-center py-12 px-4 text-center bg-muted/20 border border-dashed border-border rounded-lg"><div class="text-5xl mb-4">🔍</div> <p class="text-muted-foreground">Discovering mints from the network...</p> <p class="text-sm text-muted-foreground/60 mt-1">Add custom mints above or wait for discovery</p></div>`);
              }
              $$renderer5.push(`<!--]--> `);
              if (customMints.length > 0) {
                $$renderer5.push("<!--[-->");
                $$renderer5.push(`<div class="pt-2"><h4 class="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Custom Mints</h4> <div class="space-y-3"><!--[-->`);
                const each_array_1 = ensure_array_like(customMints);
                for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
                  let mintUrl = each_array_1[$$index_1];
                  $$renderer5.push(`<div class="flex items-start gap-4 p-4 bg-primary/15 border border-primary/50 rounded-lg"><div class="w-12 h-12 flex-shrink-0 rounded-lg bg-primary/20 flex items-center justify-center"><span class="text-2xl">🏦</span></div> <div class="flex-1 min-w-0"><div class="font-semibold text-foreground mb-1">${escape_html(getHostnameFromUrl(mintUrl))}</div> <div class="text-xs font-mono text-muted-foreground truncate">${escape_html(mintUrl)}</div></div> <button class="w-8 h-8 flex-shrink-0 self-center flex items-center justify-center bg-red-500/20 border border-red-500/30 rounded text-red-400 font-bold hover:bg-red-500/30 transition-colors">✕</button></div>`);
                }
                $$renderer5.push(`<!--]--></div></div>`);
              } else {
                $$renderer5.push("<!--[!-->");
              }
              $$renderer5.push(`<!--]--></div> <div class="px-6 py-4 border-t border-border space-y-3">`);
              if (selectedMints.size > 0) {
                $$renderer5.push("<!--[-->");
                $$renderer5.push(`<div class="flex items-center justify-center gap-2 p-3 bg-primary/10 border border-primary/20 rounded-lg text-sm font-semibold"><span class="text-primary">✓</span> ${escape_html(selectedMints.size)} mint${escape_html(selectedMints.size === 1 ? "" : "s")} selected</div>`);
              } else {
                $$renderer5.push("<!--[!-->");
              }
              $$renderer5.push(`<!--]--> <div class="flex gap-3">`);
              Button($$renderer5, {
                variant: "outline",
                onclick: handleClose,
                class: "flex-1",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Cancel`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> `);
              Button($$renderer5, {
                onclick: handleAddSelected,
                disabled: selectedMints.size === 0,
                class: "flex-1",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Add Selected Mints`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----></div></div>`);
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
function WalletSettings($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let isBrowsingMints = false;
    let error = null;
    let successMessage = null;
    let isSaving = false;
    const wallet = ndk.$wallet;
    let pendingMints = [];
    let pendingRelays = [];
    let hasPendingChanges = false;
    const mints = hasPendingChanges ? pendingMints : wallet?.mints || [];
    const relays = hasPendingChanges ? pendingRelays : wallet?.relays || [];
    const mintBalances = (() => {
      const balances = /* @__PURE__ */ new Map();
      if (wallet) {
        wallet.mintBalances.forEach((mint) => {
          balances.set(mint.url, mint.balance);
        });
      }
      return balances;
    })();
    function clearMessages() {
      error = null;
      successMessage = null;
    }
    function markChanges() {
      hasPendingChanges = true;
    }
    function getMintName(mintUrl) {
      try {
        const url = new URL(mintUrl);
        return url.hostname;
      } catch {
        return mintUrl;
      }
    }
    function getRelayName(relayUrl) {
      try {
        const url = new URL(relayUrl);
        return url.hostname;
      } catch {
        return relayUrl;
      }
    }
    function formatSats(amount) {
      return new Intl.NumberFormat("en-US").format(amount);
    }
    function handleBrowseMints(selectedMints) {
      const newMints = selectedMints.filter((mintUrl) => !mints.includes(mintUrl));
      if (newMints.length > 0) {
        pendingMints = [...pendingMints, ...newMints];
        markChanges();
        clearMessages();
      }
      isBrowsingMints = false;
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div class="space-y-6"><div class="flex items-start justify-between gap-4"><div><h2 class="text-xl font-semibold text-foreground mb-2">Wallet Configuration</h2> <p class="text-sm text-muted-foreground">Manage your Cashu mints, wallet relays, and Lightning integration.</p></div> `);
      if (hasPendingChanges) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<button${attr("disabled", isSaving, true)} class="px-6 py-2 bg-primary text-foreground rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center gap-2 flex-shrink-0">`);
        {
          $$renderer3.push("<!--[!-->");
          $$renderer3.push(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Save`);
        }
        $$renderer3.push(`<!--]--></button>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--></div> `);
      if (successMessage) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4"><div class="flex gap-3"><svg class="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> <p class="text-sm text-green-800 dark:text-green-300">${escape_html(successMessage)}</p></div></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> `);
      if (error) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4"><div class="flex gap-3"><svg class="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> <p class="text-sm text-red-800 dark:text-red-300">${escape_html(error)}</p></div></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> <div class="space-y-3"><div class="flex items-center justify-between"><h3 class="text-lg font-semibold text-foreground">Cashu Mints</h3> <span class="text-sm text-muted-foreground">${escape_html(mints.length)} ${escape_html(mints.length === 1 ? "mint" : "mints")}</span></div> <div class="space-y-2"><!--[-->`);
      const each_array = ensure_array_like(mints);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let mint = each_array[$$index];
        $$renderer3.push(`<div class="border rounded-lg p-4 bg-card border"><div class="flex items-center justify-between"><div class="flex-1 min-w-0"><div class="flex items-center gap-2"><svg class="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg> <div class="flex-1 min-w-0"><div class="text-sm font-medium text-foreground truncate">${escape_html(getMintName(mint))}</div> <div class="text-xs text-muted-foreground truncate">${escape_html(mint)}</div></div></div> `);
        if (mintBalances.has(mint)) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<div class="mt-2 text-sm"><span class="text-primary dark:text-primary font-semibold">${escape_html(formatSats(mintBalances.get(mint) || 0))} sats</span></div>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--></div> <button class="ml-3 p-2 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors group" title="Remove mint"><svg class="w-5 h-5 text-muted-foreground group-hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button></div></div>`);
      }
      $$renderer3.push(`<!--]--> `);
      if (mints.length === 0) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="text-center py-8 text-muted-foreground"><svg class="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg> <p class="text-sm">No mints configured</p></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> <button class="w-full border rounded-lg p-3 hover:bg-muted transition-colors group"><div class="flex items-center justify-center gap-2 text-muted-foreground group-hover:text-primary dark:group-hover:text-primary"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg> <span class="font-medium">Add Mint</span></div></button></div></div> <div class="space-y-3"><div class="flex items-center justify-between"><h3 class="text-lg font-semibold text-foreground">Wallet Relays</h3> <span class="text-sm text-muted-foreground">${escape_html(relays.length)} ${escape_html(relays.length === 1 ? "relay" : "relays")}</span></div> <div class="space-y-2"><!--[-->`);
      const each_array_1 = ensure_array_like(relays);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let relay = each_array_1[$$index_1];
        $$renderer3.push(`<div class="border rounded-lg p-4 bg-card border"><div class="flex items-center justify-between"><div class="flex-1 min-w-0"><div class="flex items-center gap-2"><svg class="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg> <div class="flex-1 min-w-0"><div class="text-sm font-medium text-foreground truncate">${escape_html(getRelayName(relay))}</div> <div class="text-xs text-muted-foreground truncate">${escape_html(relay)}</div></div></div></div> <button class="ml-3 p-2 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors group" title="Remove relay"><svg class="w-5 h-5 text-muted-foreground group-hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button></div></div>`);
      }
      $$renderer3.push(`<!--]--> `);
      if (relays.length === 0) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="text-center py-8 text-muted-foreground"><svg class="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg> <p class="text-sm">No relays configured</p></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> `);
      {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push(`<button class="w-full border rounded-lg p-3 hover:bg-muted transition-colors group"><div class="flex items-center justify-center gap-2 text-muted-foreground group-hover:text-primary dark:group-hover:text-primary"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg> <span class="font-medium">Add Relay</span></div></button>`);
      }
      $$renderer3.push(`<!--]--></div></div> <div class="border rounded-lg p-4 bg-card"><div class="flex items-center justify-between gap-4"><div class="flex items-center gap-2"><svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg> <div><h3 class="text-lg font-semibold text-foreground">npub.cash Lightning Zaps</h3> <p class="text-sm text-muted-foreground">Automatically redeem Lightning zaps received via npub.cash into your wallet.</p></div></div> <label class="relative inline-flex items-center cursor-pointer flex-shrink-0"><input type="checkbox"${attr("checked", npubCash.enabled, true)} class="sr-only peer"/> <div class="w-11 h-6 bg-neutral-300 dark:bg-neutral-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div></label></div></div></div> `);
      MintBrowser($$renderer3, {
        onSelectMints: handleBrowseMints,
        onClose: () => isBrowsingMints = false,
        get open() {
          return isBrowsingMints;
        },
        set open($$value) {
          isBrowsingMints = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!---->`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
  });
}
function HashtagSettings($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let newHashtag = "";
    let isAdding = false;
    $$renderer2.push(`<div class="space-y-6"><div class="text-sm text-muted-foreground"><p>Follow hashtags to see related content in your home feed. Your followed hashtags will appear as filters at the top of your home page.</p></div> <div class="space-y-3"><label class="block"><span class="text-sm font-medium text-muted-foreground mb-2 block">Add Hashtag</span> <div class="flex gap-2"><div class="relative flex-1"><span class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">#</span> <input type="text"${attr("value", newHashtag)} placeholder="bitcoin" class="w-full pl-8 pr-3 py-2 bg-neutral-100 dark:bg-card border border rounded-lg text-foreground placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-500"${attr("disabled", isAdding, true)}/></div> <button${attr("disabled", !newHashtag.trim(), true)} class="px-4 py-2 bg-primary text-foreground rounded-lg hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium">${escape_html("Add")}</button></div></label> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="space-y-3"><h3 class="text-sm font-medium text-muted-foreground">Followed Hashtags</h3> `);
    if (!hashtagInterests) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-8 text-muted-foreground"><p class="text-sm">Hashtag interests not available</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (hashtagInterests.isLoading) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex items-center justify-center py-8 text-muted-foreground"><svg class="w-5 h-5 animate-spin mr-2" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Loading...</div>`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (hashtagInterests.interests.length === 0) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="text-center py-8 text-muted-foreground"><svg class="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path></svg> <p class="text-sm">No hashtags followed yet</p> <p class="text-xs mt-1">Add hashtags above to start following topics</p></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push(`<div class="space-y-2"><!--[-->`);
          const each_array = ensure_array_like(hashtagInterests.interests);
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let hashtag = each_array[$$index];
            $$renderer2.push(`<div class="flex items-center justify-between p-3 bg-neutral-100 dark:bg-card border border rounded-lg"><div class="flex items-center gap-2"><span class="text-primary font-medium">#</span> <span class="text-foreground font-medium">${escape_html(hashtag)}</span></div> <button class="p-1.5 hover:bg-red-500/10 rounded-lg transition-colors group" title="Remove hashtag"><svg class="w-4 h-4 text-muted-foreground group-hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div>`);
          }
          $$renderer2.push(`<!--]--></div>`);
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div> <div class="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg"><div class="flex gap-3"><svg class="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> <div class="text-sm text-blue-700 dark:text-blue-300"><p class="font-medium mb-1">How it works</p> <ul class="space-y-1 text-xs"><li>• Click hashtag pills on your home feed to filter by specific hashtags</li> <li>• When viewing a specific relay, hashtag filters will search within that relay</li> <li>• When in "Following" mode, hashtag filters will search within your follows</li> <li>• Your hashtag interests are stored on Nostr (kind 10015)</li></ul></div></div></div></div>`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let activeSection = null;
    const sectionGroups = [
      {
        title: "Content & Personalization",
        items: [
          {
            id: "hashtags",
            label: "Hashtag Interests",
            description: "Follow hashtags and filter your feed",
            iconPath: "M7 20l4-16m2 16l4-16M6 9h14M4 15h14",
            iconColor: "text-primary",
            iconBg: "bg-primary/10",
            component: HashtagSettings,
            available: true
          },
          {
            id: "theme",
            label: "Appearance",
            description: "Customize theme and language",
            iconPath: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
            iconColor: "text-primary",
            iconBg: "bg-primary-400/10",
            component: ThemeSettings,
            available: true
          }
        ]
      },
      {
        title: "Servers",
        items: [
          {
            id: "relays",
            label: "Relays",
            description: "Manage your Nostr relay connections",
            iconPath: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01",
            iconColor: "text-blue-400",
            iconBg: "bg-blue-400/10",
            component: RelaySettings,
            available: true
          },
          {
            id: "blossom",
            label: "Media Servers",
            description: "Configure Blossom media upload servers",
            iconPath: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
            iconColor: "text-primary",
            iconBg: "bg-primary/10",
            component: BlossomSettings,
            available: true
          }
        ]
      },
      {
        title: "Payments",
        items: [
          {
            id: "wallet",
            label: "Wallet",
            description: "Manage Cashu mints and wallet relays",
            iconPath: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
            iconColor: "text-primary",
            iconBg: "bg-primary/10",
            component: WalletSettings,
            available: true
          },
          {
            id: "zap",
            label: "Zaps",
            description: "Configure default zap amount and preferences",
            iconPath: "M13 10V3L4 14h7v7l9-11h-7z",
            iconColor: "text-yellow-400",
            iconBg: "bg-yellow-400/10",
            component: ZapSettings,
            available: true
          }
        ]
      },
      {
        title: "Security & Advanced",
        items: [
          {
            id: "keys",
            label: "Private Key",
            description: "View and backup your private key",
            iconPath: "M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z",
            iconColor: "text-red-500",
            iconBg: "bg-red-500/10",
            component: KeyManagementSettings,
            available: true
          },
          {
            id: "debug",
            label: "Debug",
            description: "View cache statistics and debug information",
            iconPath: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
            iconColor: "text-green-400",
            iconBg: "bg-green-400/10",
            component: DebugSettings,
            available: true
          }
        ]
      }
    ];
    const allSections = sectionGroups.flatMap((group) => group.items);
    allSections.find((s) => s.id === activeSection);
    $$renderer2.push(`<div class="w-full min-h-screen bg-background pb-20 md:pb-0"><div class="max-w-lg mx-auto">`);
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="pt-6 pb-4"><h1 class="text-xl font-semibold text-foreground">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("settings.title"))}</h1></div> <div class="py-6 space-y-8"><!--[-->`);
      const each_array = ensure_array_like(sectionGroups);
      for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
        let group = each_array[$$index_1];
        $$renderer2.push(`<div><h2 class="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">${escape_html(group.title)}</h2> <div class="space-y-2"><!--[-->`);
        const each_array_1 = ensure_array_like(group.items);
        for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
          let section = each_array_1[$$index];
          $$renderer2.push(`<button${attr("disabled", !section.available, true)}${attr_class(`w-full bg-neutral-100 dark:bg-card border rounded-xl p-4 flex items-center justify-between transition-all ${stringify(section.available ? "hover:bg-neutral-200 dark:hover:bg-muted cursor-pointer" : "opacity-50 cursor-not-allowed")}`)}><div class="flex items-center gap-3"><div${attr_class(`w-10 h-10 rounded-lg flex items-center justify-center ${stringify(section.iconBg)}`)}><svg${attr_class(`w-5 h-5 ${stringify(section.iconColor)}`)} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"${attr("d", section.iconPath)}></path></svg></div> <div class="text-left"><div class="text-sm font-medium text-foreground flex items-center gap-2">${escape_html(section.label)} `);
          if (!section.available) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<span class="text-xs bg-neutral-200 dark:bg-muted px-1.5 py-0.5 rounded">${escape_html(store_get($$store_subs ??= {}, "$t", $format)("common.soon"))}</span>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--></div> <div class="text-xs text-muted-foreground">${escape_html(section.description)}</div></div></div> `);
          if (section.available) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<svg class="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--></button>`);
        }
        $$renderer2.push(`<!--]--></div></div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-r8tmuwzY.js.map
