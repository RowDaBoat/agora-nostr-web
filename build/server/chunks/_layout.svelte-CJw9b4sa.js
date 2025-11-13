import { clsx as clsx$1 } from 'clsx';
import { r as relayAuthModal, n as ndk } from './ndk.svelte-BfhDBrJw.js';
import { r as registerLocaleLoader } from './runtime-9tjL5BFW.js';
import { e as ensure_array_like, a as attr_class, s as stringify, b as attr, c as clsx, d as attr_style, f as bind_props } from './index2-DpBdzO5t.js';
import { t as toast } from './toast.svelte-BEvONWAz.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import { NDKArticle, NDKNip07Signer, NDKPrivateKeySigner } from '@nostr-dev-kit/ndk';
import { g as goto } from './client-C1nnVzci.js';
import { R as Root, D as Dialog_content, a as Dialog_title, b as Dialog, c as Dialog_overlay$1, d as Dialog_content$1, e as Dialog_close } from './index3-DOo-Ka_h.js';
import { B as Button } from './button-DBIbgud-.js';
import { I as Input, D as Dialog_footer } from './input-BbRZJqts.js';
import { D as Dialog_header } from './dialog-header-DSVdIrOb.js';
import { D as Dialog_description } from './dialog-description-C9BRLaT0.js';
import { d as defaultContentRenderer$1, E as ENTITY_CLICK_CONTEXT_KEY } from './event-content-COF8hoaI.js';
import { W as getContext, n as setContext } from './context-D7LG2f18.js';
import { r as resolveNDK } from './index.svelte-EYlAHNHC.js';
import { c as cn$1, U as User } from './index4-D71bD0RT.js';
import { P as Popover, a as Popover_trigger } from './popover-BWwSCSLf.js';
import '@nostr-dev-kit/wallet';
import '@nostr-dev-kit/wot';
import '@nostr-dev-kit/sessions';
import '@nostr-dev-kit/sync';
import { E as EventCard } from './index5-D9xIoHLj.js';
import { twMerge } from 'tailwind-merge';
import { ViewOffIcon } from '@hugeicons/core-free-icons';
import { P as Portal$1 } from './scroll-lock-YhRhLzPR.js';
import '@nostr-dev-kit/cache-sqlite-wasm';
import 'tty';
import 'util';
import 'os';
import './index-BYTxiVRf.js';
import './utils-KcIDVAAe.js';
import './state.svelte-zw3OW0Pf.js';
import './utils2-B05Dmz_H.js';
import './button2-JT-_T3Ay.js';
import './index-BCLI0M1W.js';
import './floating-layer-anchor-DIntB4dN.js';
import './events-CY0_bqjb.js';

function html(value) {
  var html2 = String(value ?? "");
  var open = "<!---->";
  return open + html2 + "<!---->";
}
registerLocaleLoader("en", () => import('./en-C8RbpMgq.js'));
registerLocaleLoader("es", () => import('./es-B1RB1iqR.js'));
registerLocaleLoader("fa", () => import('./fa-d_BjDEyh.js'));
registerLocaleLoader("km", () => import('./km-CfW1vp9v.js'));
registerLocaleLoader("sn", () => import('./sn-CeYo34Uq.js'));
function Toaster($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    function getTypeStyles(type) {
      switch (type) {
        case "success":
          return "bg-green-600 border-green-500";
        case "error":
          return "bg-red-600 border-red-500";
        case "info":
        default:
          return "bg-blue-600 border-blue-500";
      }
    }
    function getIcon(type) {
      switch (type) {
        case "success":
          return `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />`;
        case "error":
          return `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />`;
        case "info":
        default:
          return `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />`;
      }
    }
    $$renderer2.push(`<div class="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none"><!--[-->`);
    const each_array = ensure_array_like(toast.messages);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let message = each_array[$$index];
      $$renderer2.push(`<div${attr_class(`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg text-foreground animate-in slide-in-from-top duration-300 ${stringify(getTypeStyles(message.type))}`)}><svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">${html(getIcon(message.type))}</svg> <span class="text-sm font-medium">${escape_html(message.message)}</span> <button class="ml-2 hover:opacity-70 transition-opacity" aria-label="Dismiss"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
let LoginModal$1 = class LoginModal {
  show = false;
  state = "signup";
  open(initialState = "signup") {
    this.state = initialState;
    this.show = true;
  }
  close() {
    this.show = false;
  }
};
const loginModal = new LoginModal$1();
function LoginModal2($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let isLoggingIn = false;
    let loginMethod = null;
    let nsecInput = "";
    let error = "";
    async function loginWithNip07() {
      if (!window.nostr) {
        error = "No Nostr extension found. Please install Alby or nos2x.";
        return;
      }
      if (!ndk.$sessions) {
        error = "Sessions not available";
        return;
      }
      try {
        isLoggingIn = true;
        error = "";
        const signer = new NDKNip07Signer();
        await ndk.$sessions.login(signer);
        loginModal.close();
      } catch (err) {
        error = err instanceof Error ? err.message : "Failed to login";
      } finally {
        isLoggingIn = false;
      }
    }
    async function loginWithNsec() {
      if (!nsecInput.trim()) {
        error = "Please enter your nsec";
        return;
      }
      if (!ndk.$sessions) {
        error = "Sessions not available";
        return;
      }
      try {
        isLoggingIn = true;
        error = "";
        const signer = new NDKPrivateKeySigner(nsecInput.trim());
        await ndk.$sessions.login(signer);
        loginModal.close();
        nsecInput = "";
      } catch (err) {
        error = err instanceof Error ? err.message : "Invalid nsec";
      } finally {
        isLoggingIn = false;
      }
    }
    function closeModal() {
      loginModal.close();
      loginMethod = null;
      nsecInput = "";
      error = "";
    }
    function handleStartOnboarding() {
      closeModal();
      goto();
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<!---->`);
      Root($$renderer3, {
        open: loginModal.show,
        onOpenChange: (isOpen) => {
          if (!isOpen) loginModal.close();
        },
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->`);
          Dialog_content($$renderer4, {
            class: loginModal.state === "signup" ? "max-w-lg" : "max-w-md",
            children: ($$renderer5) => {
              if (loginModal.state === "signup") {
                $$renderer5.push("<!--[-->");
                $$renderer5.push(`<div class="relative"><div class="absolute inset-x-0 -mx-6 -mt-6 h-32 bg-primary rounded-t-lg opacity-90 hidden md:block"></div> <div class="relative md:pt-16"><!---->`);
                Dialog_header($$renderer5, {
                  class: "md:text-center",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->`);
                    Dialog_title($$renderer6, {
                      class: "text-3xl !font-black font-serif",
                      children: ($$renderer7) => {
                        $$renderer7.push(`<!---->Your Voice Matters`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer6.push(`<!----> <!---->`);
                    Dialog_description($$renderer6, {
                      class: "text-lg",
                      children: ($$renderer7) => {
                        $$renderer7.push(`<!---->Join a global community where every story counts`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer6.push(`<!---->`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> <div class="space-y-4 mb-8 mt-6"><div class="flex items-start gap-4"><div class="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0"><svg class="w-5 h-5 text-primary dark:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div> <div><h3 class="font-semibold mb-1 text-foreground">Own Your Voice</h3> <p class="text-sm text-muted-foreground">No censorship. No gatekeepers. Your content, your control, forever.</p></div></div> <div class="flex items-start gap-4"><div class="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0"><svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg></div> <div><h3 class="font-semibold mb-1 text-foreground">Earn From Your Stories</h3> <p class="text-sm text-muted-foreground">Get paid instantly in Bitcoin for valuable content. No banks, no fees.</p></div></div> <div class="flex items-start gap-4"><div class="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0"><svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg></div> <div><h3 class="font-semibold mb-1 text-foreground">Connect With Your Community</h3> <p class="text-sm text-muted-foreground">Trade, share, and build with people who understand your journey.</p></div></div></div> <div class="space-y-3">`);
                Button($$renderer5, {
                  onclick: handleStartOnboarding,
                  class: "w-full py-6 text-lg bg-primary hover:opacity-90",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Start Your Journey <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                Button($$renderer5, {
                  variant: "ghost",
                  onclick: () => loginModal.state = "login",
                  class: "w-full",
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Already have a Nostr account? <span class="font-semibold underline ml-1">Sign in here</span>`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----></div></div></div>`);
              } else {
                $$renderer5.push("<!--[!-->");
                $$renderer5.push(`<!---->`);
                Dialog_header($$renderer5, {
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->`);
                    Dialog_title($$renderer6, {
                      children: ($$renderer7) => {
                        $$renderer7.push(`<!---->Welcome Back`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer6.push(`<!----> <!---->`);
                    Dialog_description($$renderer6, {
                      children: ($$renderer7) => {
                        $$renderer7.push(`<!---->Sign in with your existing Nostr account`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer6.push(`<!---->`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> <div class="space-y-3 pt-4">`);
                if (error) {
                  $$renderer5.push("<!--[-->");
                  $$renderer5.push(`<div class="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">${escape_html(error)}</div>`);
                } else {
                  $$renderer5.push("<!--[!-->");
                }
                $$renderer5.push(`<!--]--> `);
                if (!loginMethod) {
                  $$renderer5.push("<!--[-->");
                  Button($$renderer5, {
                    variant: "outline",
                    onclick: () => {
                      loginMethod = "nip07";
                      loginWithNip07();
                    },
                    disabled: isLoggingIn,
                    class: "w-full p-4 h-auto justify-start",
                    children: ($$renderer6) => {
                      $$renderer6.push(`<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg> <div class="flex-1 text-left"><div class="font-semibold">Browser Extension (NIP-07)</div> <div class="text-sm text-muted-foreground">Use Alby, nos2x, or similar</div></div> `);
                      if (isLoggingIn && loginMethod === "nip07") {
                        $$renderer6.push("<!--[-->");
                        $$renderer6.push(`<svg class="w-5 h-5 animate-spin ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>`);
                      } else {
                        $$renderer6.push("<!--[!-->");
                      }
                      $$renderer6.push(`<!--]-->`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer5.push(`<!----> `);
                  Button($$renderer5, {
                    variant: "outline",
                    onclick: () => loginMethod = "nsec",
                    disabled: isLoggingIn,
                    class: "w-full p-4 h-auto justify-start",
                    children: ($$renderer6) => {
                      $$renderer6.push(`<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg> <div class="flex-1 text-left"><div class="font-semibold">Private Key</div> <div class="text-sm text-muted-foreground">Login with your nsec or hex key</div></div>`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer5.push(`<!----> <div class="relative my-6"><div class="absolute inset-0 flex items-center"><span class="w-full border-t border-border"></span></div> <div class="relative flex justify-center text-xs uppercase"><span class="bg-background px-2 text-muted-foreground">Don't have an account?</span></div></div> `);
                  Button($$renderer5, {
                    variant: "ghost",
                    onclick: () => loginModal.state = "signup",
                    class: "w-full",
                    children: ($$renderer6) => {
                      $$renderer6.push(`<span class="font-semibold underline">Create a new account</span>`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer5.push(`<!---->`);
                } else {
                  $$renderer5.push("<!--[!-->");
                  if (loginMethod === "nsec") {
                    $$renderer5.push("<!--[-->");
                    $$renderer5.push(`<div class="space-y-4"><div class="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-400 text-sm flex gap-2"><svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> <div>Enter your private key (nsec or hex format). This will be stored locally in your browser.</div></div> `);
                    Input($$renderer5, {
                      type: "password",
                      placeholder: "nsec1... or hex key",
                      disabled: isLoggingIn,
                      onkeydown: (e) => {
                        if (e.key === "Enter" && nsecInput) {
                          loginWithNsec();
                        }
                      },
                      get value() {
                        return nsecInput;
                      },
                      set value($$value) {
                        nsecInput = $$value;
                        $$settled = false;
                      }
                    });
                    $$renderer5.push(`<!----> <div class="flex gap-2">`);
                    Button($$renderer5, {
                      variant: "outline",
                      onclick: () => loginMethod = null,
                      disabled: isLoggingIn,
                      class: "flex-1",
                      children: ($$renderer6) => {
                        $$renderer6.push(`<!---->Back`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer5.push(`<!----> `);
                    Button($$renderer5, {
                      onclick: loginWithNsec,
                      disabled: isLoggingIn || !nsecInput.trim(),
                      class: "flex-1",
                      children: ($$renderer6) => {
                        if (isLoggingIn) {
                          $$renderer6.push("<!--[-->");
                          $$renderer6.push(`<svg class="w-4 h-4 animate-spin mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg> Logging in...`);
                        } else {
                          $$renderer6.push("<!--[!-->");
                          $$renderer6.push(`<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg> Login`);
                        }
                        $$renderer6.push(`<!--]-->`);
                      },
                      $$slots: { default: true }
                    });
                    $$renderer5.push(`<!----></div></div>`);
                  } else {
                    $$renderer5.push("<!--[!-->");
                  }
                  $$renderer5.push(`<!--]-->`);
                }
                $$renderer5.push(`<!--]--></div>`);
              }
              $$renderer5.push(`<!--]-->`);
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
  });
}
function RelayAuthModal($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    function handleConfirm() {
      relayAuthModal.confirm();
    }
    function handleReject() {
      relayAuthModal.reject();
    }
    function handleClose() {
      relayAuthModal.reject();
    }
    const open = relayAuthModal.show && !!relayAuthModal.request;
    $$renderer2.push(`<!---->`);
    Root($$renderer2, {
      open,
      onOpenChange: (isOpen) => {
        if (!isOpen) handleClose();
      },
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->`);
        Dialog_content($$renderer3, {
          class: "max-w-md",
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->`);
            Dialog_header($$renderer4, {
              children: ($$renderer5) => {
                $$renderer5.push(`<div class="flex items-center gap-3 mb-4"><div class="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0"><svg class="w-5 h-5 text-primary dark:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg></div> <!---->`);
                Dialog_title($$renderer5, {
                  children: ($$renderer6) => {
                    $$renderer6.push(`<!---->Relay Authentication`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----></div>`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> `);
            if (relayAuthModal.request) {
              $$renderer4.push("<!--[-->");
              $$renderer4.push(`<div class="space-y-4"><div><p class="text-muted-foreground mb-2">The relay <strong class="font-semibold text-foreground">${escape_html(relayAuthModal.request.relayUrl)}</strong> is requesting authentication.</p> <p class="text-sm text-muted-foreground">This will create a signed authentication event using your Nostr identity. Your decision will be remembered for this relay.</p></div> <div class="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"><div class="flex gap-2"><svg class="w-5 h-5 flex-shrink-0 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> <div class="text-sm text-blue-800 dark:text-blue-300"><strong class="font-semibold">Why authenticate?</strong> <p class="mt-1">Some relays require authentication to access content or reduce spam. This proves you're a real Nostr user.</p></div></div></div></div> <!---->`);
              Dialog_footer($$renderer4, {
                class: "flex gap-3 sm:space-x-0",
                children: ($$renderer5) => {
                  Button($$renderer5, {
                    variant: "outline",
                    onclick: handleReject,
                    class: "flex-1",
                    children: ($$renderer6) => {
                      $$renderer6.push(`<!---->Reject`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer5.push(`<!----> `);
                  Button($$renderer5, {
                    onclick: handleConfirm,
                    class: "flex-1",
                    children: ($$renderer6) => {
                      $$renderer6.push(`<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg> Authenticate`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer5.push(`<!---->`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!---->`);
            } else {
              $$renderer4.push("<!--[!-->");
            }
            $$renderer4.push(`<!--]-->`);
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
class PWAStore {
  // State
  deferredPrompt = null;
  isInstallable = false;
  isInstalled = false;
  isIOSDevice = false;
  isAndroidDevice = false;
  isMobileDevice = false;
  showPrompt = false;
  userDismissed = false;
  neverAskAgain = false;
  constructor() {
    return;
  }
  // Prompt user to install the app
  async promptInstall() {
    if (!this.deferredPrompt) {
      console.warn("Install prompt not available");
      return;
    }
    await this.deferredPrompt.prompt();
    const choiceResult = await this.deferredPrompt.userChoice;
    if (choiceResult.outcome === "accepted") {
      console.log("User accepted the install prompt");
      this.isInstalled = true;
    } else {
      console.log("User dismissed the install prompt");
      this.userDismissed = true;
      this.savePreferences();
    }
    this.deferredPrompt = null;
    this.isInstallable = false;
    this.showPrompt = false;
  }
  // Dismiss the install prompt temporarily
  dismiss() {
    this.showPrompt = false;
    this.userDismissed = true;
    this.savePreferences();
  }
  // Dismiss and never ask again
  dismissForever() {
    this.showPrompt = false;
    this.neverAskAgain = true;
    this.userDismissed = true;
    this.savePreferences();
  }
  // Reset user preferences (for debugging)
  reset() {
    this.userDismissed = false;
    this.neverAskAgain = false;
    this.showPrompt = false;
    this.savePreferences();
  }
  // Save preferences to localStorage
  savePreferences() {
    return;
  }
  // Load preferences from localStorage
  loadPreferences() {
    return;
  }
}
const pwaStore = new PWAStore();
function PWAInstallPrompt($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const shouldShow = pwaStore.showPrompt && pwaStore.isMobileDevice && !pwaStore.isInstalled;
    let showIOSInstructions = false;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      if (shouldShow && !showIOSInstructions) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="fixed bottom-20 md:bottom-4 left-4 right-4 z-50"><div class="bg-gradient-to-r bg-primary opacity-90 text-foreground rounded-2xl shadow-2xl p-4 max-w-md mx-auto"><button class="absolute top-3 right-3 p-1 hover:bg-white/20 rounded-full transition-colors" aria-label="Dismiss"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button> <div class="flex items-start gap-4 mb-4"><div class="flex-shrink-0 w-14 h-14 bg-card rounded-2xl p-2 shadow-lg"><img src="/icons/manifest-icon-192.png" alt="Agora icon" class="w-full h-full"/></div> <div class="flex-1 pr-6"><h3 class="text-lg font-bold mb-1">Install Agora</h3> <p class="text-sm text-foreground/90">Get the full app experience with offline access and quick launch from your home screen.</p></div></div> <div class="flex gap-2"><button class="flex-1 bg-card text-primary font-semibold py-3 px-4 rounded-xl hover:bg-primary-50 transition-colors">`);
        if (pwaStore.isIOSDevice) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`View Instructions`);
        } else {
          $$renderer3.push("<!--[!-->");
          $$renderer3.push(`Install Now`);
        }
        $$renderer3.push(`<!--]--></button> <button class="px-4 py-3 text-sm text-foreground/80 hover:text-foreground hover:bg-white/10 rounded-xl transition-colors">Not Now</button></div></div></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> <!---->`);
      Root($$renderer3, {
        get open() {
          return showIOSInstructions;
        },
        set open($$value) {
          showIOSInstructions = $$value;
          $$settled = false;
        },
        children: ($$renderer4) => {
          $$renderer4.push(`<!---->`);
          Dialog_content($$renderer4, {
            children: ($$renderer5) => {
              $$renderer5.push(`<!---->`);
              Dialog_header($$renderer5, {
                class: "text-left",
                children: ($$renderer6) => {
                  $$renderer6.push(`<!---->`);
                  Dialog_title($$renderer6, {
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->Install Agora on iOS`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!----> <!---->`);
                  Dialog_description($$renderer6, {
                    children: ($$renderer7) => {
                      $$renderer7.push(`<!---->Follow these steps to add Agora to your home screen`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer6.push(`<!---->`);
                },
                $$slots: { default: true }
              });
              $$renderer5.push(`<!----> <div class="space-y-6"><div class="flex gap-4"><div class="flex-shrink-0 w-10 h-10 bg-primary/20 text-primary rounded-full flex items-center justify-center font-bold">1</div> <div class="flex-1"><h3 class="text-foreground font-semibold mb-2">Tap the Share button</h3> <p class="text-sm text-muted-foreground mb-2">Look for the share icon in Safari's bottom menu bar</p> <div class="inline-flex items-center gap-2 bg-muted px-3 py-2 rounded-lg"><svg class="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M16.5 6.5v-1.75a.75.75 0 00-1.5 0V6.5h-6V4.75a.75.75 0 00-1.5 0V6.5h-1.75A2.75 2.75 0 003 9.25v9A2.75 2.75 0 005.75 21h12.5A2.75 2.75 0 0021 18.25v-9A2.75 2.75 0 0018.25 6.5H16.5zm-.75 4.25a.75.75 0 011.5 0v4.5a.75.75 0 01-1.5 0v-4.5zm-4.5 0a.75.75 0 011.5 0v4.5a.75.75 0 01-1.5 0v-4.5zm-4.5 0a.75.75 0 011.5 0v4.5a.75.75 0 01-1.5 0v-4.5z"></path></svg> <span class="text-muted-foreground text-sm">Share</span></div></div></div> <div class="flex gap-4"><div class="flex-shrink-0 w-10 h-10 bg-primary/20 text-primary rounded-full flex items-center justify-center font-bold">2</div> <div class="flex-1"><h3 class="text-foreground font-semibold mb-2">Select "Add to Home Screen"</h3> <p class="text-sm text-muted-foreground">Scroll down in the share menu and tap "Add to Home Screen"</p></div></div> <div class="flex gap-4"><div class="flex-shrink-0 w-10 h-10 bg-primary/20 text-primary rounded-full flex items-center justify-center font-bold">3</div> <div class="flex-1"><h3 class="text-foreground font-semibold mb-2">Confirm installation</h3> <p class="text-sm text-muted-foreground">Tap "Add" in the top right corner to complete the installation</p></div></div></div> <!---->`);
              Dialog_footer($$renderer5, {
                children: ($$renderer6) => {
                  $$renderer6.push(`<button class="w-full bg-primary hover:bg-accent-dark text-foreground font-semibold py-3 px-4 rounded-xl transition-colors">Got it!</button>`);
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
  });
}
function SplashScreen($$renderer, $$props) {
  let { visible = true } = $$props;
  if (visible) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<div class="splash-screen svelte-1yxrgyh"><div class="splash-content svelte-1yxrgyh"><div class="logo svelte-1yxrgyh"><img src="/logo.svg" alt="Agora" class="svelte-1yxrgyh"/></div></div></div>`);
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]-->`);
}
function Hashtag($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { tag, class: className = "", onclick } = $$props;
    $$renderer2.push(`<span data-hashtag=""${attr_class(`text-primary cursor-pointer hover:underline ${stringify(className)}`)} role="button" tabindex="0">#${escape_html(tag)}</span>`);
  });
}
defaultContentRenderer$1.setHashtagComponent(Hashtag, 1);
function createProfileFetcher(config, ndk2) {
  resolveNDK(ndk2);
  const state = { profile: null, user: null, loading: false };
  return {
    get profile() {
      return state.profile;
    },
    get user() {
      return state.user;
    },
    get loading() {
      return state.loading;
    }
  };
}
function Portal($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function Mention_modern($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { ndk: ndk2, bech32, class: className = "" } = $$props;
    const entityClickContext = getContext(ENTITY_CLICK_CONTEXT_KEY);
    const profileFetcher = createProfileFetcher(() => ({ user: bech32 }), ndk2);
    const pubkey = profileFetcher.user?.pubkey;
    let open = false;
    let hoverTimeout = null;
    function handleMouseEnter() {
      if (hoverTimeout) clearTimeout(hoverTimeout);
      hoverTimeout = setTimeout(
        () => {
          open = true;
        },
        200
      );
    }
    function handleMouseLeave() {
      if (hoverTimeout) clearTimeout(hoverTimeout);
      hoverTimeout = setTimeout(
        () => {
          open = false;
        },
        150
      );
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      if (profileFetcher?.loading) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<span${attr_class(clsx(cn$1("inline-flex items-center gap-1 text-primary", className)))}>@${escape_html(bech32.slice(0, 8))}...</span>`);
      } else {
        $$renderer3.push("<!--[!-->");
        if (pubkey) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<!---->`);
          Popover($$renderer3, {
            get open() {
              return open;
            },
            set open($$value) {
              open = $$value;
              $$settled = false;
            },
            children: ($$renderer4) => {
              $$renderer4.push(`<!---->`);
              Popover_trigger($$renderer4, {
                "data-mention-modern": "",
                class: "inline-flex items-center",
                onmouseenter: handleMouseEnter,
                onmouseleave: handleMouseLeave,
                children: ($$renderer5) => {
                  $$renderer5.push(`<!---->`);
                  User.Root($$renderer5, {
                    ndk: ndk2,
                    pubkey,
                    children: ($$renderer6) => {
                      $$renderer6.push(`<span${attr_class(clsx(cn$1("items-center gap-1.5 text-primary hover:underline cursor-pointer transition-all", className)))}${attr("role", entityClickContext?.onUserClick ? "button" : void 0)}${attr("tabindex", entityClickContext?.onUserClick ? 0 : void 0)}><!---->`);
                      User.Avatar($$renderer6, { class: "w-5 h-5 inline-block" });
                      $$renderer6.push(`<!----> <span>@<!---->`);
                      User.Name($$renderer6, { class: "inline", field: "name" });
                      $$renderer6.push(`<!----></span></span>`);
                    },
                    $$slots: { default: true }
                  });
                  $$renderer5.push(`<!---->`);
                },
                $$slots: { default: true }
              });
              $$renderer4.push(`<!----> `);
              Portal($$renderer4);
              $$renderer4.push(`<!---->`);
            },
            $$slots: { default: true }
          });
          $$renderer3.push(`<!---->`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]-->`);
      }
      $$renderer3.push(`<!--]-->`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
  });
}
defaultContentRenderer$1.setMentionComponent(Mention_modern, 10);
function Link_icon($$renderer, $$props) {
  let { class: className = "", size = 16 } = $$props;
  $$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg"${attr("width", size)}${attr("height", size)} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${attr_class(clsx(className))}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>`);
}
function Link_inline_basic($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { url, class: className = "" } = $$props;
    getContext(ENTITY_CLICK_CONTEXT_KEY);
    const urls = Array.isArray(url) ? url : [url];
    $$renderer2.push(`<div${attr_class(clsx(cn$1("flex flex-col gap-2 my-2", className)))}><!--[-->`);
    const each_array = ensure_array_like(urls);
    for (let index = 0, $$length = each_array.length; index < $$length; index++) {
      let linkUrl = each_array[index];
      $$renderer2.push(`<a${attr("href", linkUrl)} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-primary no-underline px-2 py-1 rounded-md transition-all hover:bg-muted hover:underline break-all">`);
      Link_icon($$renderer2, { class: "flex-shrink-0", size: 14 });
      $$renderer2.push(`<!----> <span class="text-sm">${escape_html(linkUrl)}</span></a>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
defaultContentRenderer$1.setLinkComponent(Link_inline_basic, 1);
function Event_card_compact($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ndk: ndk2,
      event,
      onUserClick,
      onEventClick,
      onHashtagClick,
      onLinkClick,
      onMediaClick,
      class: className = ""
    } = $$props;
    const content = event.content?.trim() || "";
    $$renderer2.push(`<!---->`);
    EventCard.Root($$renderer2, {
      "data-event-card-compact": "",
      ndk: ndk2,
      event,
      onUserClick,
      onEventClick,
      onHashtagClick,
      onLinkClick,
      onMediaClick,
      class: cn$1("p-3 bg-background rounded-md border border-border/50", className),
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="flex flex-row w-full gap-4"><!---->`);
        EventCard.Header($$renderer3, {
          variant: "compact",
          showAvatar: true,
          showTimestamp: true,
          avatarSize: "sm"
        });
        $$renderer3.push(`<!----> <!---->`);
        EventCard.ReplyIndicator($$renderer3, {});
        $$renderer3.push(`<!----></div> `);
        if (content) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<div class="text-sm text-muted-foreground line-clamp-3"><!---->`);
          EventCard.Content($$renderer3, {});
          $$renderer3.push(`<!----></div>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]-->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!---->`);
  });
}
defaultContentRenderer$1.addKind([1, 1111], Event_card_compact, 5);
const ARTICLE_CONTEXT_KEY = Symbol("article");
const NDK_CONTEXT_KEY = "ndk";
function getNDKFromContext(providedNdk) {
  if (providedNdk) {
    return providedNdk;
  }
  const contextNdk = getContext(NDK_CONTEXT_KEY);
  if (!contextNdk) {
    throw new Error("NDK not found. Either provide an `ndk` prop or ensure NDK is set in context via setContext('ndk', ndk) in a parent component.");
  }
  return contextNdk;
}
function Article_root($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ndk: providedNdk,
      article,
      onclick,
      class: className = "",
      children
    } = $$props;
    const ndk2 = getNDKFromContext(providedNdk);
    const context = {
      get ndk() {
        return ndk2;
      },
      get article() {
        return article;
      },
      get onclick() {
        return onclick;
      }
    };
    setContext(ARTICLE_CONTEXT_KEY, context);
    $$renderer2.push(`<div${attr_class(`contents ${stringify(className)}`)}>`);
    children($$renderer2);
    $$renderer2.push(`<!----></div>`);
  });
}
function cn(...inputs) {
  return twMerge(clsx$1(inputs));
}
function Article_image($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { class: className = "" } = $$props;
    const context = getContext(ARTICLE_CONTEXT_KEY);
    if (!context) {
      throw new Error("Article.Image must be used within Article.Root");
    }
    const imageUrl = context.article.image;
    if (imageUrl) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<img${attr("src", imageUrl)}${attr("alt", context.article.title || "Article cover")}${attr_class(clsx(cn(className, "object-cover")))} loading="lazy"/>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function Article_title($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { class: className = "" } = $$props;
    const context = getContext(ARTICLE_CONTEXT_KEY);
    if (!context) {
      throw new Error("Article.Title must be used within Article.Root");
    }
    const title = context.article.title || "Untitled";
    $$renderer2.push(`<h3${attr_class(clsx(className))}>${escape_html(title)}</h3>`);
  });
}
function Article_summary($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { maxLength = 150, class: className = "" } = $$props;
    const context = getContext(ARTICLE_CONTEXT_KEY);
    if (!context) {
      throw new Error("Article.Summary must be used within Article.Root");
    }
    const excerpt = (() => {
      const text = context.article.summary || context.article.content || "";
      if (text.length <= maxLength) return text;
      return text.slice(0, maxLength) + "...";
    })();
    $$renderer2.push(`<p${attr_class(clsx(className))}>${escape_html(excerpt)}</p>`);
  });
}
function Article_reading_time($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      wordsPerMinute = 200,
      showSuffix = true,
      class: className = ""
    } = $$props;
    const context = getContext(ARTICLE_CONTEXT_KEY);
    if (!context) {
      throw new Error("Article.ReadingTime must be used within Article.Root");
    }
    const readingTime = (() => {
      const content = context.article.content || "";
      const wordCount = content.split(/\s+/).filter((word) => word.length > 0).length;
      const minutes = Math.ceil(wordCount / wordsPerMinute);
      if (minutes === 0) return "";
      return showSuffix ? `${minutes} min read` : `${minutes}`;
    })();
    if (readingTime) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span${attr_class(clsx(className))}>${escape_html(readingTime)}</span>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
const Article = {
  Root: Article_root,
  Image: Article_image,
  Title: Article_title,
  Summary: Article_summary,
  ReadingTime: Article_reading_time
};
function Article_card_compact($$renderer, $$props) {
  let { ndk: ndk2, article } = $$props;
  $$renderer.push(`<div data-article-card-compact="" class="rounded-lg overflow-hidden border border-border bg-card"><!---->`);
  Article.Root($$renderer, {
    ndk: ndk2,
    article,
    children: ($$renderer2) => {
      $$renderer2.push(`<div class="flex flex-row gap-3 p-2"><!---->`);
      Article.Image($$renderer2, { class: "h-24" });
      $$renderer2.push(`<!----> <div class="flex-1 flex flex-col gap-1 min-w-0"><!---->`);
      Article.Title($$renderer2, { class: "text-sm font-semibold" });
      $$renderer2.push(`<!----> <!---->`);
      Article.Summary($$renderer2, { class: "text-xs text-muted-foreground" });
      $$renderer2.push(`<!----> <div class="mt-auto"><!---->`);
      Article.ReadingTime($$renderer2, { class: "text-xs" });
      $$renderer2.push(`<!----></div></div></div>`);
    },
    $$slots: { default: true }
  });
  $$renderer.push(`<!----></div>`);
}
class ContentRenderer {
  /**
   * Global configuration for NSFW content blocking
   * When true, content with content-warning tags will be blurred by default
   */
  blockNsfw = true;
  /**
   * Component for rendering npub/nprofile mentions
   * If null, renders raw bech32 string
   */
  mentionComponent = null;
  /**
   * Component for rendering hashtags
   * If null, renders raw #tag
   */
  hashtagComponent = null;
  /**
   * Component for rendering links
   * If null, renders raw URL
   */
  linkComponent = null;
  /**
   * Component for rendering media (images, videos)
   * If null, renders raw URL
   */
  mediaComponent = null;
  /**
   * Fallback component for rendering embedded events with no registered kind handler
   * If null, renders raw bech32 string
   * Users can register generic-embedded or any other component as the fallback
   */
  fallbackComponent = null;
  /**
   * Registry of embedded event kind handlers
   * Maps event kind → { component, wrapper, priority }
   */
  handlers = /* @__PURE__ */ new Map();
  /**
   * Priority tracking for inline components
   */
  mentionPriority = 0;
  hashtagPriority = 0;
  linkPriority = 0;
  mediaPriority = 0;
  fallbackPriority = 0;
  /**
   * Register a handler for one or more event kinds
   *
   * Supports two patterns:
   * 1. NDK wrapper classes (automatic kind extraction + wrapping)
   * 2. Manual kind arrays (for kinds without wrapper classes)
   *
   * @param target - NDK wrapper class (with .kinds and .from()) or array of kind numbers
   * @param component - Svelte component to render this kind
   * @param priority - Priority for this handler (default: 1). Higher priority handlers replace lower ones.
   *
   * @example With NDK wrapper class:
   * ```ts
   * import { NDKArticle } from '@nostr-dev-kit/ndk';
   * import ArticleEmbedded from './article-embedded.svelte';
   *
   * defaultContentRenderer.addKind(NDKArticle, ArticleEmbedded, 10);
   * // Auto-registers kind 30023, wraps with NDKArticle.from()
   * ```
   *
   * @example With manual kinds:
   * ```ts
   * import NoteEmbedded from './note-embedded.svelte';
   *
   * defaultContentRenderer.addKind([1, 1111], NoteEmbedded, 5);
   * // Registers kinds 1 and 1111 without wrapping
   * ```
   */
  addKind(target, component, priority = 1) {
    if (Array.isArray(target)) {
      for (const kind of target) {
        const existing = this.handlers.get(kind);
        if (!existing || priority >= existing.priority) {
          this.handlers.set(kind, { component, wrapper: null, priority });
        }
      }
    } else {
      const kinds = target.kinds || [];
      const wrapper = target.from ? target : null;
      for (const kind of kinds) {
        const existing = this.handlers.get(kind);
        if (!existing || priority >= existing.priority) {
          this.handlers.set(kind, { component, wrapper, priority });
        }
      }
    }
  }
  /**
   * Set the mention component with priority
   * @param component - Component to render mentions
   * @param priority - Priority for this component (default: 1)
   */
  setMentionComponent(component, priority = 1) {
    if (priority >= this.mentionPriority) {
      this.mentionComponent = component;
      this.mentionPriority = priority;
    }
  }
  /**
   * Set the hashtag component with priority
   * @param component - Component to render hashtags
   * @param priority - Priority for this component (default: 1)
   */
  setHashtagComponent(component, priority = 1) {
    if (priority >= this.hashtagPriority) {
      this.hashtagComponent = component;
      this.hashtagPriority = priority;
    }
  }
  /**
   * Set the link component with priority
   * @param component - Component to render links
   * @param priority - Priority for this component (default: 1)
   */
  setLinkComponent(component, priority = 1) {
    if (priority >= this.linkPriority) {
      this.linkComponent = component;
      this.linkPriority = priority;
    }
  }
  /**
   * Set the media component with priority
   * @param component - Component to render media
   * @param priority - Priority for this component (default: 1)
   */
  setMediaComponent(component, priority = 1) {
    if (priority >= this.mediaPriority) {
      this.mediaComponent = component;
      this.mediaPriority = priority;
    }
  }
  /**
   * Set the fallback component with priority
   * @param component - Component to render unhandled events
   * @param priority - Priority for this component (default: 1)
   */
  setFallbackComponent(component, priority = 1) {
    if (priority >= this.fallbackPriority) {
      this.fallbackComponent = component;
      this.fallbackPriority = priority;
    }
  }
  /**
   * Get handler information for a specific event kind
   *
   * @returns Handler info with component and optional wrapper, or undefined if not registered
   */
  getKindHandler(kind) {
    if (kind === void 0) return void 0;
    return this.handlers.get(kind);
  }
  /**
   * Check if a kind has a registered handler
   *
   * @param kind - Event kind number
   * @returns true if handler exists, false otherwise
   */
  hasKindHandler(kind) {
    if (kind === void 0) return false;
    return this.handlers.has(kind);
  }
  /**
   * Get all registered kinds (for debugging)
   *
   * @returns Sorted array of registered kind numbers
   */
  getRegisteredKinds() {
    return Array.from(this.handlers.keys()).sort((a, b) => a - b);
  }
  /**
   * Get current priorities for inline components (for debugging)
   *
   * @returns Object with component names and their priorities
   */
  getInlinePriorities() {
    return {
      mention: this.mentionPriority,
      hashtag: this.hashtagPriority,
      link: this.linkPriority,
      media: this.mediaPriority,
      fallback: this.fallbackPriority
    };
  }
  /**
   * Get current priorities for event kind handlers (for debugging)
   *
   * @returns Map of kind numbers to their priorities
   */
  getKindPriorities() {
    const priorities = /* @__PURE__ */ new Map();
    for (const [kind, info] of this.handlers) {
      priorities.set(kind, info.priority);
    }
    return priorities;
  }
  /**
   * Clear all registered handlers (useful for testing)
   */
  clear() {
    this.handlers.clear();
    this.mentionComponent = null;
    this.hashtagComponent = null;
    this.linkComponent = null;
    this.mediaComponent = null;
    this.fallbackComponent = null;
    this.mentionPriority = 0;
    this.hashtagPriority = 0;
    this.linkPriority = 0;
    this.mediaPriority = 0;
    this.fallbackPriority = 0;
  }
}
const defaultContentRenderer = new ContentRenderer();
defaultContentRenderer.addKind(NDKArticle, Article_card_compact, 5);
function replaceUrlTemplate(template, bech32) {
  return template.replace(/<bech32>/g, bech32);
}
function Generic_card($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { ndk: ndk2, event } = $$props;
    let altTag = event.tagValue("alt");
    const handlerSubscription = ndk2.$subscribe(() => {
      if (!event?.kind) return void 0;
      return {
        filters: { kinds: [31990], "#k": [event.kind.toString()] },
        closeOnEose: true
      };
    });
    const handlers = (() => {
      const handlerMap = /* @__PURE__ */ new Map();
      for (const handlerEvent of handlerSubscription.events) {
        const platforms = [];
        const webTags = handlerEvent.getMatchingTags("web");
        const iosTags = handlerEvent.getMatchingTags("ios");
        const androidTags = handlerEvent.getMatchingTags("android");
        if (webTags.length > 0 && webTags[0][1]) {
          platforms.push({ platform: "web", url: webTags[0][1] });
        }
        if (iosTags.length > 0 && iosTags[0][1]) {
          platforms.push({ platform: "ios", url: iosTags[0][1] });
        }
        if (androidTags.length > 0 && androidTags[0][1]) {
          platforms.push({ platform: "android", url: androidTags[0][1] });
        }
        let name;
        let about;
        let picture;
        try {
          const content = JSON.parse(handlerEvent.content);
          name = content.name;
          about = content.about;
          picture = content.picture;
        } catch {
        }
        handlerMap.set(handlerEvent.pubkey, { pubkey: handlerEvent.pubkey, name, about, picture, platforms });
      }
      return Array.from(handlerMap.values());
    })();
    function getHandlerUrl(platform) {
      return replaceUrlTemplate(platform.url, event.encode());
    }
    function getPlatformIcon(platform) {
      switch (platform) {
        case "web":
          return "🌐";
        case "ios":
          return "🍎";
        case "android":
          return "🤖";
        default:
          return "📱";
      }
    }
    $$renderer2.push(`<div data-generic-card="" class="border border-border rounded-lg bg-card p-3"><!---->`);
    EventCard.Root($$renderer2, {
      ndk: ndk2,
      event,
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="py-2 mb-3 border-b border-border"><div class="flex items-center gap-2"><span class="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-semibold uppercase tracking-wide">Kind ${escape_html(event.kind)}</span> `);
        if (event.kind === void 0) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<span class="text-sm text-muted-foreground italic">Unknown Event Type</span>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--></div></div> `);
        if (altTag) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<div class="alt-tag-container p-3 mb-3 svelte-k4ihqo"><div class="break-all text-foreground font-medium leading-relaxed text-[0.9375rem]">${escape_html(altTag)}</div></div>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--> <!---->`);
        EventCard.Header($$renderer3, { variant: "full", avatarSize: "md", showTimestamp: true });
        $$renderer3.push(`<!----> `);
        if (handlers.length > 0) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<div class="mt-4 pt-4 border-t border-border"><div class="text-sm font-semibold text-foreground mb-3">Open in compatible app:</div> <div class="flex flex-col gap-3"><!--[-->`);
          const each_array = ensure_array_like(handlers);
          for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
            let handler = each_array[$$index_1];
            $$renderer3.push(`<div class="flex gap-3 p-3 bg-muted rounded-lg border border-border">`);
            if (handler.picture) {
              $$renderer3.push("<!--[-->");
              $$renderer3.push(`<img${attr("src", handler.picture)}${attr("alt", handler.name || "App")} class="w-10 h-10 rounded-md object-cover flex-shrink-0"/>`);
            } else {
              $$renderer3.push("<!--[!-->");
            }
            $$renderer3.push(`<!--]--> <div class="flex-1 min-w-0"><div class="text-[0.9375rem] font-semibold text-foreground mb-1">${escape_html(handler.name || "Nostr App")}</div> `);
            if (handler.about) {
              $$renderer3.push("<!--[-->");
              $$renderer3.push(`<div class="text-[0.8125rem] text-muted-foreground mb-2 line-clamp-2">${escape_html(handler.about)}</div>`);
            } else {
              $$renderer3.push("<!--[!-->");
            }
            $$renderer3.push(`<!--]--> <div class="flex gap-2 flex-wrap"><!--[-->`);
            const each_array_1 = ensure_array_like(handler.platforms);
            for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
              let platform = each_array_1[$$index];
              $$renderer3.push(`<a${attr("href", getHandlerUrl(platform))} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 px-2 py-1 bg-primary text-primary-foreground rounded text-xs font-medium no-underline transition-opacity hover:opacity-80"${attr("title", `Open in ${stringify(platform.platform)}`)} data-external-link="">${escape_html(getPlatformIcon(platform.platform))}
											${escape_html(platform.platform)}</a>`);
            }
            $$renderer3.push(`<!--]--></div></div></div>`);
          }
          $$renderer3.push(`<!--]--></div></div>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]-->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div>`);
  });
}
defaultContentRenderer$1.setFallbackComponent(Generic_card, 1);
function HugeiconsIcon($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { $$slots, $$events, ...props } = $$props;
    ({
      size: props.size ?? 24,
      strokeWidth: props.strokeWidth,
      absoluteStrokeWidth: props.absoluteStrokeWidth ?? false,
      color: props.color ?? "currentColor",
      altIcon: props.altIcon,
      showAlt: props.showAlt ?? false,
      class: props.className ?? ""
    });
    $$renderer2.push(`<svg xmlns="http://www.w3.org/2000/svg"${attr("width", props.size ?? 24)}${attr("height", props.size ?? 24)} viewBox="0 0 24 24" fill="none"${attr_class(clsx(props.className))}></svg>`);
  });
}
function MediaRenderWrapper($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { url, event, class: className = "", children } = $$props;
    const ndk2 = getContext("ndk");
    getContext(ENTITY_CLICK_CONTEXT_KEY);
    const nsfwTag = (() => {
      if (!event) return null;
      return event.tags.find((tag) => tag[0] === "content-warning");
    })();
    const nsfwReason = nsfwTag ? nsfwTag[1] || "Sensitive content" : null;
    const hasNSFW = !!nsfwTag;
    const isFollowing = (() => {
      if (!event || !ndk2) return true;
      const follows = ndk2.$follows;
      const currentUser = ndk2.$currentUser;
      if (!currentUser?.pubkey || !follows) return true;
      return follows.has(event.pubkey);
    })();
    const shouldBlur = (() => {
      if (hasNSFW && defaultContentRenderer$1.blockNsfw) {
        return true;
      }
      if (!isFollowing && ndk2?.$currentUser?.pubkey) {
        return true;
      }
      return false;
    })();
    const blurReason = (() => {
      if (hasNSFW && defaultContentRenderer$1.blockNsfw) {
        return nsfwReason || "Sensitive content";
      }
      if (!isFollowing) {
        return "Content from unfollowed user";
      }
      return "Click to view";
    })();
    $$renderer2.push(`<div${attr_class(`relative ${stringify(className)}`)}>`);
    if (shouldBlur && true) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="relative"><div class="blur-xl opacity-50">`);
      children($$renderer2, { url });
      $$renderer2.push(`<!----></div> <button class="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm rounded-lg cursor-pointer transition-all hover:bg-black/70 group" aria-label="Reveal media content">`);
      HugeiconsIcon($$renderer2, {
        icon: ViewOffIcon,
        className: "w-12 h-12 text-white/80 mb-2 group-hover:scale-110 transition-transform"
      });
      $$renderer2.push(`<!----> <span class="text-white font-medium text-lg mb-1">Click to view</span> <span class="text-white/70 text-sm px-4 text-center">${escape_html(blurReason)}</span></button></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      children($$renderer2, { url, class: className });
      $$renderer2.push(`<!---->`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function Arrow_left($$renderer, $$props) {
  let { class: className = "" } = $$props;
  $$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${attr_class(clsx(className))} aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7"></path></svg>`);
}
function Arrow_right($$renderer, $$props) {
  let { class: className = "" } = $$props;
  $$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${attr_class(clsx(className))} aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>`);
}
function Zoom_in($$renderer, $$props) {
  let { class: className = "" } = $$props;
  $$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${attr_class(clsx(className))} aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35M11 8v6M8 11h6"></path></svg>`);
}
function Zoom_out($$renderer, $$props) {
  let { class: className = "" } = $$props;
  $$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${attr_class(clsx(className))} aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35M8 11h6"></path></svg>`);
}
function Cancel($$renderer, $$props) {
  let { class: className = "" } = $$props;
  $$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"${attr_class(clsx(className))} aria-hidden="true"><path d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`);
}
function Media_lightbox($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      mediaItems,
      initialIndex = 0,
      open = false,
      onClose,
      class: className = ""
    } = $$props;
    let currentIndex = initialIndex;
    let zoomLevel = 1;
    let panX = 0;
    let panY = 0;
    const currentMedia = mediaItems[currentIndex];
    const hasPrevious = currentIndex > 0;
    const hasNext = currentIndex < mediaItems.length - 1;
    const counter = `${currentIndex + 1} / ${mediaItems.length}`;
    function handleOpenChange(newOpen) {
      open = newOpen;
      if (!newOpen) {
        resetZoom();
        if (onClose) onClose();
      }
    }
    function resetZoom() {
      zoomLevel = 1;
      panX = 0;
      panY = 0;
    }
    $$renderer2.push(`<!---->`);
    Dialog($$renderer2, {
      open,
      onOpenChange: handleOpenChange,
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->`);
        Portal$1($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->`);
            Dialog_overlay$1($$renderer4, {
              class: "fixed inset-0 z-[9998] bg-black/95 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
            });
            $$renderer4.push(`<!----> <!---->`);
            Dialog_content$1($$renderer4, {
              class: cn$1("fixed inset-0 z-[9999] flex items-center justify-center", "data-[state=open]:animate-in data-[state=closed]:animate-out", "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", className),
              children: ($$renderer5) => {
                $$renderer5.push(`<div class="relative w-full h-full flex items-center justify-center"><div class="relative w-full h-full flex items-center justify-center overflow-hidden" role="img" tabindex="-1">`);
                if (currentMedia.type === "image") {
                  $$renderer5.push("<!--[-->");
                  $$renderer5.push(`<img${attr("src", currentMedia.url)} alt="" class="max-w-full max-h-full object-cover transition-transform duration-200 select-none"${attr_style(`transform: scale(${stringify(zoomLevel)}) translate(${stringify(panX / zoomLevel)}px, ${stringify(panY / zoomLevel)}px); cursor: ${stringify(zoomLevel > 1 ? "grab" : "default")};`)} draggable="false"/>`);
                } else {
                  $$renderer5.push("<!--[!-->");
                  if (currentMedia.type === "video") {
                    $$renderer5.push("<!--[-->");
                    $$renderer5.push(`<video${attr("src", currentMedia.url)} controls autoplay class="h-screen w-screen max-w-full max-h-full object-cover"></video>`);
                  } else {
                    $$renderer5.push("<!--[!-->");
                    if (currentMedia.type === "youtube" && currentMedia.videoId) {
                      $$renderer5.push("<!--[-->");
                      $$renderer5.push(`<iframe${attr("src", `https://www.youtube.com/embed/${stringify(currentMedia.videoId)}`)} title="YouTube video" class="w-full h-full max-w-5xl max-h-[80vh] aspect-video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
                    } else {
                      $$renderer5.push("<!--[!-->");
                    }
                    $$renderer5.push(`<!--]-->`);
                  }
                  $$renderer5.push(`<!--]-->`);
                }
                $$renderer5.push(`<!--]--></div> <!---->`);
                Dialog_close($$renderer5, {
                  class: "absolute right-4 top-4 rounded-full bg-black/50 p-2 text-white opacity-70 ring-offset-background transition-opacity hover:opacity-100 hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none z-[10000]",
                  children: ($$renderer6) => {
                    Cancel($$renderer6, { class: "h-6 w-6" });
                    $$renderer6.push(`<!----> <span class="sr-only">Close</span>`);
                  },
                  $$slots: { default: true }
                });
                $$renderer5.push(`<!----> `);
                if (mediaItems.length > 1) {
                  $$renderer5.push("<!--[-->");
                  $$renderer5.push(`<div class="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm font-medium z-[10000]">${escape_html(counter)}</div>`);
                } else {
                  $$renderer5.push("<!--[!-->");
                }
                $$renderer5.push(`<!--]--> `);
                if (mediaItems.length > 1) {
                  $$renderer5.push("<!--[-->");
                  if (hasPrevious) {
                    $$renderer5.push("<!--[-->");
                    $$renderer5.push(`<button class="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 z-[10000]" aria-label="Previous">`);
                    Arrow_left($$renderer5, { class: "h-6 w-6" });
                    $$renderer5.push(`<!----></button>`);
                  } else {
                    $$renderer5.push("<!--[!-->");
                  }
                  $$renderer5.push(`<!--]--> `);
                  if (hasNext) {
                    $$renderer5.push("<!--[-->");
                    $$renderer5.push(`<button class="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 z-[10000]" aria-label="Next">`);
                    Arrow_right($$renderer5, { class: "h-6 w-6" });
                    $$renderer5.push(`<!----></button>`);
                  } else {
                    $$renderer5.push("<!--[!-->");
                  }
                  $$renderer5.push(`<!--]-->`);
                } else {
                  $$renderer5.push("<!--[!-->");
                }
                $$renderer5.push(`<!--]--> `);
                if (currentMedia.type === "image") {
                  $$renderer5.push("<!--[-->");
                  $$renderer5.push(`<div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-[10000]"><button class="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-30 disabled:cursor-not-allowed"${attr("disabled", zoomLevel <= 1, true)} aria-label="Zoom out">`);
                  Zoom_out($$renderer5, { class: "h-5 w-5" });
                  $$renderer5.push(`<!----></button> <div class="bg-black/50 text-white px-3 py-2 rounded-full text-sm font-medium">${escape_html(Math.round(zoomLevel * 100))}%</div> <button class="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-30 disabled:cursor-not-allowed"${attr("disabled", zoomLevel >= 5, true)} aria-label="Zoom in">`);
                  Zoom_in($$renderer5, { class: "h-5 w-5" });
                  $$renderer5.push(`<!----></button></div>`);
                } else {
                  $$renderer5.push("<!--[!-->");
                }
                $$renderer5.push(`<!--]--></div>`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!---->`);
          }
        });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!---->`);
    bind_props($$props, { open });
  });
}
function Media_bento($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { url, class: className = "" } = $$props;
    let lightboxOpen = false;
    let selectedIndex = 0;
    const urls = Array.isArray(url) ? url : [url];
    const count = urls.length;
    const mediaItems = urls.map((mediaUrl) => {
      if (mediaUrl.match(/\.(jpg|jpeg|png|gif|webp|svg)(\?|$)/i)) {
        return { url: mediaUrl, type: "image" };
      } else if (mediaUrl.match(/\.(mp4|webm|mov)(\?|$)/i)) {
        return { url: mediaUrl, type: "video" };
      } else if (mediaUrl.match(/youtube\.com|youtu\.be/i)) {
        const videoId = mediaUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/)?.[1];
        return { url: mediaUrl, type: "youtube", videoId };
      }
      return { url: mediaUrl, type: "image" };
    });
    const gridClass = (() => {
      if (count === 1) return "grid-cols-1";
      if (count === 2) return "grid-cols-2";
      if (count === 3) return "grid-cols-2 grid-rows-2";
      if (count === 4) return "grid-cols-2 grid-rows-2";
      return "grid-cols-[repeat(auto-fill,minmax(200px,1fr))] auto-rows-[200px]";
    })();
    const getItemClass = (index) => {
      if (count === 3 && index === 0) return "row-span-2";
      if (count === 4) return "aspect-square";
      if (count >= 5 && index === 0) return "col-span-2 row-span-2";
      return "";
    };
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div${attr_class(`grid gap-[2px] my-2 w-full max-w-full rounded-xl overflow-clip ${stringify(gridClass)} ${stringify(className)}`)}><!--[-->`);
      const each_array = ensure_array_like(urls);
      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
        let mediaUrl = each_array[i];
        $$renderer3.push(`<button type="button"${attr_class(`relative overflow-hidden bg-muted transition-all cursor-pointer hover:opacity-90 ${stringify(getItemClass(i))}`)}>`);
        if (mediaUrl.match(/\.(jpg|jpeg|png|gif|webp|svg)(\?|$)/i)) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<img${attr("src", mediaUrl)} alt="" class="w-full h-full object-cover pointer-events-none"/>`);
        } else {
          $$renderer3.push("<!--[!-->");
          if (mediaUrl.match(/\.(mp4|webm|mov)(\?|$)/i)) {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<video${attr("src", mediaUrl)} class="w-full h-full object-cover pointer-events-none"></video>`);
          } else {
            $$renderer3.push("<!--[!-->");
            if (mediaUrl.match(/youtube\.com|youtu\.be/i)) {
              $$renderer3.push("<!--[-->");
              const videoId = mediaUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/)?.[1];
              if (videoId) {
                $$renderer3.push("<!--[-->");
                $$renderer3.push(`<iframe${attr("src", `https://www.youtube.com/embed/${stringify(videoId)}`)} title="YouTube video" class="w-full h-full aspect-video pointer-events-none" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
              } else {
                $$renderer3.push("<!--[!-->");
              }
              $$renderer3.push(`<!--]-->`);
            } else {
              $$renderer3.push("<!--[!-->");
            }
            $$renderer3.push(`<!--]-->`);
          }
          $$renderer3.push(`<!--]-->`);
        }
        $$renderer3.push(`<!--]--></button>`);
      }
      $$renderer3.push(`<!--]--></div> `);
      Media_lightbox($$renderer3, {
        mediaItems,
        initialIndex: selectedIndex,
        get open() {
          return lightboxOpen;
        },
        set open($$value) {
          lightboxOpen = $$value;
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
function Media_render_bento_grid($$renderer, $$props) {
  let { url, event, class: className = "" } = $$props;
  {
    let children = function($$renderer2, { url: url2, class: cls }) {
      Media_bento($$renderer2, { url: url2, class: cls });
    };
    MediaRenderWrapper($$renderer, {
      url,
      event,
      class: className,
      children
    });
  }
}
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    defaultContentRenderer$1.mediaComponent = Media_render_bento_grid;
    const { children } = $$props;
    let ready = false;
    {
      ready = true;
    }
    Toaster($$renderer2);
    $$renderer2.push(`<!----> `);
    SplashScreen($$renderer2, { visible: !ready });
    $$renderer2.push(`<!----> `);
    if (ready) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div>`);
      children($$renderer2);
      $$renderer2.push(`<!----> `);
      PWAInstallPrompt($$renderer2);
      $$renderer2.push(`<!----> `);
      RelayAuthModal($$renderer2);
      $$renderer2.push(`<!----></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    LoginModal2($$renderer2);
    $$renderer2.push(`<!---->`);
  });
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte-CJw9b4sa.js.map
