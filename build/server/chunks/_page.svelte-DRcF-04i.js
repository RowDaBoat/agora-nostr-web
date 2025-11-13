import { e as ensure_array_like, a as attr_class, s as stringify } from './index2-DpBdzO5t.js';
import { n as ndk } from './ndk.svelte-BfhDBrJw.js';
import 'clsx';
import { K as KIND_TEXT_NOTE, a as KIND_REPLY, b as KIND_REACTION, c as KIND_REPOST, d as KIND_GENERIC_REPOST, e as KIND_ZAP } from './nostr-UslzAMIC.js';
import { U as User } from './User-DEyHoCXN.js';
import { a as NoteCard } from './ComposeDialog-rF5DhufZ.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
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
import './index4-D71bD0RT.js';
import 'tailwind-merge';
import './utils2-B05Dmz_H.js';
import './popover-BWwSCSLf.js';
import './scroll-lock-YhRhLzPR.js';
import './events-CY0_bqjb.js';
import './floating-layer-anchor-DIntB4dN.js';
import './popper-layer-force-mount-B4z1kw84.js';
import './toast.svelte-BEvONWAz.js';
import './relayInfo.svelte-CrGOXzx2.js';
import './index3-DOo-Ka_h.js';
import './button-DBIbgud-.js';
import './button2-JT-_T3Ay.js';
import './index-BCLI0M1W.js';
import './url-healing-Vba5GwtC.js';
import './RelayPublishDropdownContent-CzmVdnh5.js';
import './RelayIcon-DEER5mbZ.js';
import './index5-D9xIoHLj.js';
import './event-content-COF8hoaI.js';
import './index.svelte-EYlAHNHC.js';
import './client-C1nnVzci.js';
import './utils-KcIDVAAe.js';
import './index-BYTxiVRf.js';
import './state.svelte-zw3OW0Pf.js';

function extractAmountFromBolt11(bolt11) {
  if (!bolt11) return 0;
  try {
    const match = bolt11.match(/lnbc(\d+)([a-z])?/i);
    if (!match) return 0;
    const amount = parseInt(match[1], 10);
    const multiplier = match[2];
    let sats = amount;
    switch (multiplier) {
      case "m":
        sats = amount * 1e5;
        break;
      case "u":
        sats = amount * 100;
        break;
      case "n":
        sats = amount / 10;
        break;
      case "p":
        sats = amount / 1e4;
        break;
    }
    return Math.floor(sats);
  } catch {
    return 0;
  }
}
function isReply(event, userEventIds) {
  const replyMarker = event.tags.find((t) => t[0] === "e" && t[3] === "reply");
  return !!(replyMarker && userEventIds.has(replyMarker[1]));
}
function createNotificationsManager2(ndk2) {
  let currentFilter = "all";
  const userEventsSubscription = ndk2.$subscribe(() => {
    if (!ndk2.$currentUser) return void 0;
    return {
      filters: [
        {
          kinds: [KIND_TEXT_NOTE, KIND_REPLY, 30023],
          authors: [ndk2.$currentUser.pubkey],
          since: Math.floor(Date.now() / 1e3) - 60 * 60 * 24 * 30
        }
      ],
      subId: "user-events-meta"
    };
  });
  const userEventIds = (() => {
    const events = Array.from(userEventsSubscription.events ?? []);
    return new Set(events.map((e) => e.id));
  })();
  const repliesAndMentions = ndk2.$metaSubscribe(() => {
    if (!ndk2.$currentUser) return void 0;
    return {
      filters: [
        {
          kinds: [KIND_TEXT_NOTE, KIND_REPLY],
          "#p": [ndk2.$currentUser.pubkey],
          since: Math.floor(Date.now() / 1e3) - 60 * 60 * 24 * 30,
          limit: 200
        }
      ],
      sort: "tag-time"
    };
  });
  const reactions = ndk2.$metaSubscribe(() => {
    if (!ndk2.$currentUser) return void 0;
    return {
      filters: [
        {
          kinds: [KIND_REACTION],
          "#p": [ndk2.$currentUser.pubkey],
          since: Math.floor(Date.now() / 1e3) - 60 * 60 * 24 * 30,
          limit: 200
        }
      ],
      sort: "tag-time"
    };
  });
  const reposts = ndk2.$metaSubscribe(() => {
    if (!ndk2.$currentUser) return void 0;
    return {
      filters: [
        {
          kinds: [KIND_REPOST, KIND_GENERIC_REPOST],
          "#p": [ndk2.$currentUser.pubkey],
          since: Math.floor(Date.now() / 1e3) - 60 * 60 * 24 * 30,
          limit: 200
        }
      ],
      sort: "tag-time"
    };
  });
  const zaps = ndk2.$metaSubscribe(() => {
    if (!ndk2.$currentUser) return void 0;
    return {
      filters: [
        {
          kinds: [KIND_ZAP],
          "#p": [ndk2.$currentUser.pubkey],
          since: Math.floor(Date.now() / 1e3) - 60 * 60 * 24 * 30,
          limit: 200
        }
      ],
      sort: "tag-time"
    };
  });
  const notificationGroups = (() => {
    if (!ndk2.$currentUser) return [];
    const groups = [];
    for (const targetEvent of repliesAndMentions.events) {
      const interactions = repliesAndMentions.eventsTagging(targetEvent);
      if (interactions.length === 0) continue;
      const replyEvents = interactions.filter((e) => isReply(e, userEventIds));
      const mentionEvents = interactions.filter((e) => !isReply(e, userEventIds));
      if (replyEvents.length > 0) {
        groups.push({
          id: `reply-${targetEvent.id}`,
          type: "reply",
          timestamp: Math.max(...replyEvents.map((e) => e.created_at || 0)),
          targetEvent,
          replies: replyEvents
        });
      }
      if (mentionEvents.length > 0) {
        groups.push({
          id: `mention-${targetEvent.id}`,
          type: "mention",
          timestamp: Math.max(...mentionEvents.map((e) => e.created_at || 0)),
          targetEvent,
          mentions: mentionEvents
        });
      }
    }
    for (const targetEvent of reactions.events) {
      const reactionEvents = reactions.eventsTagging(targetEvent);
      if (reactionEvents.length === 0) continue;
      const reactionsByEmoji = /* @__PURE__ */ new Map();
      for (const reaction of reactionEvents) {
        let emoji = reaction.content || "👍";
        if (emoji === "+") emoji = "❤️";
        if (!reactionsByEmoji.has(emoji)) {
          reactionsByEmoji.set(emoji, []);
        }
        reactionsByEmoji.get(emoji).push({ pubkey: reaction.pubkey, event: reaction });
      }
      groups.push({
        id: `reaction-${targetEvent.id}`,
        type: "reaction",
        timestamp: Math.max(...reactionEvents.map((e) => e.created_at || 0)),
        targetEvent,
        reactions: reactionsByEmoji
      });
    }
    for (const targetEvent of reposts.events) {
      const repostEvents = reposts.eventsTagging(targetEvent);
      if (repostEvents.length === 0) continue;
      groups.push({
        id: `repost-${targetEvent.id}`,
        type: "repost",
        timestamp: Math.max(...repostEvents.map((e) => e.created_at || 0)),
        targetEvent,
        reposts: repostEvents
      });
    }
    for (const targetEvent of zaps.events) {
      const zapEvents = zaps.eventsTagging(targetEvent);
      if (zapEvents.length === 0) continue;
      const zapData = zapEvents.map((zap) => {
        const bolt11Tag = zap.tags.find((t) => t[0] === "bolt11")?.[1];
        const amount = extractAmountFromBolt11(bolt11Tag);
        const descriptionTag = zap.tags.find((t) => t[0] === "description")?.[1];
        let sender = zap.pubkey;
        if (descriptionTag) {
          try {
            const parsed = JSON.parse(descriptionTag);
            sender = parsed.pubkey || sender;
          } catch {
          }
        }
        return { event: zap, amount, sender };
      });
      groups.push({
        id: `zap-${targetEvent.id}`,
        type: "zap",
        timestamp: Math.max(...zapEvents.map((e) => e.created_at || 0)),
        targetEvent,
        zaps: zapData
      });
    }
    return groups.sort((a, b) => b.timestamp - a.timestamp);
  })();
  const filteredNotifications = (() => {
    if (currentFilter === "all") return notificationGroups;
    return notificationGroups.filter((group) => group.type === currentFilter);
  })();
  const counts = (() => {
    const result = {
      all: notificationGroups.length,
      reply: 0,
      mention: 0,
      reaction: 0,
      repost: 0,
      zap: 0
    };
    notificationGroups.forEach((group) => {
      result[group.type]++;
    });
    return result;
  })();
  return {
    get notifications() {
      return filteredNotifications;
    },
    get filter() {
      return currentFilter;
    },
    get counts() {
      return counts;
    },
    get eosed() {
      return repliesAndMentions.eosed && reactions.eosed && reposts.eosed && zaps.eosed;
    },
    setFilter(filter) {
      currentFilter = filter;
    }
  };
}
function NotificationItem2($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { notification } = $$props;
    const formatTimestamp = (timestamp) => {
      const now = Date.now() / 1e3;
      const diff = now - timestamp;
      if (diff < 60) return "just now";
      if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
      if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
      if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
      return `${Math.floor(diff / 604800)}w ago`;
    };
    $$renderer2.push(`<div class="border-b border-border p-4 hover:bg-muted/50 transition-colors"><div class="flex items-start gap-3"><div class="flex-shrink-0 mt-1">`);
    if (notification.type === "reply") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center"><svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"></path></svg></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (notification.type === "mention") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center"><svg class="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path></svg></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (notification.type === "reaction") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="w-8 h-8 rounded-full bg-pink-500/10 flex items-center justify-center"><svg class="w-4 h-4 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
          if (notification.type === "repost") {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<div class="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center"><svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg></div>`);
          } else {
            $$renderer2.push("<!--[!-->");
            if (notification.type === "zap") {
              $$renderer2.push("<!--[-->");
              $$renderer2.push(`<div class="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center"><svg class="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg></div>`);
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
    $$renderer2.push(`<!--]--></div> <div class="flex-1 min-w-0"><div class="mb-2">`);
    if (notification.type === "reply") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex flex-wrap items-center gap-2 mb-2"><!--[-->`);
      const each_array = ensure_array_like(notification.replies.slice(0, 3));
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let reply = each_array[$$index];
        User($$renderer2, { pubkey: reply.pubkey });
      }
      $$renderer2.push(`<!--]--> `);
      if (notification.replies.length > 3) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="text-sm text-muted-foreground">+${escape_html(notification.replies.length - 3)} more</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div> <p class="text-sm text-muted-foreground mb-2">${escape_html(notification.replies.length === 1 ? "replied to your post" : `${notification.replies.length} replies to your post`)}</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (notification.type === "mention") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex flex-wrap items-center gap-2 mb-2"><!--[-->`);
        const each_array_1 = ensure_array_like(notification.mentions.slice(0, 3));
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let mention = each_array_1[$$index_1];
          User($$renderer2, { pubkey: mention.pubkey });
        }
        $$renderer2.push(`<!--]--> `);
        if (notification.mentions.length > 3) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<span class="text-sm text-muted-foreground">+${escape_html(notification.mentions.length - 3)} more</span>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div> <p class="text-sm text-muted-foreground mb-2">${escape_html(notification.mentions.length === 1 ? "mentioned you" : `${notification.mentions.length} mentions`)}</p>`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (notification.type === "reaction") {
          $$renderer2.push("<!--[-->");
          const totalReactions = Array.from(notification.reactions.values()).reduce((sum, reactors) => sum + reactors.length, 0);
          $$renderer2.push(`<div class="flex flex-wrap items-center gap-2 mb-2"><!--[-->`);
          const each_array_2 = ensure_array_like(Array.from(notification.reactions.entries()).slice(0, 2));
          for (let $$index_3 = 0, $$length = each_array_2.length; $$index_3 < $$length; $$index_3++) {
            let [emoji, reactors] = each_array_2[$$index_3];
            $$renderer2.push(`<div class="flex items-center gap-1"><span class="text-lg">${escape_html(emoji)}</span> <!--[-->`);
            const each_array_3 = ensure_array_like(reactors.slice(0, 2));
            for (let $$index_2 = 0, $$length2 = each_array_3.length; $$index_2 < $$length2; $$index_2++) {
              let reactor = each_array_3[$$index_2];
              User($$renderer2, { pubkey: reactor.pubkey });
            }
            $$renderer2.push(`<!--]--></div>`);
          }
          $$renderer2.push(`<!--]--></div> <p class="text-sm text-muted-foreground mb-2">${escape_html(totalReactions)} ${escape_html(totalReactions === 1 ? "reaction" : "reactions")}</p>`);
        } else {
          $$renderer2.push("<!--[!-->");
          if (notification.type === "repost") {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<div class="flex flex-wrap items-center gap-2 mb-2"><!--[-->`);
            const each_array_4 = ensure_array_like(notification.reposts.slice(0, 3));
            for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
              let repost = each_array_4[$$index_4];
              User($$renderer2, { pubkey: repost.pubkey });
            }
            $$renderer2.push(`<!--]--> `);
            if (notification.reposts.length > 3) {
              $$renderer2.push("<!--[-->");
              $$renderer2.push(`<span class="text-sm text-muted-foreground">+${escape_html(notification.reposts.length - 3)} more</span>`);
            } else {
              $$renderer2.push("<!--[!-->");
            }
            $$renderer2.push(`<!--]--></div> <p class="text-sm text-muted-foreground mb-2">${escape_html(notification.reposts.length === 1 ? "reposted" : `${notification.reposts.length} reposts`)}</p>`);
          } else {
            $$renderer2.push("<!--[!-->");
            if (notification.type === "zap") {
              $$renderer2.push("<!--[-->");
              const totalAmount = notification.zaps.reduce((sum, zap) => sum + zap.amount, 0);
              $$renderer2.push(`<div class="flex flex-wrap items-center gap-2 mb-2"><!--[-->`);
              const each_array_5 = ensure_array_like(notification.zaps.slice(0, 3));
              for (let $$index_5 = 0, $$length = each_array_5.length; $$index_5 < $$length; $$index_5++) {
                let zap = each_array_5[$$index_5];
                User($$renderer2, { pubkey: zap.sender });
              }
              $$renderer2.push(`<!--]--> `);
              if (notification.zaps.length > 3) {
                $$renderer2.push("<!--[-->");
                $$renderer2.push(`<span class="text-sm text-muted-foreground">+${escape_html(notification.zaps.length - 3)} more</span>`);
              } else {
                $$renderer2.push("<!--[!-->");
              }
              $$renderer2.push(`<!--]--></div> <p class="text-sm text-muted-foreground mb-2">⚡ ${escape_html(totalAmount.toLocaleString())} sats
            ${escape_html(notification.zaps.length > 1 ? `(${notification.zaps.length} zaps)` : "")}</p>`);
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
    $$renderer2.push(`<!--]--> <span class="text-xs text-muted-foreground">${escape_html(formatTimestamp(notification.timestamp))}</span></div> <div class="bg-muted/50 rounded-lg p-3">`);
    NoteCard($$renderer2, { event: notification.targetEvent, compact: true });
    $$renderer2.push(`<!----></div> `);
    if (notification.type === "reply" && notification.replies.length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="mt-3 space-y-2"><p class="text-xs font-medium text-muted-foreground">Recent replies:</p> <!--[-->`);
      const each_array_6 = ensure_array_like(notification.replies.slice(0, 2));
      for (let $$index_6 = 0, $$length = each_array_6.length; $$index_6 < $$length; $$index_6++) {
        let reply = each_array_6[$$index_6];
        $$renderer2.push(`<div class="bg-muted/30 rounded p-2">`);
        NoteCard($$renderer2, { event: reply, compact: true });
        $$renderer2.push(`<!----></div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (notification.type === "mention" && notification.mentions.length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="mt-3 space-y-2"><p class="text-xs font-medium text-muted-foreground">Recent mentions:</p> <!--[-->`);
        const each_array_7 = ensure_array_like(notification.mentions.slice(0, 2));
        for (let $$index_7 = 0, $$length = each_array_7.length; $$index_7 < $$length; $$index_7++) {
          let mention = each_array_7[$$index_7];
          $$renderer2.push(`<div class="bg-muted/30 rounded p-2">`);
          NoteCard($$renderer2, { event: mention, compact: true });
          $$renderer2.push(`<!----></div>`);
        }
        $$renderer2.push(`<!--]--></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div></div></div>`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const notificationsManager = createNotificationsManager2(ndk);
    const filters = [
      { value: "all", label: "All" },
      { value: "reply", label: "Replies" },
      { value: "mention", label: "Mentions" },
      { value: "reaction", label: "Reactions" },
      { value: "repost", label: "Reposts" },
      { value: "zap", label: "Zaps" }
    ];
    $$renderer2.push(`<div class="w-full"><div class="sticky top-0 z-10 bg-background/90 backdrop-blur-xl border-b border-border"><div class="px-4 py-4"><div class="flex items-center justify-between mb-3"><h1 class="text-xl font-bold text-foreground">Notifications v2 <span class="text-sm font-normal text-muted-foreground ml-2">($metaSubscribe)</span></h1> `);
    if (!notificationsManager.eosed) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex items-center gap-2 text-xs text-muted-foreground"><svg class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg> <span>Loading...</span></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-hide svelte-srm3pu"><!--[-->`);
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
      $$renderer2.push(`<div class="space-y-0"><!--[-->`);
      const each_array_1 = ensure_array_like(notificationsManager.notifications);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let notification = each_array_1[$$index_1];
        NotificationItem2($$renderer2, { notification });
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div></div>`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DRcF-04i.js.map
