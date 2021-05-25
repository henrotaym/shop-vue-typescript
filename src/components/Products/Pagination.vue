<template>
  <default-pagination :per-page="5" :elements="products" v-slot="{ visible }">
    <v-product
      :product="product"
      :key="`product_${product.id}`"
      v-for="product in visible"
    />
  </default-pagination>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Vue from "@/strong-vue";
import DefaultPagination from "@/components/_includes/Pagination.vue";
import VProduct from "@/components/Products/Product.vue";
import { GetterTypes } from "@/store/types";

@Component({
  components: { DefaultPagination, VProduct },
})
export default class ProductPagination extends Vue {
  private get products() {
    return this.$store.getters[GetterTypes.FILTERED_PRODUCTS];
  }
}
</script>
