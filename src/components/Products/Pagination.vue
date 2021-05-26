<template>
  <default-pagination :per-page="5" :elements="products">
    <template v-slot:visible="{ visible }">
      <v-product
        :product="product"
        :key="`product_${product.id}`"
        v-for="product in visible"
      />
    </template>
    <template v-slot:empty>
      <div class="flex flex-col items-center">
        <v-icon name="announcement" class="text-5xl text-green-500 my-10" />
        <span class="text-gray-400"
          >There isn't any product matching search...</span
        >
      </div>
    </template>
  </default-pagination>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Vue from "@/strong-vue";
import DefaultPagination from "@/components/_includes/Pagination.vue";
import VProduct from "@/components/Products/Product.vue";
import VIcon from "@/components/_includes/Icon.vue";
import { GetterTypes } from "@/store/types";

@Component({
  components: { DefaultPagination, VProduct, VIcon },
})
export default class ProductPagination extends Vue {
  private get products() {
    return this.$store.getters[GetterTypes.FILTERED_PRODUCTS];
  }
}
</script>
