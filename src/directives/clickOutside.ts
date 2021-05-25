import { DirectiveOptions } from "vue/types/umd";

interface ClickOutsideHTMLElement extends HTMLElement {
  clickOutsideListener?: (e: MouseEvent) => void;
}

const clickOutside: DirectiveOptions = {
  bind(el, binding, vnode) {
    const listener = function (e: MouseEvent) {
      if (!e.target) return;
      const target = e.target as Node;
      if (target !== el && !el.contains(target)) {
        binding.value.bind(vnode.context)(e);
      }
    };
    const realEl = el as ClickOutsideHTMLElement;
    realEl.clickOutsideListener = listener;
    window.addEventListener("click", realEl.clickOutsideListener);
  },
  unbind(el) {
    const realEl = el as ClickOutsideHTMLElement;
    if (!realEl.clickOutsideListener) return;
    window.removeEventListener("click", realEl.clickOutsideListener);
  },
};

export default clickOutside;
