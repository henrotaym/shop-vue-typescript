<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
import Vue from "@/strong-vue";
import {
  NormalizedScopedSlot,
  ScopedSlotChildren,
} from "node_modules/vue/types/vnode";

export type PaginatorSlot = {
  next: () => void;
  previous: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
  isActive: (page: number) => boolean;
  current: number;
  visible: never[];
  hasVisible: boolean;
  pages: number[];
  goTo: (page: number) => void;
};

@Component
export default class Paginator extends Vue {
  @Prop({ required: false, default: 5 }) readonly perPage!: number;
  @Prop({ required: false, default: 1 }) readonly startingPage!: number;
  @Prop({ required: true }) readonly elements!: Array<never>;
  private currentPage = 1;
  private next() {
    if (this.hasNext) this.currentPage++;
  }
  private previous() {
    if (this.hasPrevious) this.currentPage--;
  }
  private goToPage(page: number) {
    if (!this.hasVisibleElements) this.currentPage = 1;
    else if (page <= this.pageCount && page > 0) this.currentPage = page;
  }
  private isActivePage(page: number) {
    return this.currentPage === page;
  }
  private get pageCount() {
    return Math.ceil(this.count / this.perPage);
  }
  private get pages() {
    return [...Array(this.pageCount).keys()].map((c) => c + 1);
  }
  private get hasNext() {
    return this.pageStartIndex(this.currentPage + 1) < this.count;
  }
  private get hasPrevious() {
    return this.currentPage > 1;
  }
  private get count(): number {
    return this.elements.length;
  }
  private pageStartIndex(page: number) {
    return this.perPage * (page - 1);
  }
  private pageEndIndex(page: number) {
    return this.perPage * page;
  }
  private get visibleElements(): Array<never> {
    return this.elements.slice(
      this.pageStartIndex(this.currentPage),
      this.pageEndIndex(this.currentPage)
    );
  }
  private get hasVisibleElements() {
    return this.visibleElements.length > 0;
  }
  private get paginatorSlot(): PaginatorSlot {
    return {
      next: this.next,
      previous: this.previous,
      hasNext: this.hasNext,
      hasPrevious: this.hasPrevious,
      isActive: this.isActivePage,
      current: this.currentPage,
      visible: this.visibleElements,
      hasVisible: this.hasVisibleElements,
      pages: this.pages,
      goTo: this.goToPage,
    };
  }
  @Watch("elements")
  private elementUpdate() {
    this.$emit("elementUpdate", { goTo: this.goToPage });
  }
  private created() {
    this.currentPage = this.startingPage;
  }
  render(): ScopedSlotChildren {
    const slot = this.$scopedSlots.default as NormalizedScopedSlot;
    return slot({ paginator: this.paginatorSlot });
  }
}
</script>
