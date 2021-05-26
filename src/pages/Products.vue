<template>
  <div class="px-4 max-w-screen-xl m-auto">
    <div class="flex items-center my-10 -mx-3">
      <h1 class="text-3xl font-medium text-gray-800 mx-3">
        {{ $t("products.title") }}
      </h1>
      <v-button class="bg-green-500 text-white" @clicked="goToCreate">
        <template v-slot:icon="icon">
          <v-icon name="add" :class="icon._class" />
        </template>
        <template v-slot:text="text">
          <span :class="text._class">{{ $t("products.buttons.new") }}</span>
        </template>
      </v-button>
    </div>
    <product-search
      v-model.trim="searching"
      @search="search"
      :delay="300"
      class="mb-4"
    />
    <product-sort />
    <product-pagination />
    <confirm-delete-modal />
  </div>
</template>

<script lang="ts">
import helpers from "@/helpers";
import { Component } from "vue-property-decorator";
import Vue from "@/strong-vue";
import VButton from "@/components/_includes/Button.vue";
import VIcon from "@/components/_includes/Icon.vue";
import ProductSearch from "@/components/_includes/Search.vue";
import ProductPagination from "@/components/Products/Pagination.vue";
import ProductSort from "@/components/Products/Sort.vue";
import ConfirmDeleteModal from "@/components/Products/ConfirmDelete.vue";
import { ActionTypes, GetterTypes } from "@/store/types";
import { RouteNames } from "@/router";

@Component({
  components: {
    ProductPagination,
    ProductSort,
    ProductSearch,
    ConfirmDeleteModal,
    VButton,
    VIcon,
  },
})
export default class Products extends Vue {
  private searching = "";
  private search(value: string) {
    this.$store.dispatch(ActionTypes.products.SET_PRODUCT_SEARCH, value);
  }
  private async setProducts() {
    if (this.hasProducts) return;
    const products = await helpers.models.product.index();
    this.$store.dispatch(ActionTypes.products.SET_PRODUCTS, products);
  }
  private goToCreate() {
    this.$router.push({ name: RouteNames.create });
  }
  private get hasProducts() {
    return this.$store.getters[GetterTypes.HAS_PRODUCTS];
  }
  private created() {
    this.setProducts();
  }
}
</script>
