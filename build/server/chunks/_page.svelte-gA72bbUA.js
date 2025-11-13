import { a as attr_class, s as stringify, b as attr, c as clsx, f as bind_props, e as ensure_array_like, g as store_get, u as unsubscribe_stores } from './index2-DpBdzO5t.js';
import { n as ndk, h as hasZappedBy, s as settings, g as getRelaysToUse, b as hashtagInterests } from './ndk.svelte-BfhDBrJw.js';
import 'clsx';
import { NDKZapper, NDKArticle, NDKKind } from '@nostr-dev-kit/ndk';
import { c as createReactionAction, C as ComposeDialog, a as NoteCard } from './ComposeDialog-rF5DhufZ.js';
import { U as User } from './index4-D71bD0RT.js';
import { U as User$1 } from './User-DEyHoCXN.js';
import { T as TimeAgo } from './TimeAgo-B1T5QF8y.js';
import { E as EventOptionsMenu } from './EventOptionsMenu-CdBOElMJ.js';
import '@nostr-dev-kit/wallet';
import '@nostr-dev-kit/wot';
import '@nostr-dev-kit/sessions';
import '@nostr-dev-kit/sync';
import { t as toast } from './toast.svelte-BEvONWAz.js';
import { R as Root, D as Dialog_content, a as Dialog_title } from './index3-DOo-Ka_h.js';
import { B as Button } from './button-DBIbgud-.js';
import { I as Input, D as Dialog_footer } from './input-BbRZJqts.js';
import { I as Icon, L as Label } from './RelayPublishDropdownContent-CzmVdnh5.js';
import { D as Dialog_description } from './dialog-description-C9BRLaT0.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import { W as getContext } from './context-D7LG2f18.js';
import { T } from './index-BCLI0M1W.js';
import './utils-KcIDVAAe.js';
import './state.svelte-zw3OW0Pf.js';
import './url-healing-Vba5GwtC.js';
import './button2-JT-_T3Ay.js';
import { u as useRelayInfoCached } from './relayInfo.svelte-CrGOXzx2.js';
import { c as createLazyFeed, L as LoadMoreTrigger } from './lazyFeed.svelte-SHZfUyBO.js';
import { p as page } from './stores-lKKGOiBk.js';
import '@nostr-dev-kit/cache-sqlite-wasm';
import 'tty';
import 'util';
import 'os';
import './index5-D9xIoHLj.js';
import './event-content-COF8hoaI.js';
import './utils2-B05Dmz_H.js';
import 'tailwind-merge';
import './index.svelte-EYlAHNHC.js';
import './client-C1nnVzci.js';
import './index-BYTxiVRf.js';
import './scroll-lock-YhRhLzPR.js';
import './events-CY0_bqjb.js';
import './popover-BWwSCSLf.js';
import './floating-layer-anchor-DIntB4dN.js';
import './popper-layer-force-mount-B4z1kw84.js';
import './formatTime-CvNAVcDX.js';
import './RelayIcon-DEER5mbZ.js';
import './textarea-DfKFjAUT.js';
import './runtime-9tjL5BFW.js';
import './dialog-header-DSVdIrOb.js';

function Reaction_button($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ndk: ndkProp,
      event,
      variant = "ghost",
      emoji = "❤️",
      showCount = true,
      countMode = "total",
      class: className = ""
    } = $$props;
    const ndkContext = getContext("ndk");
    const ndk2 = ndkProp || ndkContext;
    const reactionState = createReactionAction(() => ({ event }), ndk2);
    const stats = reactionState?.get(emoji) ?? { count: 0, hasReacted: false };
    const displayCount = countMode === "total" ? reactionState.totalCount : stats.count;
    const buttonStyles = T({
      base: "inline-flex items-center gap-2 cursor-pointer font-medium text-sm transition-all rounded-md outline-none disabled:pointer-events-none disabled:opacity-50",
      variants: {
        variant: {
          ghost: "px-3 py-2 hover:bg-accent hover:text-accent-foreground",
          outline: "px-3 py-2 bg-background shadow-xs hover:bg-accent hover:text-accent-foreground border border-border",
          pill: "px-4 py-2 bg-background shadow-xs hover:bg-accent hover:text-accent-foreground border border-border rounded-full",
          solid: "px-4 py-2 bg-primary text-primary-foreground shadow-xs hover:bg-primary/90"
        },
        active: { true: "text-red-500", false: "" }
      }
    });
    const iconStyles = T({
      base: "flex-shrink-0",
      variants: {
        active: { true: "animate-[heartbeat_0.3s_ease-in-out]", false: "" }
      }
    });
    $$renderer2.push(`<button data-reaction-button=""${attr("data-reacted", stats.hasReacted ? "" : void 0)}${attr("data-variant", variant)}${attr_class(clsx(buttonStyles({ variant, active: stats.hasReacted, class: className })))}${attr("aria-label", `React (${displayCount})`)}><svg${attr_class(clsx(iconStyles({ active: stats.hasReacted })))} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="currentColor"${attr("fill", stats.hasReacted ? "currentColor" : "none")}><path d="M10.4107 19.9677C7.58942 17.858 2 13.0348 2 8.69444C2 5.82563 4.10526 3.5 7 3.5C8.5 3.5 10 4 12 6C14 4 15.5 3.5 17 3.5C19.8947 3.5 22 5.82563 22 8.69444C22 13.0348 16.4106 17.858 13.5893 19.9677C12.6399 20.6776 11.3601 20.6776 10.4107 19.9677Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg> `);
    if (showCount && displayCount > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span class="text-sm font-medium">${escape_html(displayCount)}</span>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></button>`);
  });
}
function ZapAmountModal($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { open = false, event, onZap, onCancel } = $$props;
    const amounts = [
      { value: 10, label: "10", emoji: "☕" },
      { value: 21, label: "21", emoji: "⚡" },
      { value: 50, label: "50", emoji: "🤙" },
      { value: 100, label: "100", emoji: "💯" },
      { value: 500, label: "500", emoji: "🔥" },
      { value: 1e3, label: "1K", emoji: "💎" },
      { value: 2100, label: "2.1K", emoji: "🚀" },
      { value: 5e3, label: "5K", emoji: "👑" }
    ];
    let selectedAmount = settings.zap.defaultAmount;
    let customAmount = "";
    let isCustom = false;
    function handleAmountSelect(amount) {
      selectedAmount = amount;
      isCustom = false;
      customAmount = "";
    }
    function handleCustomInput() {
      isCustom = true;
      const parsed = Number.parseInt(customAmount);
      if (!Number.isNaN(parsed) && parsed > 0) {
        selectedAmount = parsed;
      }
    }
    function handleZap() {
      if (selectedAmount > 0) {
        onZap(selectedAmount);
      }
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<!---->`);
      Root($$renderer3, {
        open,
        onOpenChange: (isOpen) => {
          if (!isOpen) {
            onCancel();
          } else {
            open = true;
          }
        },
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->`);
          Dialog_content($$renderer4, {
            class: "max-w-md bg-background border-2 border-primary/30 shadow-2xl shadow-primary/50",
            children: ($$renderer5) => {
              $$renderer5.push(`<div class="relative -mx-6 -mt-6 px-6 py-6 mb-6 border-b border-border bg-primary/10"><div class="absolute inset-0 bg-primary/5 blur-xl"></div> <div class="relative flex items-center gap-3"><div class="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/50"><span class="text-2xl">⚡</span></div> <div><!---->`);
              Dialog_title($$renderer5, {
                class: "text-xl text-foreground",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Zap Amount`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> <!---->`);
              Dialog_description($$renderer5, {
                class: "text-sm text-muted-foreground",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Choose your zap amount`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----></div></div></div> <div class="space-y-6"><div class="grid grid-cols-4 gap-3"><!--[-->`);
              const each_array = ensure_array_like(amounts);
              for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                let amount = each_array[$$index];
                Button($$renderer5, {
                  variant: "ghost",
                  onclick: () => handleAmountSelect(amount.value),
                  class: `group relative overflow-hidden rounded-2xl p-4 h-auto transition-all duration-200 ${stringify(selectedAmount === amount.value && !isCustom ? "bg-primary shadow-lg shadow-primary/50 scale-105" : "bg-muted hover:bg-muted/80 hover:scale-105")}`,
                  children: ($$renderer6) => {
                    $$renderer6.push(`<div class="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div> <div class="relative flex flex-col items-center gap-2"><span class="text-2xl">${escape_html(amount.emoji)}</span> <span${attr_class(`text-xs font-bold ${stringify(selectedAmount === amount.value && !isCustom ? "text-primary-foreground" : "text-foreground")}`)}>${escape_html(amount.label)}</span></div>`);
                  },
                  $$slots: { default: true }
                });
              }
              $$renderer5.push(`<!--]--></div> <div class="space-y-2">`);
              Label($$renderer5, {
                for: "custom-amount",
                class: "text-sm font-semibold text-muted-foreground",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->Custom Amount`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> <div class="relative">`);
              Input($$renderer5, {
                id: "custom-amount",
                type: "number",
                oninput: handleCustomInput,
                placeholder: "Enter custom amount...",
                class: `w-full px-4 py-4 bg-muted border-2 ${stringify(isCustom ? "border-primary" : "border-border")} rounded-2xl text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary transition-colors text-lg font-semibold pr-16`,
                get value() {
                  return customAmount;
                },
                set value($$value) {
                  customAmount = $$value;
                  $$settled = false;
                }
              });
              $$renderer5.push(`<!----> <div class="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">sats</div></div></div> `);
              if (selectedAmount > 0) {
                $$renderer5.push("<!--[-->");
                $$renderer5.push(`<div class="p-4 rounded-2xl bg-primary/20 border-2 border-primary/30"><div class="flex items-center justify-between"><span class="text-sm text-foreground/70">Selected Amount:</span> <span class="text-2xl font-bold text-foreground">${escape_html(selectedAmount.toLocaleString())} sats</span></div></div>`);
              } else {
                $$renderer5.push("<!--[!-->");
              }
              $$renderer5.push(`<!--]--> <!---->`);
              Dialog_footer($$renderer5, {
                class: "flex gap-3 sm:space-x-0",
                children: ($$renderer6) => {
                  Button($$renderer6, {
                    variant: "outline",
                    onclick: onCancel,
                    class: "flex-1 px-6 py-4 rounded-2xl",
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->Cancel`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> `);
                  Button($$renderer6, {
                    onclick: handleZap,
                    disabled: selectedAmount <= 0,
                    class: "flex-1 px-6 py-4 rounded-2xl bg-primary hover:opacity-90 shadow-lg shadow-primary/50 hover:shadow-primary/70 disabled:opacity-50 disabled:shadow-none",
                    children: ($$renderer7) => {
                      $$renderer7.push(`<span class="text-xl mr-2">⚡</span> Zap ${escape_html(selectedAmount > 0 ? selectedAmount.toLocaleString() : "")}`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!---->`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----></div>`);
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
function ZapButton($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { event, variant = "default" } = $$props;
    const zaps = ndk.$zaps(() => ({ target: event, validated: true }));
    let optimisticZapAmount = 0;
    let optimisticUserZapped = false;
    const userHasZapped = (() => {
      if (optimisticUserZapped) return true;
      const currentPubkey = ndk.$currentPubkey;
      if (!currentPubkey) return false;
      return hasZappedBy(zaps.events, currentPubkey);
    })();
    const formattedAmount = (() => {
      const amount = zaps.totalAmount + optimisticZapAmount;
      if (amount >= 1e6) {
        return `${(amount / 1e6).toFixed(1)}M`;
      } else if (amount >= 1e3) {
        return `${(amount / 1e3).toFixed(1)}K`;
      }
      return amount.toString();
    })();
    const zapCount = zaps.count + (optimisticUserZapped ? 1 : 0);
    let showZapModal = false;
    let isZapping = false;
    let zapSuccess = false;
    async function performZap(amount) {
      if (!ndk.signer) {
        toast.error("Please login to zap");
        return;
      }
      optimisticZapAmount = amount;
      optimisticUserZapped = true;
      isZapping = true;
      try {
        const zapper = new NDKZapper(event, amount * 1e3, "msat");
        await zapper.zap();
        zapSuccess = true;
        setTimeout(() => zapSuccess = false, 2e3);
        toast.success(`Zapped ${amount} sats!`);
      } catch (err) {
        console.error("Failed to zap:", err);
        const errorMessage = err instanceof Error ? err.message : "Failed to send zap";
        optimisticZapAmount = 0;
        optimisticUserZapped = false;
        if (errorMessage.includes("wallet") || errorMessage.includes("NWC")) {
          toast.error("Lightning wallet error. Please check your wallet connection in settings.");
        } else if (errorMessage.includes("invoice")) {
          toast.error("Failed to create invoice. The recipient may not have a Lightning address configured.");
        } else {
          toast.error("Failed to send zap. Please try again.");
        }
      } finally {
        isZapping = false;
        setTimeout(
          () => {
            optimisticZapAmount = 0;
            optimisticUserZapped = false;
          },
          3e3
        );
      }
    }
    function handleZapModalZap(amount) {
      showZapModal = false;
      performZap(amount);
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      if (variant === "tiktok") {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<button type="button"${attr("disabled", isZapping, true)}${attr_class(`flex flex-col items-center gap-1 hover:scale-110 transition-transform group ${stringify(isZapping ? "opacity-50 cursor-wait" : "")}`)}><div${attr_class(`w-12 h-12 rounded-full backdrop-blur-sm flex items-center justify-center transition-colors ${stringify(zapSuccess ? "bg-yellow-400/30" : userHasZapped ? "bg-yellow-400/20" : "bg-white/20")}`)}>`);
        if (isZapping) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<svg class="w-6 h-6 animate-spin text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>`);
        } else {
          $$renderer3.push("<!--[!-->");
          $$renderer3.push(`<svg${attr_class(`w-6 h-6 transition-colors ${stringify(userHasZapped ? "text-yellow-400" : "text-white")}`)}${attr("fill", userHasZapped ? "currentColor" : "none")} stroke="currentColor" viewBox="0 0 24 24">`);
          if (userHasZapped) {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<path d="M13 10V3L4 14h7v7l9-11h-7z"></path>`);
          } else {
            $$renderer3.push("<!--[!-->");
            $$renderer3.push(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>`);
          }
          $$renderer3.push(`<!--]--></svg>`);
        }
        $$renderer3.push(`<!--]--></div> <span class="text-xs font-semibold text-white">`);
        if (zaps.totalAmount + optimisticZapAmount > 0) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`${escape_html(formattedAmount)}`);
        } else {
          $$renderer3.push("<!--[!-->");
          $$renderer3.push(`Zap`);
        }
        $$renderer3.push(`<!--]--></span></button>`);
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push(`<button type="button"${attr("disabled", isZapping, true)}${attr_class(`relative flex items-center gap-2 transition-colors group ${stringify(zapSuccess ? "text-yellow-400" : userHasZapped ? "text-yellow-400" : "text-muted-foreground hover:text-yellow-400")} ${stringify(isZapping ? "opacity-50 cursor-wait" : "")}`)}>`);
        if (isZapping) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<svg class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>`);
        } else {
          $$renderer3.push("<!--[!-->");
          if (zapSuccess) {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<svg class="w-5 h-5 animate-pulse" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>`);
          } else {
            $$renderer3.push("<!--[!-->");
            $$renderer3.push(`<svg class="w-5 h-5"${attr("fill", userHasZapped ? "currentColor" : "none")} stroke="currentColor" viewBox="0 0 24 24">`);
            if (userHasZapped) {
              $$renderer3.push("<!--[-->");
              $$renderer3.push(`<path d="M13 10V3L4 14h7v7l9-11h-7z"></path>`);
            } else {
              $$renderer3.push("<!--[!-->");
              $$renderer3.push(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>`);
            }
            $$renderer3.push(`<!--]--></svg>`);
          }
          $$renderer3.push(`<!--]-->`);
        }
        $$renderer3.push(`<!--]--> <span class="text-sm group-hover:underline">`);
        if (zapSuccess) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`Zapped!`);
        } else {
          $$renderer3.push("<!--[!-->");
          if (isZapping) {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`Zapping...`);
          } else {
            $$renderer3.push("<!--[!-->");
            if (zaps.totalAmount + optimisticZapAmount > 0) {
              $$renderer3.push("<!--[-->");
              $$renderer3.push(`${escape_html(formattedAmount)} `);
              if (zapCount > 0) {
                $$renderer3.push("<!--[-->");
                $$renderer3.push(`<span class="text-xs opacity-70">(${escape_html(zapCount)})</span>`);
              } else {
                $$renderer3.push("<!--[!-->");
              }
              $$renderer3.push(`<!--]-->`);
            } else {
              $$renderer3.push("<!--[!-->");
              $$renderer3.push(`Zap`);
            }
            $$renderer3.push(`<!--]-->`);
          }
          $$renderer3.push(`<!--]-->`);
        }
        $$renderer3.push(`<!--]--></span></button>`);
      }
      $$renderer3.push(`<!--]--> `);
      ZapAmountModal($$renderer3, {
        event,
        onZap: handleZapModalZap,
        onCancel: () => showZapModal = false,
        get open() {
          return showZapModal;
        },
        set open($$value) {
          showZapModal = $$value;
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
function EventActions($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { event, variant = "default" } = $$props;
    let showReplyDialog = false;
    let showQuoteDialog = false;
    const interactions = ndk.$subscribe(() => ({
      filters: [{ kinds: [1, 1111, 6, 16], ...event.filter() }],
      subId: "interactions"
    }));
    const replyCount = (() => Array.from(interactions.events ?? []).filter((e) => e.kind === 1 || e.kind === 1111).length)();
    const repostCount = (() => Array.from(interactions.events ?? []).filter((e) => e.kind === 6 || e.kind === 16).length)();
    const tiktokReactionState = (() => {
      if (variant !== "tiktok") return null;
      return createReactionAction(() => ({ event }), ndk);
    })();
    const tiktokReactionStats = (() => {
      if (!tiktokReactionState) return { count: 0, hasReacted: false };
      return tiktokReactionState.get("❤️") ?? { count: 0, hasReacted: false, pubkeys: [], emoji: "❤️" };
    })();
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      if (variant === "tiktok") {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="flex flex-col items-center gap-6 text-white"><button type="button" class="flex flex-col items-center gap-1 hover:scale-110 transition-transform group"><div class="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">`);
        Icon($$renderer3, { name: "message", size: "lg" });
        $$renderer3.push(`<!----></div> <span class="text-xs font-semibold">${escape_html(replyCount)}</span></button> <div class="relative"><button type="button" class="flex flex-col items-center gap-1 hover:scale-110 transition-transform group"><div class="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">`);
        Icon($$renderer3, { name: "repost", size: "lg" });
        $$renderer3.push(`<!----></div> <span class="text-xs font-semibold">${escape_html(repostCount)}</span></button> `);
        {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--></div> <button type="button" class="flex flex-col items-center gap-1 hover:scale-110 transition-transform group"><div${attr_class(`w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-red-400 transition-colors ${stringify(tiktokReactionStats.hasReacted ? "bg-red-400/30" : "")}`)}>`);
        Icon($$renderer3, {
          name: "heart-filled",
          size: "lg",
          class: tiktokReactionStats.hasReacted ? "animate-[heartbeat_0.3s_ease-in-out]" : ""
        });
        $$renderer3.push(`<!----></div> <span class="text-xs font-semibold">${escape_html(tiktokReactionStats.count)}</span></button> `);
        ZapButton($$renderer3, { event, variant: "tiktok" });
        $$renderer3.push(`<!----></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push(`<div${attr_class(`flex items-center gap-3 sm:gap-6 ${stringify(variant === "thread-main" ? "border-t border-border pt-3" : "")} text-muted-foreground`)}><button type="button" class="flex items-center gap-2 hover:text-primary transition-colors group">`);
        Icon($$renderer3, { name: "message", size: "md" });
        $$renderer3.push(`<!----> <span class="text-sm group-hover:underline">${escape_html(replyCount)}</span></button> <div class="relative"><button type="button" class="flex items-center gap-2 hover:text-green-400 transition-colors group">`);
        Icon($$renderer3, { name: "repost", size: "md" });
        $$renderer3.push(`<!----> <span class="text-sm group-hover:underline">${escape_html(repostCount)}</span></button> `);
        {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--></div> `);
        Reaction_button($$renderer3, {
          event,
          emoji: "❤️",
          class: "hover:text-red-400 transition-colors group [&>span]:text-sm [&>span]:group-hover:underline"
        });
        $$renderer3.push(`<!----> `);
        ZapButton($$renderer3, { event });
        $$renderer3.push(`<!----></div>`);
      }
      $$renderer3.push(`<!--]--> `);
      ComposeDialog($$renderer3, {
        replyTo: event,
        get open() {
          return showReplyDialog;
        },
        set open($$value) {
          showReplyDialog = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----> `);
      ComposeDialog($$renderer3, {
        quotedEvent: event,
        get open() {
          return showQuoteDialog;
        },
        set open($$value) {
          showQuoteDialog = $$value;
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
function EventCardHeader($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const {
      event,
      avatarClass = "w-9 h-9 sm:w-12 sm:h-12",
      nameClass = "text-base font-semibold",
      variant = "compact"
    } = $$props;
    $$renderer2.push(`<div class="flex items-center gap-2 sm:gap-3"><div class="flex items-center gap-2 flex-1 min-w-0">`);
    if (variant === "compact") {
      $$renderer2.push("<!--[-->");
      User$1($$renderer2, {
        pubkey: event.pubkey,
        variant: "avatar-name-handle",
        avatarSize: avatarClass,
        nameSize: nameClass
      });
    } else {
      $$renderer2.push("<!--[!-->");
      User$1($$renderer2, {
        pubkey: event.pubkey,
        variant: "avatar-name-meta",
        avatarSize: avatarClass,
        nameSize: nameClass
      });
    }
    $$renderer2.push(`<!--]--></div> `);
    if (event.created_at) {
      $$renderer2.push("<!--[-->");
      TimeAgo($$renderer2, {
        timestamp: event.created_at,
        class: "text-muted-foreground text-sm flex-shrink-0"
      });
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    EventOptionsMenu($$renderer2, { event });
    $$renderer2.push(`<!----></div>`);
  });
}
function HighlightCard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { event, variant = "default" } = $$props;
    const authorName = "Anonymous";
    const highlightContent = event.content;
    const sourceTag = (() => {
      const aTag = event.tags.find((t) => t[0] === "a");
      const eTag = event.tags.find((t) => t[0] === "e");
      const rTag = event.tags.find((t) => t[0] === "r");
      return aTag || eTag || rTag;
    })();
    const contextTag = event.tags.find((t) => t[0] === "context");
    const contextText = contextTag?.[1] || highlightContent;
    const highlightPosition = (() => {
      if (!contextText || contextText === highlightContent) {
        return { before: "", highlight: highlightContent, after: "" };
      }
      const startIndex = contextText.indexOf(highlightContent);
      if (startIndex === -1) {
        return { before: "", highlight: highlightContent, after: "" };
      }
      return {
        before: contextText.slice(0, startIndex),
        highlight: highlightContent,
        after: contextText.slice(startIndex + highlightContent.length)
      };
    })();
    const fontSize = (() => {
      const totalLength = contextText.length;
      if (variant === "grid") {
        if (totalLength < 100) return "text-base";
        if (totalLength < 200) return "text-sm";
        return "text-xs";
      }
      if (totalLength < 100) return "text-2xl sm:text-3xl md:text-4xl";
      if (totalLength < 200) return "text-xl sm:text-2xl md:text-3xl";
      if (totalLength < 350) return "text-lg sm:text-xl md:text-2xl";
      if (totalLength < 500) return "text-base sm:text-lg md:text-xl";
      return "text-sm sm:text-base md:text-lg";
    })();
    const sourceInfo = (() => {
      if (!sourceTag) return null;
      const type = sourceTag[0];
      const value = sourceTag[1];
      if (type === "r") {
        try {
          const url = new URL(value);
          return {
            type: "web",
            displayText: url.hostname.replace("www.", ""),
            url: value
          };
        } catch {
          return { type: "web", displayText: value, url: value };
        }
      } else if (type === "a") {
        return { type: "article", displayText: "Article", value };
      } else if (type === "e") {
        return { type: "event", displayText: "Note", value };
      }
      return null;
    })();
    const publishedAt = event.created_at;
    if (variant === "feed") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<article class="p-3 sm:p-4 hover:bg-card/30 transition-colors border-b border-border"><div class="mb-3">`);
      EventCardHeader($$renderer2, { event, avatarClass: "w-9 h-9 sm:w-12 sm:h-12" });
      $$renderer2.push(`<!----></div> <div class="relative rounded-lg overflow-hidden bg-card border border-border shadow-lg mb-2 cursor-pointer"><div class="relative flex flex-col items-center justify-center py-12 sm:py-16 px-8 sm:px-12 min-h-[200px] max-h-[600px]"><div class="relative z-10"><p${attr_class(`text-card-foreground ${stringify(fontSize)} font-serif leading-relaxed text-center`)}>${escape_html(highlightPosition.before)}<mark class="bg-primary/20 text-card-foreground font-medium">${escape_html(highlightPosition.highlight)}</mark>${escape_html(highlightPosition.after)}</p></div></div> `);
      if (sourceInfo) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<button type="button" class="absolute bottom-3 right-3 flex items-center gap-2 px-3 py-1.5 bg-background/80 backdrop-blur-sm border border-border rounded text-xs text-muted-foreground hover:bg-background transition-colors">`);
        if (sourceInfo.type === "web") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>`);
        } else {
          $$renderer2.push("<!--[!-->");
          if (sourceInfo.type === "article") {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>`);
          } else {
            $$renderer2.push("<!--[!-->");
            $$renderer2.push(`<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg>`);
          }
          $$renderer2.push(`<!--]-->`);
        }
        $$renderer2.push(`<!--]--> <span class="max-w-[200px] truncate">${escape_html(sourceInfo.displayText)}</span></button>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div> `);
      EventActions($$renderer2, { event });
      $$renderer2.push(`<!----></article>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (variant === "compact") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="block p-4 hover:bg-card/30 transition-colors rounded-lg group cursor-pointer"><div class="relative"><div class="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/60 to-primary rounded-full"></div> <div class="pl-4"><div class="mb-3 relative"><p class="relative text-foreground text-base leading-relaxed font-serif italic">"${escape_html(highlightPosition.before)}<mark class="bg-primary/20 text-foreground font-medium not-italic">${escape_html(highlightPosition.highlight)}</mark>${escape_html(highlightPosition.after)}"</p></div> <div class="flex items-center gap-2 text-xs text-muted-foreground"><span>${escape_html(authorName)}</span> `);
        if (publishedAt) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<span>·</span> `);
          TimeAgo($$renderer2, { timestamp: publishedAt });
          $$renderer2.push(`<!---->`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> `);
        if (sourceInfo) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<span>·</span> <span class="flex items-center gap-1">`);
          if (sourceInfo.type === "web") {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>`);
          } else {
            $$renderer2.push("<!--[!-->");
            $$renderer2.push(`<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>`);
          }
          $$renderer2.push(`<!--]--> ${escape_html(sourceInfo.displayText)}</span>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div></div></div></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (variant === "grid") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<article class="hover:bg-card/30 transition-colors w-full"><div class="relative aspect-square rounded-lg overflow-hidden bg-card border border-border shadow-lg w-full cursor-pointer"><div class="relative flex flex-col items-center justify-center p-4 sm:p-6 min-h-[150px]"><div class="relative z-10"><p${attr_class(`text-card-foreground ${stringify(fontSize)} font-serif leading-relaxed text-center line-clamp-6`)}>${escape_html(highlightPosition.before)}<mark class="bg-primary/20 text-card-foreground font-medium">${escape_html(highlightPosition.highlight)}</mark>${escape_html(highlightPosition.after)}</p></div></div> <div class="absolute bottom-2 left-2"><svg class="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M18.5 1.15a2.25 2.25 0 00-3.18 0L3.78 12.69a2.25 2.25 0 000 3.18l4.35 4.35a2.25 2.25 0 003.18 0L22.85 8.68a2.25 2.25 0 000-3.18l-4.35-4.35zM9.93 18.84L5.16 14.07 15.3 3.93l4.77 4.77-10.14 10.14z"></path><path d="M2.5 22.5h10v1.5h-10z" opacity="0.5"></path></svg></div> `);
          if (sourceInfo) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<button type="button" class="absolute bottom-2 right-2 flex items-center gap-1.5 px-2 py-1 bg-background/80 backdrop-blur-sm border border-border rounded text-xs text-muted-foreground hover:bg-background transition-colors">`);
            if (sourceInfo.type === "web") {
              $$renderer2.push("<!--[-->");
              $$renderer2.push(`<svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>`);
            } else {
              $$renderer2.push("<!--[!-->");
              if (sourceInfo.type === "article") {
                $$renderer2.push("<!--[-->");
                $$renderer2.push(`<svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>`);
              } else {
                $$renderer2.push("<!--[!-->");
                $$renderer2.push(`<svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg>`);
              }
              $$renderer2.push(`<!--]-->`);
            }
            $$renderer2.push(`<!--]--> <span class="max-w-[100px] truncate text-[10px]">${escape_html(sourceInfo.displayText)}</span></button>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--></div> <div class="flex items-center gap-2 mt-2 px-1"><!---->`);
          User.Root($$renderer2, {
            ndk,
            pubkey: event.pubkey,
            children: ($$renderer3) => {
              $$renderer3.push(`<!---->`);
              User.Avatar($$renderer3, { class: "w-5 h-5 rounded-full" });
              $$renderer3.push(`<!---->`);
            },
            $$slots: { default: true }
          });
          $$renderer2.push(`<!----> <span class="text-xs text-muted-foreground truncate">${escape_html(authorName)}</span></div></article>`);
        } else {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push(`<article class="p-3 sm:p-4 hover:bg-card/30 transition-colors border-b border-border"><div class="mb-3">`);
          EventCardHeader($$renderer2, { event, avatarClass: "w-9 h-9 sm:w-12 sm:h-12" });
          $$renderer2.push(`<!----></div> <div class="relative rounded-lg overflow-hidden bg-card border border-border shadow-lg mb-2 cursor-pointer"><div class="relative flex flex-col items-center justify-center py-12 sm:py-16 px-8 sm:px-12 min-h-[200px] max-h-[600px]"><div class="relative z-10"><p${attr_class(`text-card-foreground ${stringify(fontSize)} font-serif leading-relaxed text-center`)}>${escape_html(highlightPosition.before)}<mark class="bg-primary/20 text-card-foreground font-medium">${escape_html(highlightPosition.highlight)}</mark>${escape_html(highlightPosition.after)}</p></div></div> `);
          if (sourceInfo) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<button type="button" class="absolute bottom-3 right-3 flex items-center gap-2 px-3 py-1.5 bg-background/80 backdrop-blur-sm border border-border rounded text-xs text-muted-foreground hover:bg-background transition-colors">`);
            if (sourceInfo.type === "web") {
              $$renderer2.push("<!--[-->");
              $$renderer2.push(`<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>`);
            } else {
              $$renderer2.push("<!--[!-->");
              if (sourceInfo.type === "article") {
                $$renderer2.push("<!--[-->");
                $$renderer2.push(`<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>`);
              } else {
                $$renderer2.push("<!--[!-->");
                $$renderer2.push(`<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg>`);
              }
              $$renderer2.push(`<!--]-->`);
            }
            $$renderer2.push(`<!--]--> <span class="max-w-[200px] truncate">${escape_html(sourceInfo.displayText)}</span></button>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--></div> `);
          EventActions($$renderer2, { event });
          $$renderer2.push(`<!----></article>`);
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}

class HashtagFilterStore {
  _selectedHashtags = /* @__PURE__ */ new Set();
  get selectedHashtags() {
    return Array.from(this._selectedHashtags);
  }
  get hasFilters() {
    return this._selectedHashtags.size > 0;
  }
  toggleHashtag(hashtag) {
    const normalized = hashtag.toLowerCase();
    if (this._selectedHashtags.has(normalized)) {
      this._selectedHashtags.delete(normalized);
    } else {
      this._selectedHashtags.add(normalized);
    }
    this._selectedHashtags = new Set(this._selectedHashtags);
  }
  addHashtag(hashtag) {
    const normalized = hashtag.toLowerCase();
    if (!this._selectedHashtags.has(normalized)) {
      this._selectedHashtags.add(normalized);
      this._selectedHashtags = new Set(this._selectedHashtags);
    }
  }
  removeHashtag(hashtag) {
    const normalized = hashtag.toLowerCase();
    if (this._selectedHashtags.has(normalized)) {
      this._selectedHashtags.delete(normalized);
      this._selectedHashtags = new Set(this._selectedHashtags);
    }
  }
  clearAll() {
    this._selectedHashtags.clear();
    this._selectedHashtags = /* @__PURE__ */ new Set();
  }
  isSelected(hashtag) {
    return this._selectedHashtags.has(hashtag.toLowerCase());
  }
}
const hashtagFilter = new HashtagFilterStore();
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const relayParam = store_get($$store_subs ??= {}, "$page", page).url.searchParams.get("relay");
    const relaysToUse = getRelaysToUse(relayParam || settings.selectedRelay, settings.relays.filter((r) => r.enabled && r.read).map((r) => r.url));
    const follows = ndk.$sessions?.follows || [];
    const followsArray = (() => Array.from(follows))();
    function isFollowPackSelection(value) {
      return value?.startsWith("followpack:") ?? false;
    }
    let selectedPackEvent = null;
    const authorsArray = (() => {
      if (!settings.selectedRelay) {
        return followsArray;
      }
      return [];
    })();
    const notesFeed = createLazyFeed(
      ndk,
      () => {
        const filters = [{ kinds: [NDKKind.Text, 9802], limit: 200 }];
        if (hashtagFilter.hasFilters) {
          filters[0]["#t"] = hashtagFilter.selectedHashtags;
        }
        const isFollowingOrPackMode = !settings.selectedRelay || isFollowPackSelection(settings.selectedRelay);
        if (isFollowingOrPackMode && authorsArray.length > 0) {
          filters[0].authors = authorsArray;
        }
        if (!isFollowPackSelection(settings.selectedRelay) && ndk.$currentPubkey) {
          console.log("adding a filter for self");
          filters.push({ ...filters[0], authors: [ndk.$currentPubkey] });
        } else {
          console.log("not adding filter for self", isFollowPackSelection, !!ndk.$currentPubkey);
        }
        return {
          filters,
          relayUrls: relaysToUse.length > 0 ? relaysToUse : void 0,
          subId: "notes",
          cacheUnconstrainFilter: [],
          exclusiveRelay: true
        };
      },
      { initialLimit: 20, pageSize: 20 }
    );
    console.log("[HomePage] Notes subscription created");
    createLazyFeed(
      ndk,
      () => {
        const filter = {
          kinds: [
            NDKKind.Text,
            NDKKind.Image,
            NDKKind.Video,
            NDKKind.ShortVideo
          ],
          limit: 300
        };
        if (hashtagFilter.hasFilters) {
          filter["#t"] = hashtagFilter.selectedHashtags;
        }
        const isFollowingOrPackMode = !settings.selectedRelay || isFollowPackSelection(settings.selectedRelay);
        if (isFollowingOrPackMode && authorsArray.length > 0) {
          filter.authors = authorsArray;
        }
        return {
          filters: [filter],
          relayUrls: relaysToUse.length > 0 ? relaysToUse : void 0,
          cacheUnconstrainFilter: [],
          subId: "home-media",
          exclusiveRelay: relaysToUse.length > 0
        };
      },
      { initialLimit: 30, pageSize: 30 }
    );
    const articlesFeed = createLazyFeed(
      ndk,
      () => {
        const filter = { kinds: [NDKKind.Article], limit: 100 };
        if (hashtagFilter.hasFilters) {
          filter["#t"] = hashtagFilter.selectedHashtags;
        }
        const isFollowingOrPackMode = !settings.selectedRelay || isFollowPackSelection(settings.selectedRelay);
        if (isFollowingOrPackMode && authorsArray.length > 0) {
          filter.authors = authorsArray;
        }
        return {
          filters: [filter],
          subId: "articles",
          exclusiveRelay: relaysToUse.length > 0,
          relayUrls: relaysToUse.length > 0 ? relaysToUse : void 0
        };
      },
      { initialLimit: 10, pageSize: 10 }
    );
    const highlightsFeed = createLazyFeed(
      ndk,
      () => {
        const filter = { kinds: [9802], limit: 100 };
        if (hashtagFilter.hasFilters) {
          filter["#t"] = hashtagFilter.selectedHashtags;
        }
        const isFollowingOrPackMode = !settings.selectedRelay || isFollowPackSelection(settings.selectedRelay);
        if (isFollowingOrPackMode && authorsArray.length > 0) {
          filter.authors = authorsArray;
        }
        return {
          filters: [filter],
          subId: "highlights",
          exclusiveRelay: relaysToUse.length > 0,
          relayUrls: relaysToUse.length > 0 ? relaysToUse : void 0
        };
      },
      { initialLimit: 10, pageSize: 10 }
    );
    const articles = (() => articlesFeed.events.map((e) => NDKArticle.from(e)))();
    const filteredArticles = (() => articles.filter((article) => article.title && article.content).sort((a, b) => (b.published_at ?? b.created_at ?? 0) - (a.published_at ?? a.created_at ?? 0)))();
    (() => {
      const articlesWithImages = filteredArticles.filter((a) => a.image);
      const articlesWithoutImages = filteredArticles.filter((a) => !a.image);
      return [...articlesWithImages, ...articlesWithoutImages].slice(0, 10);
    })();
    (() => highlightsFeed.events.slice(0, 10))();
    (() => filteredArticles.slice(10))();
    const events = notesFeed.events;
    const hasMore = notesFeed.hasMore;
    const isLoading = notesFeed.isLoading;
    function handleLoadMore() {
      {
        notesFeed.loadMore();
      }
    }
    const pendingAuthors = (() => {
      const authors = /* @__PURE__ */ new Set();
      const pending = notesFeed.pendingEvents;
      for (const event of pending) {
        if (authors.size >= 3) break;
        authors.add(event.pubkey);
      }
      return Array.from(authors);
    })();
    (() => {
      if (hashtagInterests?.interests.length > 0) return null;
      if (relayParam) {
        const relayInfo2 = useRelayInfoCached();
        return {
          type: "text",
          text: relayInfo2.info?.name || relayParam.replace("wss://", "").replace("ws://", "")
        };
      }
      if (!settings.selectedRelay) {
        return { type: "logo" };
      }
      if (isFollowPackSelection(settings.selectedRelay) && selectedPackEvent) ;
      const relayInfo = useRelayInfoCached(settings.selectedRelay);
      return {
        type: "text",
        text: relayInfo.info?.name || settings.selectedRelay.replace("wss://", "").replace("ws://", "")
      };
    })();
    $$renderer2.push(`<div class="max-w-full mx-auto"><div class="flex flex-col">`);
    {
      $$renderer2.push("<!--[!-->");
      {
        $$renderer2.push("<!--[!-->");
        {
          $$renderer2.push("<!--[!-->");
          if (notesFeed.pendingCount > 0) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<div class="flex justify-center py-2 lg:relative lg:static fixed bottom-20 left-0 right-0 z-[500] lg:z-auto pointer-events-none"><button class="flex items-center gap-2 px-4 py-2 bg-neutral-900/95 hover:bg-muted border border-primary/50 lg:border-border rounded-full transition-all shadow-lg backdrop-blur-sm pointer-events-auto"><div class="flex -space-x-2"><!--[-->`);
            const each_array_3 = ensure_array_like(pendingAuthors.slice(0, 3));
            for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
              let pubkey = each_array_3[$$index_3];
              $$renderer2.push(`<!---->`);
              User.Root($$renderer2, {
                ndk,
                pubkey,
                children: ($$renderer3) => {
                  $$renderer3.push(`<!---->`);
                  User.Avatar($$renderer3, { class: "w-6 h-6 rounded-full border-2 border-foreground" });
                  $$renderer3.push(`<!---->`);
                },
                $$slots: { default: true }
              });
              $$renderer2.push(`<!---->`);
            }
            $$renderer2.push(`<!--]--></div> <span class="text-sm text-primary lg:text-foreground font-medium">${escape_html(notesFeed.pendingCount)} new ${escape_html(notesFeed.pendingCount === 1 ? "note" : "notes")}</span></button></div>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--> `);
          if (events.length === 0) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<div class="p-8 text-center text-muted-foreground">No notes found</div>`);
          } else {
            $$renderer2.push("<!--[!-->");
            $$renderer2.push(`<!--[-->`);
            const each_array_4 = ensure_array_like(events);
            for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
              let event = each_array_4[$$index_4];
              if (event.kind === 9802) {
                $$renderer2.push("<!--[-->");
                HighlightCard($$renderer2, { event, variant: "feed" });
              } else {
                $$renderer2.push("<!--[!-->");
                NoteCard($$renderer2, { event });
              }
              $$renderer2.push(`<!--]-->`);
            }
            $$renderer2.push(`<!--]-->`);
          }
          $$renderer2.push(`<!--]--> `);
          LoadMoreTrigger($$renderer2, { onIntersect: handleLoadMore, hasMore, isLoading });
          $$renderer2.push(`<!---->`);
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-gA72bbUA.js.map
