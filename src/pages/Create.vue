<template>
  <product-page :page-title="$t('product.create.title')">
    <product-form />
  </product-page>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Vue from "@/strong-vue";
import ProductForm from "@/components/_includes/Product/Form.vue";
import ProductPage from "@/components/_includes/Product/Page.vue";

@Component({
  components: {
    ProductForm,
    ProductPage,
  },
})
export default class Product extends Vue {}
</script>
