import { b as attr, a as attr_class, c as clsx } from './index2-DpBdzO5t.js';
import 'clsx';
import { NDKInterestList } from '@nostr-dev-kit/ndk';
import { r as resolveNDK } from './index.svelte-EYlAHNHC.js';
import { W as getContext } from './context-D7LG2f18.js';
import { T } from './index-BCLI0M1W.js';
import { U as User } from './index4-D71bD0RT.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';

function createFollowAction(config, ndk) {
  const resolvedNDK = resolveNDK(ndk);
  if (resolvedNDK.$sessions) {
    resolvedNDK.$sessions.addMonitor([NDKInterestList]);
  }
  const isFollowing = (() => {
    let { target } = config();
    if (!target) return false;
    if (typeof target === "string") {
      if (/^[0-9a-f]{64}$/i.test(target)) {
        target = resolvedNDK.getUser({ pubkey: target });
      } else {
        const interestList = resolvedNDK.$sessionEvent(NDKInterestList, { create: true });
        if (!interestList) return false;
        return interestList.hasInterest(target.toLowerCase());
      }
    }
    try {
      const pubkey = target.pubkey;
      return resolvedNDK.$follows.has(pubkey);
    } catch {
      return false;
    }
  })();
  async function follow() {
    let { target } = config();
    if (!target) return;
    if (typeof target === "string") {
      if (/^[0-9a-f]{64}$/i.test(target)) {
        target = resolvedNDK.getUser({ pubkey: target });
      } else {
        const interestList = resolvedNDK.$sessionEvent(NDKInterestList, { create: true });
        if (!interestList) return;
        const hashtag = target.toLowerCase();
        if (isFollowing) {
          interestList.removeInterest(hashtag);
        } else {
          interestList.addInterest(hashtag);
        }
        await interestList.publishReplaceable();
        return;
      }
    }
    let pubkey;
    try {
      pubkey = target.pubkey;
    } catch {
      throw new Error("User not loaded yet");
    }
    if (isFollowing) {
      await resolvedNDK.$follows.remove(pubkey);
    } else {
      await resolvedNDK.$follows.add(pubkey);
    }
  }
  return {
    get isFollowing() {
      return isFollowing;
    },
    follow
  };
}
function User_add($$renderer, $$props) {
  let { size = 24, class: className = "" } = $$props;
  $$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"${attr("width", size)}${attr("height", size)} color="currentColor" fill="none"${attr_class(clsx(className))}><path d="M13.5 16.0001V14.0623C15.2808 12.6685 16.5 11 16.5 7.41681C16.5 5.09719 16.0769 3 13.5385 3C13.5385 3 12.6433 2 10.4923 2C7.45474 2 5.5 3.82696 5.5 7.41681C5.5 11 6.71916 12.6686 8.5 14.0623V16.0001L4.78401 17.1179C3.39659 17.5424 2.36593 18.6554 2.02375 20.0101C1.88845 20.5457 2.35107 21.0001 2.90639 21.0001H13.0936" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18.5 22L18.5 15M15 18.5H22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`);
}
function Follow_button($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ndk: ndkProp,
      target,
      variant = "ghost",
      showIcon = true,
      showTarget = false,
      class: className = ""
    } = $$props;
    const ndkContext = getContext("ndk");
    const ndk = ndkProp || ndkContext;
    const isHashtag = typeof target === "string";
    const isOwnProfile = (() => {
      if (isHashtag || !ndk?.$currentPubkey) return false;
      try {
        return ndk.$currentPubkey === target.pubkey;
      } catch {
        return false;
      }
    })();
    const followAction = createFollowAction(() => ({ target }), ndk);
    const buttonStyles = T({
      base: "inline-flex items-center gap-2 cursor-pointer font-medium text-sm transition-all rounded-md outline-none disabled:pointer-events-none disabled:opacity-50",
      variants: {
        variant: {
          ghost: "px-3 py-2 hover:bg-accent hover:text-accent-foreground",
          outline: "px-3 py-2 bg-background shadow-xs hover:bg-accent hover:text-accent-foreground border border-border",
          pill: "px-4 py-2 bg-background shadow-xs hover:bg-accent hover:text-accent-foreground border border-border rounded-full",
          solid: "px-4 py-2 bg-primary text-primary-foreground shadow-xs hover:bg-primary/90"
        },
        following: {
          true: "text-muted-foreground hover:text-foreground",
          false: "text-primary"
        }
      },
      compoundVariants: [
        {
          variant: "solid",
          following: true,
          class: "bg-muted text-foreground hover:bg-muted/80"
        }
      ]
    });
    if (!isOwnProfile && ndk?.$currentUser) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<button data-follow-button=""${attr("data-following", followAction.isFollowing ? "" : void 0)}${attr("data-target-type", isHashtag ? "hashtag" : "user")}${attr("data-variant", variant)} type="button"${attr_class(clsx(buttonStyles({
        variant,
        following: followAction.isFollowing,
        class: className
      })))}${attr("aria-label", followAction.isFollowing ? isHashtag ? `Unfollow #${target}` : "Unfollow user" : isHashtag ? `Follow #${target}` : "Follow user")}>`);
      if (showTarget) {
        $$renderer2.push("<!--[-->");
        if (isHashtag) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0"><path d="M10 3L8 21M16 3L14 21M3 8H21M2 16H20"></path></svg> <span class="text-sm inline-flex items-baseline gap-1"><span class="font-bold">${escape_html(followAction.isFollowing ? "Unfollow" : "Follow")}</span> <span class="font-normal">#${escape_html(target)}</span></span>`);
        } else {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push(`<!---->`);
          User.Root($$renderer2, {
            ndk,
            user: target,
            class: "flex items-center gap-2",
            children: ($$renderer3) => {
              $$renderer3.push(`<!---->`);
              User.Avatar($$renderer3, { class: "w-5 h-5" });
              $$renderer3.push(`<!----> <span class="text-sm inline-flex items-baseline gap-1"><span class="font-bold">${escape_html(followAction.isFollowing ? "Unfollow" : "Follow")}</span> <!---->`);
              User.Name($$renderer3, { field: "displayName", class: "font-normal text-sm" });
              $$renderer3.push(`<!----></span>`);
            },
            $$slots: { default: true }
          });
          $$renderer2.push(`<!---->`);
        }
        $$renderer2.push(`<!--]-->`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (showIcon) {
          $$renderer2.push("<!--[-->");
          if (isHashtag) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0"><path d="M10 3L8 21M16 3L14 21M3 8H21M2 16H20"></path></svg>`);
          } else {
            $$renderer2.push("<!--[!-->");
            if (followAction.isFollowing) {
              $$renderer2.push("<!--[-->");
              $$renderer2.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" class="flex-shrink-0"><path d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z"></path><path d="M2 23C2 18.5817 6.47715 15 12 15C17.5228 15 22 18.5817 22 23" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8 9L10.5 11.5L16 6" stroke-linecap="round" stroke-linejoin="round"></path></svg>`);
            } else {
              $$renderer2.push("<!--[!-->");
              User_add($$renderer2, { size: 16, class: "flex-shrink-0" });
            }
            $$renderer2.push(`<!--]-->`);
          }
          $$renderer2.push(`<!--]-->`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> <span class="text-sm font-medium">${escape_html(followAction.isFollowing ? "Unfollow" : "Follow")}</span>`);
      }
      $$renderer2.push(`<!--]--></button>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}

export { Follow_button as F };
//# sourceMappingURL=follow-button-btj2XHXB.js.map
