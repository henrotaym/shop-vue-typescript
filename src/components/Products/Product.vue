<template>
  <div class="flex py-4 items-center border-b border-gray-200 group">
    <figure class="pr-6 w-1/12">
      <img
        class="w-full h-16 object-contain"
        :src="product.image"
        :alt="product.title"
      />
    </figure>
    <div class="flex flex-col w-6/12 px-6 cursor-pointer" @click="goToEdit">
      <span class="text-gray-800 group-hover:text-green-400 font-medium">{{
        product.title
      }}</span>
      <span class="text-gray-400">#{{ product.id }}</span>
    </div>
    <span class="px-6 w-2/12 flex items-center">
      <span class="material-icons text-green-400">attach_money</span
      >{{ product.price }}</span
    >
    <span class="px-6 w-2/12 text-white flex">
      <span
        class="
          px-4
          max-w-full
          py-1
          text-white
          bg-green-400
          rounded-full
          text-center text-sm
          font-medium
          uppercase
          tracking-tighter
          truncate
        "
      >
        {{ product.category }}
      </span>
    </span>
    <div class="pl-6 w-1/12 text-right">
      <span
        class="
          material-icons
          text-gray-400 text-right
          opacity-0
          group-hover:opacity-100
          hover:text-green-500
          p-2
          cursor-pointer
        "
        @click.stop="handleDelete"
        >delete</span
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import Vue from "@/strong-vue";
import { ModelTypes } from "@/types";
import { RouteNames } from "@/router";

@Component
export default class Product extends Vue {
  @Prop() readonly product!: ModelTypes.Product;
  private handleDelete() {
    this.$modal.show("product-confirm-delete", { product: this.product });
  }
  private goToEdit() {
    this.$router.push({
      name: RouteNames.edit,
      params: { productId: `${this.product.id}` },
    });
  }
}
</script>
