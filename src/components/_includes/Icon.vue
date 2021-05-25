<template>
  <span class="material-icons">{{ name }}</span>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import Vue from "@/strong-vue";

@Component
export default class Icon extends Vue {
  @Prop({ required: true }) private readonly name!: string;
}
</script>
