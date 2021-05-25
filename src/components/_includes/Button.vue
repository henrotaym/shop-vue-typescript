<template>
  <button
    class="px-4 py-2 flex items-center rounded-lg focus:outline-none"
    @click="$emit('clicked')"
  >
    <slot name="icon" _class="text-[16px] pr-2" />
    <slot name="text" _class="tracking tighter uppercase text-sm font-medium" />
  </button>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Vue from "@/strong-vue";

@Component
export default class Button extends Vue {}
</script>
