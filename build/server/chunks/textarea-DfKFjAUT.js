import { k as attributes, c as clsx, f as bind_props } from './index2-DpBdzO5t.js';
import { c as cn } from './utils2-B05Dmz_H.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';

function Textarea($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      value = void 0,
      class: className,
      "data-slot": dataSlot = "textarea",
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    $$renderer2.push(`<textarea${attributes({
      "data-slot": dataSlot,
      class: clsx(cn("border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 field-sizing-content shadow-xs flex min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base outline-none transition-[color,box-shadow] focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className)),
      ...restProps
    })}>`);
    const $$body = escape_html(value);
    if ($$body) {
      $$renderer2.push(`${$$body}`);
    }
    $$renderer2.push(`</textarea>`);
    bind_props($$props, { ref, value });
  });
}

export { Textarea as T };
//# sourceMappingURL=textarea-DfKFjAUT.js.map
