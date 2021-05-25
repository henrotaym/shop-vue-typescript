<template>
  <label class="relative flex w-full">
    <span
      class="
        absolute
        left-0
        top-1/2
        transform
        -translate-y-1/2
        text-green-400
        px-4
        material-icons
      "
      >search</span
    >
    <input
      type="text"
      class="
        flex-auto
        pl-14
        px-4
        py-1.5
        rounded-md
        text-gray-800
        border-2 border-gray-300
        focus:border-green-300
        focus:outline-none
      "
      placeholder="Rechercher un produit"
      :value="value"
      @input="handleInput"
      @keydown.esc="cancel"
    />
  </label>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import Vue from "@/strong-vue";
import helpers from "@/helpers";

@Component
export default class Search extends Vue {
  private emitSearch!: () => void;
  @Prop() readonly value!: string;
  @Prop() readonly delay!: number;
  private emitEvents(value: string): void {
    this.$emit("input", value);
    this.emitSearch();
  }
  private cancel(): void {
    this.emitEvents("");
  }
  private handleInput(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.emitEvents(target.value);
  }
  private created() {
    this.emitSearch = helpers.debounce(
      () => this.$emit("search", this.value),
      this.delay
    );
  }
}
</script>
