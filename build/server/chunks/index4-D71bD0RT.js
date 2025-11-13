import { a as attr_class, c as clsx, d as attr_style, b as attr, s as stringify } from './index2-DpBdzO5t.js';
import { n as setContext, W as getContext } from './context-D7LG2f18.js';
import { clsx as clsx$1 } from 'clsx';
import { twMerge } from 'tailwind-merge';
import '@nostr-dev-kit/wallet';
import '@nostr-dev-kit/wot';
import '@nostr-dev-kit/ndk';
import '@nostr-dev-kit/sessions';
import '@nostr-dev-kit/sync';
import { e as escape_html } from './escaping-CqgfEcN3.js';

function deterministicPubkeyGradient(pubkey) {
  const hex = pubkey.slice(0, 6);
  const color1 = `#${hex}`;
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const max = Math.max(r, g, b) / 255;
  const min = Math.min(r, g, b) / 255;
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r / 255:
        h = ((g / 255 - b / 255) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g / 255:
        h = ((b / 255 - r / 255) / d + 2) / 6;
        break;
      case b / 255:
        h = ((r / 255 - g / 255) / d + 4) / 6;
        break;
    }
  }
  const hue2 = (h * 360 + 30) % 360;
  const lightness2 = Math.min(l * 100 + 10, 90);
  return `linear-gradient(135deg, ${color1}, hsl(${hue2}, ${s * 100}%, ${lightness2}%))`;
}
const USER_CONTEXT_KEY = Symbol("user");
function cn(...inputs) {
  return twMerge(clsx$1(inputs));
}
function User_root($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ndk,
      user,
      pubkey,
      npub,
      profile: propProfile,
      onclick,
      class: className = "",
      children
    } = $$props;
    const ndkUser = (() => {
      if (user) return user;
      if (npub) {
        try {
          return ndk.getUser({ npub });
        } catch {
          return null;
        }
      }
      if (pubkey) {
        try {
          return ndk.getUser({ pubkey });
        } catch {
          return null;
        }
      }
      return null;
    })();
    let profileFetcher = null;
    const profile = propProfile !== void 0 ? propProfile : profileFetcher?.profile;
    const context = {
      get ndk() {
        return ndk;
      },
      get user() {
        return user;
      },
      get ndkUser() {
        return ndkUser;
      },
      get profile() {
        return profile;
      },
      get onclick() {
        return onclick;
      }
    };
    setContext(USER_CONTEXT_KEY, context);
    $$renderer2.push(`<div data-user-root=""${attr_class(clsx(cn("contents", className)))}>`);
    children($$renderer2);
    $$renderer2.push(`<!----></div>`);
  });
}
function User_avatar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { class: className = "", fallback, alt, customFallback } = $$props;
    const context = getContext(USER_CONTEXT_KEY);
    if (!context) {
      throw new Error("User.Avatar must be used within User.Root");
    }
    const imageUrl = context.profile?.picture || fallback;
    const avatarGradient = context.ndkUser?.pubkey ? deterministicPubkeyGradient(context.ndkUser.pubkey) : "var(--primary)";
    $$renderer2.push(`<div data-user-avatar=""${attr_class(clsx(
      // Reset loading state when imageUrl changes
      cn("rounded-full relative w-12 h-12", className)
    ))}>`);
    {
      $$renderer2.push("<!--[-->");
      if (customFallback) {
        $$renderer2.push("<!--[-->");
        customFallback($$renderer2);
        $$renderer2.push(`<!---->`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<div class="rounded-full flex items-center justify-center w-full h-full absolute inset-0"${attr_style(`background: ${stringify(avatarGradient)};`)}>${escape_html(context.ndkUser?.pubkey?.slice(0, 2).toUpperCase() ?? "??")}</div>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--> `);
    if (imageUrl) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<img data-user-avatar--img=""${attr("src", imageUrl)}${attr("alt", alt)}${attr_class(clsx(cn("rounded-full object-cover block w-full h-full absolute inset-0 bg-background", "opacity-0")))} onload="this.__e=event" onerror="this.__e=event"/>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function User_name($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { field = "displayName", class: className = "" } = $$props;
    const context = getContext(USER_CONTEXT_KEY);
    if (!context) {
      throw new Error("User.Name must be used within User.Root");
    }
    const userPubkey = (() => {
      if (context.ndkUser) {
        try {
          return context.ndkUser.pubkey;
        } catch {
          return void 0;
        }
      }
      return void 0;
    })();
    const displayText = (() => {
      if (!context.profile) return userPubkey?.slice(0, 8) + "..." || "Unknown";
      if (field === "name") {
        return context.profile.name || userPubkey?.slice(0, 8) + "...";
      } else if (field === "displayName") {
        return context.profile.displayName || context.profile.name || userPubkey?.slice(0, 8) + "...";
      } else if (field === "both") {
        const displayName = context.profile.displayName || context.profile.name;
        const name = context.profile.name && context.profile.name !== context.profile.displayName ? context.profile.name : null;
        return name ? `${displayName} (@${name})` : displayName || userPubkey?.slice(0, 8) + "...";
      }
      return userPubkey?.slice(0, 8) + "..." || "Unknown";
    })();
    $$renderer2.push(`<span data-user-name=""${attr_class(clsx(cn(className)))}>${escape_html(displayText)}</span>`);
  });
}
function User_bio($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { class: className = "" } = $$props;
    const context = getContext(USER_CONTEXT_KEY);
    if (!context) {
      throw new Error("User.Bio must be used within User.Root");
    }
    const bio = context.profile?.about || "";
    if (bio) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p data-user-bio=""${attr_class(clsx(cn(className)))}>${escape_html(bio)}</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function User_field($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { field, class: className = "" } = $$props;
    const context = getContext(USER_CONTEXT_KEY);
    if (!context) {
      throw new Error("User.Field must be used within User.Root");
    }
    const fieldValue = context.profile?.[field];
    if (field === "about") {
      $$renderer2.push("<!--[-->");
      User_bio($$renderer2, { class: cn(className) });
    } else {
      $$renderer2.push("<!--[!-->");
      if (fieldValue) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span data-user-field=""${attr_class(clsx(cn(className)))}>${escape_html(fieldValue)}</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function User_handle($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { class: className = "", showAt = true } = $$props;
    const context = getContext(USER_CONTEXT_KEY);
    if (!context) {
      throw new Error("User.Handle must be used within User.Root");
    }
    const handle = (() => {
      if (context.profile?.name) return context.profile.name;
      try {
        return context.ndkUser?.pubkey?.slice(0, 8) || "unknown";
      } catch {
        return "unknown";
      }
    })();
    const displayText = showAt ? `@${handle}` : handle;
    $$renderer2.push(`<span data-user-handle=""${attr_class(clsx(cn(className)))}>${escape_html(displayText)}</span>`);
  });
}
function User_banner($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { class: className = "" } = $$props;
    const context = getContext(USER_CONTEXT_KEY);
    if (!context) {
      throw new Error("User.Banner must be used within User.Root");
    }
    const profile = context.profile;
    const ndkUser = context.ndkUser;
    let imageLoaded = false;
    const backgroundStyle = (() => {
      const resolvedPubkey = ndkUser?.pubkey;
      if (resolvedPubkey) {
        return `background: ${deterministicPubkeyGradient(resolvedPubkey)}`;
      }
      return "background: var(--primary)";
    })();
    profile?.banner && imageLoaded;
    $$renderer2.push(`<div data-user-banner=""${attr_class(`relative w-full h-48 ${stringify(className)}`)}${attr_style(backgroundStyle)}>`);
    if (profile?.banner) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<img${attr("src", profile.banner)} alt="Profile banner"${attr_class("w-full h-full object-cover", void 0, { "opacity-0": !imageLoaded })} onload="this.__e=event" onerror="this.__e=event"/>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function User_nip05($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    function formatNip05(nip052) {
      if (!nip052) return "";
      return nip052;
    }
    let {
      showNip05 = true,
      showVerified = true,
      class: className = "",
      verificationSnippet
    } = $$props;
    const context = getContext(USER_CONTEXT_KEY);
    if (!context) {
      throw new Error("User.Nip05 must be used within User.Root");
    }
    const profile = context.profile;
    context.ndkUser;
    const nip05 = profile?.nip05;
    const displayText = formatNip05(nip05);
    let verificationStatus = void 0;
    let isVerifying = false;
    if (
      // Verify NIP-05 when showVerified is true and we have the data
      // Reset and verify
      showNip05 && nip05
    ) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span data-user-nip05=""${attr_class(clsx(className))}>${escape_html(displayText)} `);
      if (showVerified) {
        $$renderer2.push("<!--[-->");
        if (verificationSnippet) {
          $$renderer2.push("<!--[-->");
          verificationSnippet($$renderer2, { status: verificationStatus, isVerifying });
          $$renderer2.push(`<!---->`);
        } else {
          $$renderer2.push("<!--[!-->");
          {
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
        }
        $$renderer2.push(`<!--]-->`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></span>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
const User = {
  Root: User_root,
  Avatar: User_avatar,
  Name: User_name,
  Field: User_field,
  Handle: User_handle,
  Bio: User_bio,
  Banner: User_banner,
  Nip05: User_nip05
};

export { User as U, cn as c };
//# sourceMappingURL=index4-D71bD0RT.js.map
