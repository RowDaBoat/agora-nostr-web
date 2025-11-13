import { g as store_get, u as unsubscribe_stores, e as ensure_array_like, a as attr_class, c as clsx, b as attr, s as stringify } from './index2-DpBdzO5t.js';
import { p as page } from './stores-lKKGOiBk.js';
import './utils-KcIDVAAe.js';
import 'clsx';
import './state.svelte-zw3OW0Pf.js';
import { s as settings, n as ndk } from './ndk.svelte-BfhDBrJw.js';
import '@nostr-dev-kit/ndk';
import './button2-JT-_T3Ay.js';
import { T as TimeAgo } from './TimeAgo-B1T5QF8y.js';
import { E as EventOptionsMenu } from './EventOptionsMenu-CdBOElMJ.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import { C as CreateOrderModal } from './CreateOrderModal-Bzte9lJq.js';
import './context-D7LG2f18.js';
import '@nostr-dev-kit/cache-sqlite-wasm';
import '@nostr-dev-kit/wallet';
import '@nostr-dev-kit/wot';
import '@nostr-dev-kit/sessions';
import '@nostr-dev-kit/sync';
import 'tty';
import 'util';
import 'os';
import './index-BCLI0M1W.js';
import 'tailwind-merge';
import './formatTime-CvNAVcDX.js';
import './toast.svelte-BEvONWAz.js';
import './index3-DOo-Ka_h.js';
import './scroll-lock-YhRhLzPR.js';
import './events-CY0_bqjb.js';
import './button-DBIbgud-.js';
import './utils2-B05Dmz_H.js';
import './RelayIcon-DEER5mbZ.js';
import './relayInfo.svelte-CrGOXzx2.js';
import './textarea-DfKFjAUT.js';
import './runtime-9tjL5BFW.js';
import './index-BYTxiVRf.js';
import './dialog-header-DSVdIrOb.js';
import './dialog-description-C9BRLaT0.js';
import './RelayPublishDropdownContent-CzmVdnh5.js';
import './input-BbRZJqts.js';

function OrderCard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { order } = $$props;
    const currencyData = {
      USD: { symbol: "$", flag: "🇺🇸" },
      EUR: { symbol: "€", flag: "🇪🇺" },
      GBP: { symbol: "£", flag: "🇬🇧" },
      BRL: { symbol: "R$", flag: "🇧🇷" },
      ARS: { symbol: "$", flag: "🇦🇷" },
      PLN: { symbol: "zł", flag: "🇵🇱" },
      JPY: { symbol: "¥", flag: "🇯🇵" },
      CHF: { symbol: "Fr", flag: "🇨🇭" },
      PEN: { symbol: "S/", flag: "🇵🇪" },
      UYU: { symbol: "$", flag: "🇺🇾" },
      VES: { symbol: "Bs", flag: "🇻🇪" },
      RUB: { symbol: "₽", flag: "🇷🇺" },
      SEK: { symbol: "kr", flag: "🇸🇪" },
      NOK: { symbol: "kr", flag: "🇳🇴" },
      AUD: { symbol: "$", flag: "🇦🇺" },
      CUP: { symbol: "$", flag: "🇨🇺" }
    };
    const paymentMethodData = {
      "Cash": { icon: "💵", region: "Universal" },
      "Cash (F2F)": { icon: "💵", region: "Local" },
      "PIX": { icon: "🔄", region: "Brazil" },
      "BLIK": { icon: "📱", region: "Poland" },
      "Revolut": { icon: "💳", region: "Europe" },
      "Zelle": { icon: "🏦", region: "USA" },
      "CashApp": { icon: "📲", region: "USA" },
      "CVU": { icon: "🏧", region: "Argentina" },
      "MP": { icon: "📲", region: "Argentina" },
      "f2f": { icon: "🤝", region: "Local" },
      "СБП": { icon: "🏦", region: "Russia" }
    };
    const currencyInfo = currencyData[order.currency] || { symbol: order.currency, flag: "🌍" };
    const paymentInfo = paymentMethodData[order.paymentMethod] || { icon: "💰", region: "" };
    const pricePerBtc = order.fiatAmount > 0 && order.satsAmount > 0 ? order.fiatAmount / order.satsAmount * 1e8 : 0;
    $$renderer2.push(`<div class="bg-card rounded-lg md:rounded-xl border border p-3 md:p-4 hover:shadow-lg transition-shadow"><div class="flex items-start justify-between mb-2 md:mb-3"><div class="flex items-center gap-3">`);
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br bg-primary rounded-full"></div>`);
    }
    $$renderer2.push(`<!--]--> <div><div class="flex items-center gap-2"><h3 class="font-semibold text-sm md:text-base text-foreground">${escape_html(`@${order.pubkey.slice(0, 6)}...`)}</h3> `);
    if (order.rating && order.rating > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex items-center gap-1 text-yellow-500"><svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg> <span class="text-sm">${escape_html(order.rating.toFixed(1))}</span></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <p class="text-xs text-muted-foreground">`);
    TimeAgo($$renderer2, { timestamp: order.createdAt });
    $$renderer2.push(`<!----> `);
    if (order.platform) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`• ${escape_html(order.platform)}`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (order.geohash && order.paymentMethod.includes("F2F")) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span class="inline-flex items-center gap-1 ml-2"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> <span>Near ${escape_html(order.geohash.substring(0, 4))}</span></span>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></p></div></div> <div class="flex items-center gap-1 md:gap-2"><span class="text-lg md:text-2xl">${escape_html(currencyInfo.flag)}</span> <div${attr_class(`px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs md:text-sm font-medium ${order.type === "buy" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"}`)}>${escape_html(order.type === "buy" ? "Buying" : "Selling")}</div> `);
    EventOptionsMenu($$renderer2, { event: order.event });
    $$renderer2.push(`<!----></div></div> <div class="grid grid-cols-3 gap-2 md:gap-4 mb-3 md:mb-4"><div><p class="text-xs text-muted-foreground mb-0.5 md:mb-1">Amount</p> <div class="flex items-center gap-1 md:gap-2"><svg class="w-3 h-3 md:w-4 md:h-4 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"></path></svg> <span class="font-mono font-semibold text-xs md:text-base text-foreground">${escape_html((order.satsAmount / 1e8).toFixed(4))}</span></div> <p class="text-xs text-muted-foreground mt-0.5 md:mt-1 hidden md:block">${escape_html(order.satsAmount.toLocaleString())} sats</p></div> <div><p class="text-xs text-muted-foreground mb-0.5 md:mb-1">Price</p> <div class="flex items-center gap-1"><span class="text-sm md:text-base hidden md:inline">${escape_html(currencyInfo.flag)}</span> <p class="text-sm md:text-lg font-semibold text-foreground">${escape_html(currencyInfo.symbol)}${escape_html(order.fiatAmount.toFixed(0))}</p></div> `);
    if (pricePerBtc > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p class="text-xs text-muted-foreground mt-1">${escape_html(currencyInfo.symbol)}${escape_html(pricePerBtc.toFixed(2))}/BTC `);
      if (order.premium && order.premium !== 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span${attr_class(clsx(order.premium > 0 ? "text-red-500" : "text-green-500"))}>(${escape_html(order.premium > 0 ? "+" : "")}${escape_html(order.premium)}%)</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></p>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="min-w-0"><p class="text-xs text-muted-foreground mb-0.5 md:mb-1">Payment</p> <div class="flex items-center gap-1 md:gap-2"><span class="text-sm md:text-lg flex-shrink-0">${escape_html(paymentInfo.icon)}</span> <div class="flex flex-col min-w-0"><span class="font-medium text-xs md:text-base text-foreground truncate max-w-[80px] md:max-w-none">${escape_html(order.paymentMethod)}</span> `);
    if (paymentInfo.region) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span class="text-xs text-muted-foreground hidden md:inline">${escape_html(paymentInfo.region)}</span>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div></div></div> <div class="flex justify-end items-center gap-2">`);
    if (order.source) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<a${attr("href", order.source)} target="_blank" rel="noopener noreferrer" class="flex items-center justify-center gap-1 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-primary text-foreground rounded-lg hover:bg-primary-700 transition-colors text-sm md:text-base"${attr("title", `View on ${stringify(order.platform || "external site")}`)}><svg class="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg> <span class="hidden md:inline">View on ${escape_html(order.platform || "Site")}</span> <span class="md:hidden">View</span></a>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<button class="flex items-center justify-center gap-1 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-primary text-foreground rounded-lg hover:bg-primary-700 transition-colors text-sm md:text-base"><svg class="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg> <span class="hidden md:inline">${escape_html(order.type === "buy" ? "Sell to User" : "Buy from User")}</span> <span class="md:hidden">${escape_html(order.type === "buy" ? "Sell" : "Buy")}</span></button>`);
    }
    $$renderer2.push(`<!--]--></div></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function OrderBook($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { filters } = $$props;
    const selectedRelay = settings.selectedRelay;
    const subscription = ndk.$subscribe(() => {
      const opts = {
        filters: [{ kinds: [38383], limit: 100 }],
        closeOnEose: false,
        subId: "p2p"
      };
      if (selectedRelay) {
        opts.relayUrls = [selectedRelay];
        opts.exclusiveRelay = true;
      }
      return opts;
    });
    const events = subscription.events;
    const orders = (() => {
      const parsedOrders = [];
      events.forEach((event) => {
        const tags = event.tags;
        const zTag = tags.find((t) => t[0] === "z");
        if (zTag && zTag[1] === "info") return;
        const orderType = tags.find((t) => t[0] === "k")?.[1];
        const currency = tags.find((t) => t[0] === "f")?.[1];
        const status = tags.find((t) => t[0] === "s")?.[1];
        const paymentMethod = tags.find((t) => t[0] === "pm")?.[1];
        const satsAmount = parseInt(tags.find((t) => t[0] === "amt")?.[1] || "0");
        const fiatAmount = parseFloat(tags.find((t) => t[0] === "fa")?.[1] || "0");
        const premium = parseFloat(tags.find((t) => t[0] === "premium")?.[1] || "0");
        const rating = parseFloat(tags.find((t) => t[0] === "rating")?.[1] || "0");
        const platform = tags.find((t) => t[0] === "y")?.[1];
        const geohash = tags.find((t) => t[0] === "g")?.[1];
        const source = tags.find((t) => t[0] === "source")?.[1];
        const dTag = tags.find((t) => t[0] === "d")?.[1];
        if (status === "pending" && orderType && currency && dTag) {
          parsedOrders.push({
            id: dTag,
            pubkey: event.pubkey,
            type: orderType,
            currency,
            status,
            paymentMethod: paymentMethod || "Unknown",
            satsAmount,
            fiatAmount,
            premium,
            rating,
            platform,
            geohash,
            source,
            createdAt: event.created_at || Date.now() / 1e3,
            event
          });
        }
      });
      parsedOrders.sort((a, b) => b.createdAt - a.createdAt);
      return parsedOrders;
    })();
    const filteredOrders = orders.filter((order) => {
      if (filters.currency !== "all" && order.currency !== filters.currency) return false;
      if (filters.paymentMethod !== "all" && order.paymentMethod !== filters.paymentMethod) return false;
      if (filters.orderType !== "all" && order.type !== filters.orderType) return false;
      if (order.satsAmount < filters.minAmount || order.satsAmount > filters.maxAmount) return false;
      return true;
    });
    $$renderer2.push(`<div class="w-full"><div class="grid gap-3 md:gap-4">`);
    if (filteredOrders.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="text-center py-12 text-muted-foreground">No orders available matching your filters</div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<!--[-->`);
      const each_array = ensure_array_like(filteredOrders);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let order = each_array[$$index];
        OrderCard($$renderer2, { order });
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div></div>`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let showCreateOrderModal = false;
    const filters = {
      currency: store_get($$store_subs ??= {}, "$page", page).url.searchParams.get("currency") || "all",
      paymentMethod: store_get($$store_subs ??= {}, "$page", page).url.searchParams.get("paymentMethod") || "all",
      orderType: store_get($$store_subs ??= {}, "$page", page).url.searchParams.get("orderType") || "all",
      minAmount: parseInt(store_get($$store_subs ??= {}, "$page", page).url.searchParams.get("minAmount") || "0"),
      maxAmount: parseInt(store_get($$store_subs ??= {}, "$page", page).url.searchParams.get("maxAmount") || "1000000")
    };
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div class="px-4 sm:px-6 lg:px-8 py-6">`);
      OrderBook($$renderer3, { filters });
      $$renderer3.push(`<!----></div> `);
      CreateOrderModal($$renderer3, {
        onClose: () => showCreateOrderModal = false,
        get open() {
          return showCreateOrderModal;
        },
        set open($$value) {
          showCreateOrderModal = $$value;
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
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-Bts07A_V.js.map
