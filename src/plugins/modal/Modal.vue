<template>
  <transition :name="overlayTransition" v-on:enter="startTransition">
    <div
      class="fixed inset-0 bg-gray-600 z-20 modal_background"
      v-if="transitions.overlay"
    >
      <transition :name="modalTransition" v-on:leave="stopTransition">
        <div class="w-full h-full relative" v-show="transitions.modal">
          <div
            class="
              w-full
              h-full
              sm:absolute
              sm:w-[500px]
              sm:h-auto
              sm:left-1/2
              sm:top-1/2
              sm:transform
              sm:-translate-y-1/2 sm:-translate-x-1/2
              sm:rounded-lg
              bg-white
              shadow-md
              z-20
            "
            v-click-outside="handleOutside"
          >
            <div class="absolute top-4 right-4">
              <v-icon
                name="close"
                class="hover:text-green-500 cursor-pointer"
                @click.native="close"
              />
            </div>
            <div class="p-4 h-full">
              <slot />
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>
<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
import Vue from "@/strong-vue";
import VIcon from "@/components/_includes/Icon.vue";
import { clickOutside } from "@/directives";

@Component({ components: { VIcon }, directives: { clickOutside } })
export default class Modal extends Vue {
  @Prop({ required: true }) private readonly name!: string;
  @Prop({ required: false, default: "modal" })
  private readonly modalTransition!: string;
  @Prop({ required: false, default: "opacity" })
  private readonly overlayTransition!: string;
  private transitions = { overlay: false, modal: false };
  private startTransition() {
    this.transitions.modal = true;
  }
  private stopTransition() {
    this.transitions.overlay = false;
  }
  private handleOutside() {
    if (this.isActive) this.close();
  }
  private close() {
    this.$modal.hide(this.name);
  }
  private get isActive() {
    return this.$modal.isActive(this.name);
  }
  @Watch("isActive")
  private isActiveUpdate(value: boolean, oldValue: boolean) {
    if (value && !oldValue) {
      this.transitions.overlay = true;
      this.$emit("open", this.$modal.params);
    }
    if (!value && oldValue) {
      this.transitions.modal = false;
      this.$emit("close", this.$modal.params);
    }
  }
}
</script>
<style lang="scss">
.modal_background {
  background-color: rgba($color: #000000, $alpha: 0.25);
}
.modal-enter-active,
.modal-leave-active {
  @apply transition;
  @apply transform;
}
.modal-enter,
.modal-leave-to {
  @apply opacity-0;
  @apply -translate-y-10;
}
.opacity-enter-active,
.opacity-leave-active {
  @apply transition;
}
.opacity-enter,
.opacity-leave-to {
  @apply opacity-0;
}
</style>
