import { e as ensure_array_like, b as attr } from './index2-DpBdzO5t.js';
import { n as ndk } from './ndk.svelte-BfhDBrJw.js';
import '@nostr-dev-kit/ndk';
import './utils-KcIDVAAe.js';
import './state.svelte-zw3OW0Pf.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';
import './context-D7LG2f18.js';
import 'clsx';
import '@nostr-dev-kit/cache-sqlite-wasm';
import '@nostr-dev-kit/wallet';
import '@nostr-dev-kit/wot';
import '@nostr-dev-kit/sessions';
import '@nostr-dev-kit/sync';
import 'tty';
import 'util';
import 'os';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const CATEGORIES = [
      { value: "", label: "All Categories" },
      { value: "electronics", label: "Electronics" },
      { value: "furniture", label: "Furniture" },
      { value: "clothing", label: "Clothing" },
      { value: "books", label: "Books" },
      { value: "services", label: "Services" },
      { value: "vehicles", label: "Vehicles" },
      { value: "real-estate", label: "Real Estate" },
      { value: "jobs", label: "Jobs" },
      { value: "free", label: "Free" },
      { value: "wanted", label: "Wanted" }
    ];
    const subscription = ndk.$subscribe(() => {
      const filter = {
        kinds: [30402],
        // NDKKind.Classified
        limit: 50
      };
      return { filters: [filter], bufferMs: 100 };
    });
    const listings = (() => {
      return subscription.events.filter((event) => {
        const status = event.tagValue("status") || "active";
        if (status !== "active") return false;
        return true;
      });
    })();
    const listingsByCategory = (() => {
      const grouped = {};
      listings.forEach((listing) => {
        const categories = listing.tags.filter((t) => t[0] === "t").map((t) => t[1]);
        if (categories.length > 0) {
          categories.forEach((category) => {
            const key = category.toLowerCase();
            if (!grouped[key]) grouped[key] = [];
            grouped[key].push(listing);
          });
        } else {
          if (!grouped["uncategorized"]) grouped["uncategorized"] = [];
          grouped["uncategorized"].push(listing);
        }
      });
      return grouped;
    })();
    function getListingImage(listing) {
      return listing.tagValue("image");
    }
    function getListingPrice(listing) {
      const priceTag = listing.tags.find((t) => t[0] === "price");
      if (!priceTag || !priceTag[1] || !priceTag[2]) return null;
      return { amount: priceTag[1], currency: priceTag[2] };
    }
    $$renderer2.push(`<div class="min-h-screen bg-neutral-50 dark:bg-background"><div class="container mx-auto px-4 py-4 max-w-7xl">`);
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div>`);
      if (Object.keys(listingsByCategory).length === 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="text-center py-12 text-muted-foreground">No marketplace items yet</div>`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (listings.length > 0) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="mb-8"><h2 class="text-xl font-semibold text-foreground mb-4">Recent Listings</h2> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"><!--[-->`);
          const each_array_2 = ensure_array_like(listings.slice(0, 8));
          for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
            let listing = each_array_2[$$index_2];
            const price = getListingPrice(listing);
            $$renderer2.push(`<button class="bg-white dark:bg-card/50 rounded-xl border border overflow-hidden transition-all hover:border-primary-500 dark:hover:border-primary-500 hover:shadow-lg text-left">`);
            if (getListingImage(listing)) {
              $$renderer2.push("<!--[-->");
              $$renderer2.push(`<div class="aspect-video bg-neutral-100 dark:bg-muted overflow-hidden"><img${attr("src", getListingImage(listing))}${attr("alt", listing.tagValue("title") || "Listing")} class="w-full h-full object-cover"/></div>`);
            } else {
              $$renderer2.push("<!--[!-->");
            }
            $$renderer2.push(`<!--]--> <div class="p-4"><h3 class="font-semibold text-foreground truncate">${escape_html(listing.tagValue("title") || "Untitled")}</h3> `);
            if (listing.tagValue("summary")) {
              $$renderer2.push("<!--[-->");
              $$renderer2.push(`<p class="text-sm text-muted-foreground mt-1 line-clamp-2">${escape_html(listing.tagValue("summary"))}</p>`);
            } else {
              $$renderer2.push("<!--[!-->");
            }
            $$renderer2.push(`<!--]--> `);
            if (price) {
              $$renderer2.push("<!--[-->");
              $$renderer2.push(`<p class="text-sm font-medium text-primary-600 dark:text-primary-400 mt-2">${escape_html(price.amount)} ${escape_html(price.currency)}</p>`);
            } else {
              $$renderer2.push("<!--[!-->");
            }
            $$renderer2.push(`<!--]--></div></button>`);
          }
          $$renderer2.push(`<!--]--></div></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> <!--[-->`);
        const each_array_3 = ensure_array_like(CATEGORIES.filter((c) => c.value && listingsByCategory[c.value]?.length > 0));
        for (let $$index_4 = 0, $$length = each_array_3.length; $$index_4 < $$length; $$index_4++) {
          let category = each_array_3[$$index_4];
          $$renderer2.push(`<div class="mb-8"><div class="flex items-center justify-between mb-4"><h2 class="text-xl font-semibold text-foreground">${escape_html(category.label)}</h2> <button class="text-sm text-primary-600 dark:text-primary-400 hover:underline">View All</button></div> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"><!--[-->`);
          const each_array_4 = ensure_array_like(listingsByCategory[category.value].slice(0, 4));
          for (let $$index_3 = 0, $$length2 = each_array_4.length; $$index_3 < $$length2; $$index_3++) {
            let listing = each_array_4[$$index_3];
            const price = getListingPrice(listing);
            $$renderer2.push(`<button class="bg-white dark:bg-card/50 rounded-xl border border overflow-hidden transition-all hover:border-primary-500 dark:hover:border-primary-500 hover:shadow-lg text-left">`);
            if (getListingImage(listing)) {
              $$renderer2.push("<!--[-->");
              $$renderer2.push(`<div class="aspect-video bg-neutral-100 dark:bg-muted overflow-hidden"><img${attr("src", getListingImage(listing))}${attr("alt", listing.tagValue("title") || "Listing")} class="w-full h-full object-cover"/></div>`);
            } else {
              $$renderer2.push("<!--[!-->");
            }
            $$renderer2.push(`<!--]--> <div class="p-4"><h3 class="font-semibold text-foreground truncate">${escape_html(listing.tagValue("title") || "Untitled")}</h3> `);
            if (listing.tagValue("summary")) {
              $$renderer2.push("<!--[-->");
              $$renderer2.push(`<p class="text-sm text-muted-foreground mt-1 line-clamp-2">${escape_html(listing.tagValue("summary"))}</p>`);
            } else {
              $$renderer2.push("<!--[!-->");
            }
            $$renderer2.push(`<!--]--> `);
            if (price) {
              $$renderer2.push("<!--[-->");
              $$renderer2.push(`<p class="text-sm font-medium text-primary-600 dark:text-primary-400 mt-2">${escape_html(price.amount)} ${escape_html(price.currency)}</p>`);
            } else {
              $$renderer2.push("<!--[!-->");
            }
            $$renderer2.push(`<!--]--></div></button>`);
          }
          $$renderer2.push(`<!--]--></div></div>`);
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div></div>`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CHut8vFT.js.map
