import { b as attr, a as attr_class, c as clsx } from './index2-DpBdzO5t.js';
import { n as ndk } from './ndk.svelte-BfhDBrJw.js';
import { F as Follow_button } from './follow-button-btj2XHXB.js';
import { U as User, c as cn } from './index4-D71bD0RT.js';

function User_profile($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ndk: ndk2,
      user,
      pubkey,
      profile,
      variant = "horizontal",
      size = "md",
      showAvatar = true,
      byline,
      onclick,
      class: className = ""
    } = $$props;
    const sizeClasses = (() => {
      switch (size) {
        case "xs":
          return {
            container: "gap-2",
            avatar: "w-6 h-6",
            name: "text-xs",
            byline: "text-xs"
          };
        case "sm":
          return {
            container: "gap-2",
            avatar: "w-8 h-8",
            name: "text-sm",
            byline: "text-xs"
          };
        case "md":
          return {
            container: "gap-3",
            avatar: "w-10 h-10",
            name: "text-base",
            byline: "text-sm"
          };
        case "lg":
          return {
            container: "gap-4",
            avatar: "w-12 h-12",
            name: "text-lg",
            byline: "text-base"
          };
        default:
          return {
            container: "gap-3",
            avatar: "w-10 h-10",
            name: "text-base",
            byline: "text-sm"
          };
      }
    })();
    const variantClasses = (() => {
      switch (variant) {
        case "horizontal":
          return { wrapper: "flex items-center", info: "flex flex-col" };
        case "stacked":
          return {
            wrapper: "flex flex-col items-center text-center",
            info: "flex flex-col items-center"
          };
        case "inline":
          return {
            wrapper: "flex items-center",
            info: "flex items-center gap-2"
          };
        case "compact":
          return {
            wrapper: "flex items-center",
            info: "flex items-baseline gap-2"
          };
        default:
          return { wrapper: "flex items-center", info: "flex flex-col" };
      }
    })();
    $$renderer2.push(`<!---->`);
    User.Root($$renderer2, {
      ndk: ndk2,
      user,
      pubkey,
      profile,
      onclick,
      children: ($$renderer3) => {
        $$renderer3.push(`<div data-user-profile=""${attr("data-variant", variant)}${attr("data-size", size)}${attr_class(clsx(cn(variantClasses.wrapper, sizeClasses.container, className)))}>`);
        if (showAvatar) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<!---->`);
          User.Avatar($$renderer3, { class: sizeClasses.avatar });
          $$renderer3.push(`<!---->`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--> <div${attr_class(clsx(cn(variantClasses.info, "min-w-0")))}><!---->`);
        User.Name($$renderer3, { class: cn(sizeClasses.name, "truncate") });
        $$renderer3.push(`<!----> `);
        if (byline) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<div${attr_class(clsx(cn(sizeClasses.byline, "text-muted-foreground")))}>`);
          byline($$renderer3);
          $$renderer3.push(`<!----></div>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--></div></div>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!---->`);
  });
}
function NewMemberCard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { memberPubkey, inviterPubkey, joinedAt } = $$props;
    const user = ndk.getUser({ pubkey: memberPubkey });
    $$renderer2.push(`<a${attr("href", `/p/${user.npub}`)} class="flex flex-row items-start justify-between gap-3"><div class="flex-1 flex-none">`);
    {
      let byline = function($$renderer3) {
        if (inviterPubkey) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<span class="text-xs text-muted-foreground">Invited by <!---->`);
          User.Root($$renderer3, {
            ndk,
            pubkey: inviterPubkey,
            children: ($$renderer4) => {
              $$renderer4.push(`<!---->`);
              User.Name($$renderer4, {});
              $$renderer4.push(`<!---->`);
            },
            $$slots: { default: true }
          });
          $$renderer3.push(`<!----></span>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]-->`);
      };
      User_profile($$renderer2, {
        size: "sm",
        ndk,
        pubkey: memberPubkey,
        byline
      });
    }
    $$renderer2.push(`<!----></div> `);
    Follow_button($$renderer2, { ndk, target: memberPubkey, variant: "ghost" });
    $$renderer2.push(`<!----></a>`);
  });
}

export { NewMemberCard as N };
//# sourceMappingURL=NewMemberCard-33LCI8Hd.js.map
