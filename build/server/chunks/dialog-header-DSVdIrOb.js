import { k as attributes, c as clsx, f as bind_props } from './index2-DpBdzO5t.js';
import { f as cn } from './index3-DOo-Ka_h.js';

function Dialog_header($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      ref = null,
      class: className,
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    $$renderer2.push(`<div${attributes({
      "data-slot": "dialog-header",
      class: clsx(cn("flex flex-col gap-2 text-center sm:text-left", className)),
      ...restProps
    })}>`);
    children?.($$renderer2);
    $$renderer2.push(`<!----></div>`);
    bind_props($$props, { ref });
  });
}

export { Dialog_header as D };
//# sourceMappingURL=dialog-header-DSVdIrOb.js.map
