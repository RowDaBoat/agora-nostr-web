import { e as ensure_array_like, a as attr_class, s as stringify, b as attr } from './index2-DpBdzO5t.js';
import { n as ndk } from './ndk.svelte-BfhDBrJw.js';
import { c as createNotificationsManager } from './useNotifications.svelte-DLvlGrAk.js';
import 'clsx';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import { U as User } from './index4-D71bD0RT.js';
import { a as Event_content } from './event-content-COF8hoaI.js';
import './utils-KcIDVAAe.js';
import './state.svelte-zw3OW0Pf.js';
import { T as TimeAgo } from './TimeAgo-B1T5QF8y.js';
import { U as User$1 } from './User-DEyHoCXN.js';
import { F as Follow_button } from './follow-button-btj2XHXB.js';
import { aa as onDestroy } from './scroll-lock-YhRhLzPR.js';
import './context-D7LG2f18.js';
import '@nostr-dev-kit/cache-sqlite-wasm';
import '@nostr-dev-kit/wallet';
import '@nostr-dev-kit/wot';
import '@nostr-dev-kit/ndk';
import '@nostr-dev-kit/sessions';
import '@nostr-dev-kit/sync';
import 'tty';
import 'util';
import 'os';
import './nostr-UslzAMIC.js';
import 'tailwind-merge';
import './formatTime-CvNAVcDX.js';
import './utils2-B05Dmz_H.js';
import './popover-BWwSCSLf.js';
import './floating-layer-anchor-DIntB4dN.js';
import './popper-layer-force-mount-B4z1kw84.js';
import './index.svelte-EYlAHNHC.js';
import './index-BCLI0M1W.js';
import './events-CY0_bqjb.js';

function truncateContent(content, maxLength = 100) {
  if (!content) return "";
  return content.length > maxLength ? content.slice(0, maxLength) + "..." : content;
}
function NotificationBase($$renderer, $$props) {
  const {
    avatar,
    icon,
    message,
    timestamp,
    content,
    preview,
    previewColor,
    testId
  } = $$props;
  $$renderer.push(`<div${attr("data-testid", testId)} class="flex gap-3 p-4 hover:bg-muted/50 transition-colors border-b border-border"><div class="flex-shrink-0">`);
  avatar($$renderer);
  $$renderer.push(`<!----></div> <div class="flex-1 min-w-0"><div class="flex items-center gap-2 mb-1 flex-wrap">`);
  if (icon) {
    $$renderer.push("<!--[-->");
    icon($$renderer);
    $$renderer.push(`<!---->`);
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--> <span class="text-sm text-muted-foreground">`);
  message($$renderer);
  $$renderer.push(`<!----></span> `);
  if (timestamp) {
    $$renderer.push("<!--[-->");
    TimeAgo($$renderer, { timestamp, class: "text-sm text-muted-foreground ml-auto" });
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--></div> `);
  if (content) {
    $$renderer.push("<!--[-->");
    content($$renderer);
    $$renderer.push(`<!---->`);
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--> `);
  if (preview) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<div${attr_class(`text-sm text-muted-foreground bg-muted/30 rounded p-2 border-l-2 border-${stringify(previewColor)}/50 break-words`)}>${escape_html(preview)}</div>`);
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--></div></div>`);
}
function ReplyNotification($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { event, targetEvent } = $$props;
    const displayName = "Anonymous";
    const originalPreview = truncateContent(targetEvent?.content ?? "");
    {
      let avatar = function($$renderer3) {
        $$renderer3.push(`<button type="button" class="flex-shrink-0"><!---->`);
        User.Root($$renderer3, {
          ndk,
          pubkey: event.pubkey,
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->`);
            User.Avatar($$renderer4, {
              class: "w-10 h-10 cursor-pointer hover:opacity-80 transition-opacity"
            });
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----></button>`);
      }, icon = function($$renderer3) {
        $$renderer3.push(`<svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"></path></svg>`);
      }, message = function($$renderer3) {
        $$renderer3.push(`<button type="button" class="font-semibold hover:underline text-foreground">${escape_html(displayName)}</button> replied to your note`);
      }, content = function($$renderer3) {
        $$renderer3.push(`<div class="text-foreground leading-relaxed mb-2 break-words">`);
        Event_content($$renderer3, { ndk, content: event.content, emojiTags: event.tags });
        $$renderer3.push(`<!----></div>`);
      };
      NotificationBase($$renderer2, {
        timestamp: event.created_at,
        preview: originalPreview,
        previewColor: "primary",
        avatar,
        icon,
        message,
        content
      });
    }
  });
}
function MentionNotification($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { event } = $$props;
    const displayName = "Anonymous";
    {
      let avatar = function($$renderer3) {
        $$renderer3.push(`<button type="button" class="flex-shrink-0"><!---->`);
        User.Root($$renderer3, {
          ndk,
          pubkey: event.pubkey,
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->`);
            User.Avatar($$renderer4, {
              class: "w-10 h-10 cursor-pointer hover:opacity-80 transition-opacity"
            });
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----></button>`);
      }, icon = function($$renderer3) {
        $$renderer3.push(`<svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path></svg>`);
      }, message = function($$renderer3) {
        $$renderer3.push(`<button type="button" class="font-semibold hover:underline text-foreground">${escape_html(displayName)}</button> mentioned you`);
      }, content = function($$renderer3) {
        $$renderer3.push(`<div class="text-foreground leading-relaxed break-words">`);
        Event_content($$renderer3, { ndk, content: event.content, emojiTags: event.tags });
        $$renderer3.push(`<!----></div>`);
      };
      NotificationBase($$renderer2, {
        timestamp: event.created_at,
        avatar,
        icon,
        message,
        content
      });
    }
  });
}
function QuoteNotification($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { event, targetEvent } = $$props;
    const displayName = "Anonymous";
    const originalPreview = truncateContent(targetEvent?.content ?? "");
    {
      let avatar = function($$renderer3) {
        $$renderer3.push(`<button type="button" class="flex-shrink-0"><!---->`);
        User.Root($$renderer3, {
          ndk,
          pubkey: event.pubkey,
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->`);
            User.Avatar($$renderer4, {
              class: "w-10 h-10 cursor-pointer hover:opacity-80 transition-opacity"
            });
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----></button>`);
      }, icon = function($$renderer3) {
        $$renderer3.push(`<svg class="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg>`);
      }, message = function($$renderer3) {
        $$renderer3.push(`<button type="button" class="font-semibold hover:underline text-foreground">${escape_html(displayName)}</button> quoted your note`);
      }, content = function($$renderer3) {
        $$renderer3.push(`<div class="text-foreground leading-relaxed mb-2 break-words">`);
        Event_content($$renderer3, { ndk, content: event.content, emojiTags: event.tags });
        $$renderer3.push(`<!----></div>`);
      };
      NotificationBase($$renderer2, {
        timestamp: event.created_at,
        preview: originalPreview,
        previewColor: "purple-500",
        avatar,
        icon,
        message,
        content
      });
    }
  });
}
function ActorList($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { pubkeys, maxVisible = 2 } = $$props;
    const visiblePubkeys = pubkeys.slice(0, maxVisible);
    const othersCount = Math.max(0, pubkeys.length - maxVisible);
    $$renderer2.push(`<span class="inline-flex items-center gap-1 flex-wrap"><!--[-->`);
    const each_array = ensure_array_like(visiblePubkeys);
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let pubkey = each_array[i];
      $$renderer2.push(`<button type="button" class="font-semibold hover:underline text-foreground"><!---->`);
      User.Root($$renderer2, {
        ndk,
        pubkey,
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->`);
          User.Name($$renderer3, {});
          $$renderer3.push(`<!---->`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!---->`);
      if (i < visiblePubkeys.length - 1 || othersCount > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`,`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></button>`);
    }
    $$renderer2.push(`<!--]--> `);
    if (othersCount > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span class="text-muted-foreground">and ${escape_html(othersCount)} ${escape_html(othersCount === 1 ? "other" : "others")}</span>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></span>`);
  });
}
function ReactionNotification($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { emoji, reactors, targetEvent, timestamp } = $$props;
    console.log("[ReactionNotification] Rendering:", emoji, "reactors:", reactors.length, "targetEvent:", !!targetEvent);
    const actorPubkeys = reactors.map((r) => r.pubkey);
    const originalPreview = truncateContent(targetEvent?.content ?? "");
    {
      let avatar = function($$renderer3) {
        $$renderer3.push(`<div class="flex-shrink-0 w-10 h-10 flex items-center justify-center text-2xl">${escape_html(emoji)}</div>`);
      }, icon = function($$renderer3) {
        $$renderer3.push(`<svg class="w-4 h-4 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>`);
      }, message = function($$renderer3) {
        ActorList($$renderer3, { pubkeys: actorPubkeys, maxVisible: 2 });
        $$renderer3.push(`<!----> reacted <span class="text-lg mx-1">${escape_html(emoji)}</span> to your note`);
      };
      NotificationBase($$renderer2, {
        timestamp,
        preview: originalPreview,
        previewColor: "red-500",
        avatar,
        icon,
        message
      });
    }
  });
}
function RepostNotification($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { reposts, targetEvent, timestamp } = $$props;
    const actorPubkeys = reposts.map((r) => r.pubkey);
    const originalPreview = truncateContent(targetEvent?.content ?? "");
    {
      let avatar = function($$renderer3) {
        $$renderer3.push(`<div class="flex-shrink-0 w-10 h-10 flex items-center justify-center"><svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg></div>`);
      }, message = function($$renderer3) {
        ActorList($$renderer3, { pubkeys: actorPubkeys, maxVisible: 2 });
        $$renderer3.push(`<!----> reposted
		your note`);
      };
      NotificationBase($$renderer2, {
        timestamp,
        preview: originalPreview,
        previewColor: "green-500",
        avatar,
        message
      });
    }
  });
}
function ZapNotification($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { zaps, targetEvent, timestamp } = $$props;
    const actorPubkeys = zaps.map((z) => z.sender);
    const totalAmount = zaps.reduce((sum, z) => sum + z.amount, 0);
    const formattedAmount = totalAmount.toLocaleString();
    const originalPreview = truncateContent(targetEvent?.content ?? "");
    {
      let avatar = function($$renderer3) {
        $$renderer3.push(`<div class="flex-shrink-0 w-10 h-10 flex items-center justify-center"><svg class="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg></div>`);
      }, message = function($$renderer3) {
        ActorList($$renderer3, { pubkeys: actorPubkeys, maxVisible: 2 });
        $$renderer3.push(`<!----> zapped <span class="font-semibold text-yellow-600 dark:text-yellow-400 mx-1">${escape_html(formattedAmount)} sats</span> `);
        if (targetEvent) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`to your note`);
        } else {
          $$renderer3.push("<!--[!-->");
          $$renderer3.push(`to you`);
        }
        $$renderer3.push(`<!--]-->`);
      };
      NotificationBase($$renderer2, {
        timestamp,
        preview: originalPreview,
        previewColor: "yellow-500",
        avatar,
        message
      });
    }
  });
}
function InviteAcceptanceNotification($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { notification } = $$props;
    const follows = ndk.$sessions?.follows ?? /* @__PURE__ */ new Set();
    const isFollowing = (() => follows.has(notification.inviteePubkey))();
    {
      let avatar = function($$renderer3) {
        $$renderer3.push(`<div class="flex-1 min-w-0">`);
        {
          let meta = function($$renderer4) {
            $$renderer4.push(`<p class="text-sm text-muted-foreground">accepted your invite 🎉</p>`);
          };
          User$1($$renderer3, {
            pubkey: notification.inviteePubkey,
            variant: "avatar-name-meta",
            avatarSize: "w-10 h-10",
            nameSize: "text-base font-semibold",
            meta
          });
        }
        $$renderer3.push(`<!----></div>`);
      }, icon = function($$renderer3) {
        $$renderer3.push(`<svg class="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`);
      }, message = function($$renderer3) {
      }, content = function($$renderer3) {
        {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--> <div class="flex items-center gap-2 mt-2 ml-[54px]">`);
        if (!isFollowing) {
          $$renderer3.push("<!--[-->");
          Follow_button($$renderer3, { ndk, target: notification.inviteePubkey });
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--></div>`);
      };
      NotificationBase($$renderer2, {
        testId: "invite-acceptance-notification",
        timestamp: notification.timestamp,
        avatar,
        icon,
        message,
        content
      });
    }
  });
}
function NotificationItem($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const { notification, targetEventsCache } = $$props;
    console.log("[NotificationItem] Rendering notification:", notification.type, notification.id);
    onDestroy(() => {
      console.log("[NotificationItem] Destroyed:", notification.type, notification.id);
    });
    const targetEvent = (() => {
      console.log("[NotificationItem] Computing targetEvent for:", notification.type, notification.id);
      if (notification.type === "reply") {
        const event = targetEventsCache.get(notification.replyToEventId);
        console.log("[NotificationItem] Reply target event:", event ? "found" : "not found");
        return event;
      } else if (notification.type === "quote") {
        const event = targetEventsCache.get(notification.quotedEventId);
        console.log("[NotificationItem] Quote target event:", event ? "found" : "not found");
        return event;
      } else if (notification.type === "reaction" || notification.type === "repost" || notification.type === "zap") {
        const event = targetEventsCache.get(notification.targetEventId);
        console.log("[NotificationItem]", notification.type, "target event:", event ? "found" : "not found");
        return event;
      }
      return void 0;
    })();
    if (notification.type === "reply") {
      $$renderer2.push("<!--[-->");
      ReplyNotification($$renderer2, { event: notification.event, targetEvent });
    } else {
      $$renderer2.push("<!--[!-->");
      if (notification.type === "mention") {
        $$renderer2.push("<!--[-->");
        MentionNotification($$renderer2, { event: notification.event });
      } else {
        $$renderer2.push("<!--[!-->");
        if (notification.type === "quote") {
          $$renderer2.push("<!--[-->");
          QuoteNotification($$renderer2, { event: notification.event, targetEvent });
        } else {
          $$renderer2.push("<!--[!-->");
          if (notification.type === "reaction") {
            $$renderer2.push("<!--[-->");
            ReactionNotification($$renderer2, {
              emoji: notification.emoji,
              reactors: notification.reactors,
              targetEvent,
              timestamp: notification.timestamp
            });
          } else {
            $$renderer2.push("<!--[!-->");
            if (notification.type === "repost") {
              $$renderer2.push("<!--[-->");
              RepostNotification($$renderer2, {
                reposts: notification.reposts,
                targetEvent,
                timestamp: notification.timestamp
              });
            } else {
              $$renderer2.push("<!--[!-->");
              if (notification.type === "zap") {
                $$renderer2.push("<!--[-->");
                ZapNotification($$renderer2, {
                  zaps: notification.zaps,
                  targetEvent,
                  timestamp: notification.timestamp
                });
              } else {
                $$renderer2.push("<!--[!-->");
                if (notification.type === "invite_acceptance") {
                  $$renderer2.push("<!--[-->");
                  InviteAcceptanceNotification($$renderer2, { notification });
                } else {
                  $$renderer2.push("<!--[!-->");
                }
                $$renderer2.push(`<!--]-->`);
              }
              $$renderer2.push(`<!--]-->`);
            }
            $$renderer2.push(`<!--]-->`);
          }
          $$renderer2.push(`<!--]-->`);
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    console.log("[NotificationsPage] Initializing notifications page");
    const notificationsManager = createNotificationsManager(ndk);
    const filters = [
      { value: "all", label: "All" },
      { value: "reply", label: "Replies" },
      { value: "mention", label: "Mentions" },
      { value: "quote", label: "Quotes" },
      { value: "reaction", label: "Reactions" },
      { value: "repost", label: "Reposts" },
      { value: "zap", label: "Zaps" },
      { value: "invite", label: "Invites" }
    ];
    $$renderer2.push(`<div class="w-full"><div class="sticky top-0 z-10 bg-background/90 backdrop-blur-xl border-b border-border"><div class="px-4 py-4"><h1 class="text-xl font-bold text-foreground mb-3">Notifications</h1> <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-hide svelte-xbnxce"><!--[-->`);
    const each_array = ensure_array_like(filters);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let filter = each_array[$$index];
      const count = notificationsManager.counts[filter.value];
      $$renderer2.push(`<button type="button"${attr_class(`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${stringify(notificationsManager.filter === filter.value ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80")}`)}>${escape_html(filter.label)} `);
      if (count > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="ml-1 opacity-70">(${escape_html(count)})</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></button>`);
    }
    $$renderer2.push(`<!--]--></div></div></div> <div class="min-h-screen">`);
    if (notificationsManager.notifications.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="p-8 text-center text-muted-foreground"><svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg> <p class="text-lg font-medium mb-1">No notifications yet</p> <p class="text-sm">When people interact with your posts, you'll see it here</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<!--[-->`);
      const each_array_1 = ensure_array_like(notificationsManager.notifications);
      for (let index = 0, $$length = each_array_1.length; index < $$length; index++) {
        let notification = each_array_1[index];
        $$renderer2.push(`<!---->${escape_html(console.log("[NotificationsPage] Rendering notification", index, ":", notification.type, notification.id))} `);
        NotificationItem($$renderer2, {
          notification,
          targetEventsCache: notificationsManager.targetEventsCache
        });
        $$renderer2.push(`<!---->`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div></div>`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BmTtcSu7.js.map
