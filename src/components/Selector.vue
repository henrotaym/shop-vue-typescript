<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import Vue from "@/strong-vue";
import {
  NormalizedScopedSlot,
  ScopedSlotChildren,
} from "node_modules/vue/types/vnode";
import helpers from "@/helpers";

// Representing single element (any object)
export type Element = Record<string, unknown>;
// Representing api sent to template
export type SelectorSlot = {
  visibleElements: Element[];
  elements: Element[];
  searchAttributes: {
    on: {
      input: (e: Event) => void;
    };
    bind: {
      value: string;
    };
  };
  search: string;
  isSelected: (element: Element) => boolean;
  add: (element: Element) => void;
  delete: (element: Element) => void;
  toggle: (element: Element) => void;
};

@Component
export default class Selector extends Vue {
  // All possible elements
  @Prop({ required: true }) private readonly elements!: Array<Element>;
  // Selected elements
  @Prop({ required: true }) private readonly value!: Array<Element>;
  // Allowing multiple values or not
  @Prop({ required: true }) private readonly multiple!: boolean;
  // Happens when input changes
  @Prop({ required: false, default: () => () => true })
  private readonly filter!: (element: Element, search: string) => boolean;
  // Used to see if an element is checked
  @Prop({ required: true }) private readonly trackBy!: string;
  @Prop({ required: false, default: 300 })
  private readonly searchDelay!: number;
  // Search input value
  private search = "";
  // debounced search
  private debouncedSearch!: (value: string) => void;
  onSearchInput(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.debouncedSearch(target.value);
  }
  setSearch(value: string): void {
    console.log(value);
    this.search = value;
  }
  // Adding to selected array
  private add(element: Element) {
    if (!this.isSelected(element)) {
      this.$emit("input", this.multiple ? [...this.value, element] : [element]);
    }
  }
  // Deleting from selected array
  private delete(element: Element) {
    const index = this.elementIndex(element);
    if (index > -1) {
      const copy = [...this.value];
      copy.splice(index, 1);
      this.$emit("input", copy);
    }
  }
  // Toggling element
  private toggle(element: Element) {
    this.isSelected(element) ? this.delete(element) : this.add(element);
  }
  // Checking if given element is selected
  private isSelected(element: Element) {
    return this.elementIndex(element) > -1;
  }
  // Getting element index
  private elementIndex(element: Element) {
    return this.value.findIndex(
      (e) => e[this.trackBy] === element[this.trackBy]
    );
  }
  private get searchAttributes() {
    return {
      on: { input: this.onSearchInput },
      bind: { value: this.search },
    };
  }
  private get visibleElements() {
    return this.elements.filter((e) => this.filter(e, this.search));
  }
  // Selector slot properties
  private get selectorSlot(): SelectorSlot {
    return {
      visibleElements: this.visibleElements,
      elements: this.elements,
      searchAttributes: this.searchAttributes,
      search: this.search,
      isSelected: this.isSelected,
      add: this.add,
      delete: this.delete,
      toggle: this.toggle,
    };
  }
  // Debounced search
  private created() {
    this.debouncedSearch = helpers.debounce(this.setSearch, this.searchDelay);
  }
  // Render component
  render(): ScopedSlotChildren {
    const slot = this.$scopedSlots.default as NormalizedScopedSlot;
    return slot({ selectorSlot: this.selectorSlot });
  }
}
</script>
