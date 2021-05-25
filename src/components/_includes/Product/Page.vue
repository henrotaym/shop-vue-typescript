<template>
  <div class="px-4 max-w-screen-xl m-auto">
    <div class="flex items-center my-10 -mx-3">
      <v-icon
        name="chevron_left"
        class="text-5xl text-green-500 cursor-pointer"
        @click.native="$router.go(-1)"
      />
      <h1 class="text-3xl font-medium text-gray-800 mx-3">
        {{ pageTitle }}
      </h1>
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import Vue from "@/strong-vue";
import VIcon from "@/components/_includes/Icon.vue";

@Component({ components: { VIcon } })
export default class Button extends Vue {
  @Prop({ required: true }) private readonly pageTitle!: string;
}
</script>
