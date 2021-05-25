<template>
  <div class="flex justify-end">
    <span class="text-gray-400 px-2">Sort by :</span>
    <v-selector
      :elements="sortings"
      trackBy="id"
      :filter="(sort, search) => sort.title.includes(search)"
      :multiple="false"
      v-model="selectorValue"
      v-slot="{ selectorSlot }"
    >
      <div class="px-2 relative">
        <div
          class="
            font-medium
            uppercase
            text-green-500
            tracking-tighter
            cursor-pointer
          "
          @click.stop="toggleSortList"
        >
          {{ selectedSorting.title }}
        </div>
        <div
          class="absolute right-0 p-4 z-10 bg-white shadow"
          v-if="showSortList"
          v-click-outside="toggleSortList"
        >
          <div
            v-for="el in selectorSlot.visibleElements"
            :key="el.id"
            @click="selectSort(selectorSlot, el)"
            class="
              flex
              items-center
              whitespace-nowrap
              cursor-pointer
              px-2
              py-1
              font-medium
              uppercase
              tracking-tighter
            "
            :class="{
              ['text-green-500']: selectorSlot.isSelected(el),
              ['text-gray-600 hover:text-green-500']:
                !selectorSlot.isSelected(el),
            }"
          >
            <span class="text-sm">{{ el.title }}</span>
            <span
              class="material-icons ml-1 text-[16px]"
              v-if="selectorSlot.isSelected(el)"
              >check</span
            >
          </div>
        </div>
      </div>
    </v-selector>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Vue from "@/strong-vue";
import { clickOutside } from "@/directives";
import VSelector, { SelectorSlot } from "@/components/Selector.vue";
import { ActionTypes, GetterTypes } from "@/store/types";
import { ProductSort } from "@/store/types/state";

@Component({ components: { VSelector }, directives: { clickOutside } })
export default class Sort extends Vue {
  private showSortList = false;
  private toggleSortList() {
    this.showSortList = !this.showSortList;
  }
  private selectSort(selector: SelectorSlot, sort: ProductSort): void {
    selector.toggle(sort);
    this.toggleSortList();
  }
  private get sortings() {
    return this.$store.state.products.sort.all;
  }
  private get selectedSorting() {
    return this.$store.getters[GetterTypes.SELECTED_SORT];
  }
  private get selectorValue() {
    return [this.selectedSorting];
  }
  private set selectorValue(sortings: Array<ProductSort>) {
    this.$store.dispatch(
      ActionTypes.products.SET_SELECTED_SORT,
      sortings.length
        ? sortings[0]
        : this.$store.getters[GetterTypes.DEFAULT_SORT]
    );
  }
}
</script>
