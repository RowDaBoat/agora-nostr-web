import { k as attributes, c as clsx, b as attr, a as attr_class } from './index2-DpBdzO5t.js';
import { n as setContext, W as getContext } from './context-D7LG2f18.js';
import { E as ENTITY_CLICK_CONTEXT_KEY, C as CONTENT_RENDERER_CONTEXT_KEY, a as Event_content } from './event-content-COF8hoaI.js';
import 'clsx';
import { c as cn, U as User } from './index4-D71bD0RT.js';
import '@nostr-dev-kit/wallet';
import '@nostr-dev-kit/wot';
import '@nostr-dev-kit/ndk';
import '@nostr-dev-kit/sessions';
import '@nostr-dev-kit/sync';
import { e as escape_html } from './escaping-CqgfEcN3.js';

const EVENT_CARD_CONTEXT_KEY = Symbol.for("event-card");
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
function Event_card_root($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ndk: providedNdk,
      event,
      onclick,
      onUserClick,
      onEventClick,
      onHashtagClick,
      onLinkClick,
      onMediaClick,
      class: className = "",
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const ndk = getNDKFromContext(providedNdk);
    const context = {
      get ndk() {
        return ndk;
      },
      get event() {
        return event;
      },
      get interactive() {
        return !!onclick;
      }
    };
    setContext(EVENT_CARD_CONTEXT_KEY, context);
    const entityClickContext = {
      get onUserClick() {
        return onUserClick;
      },
      get onEventClick() {
        return onEventClick;
      },
      get onHashtagClick() {
        return onHashtagClick;
      },
      get onLinkClick() {
        return onLinkClick;
      },
      get onMediaClick() {
        return onMediaClick;
      }
    };
    setContext(ENTITY_CLICK_CONTEXT_KEY, entityClickContext);
    const isClickable = !!onclick;
    if (isClickable) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<button${attributes({
        "data-event-card-root": "",
        "data-interactive": "",
        class: clsx(cn("relative flex flex-col gap-2 cursor-pointer w-full text-left bg-transparent border-0 p-0", className)),
        type: "button",
        ...restProps
      })}>`);
      if (children) {
        $$renderer2.push("<!--[-->");
        children($$renderer2);
        $$renderer2.push(`<!---->`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></button>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<article${attributes({
        "data-event-card-root": "",
        class: clsx(cn("relative flex flex-col gap-2", className)),
        ...restProps
      })}>`);
      if (children) {
        $$renderer2.push("<!--[-->");
        children($$renderer2);
        $$renderer2.push(`<!---->`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></article>`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function Event_reply_indicator($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ndk: providedNdk,
      event,
      class: className = "",
      onclick,
      children
    } = $$props;
    getNDKFromContext(providedNdk);
    const entityClickContext = getContext(ENTITY_CLICK_CONTEXT_KEY);
    onclick ?? entityClickContext?.onEventClick;
    let replyToEvent = null;
    let loading = true;
    const replyToTag = (() => {
      const replyTag = event.tags.find((tag) => tag[0] === "e" && tag[3] === "reply");
      if (replyTag) {
        return replyTag;
      }
      const rootTag = event.tags.find((tag) => tag[0] === "e" && tag[3] === "root");
      if (rootTag) {
        return rootTag;
      }
      const eTags = event.tags.filter((tag) => tag[0] === "e");
      if (eTags.length === 1) {
        return eTags[0];
      }
      return void 0;
    })();
    if (
      // Fetch the event being replied to
      replyToTag
    ) {
      $$renderer2.push("<!--[-->");
      if (children) {
        $$renderer2.push("<!--[-->");
        children($$renderer2, { event: replyToEvent, loading });
        $$renderer2.push(`<!---->`);
      } else {
        $$renderer2.push("<!--[!-->");
        {
          $$renderer2.push("<!--[!-->");
          {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]-->`);
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function createTimeAgo(timestamp) {
  const formatted = (() => {
    if (!timestamp) return "";
    const date = new Date(timestamp * 1e3);
    const now = /* @__PURE__ */ new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1e3 * 60 * 60));
    if (hours < 1) {
      const mins = Math.floor(diff / (1e3 * 60));
      if (mins < 1) return "now";
      return `${mins}m`;
    } else if (hours < 24) {
      return `${hours}h`;
    } else if (hours < 168) {
      const days = Math.floor(hours / 24);
      return `${days}d`;
    } else {
      return date.toLocaleDateString();
    }
  })();
  return formatted;
}
function Event_time($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { event, class: className = "" } = $$props;
    const timeAgo = createTimeAgo(event.created_at);
    const datetime = event.created_at ? new Date(event.created_at * 1e3).toISOString() : void 0;
    $$renderer2.push(`<time${attr("datetime", datetime)}${attr_class(clsx(cn(className)))}>${escape_html(timeAgo)}</time>`);
  });
}
const Event = {
  ReplyIndicator: Event_reply_indicator,
  Time: Event_time
};
function Event_card_header($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      variant = "full",
      showAvatar = true,
      showTimestamp = true,
      avatarSize = "md",
      class: className = "",
      children
    } = $$props;
    const context = getContext(EVENT_CARD_CONTEXT_KEY);
    if (!context) {
      throw new Error("EventCard.Header must be used within EventCard.Root");
    }
    const entityClickContext = getContext(ENTITY_CLICK_CONTEXT_KEY);
    $$renderer2.push(`<header data-event-card-header=""${attr("data-variant", variant)}${attr_class(clsx(cn("flex items-center gap-3", className)))}><!---->`);
    User.Root($$renderer2, {
      ndk: context.ndk,
      user: context.event.author,
      children: ($$renderer3) => {
        $$renderer3.push(`<div${attr_class(clsx(cn("flex items-center gap-3 flex-1 min-w-0", entityClickContext?.onUserClick && "cursor-pointer")))}${attr("role", entityClickContext?.onUserClick ? "button" : "presentation")}${attr("tabindex", entityClickContext?.onUserClick ? 0 : void 0)}>`);
        if (showAvatar) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<!---->`);
          User.Avatar($$renderer3, {
            class: cn("flex-shrink-0", avatarSize === "xs" ? "w-4 h-4" : avatarSize == "sm" ? "w-6 h-6" : avatarSize === "md" ? "w-10 h-10" : "w-12 h-12")
          });
          $$renderer3.push(`<!---->`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--> <div class="flex-1 min-w-0">`);
        if (variant === "full") {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<div class="flex flex-col"><!---->`);
          User.Name($$renderer3, {
            field: "displayName",
            class: "font-semibold text-[15px] text-foreground truncate"
          });
          $$renderer3.push(`<!----> <!---->`);
          User.Nip05($$renderer3, { class: "text-sm text-muted-foreground truncate" });
          $$renderer3.push(`<!----></div>`);
        } else {
          $$renderer3.push("<!--[!-->");
          if (variant === "compact") {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<div class="flex items-center gap-2 min-w-0"><!---->`);
            User.Name($$renderer3, {
              field: "displayName",
              class: "font-semibold text-[15px] text-foreground truncate"
            });
            $$renderer3.push(`<!----></div>`);
          } else {
            $$renderer3.push("<!--[!-->");
            $$renderer3.push(`<!---->`);
            User.Name($$renderer3, {
              field: "displayName",
              class: "font-semibold text-[15px] text-foreground truncate"
            });
            $$renderer3.push(`<!---->`);
          }
          $$renderer3.push(`<!--]-->`);
        }
        $$renderer3.push(`<!--]--></div></div>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> <div class="flex items-center gap-3">`);
    if (showTimestamp && context.event.created_at) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<!---->`);
      Event.Time($$renderer2, {
        event: context.event,
        class: "text-sm text-muted-foreground/70"
      });
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (children) {
      $$renderer2.push("<!--[-->");
      children($$renderer2);
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></header>`);
  });
}
function Event_card_reply_indicator($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { class: className = "", onclick, children } = $$props;
    const context = getContext(EVENT_CARD_CONTEXT_KEY);
    if (!context) {
      throw new Error("EventCard.ReplyIndicator must be used within EventCard.Root");
    }
    const entityClickContext = getContext(ENTITY_CLICK_CONTEXT_KEY);
    const handleClick = onclick ?? entityClickContext?.onEventClick;
    $$renderer2.push(`<!---->`);
    Event.ReplyIndicator($$renderer2, {
      ndk: context.ndk,
      event: context.event,
      class: className,
      onclick: handleClick,
      children
    });
    $$renderer2.push(`<!---->`);
  });
}
function Event_card_content($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      truncate,
      showMedia = true,
      showLinkPreview = true,
      highlightMentions = true,
      class: className = ""
    } = $$props;
    const context = getContext(EVENT_CARD_CONTEXT_KEY);
    if (!context) {
      throw new Error("EventCard.Content must be used within EventCard.Root");
    }
    getContext(CONTENT_RENDERER_CONTEXT_KEY);
    $$renderer2.push(`<div data-event-card-content="" class="relative"><div${attr_class(clsx(cn("whitespace-pre-wrap break-words", truncate && true ? `line-clamp-${truncate}` : void 0, className)))}><!---->`);
    {
      Event_content($$renderer2, { ndk: context.ndk, event: context.event });
    }
    $$renderer2.push(`<!----></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function Event_card_actions($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { variant = "default", class: className = "", children } = $$props;
    $$renderer2.push(`<div data-event-card-actions=""${attr("data-variant", variant)}${attr_class(clsx(cn("flex items-center gap-12 select-none", variant === "vertical" && "flex-col gap-4", className)))} role="presentation">`);
    if (children) {
      $$renderer2.push("<!--[-->");
      children($$renderer2);
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function Event_card_dropdown($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { class: className = "", showRelayInfo = true } = $$props;
    const context = getContext(EVENT_CARD_CONTEXT_KEY);
    if (!context) {
      throw new Error("EventCard.Dropdown must be used within EventCard.Root");
    }
    (() => {
      if (!context.event.author) return false;
      return context.ndk.$mutes?.has(context.event.author.pubkey) ?? false;
    })();
    $$renderer2.push(`<div data-event-card-dropdown=""${attr(
      "data-menu-open",
      // Close menu on outside click
      void 0
    )}${attr_class(clsx(cn("relative flex-shrink-0", className)))}><button class="p-1 hover:bg-accent rounded-full transition-colors text-muted-foreground hover:text-foreground" type="button" aria-label="Open event menu"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg></button> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
const EventCard = {
  Root: Event_card_root,
  Header: Event_card_header,
  ReplyIndicator: Event_card_reply_indicator,
  Content: Event_card_content,
  Actions: Event_card_actions,
  Dropdown: Event_card_dropdown
};

export { EventCard as E, getNDKFromContext as g };
//# sourceMappingURL=index5-D9xIoHLj.js.map
