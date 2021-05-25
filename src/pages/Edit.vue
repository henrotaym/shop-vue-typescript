<template>
  <product-page page-title="Edit a product" v-if="product">
    <product-form />
  </product-page>
</template>

<script lang="ts">
import helpers from "@/helpers";
import { Component } from "vue-property-decorator";
import Vue from "@/strong-vue";
import VIcon from "@/components/_includes/Icon.vue";
import ProductForm from "@/components/_includes/Product/Form.vue";
import ProductPage from "@/components/_includes/Product/Page.vue";
import { ActionTypes } from "@/store/types";
import { RouteNames } from "@/router";

@Component({
  components: {
    VIcon,
    ProductForm,
    ProductPage,
  },
})
export default class Product extends Vue {
  private async getProduct() {
    const product = this.$store.state.products.all.find(
      (p) => p.id === this.id
    );
    return product ?? helpers.models.product.show({ id: this.id });
  }
  private async setProduct() {
    const product = await this.getProduct();
    if (product)
      return this.$store.dispatch(ActionTypes.product.SET_PRODUCT, product);
    this.$router.replace({ name: RouteNames.products });
  }
  private get id() {
    return parseInt(this.$route.params.productId);
  }
  private get product() {
    return this.$store.state.product.actual;
  }
  private created() {
    this.setProduct();
  }
  private beforeDestroy() {
    this.$store.dispatch(ActionTypes.product.SET_PRODUCT, null);
  }
}
</script>
