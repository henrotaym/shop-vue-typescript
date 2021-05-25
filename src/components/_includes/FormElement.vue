<template>
  <label class="mb-4 flex flex-col">
    <span
      v-if="label"
      class="text-gray-600 text-lg capitalize font-medium py-1"
    >
      {{ label }}
    </span>
    <div class="py-1">
      <slot
        _class="px-2 py-1.5 w-full border-2 border-gray-300 focus:outline-none focus:border-green-500 text-gray-800 rounded-md"
      />
    </div>
    <span v-if="error" class="text-red-500 py-1">{{ error }}</span>
  </label>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import Vue from "@/strong-vue";

@Component
export default class Button extends Vue {
  @Prop({ required: false, default: "" }) private readonly error!: string;
  @Prop({ required: false, default: "" }) private readonly label!: string;
}
</script>
