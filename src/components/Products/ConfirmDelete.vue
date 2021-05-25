<template>
  <v-modal :name="name" @open="setProduct">
    <div
      class="flex flex-col h-full justify-end sm:justify-start items-center p-4"
    >
      <figure class="flex py-4">
        <img
          class="w-24 h-24 object-contains"
          :src="product.image"
          alt="product.title"
        />
      </figure>
      <span class="py-4 text-2xl font-medium text-gray-800"
        >Delete this product ?</span
      >
      <span class="p-4 text-center text-gray-600"
        >Once you delete this product, it will be gone forever. There is no
        turning back !</span
      >
      <div class="pt-4 flex flex-col">
        <v-button
          class="bg-red-500 text-white justify-center"
          @clicked="validate"
        >
          <template v-slot:text="text">
            <span :class="text._class">Delete now</span>
          </template>
        </v-button>
        <v-button class="text-blue-500 justify-center mt-4" @clicked="cancel">
          <template v-slot:text>
            <span class="tracking tighter text-sm font-medium"
              >No I changed my mind</span
            >
          </template>
        </v-button>
      </div>
    </div>
  </v-modal>
</template>
<script lang="ts">
import { Component } from "vue-property-decorator";
import Vue from "@/strong-vue";
import VModal from "@/plugins/modal/Modal.vue";
import VButton from "@/components/_includes/Button.vue";
import { ModelTypes } from "@/types";
import { ActionTypes } from "@/store/types";
import helpers from "@/helpers";

@Component({ components: { VModal, VButton } })
export default class Modal extends Vue {
  private name = "product-confirm-delete";
  private product: ModelTypes.Product = {
    id: 0,
    title: "",
    price: 0,
    category: "",
    description: "",
    image: "",
  };
  private setProduct({ product }: { product: ModelTypes.Product }) {
    this.product = product;
  }
  private async validate() {
    await helpers.models.product.delete({
      id: this.product.id,
    });
    this.$store.dispatch(ActionTypes.products.DELETE_PRODUCT, {
      id: this.product.id,
    });
    this.close();
  }
  private cancel() {
    this.close();
  }
  private close() {
    this.$modal.hide(this.name);
  }
}
</script>
