<template>
  <v-paginator
    :per-page="perPage"
    :starting-page="startingPage"
    :elements="elements"
    @elementUpdate="$event.goTo(1)"
    v-slot="{ paginator }"
  >
    <div>
      <ul class="flex flex-col mb-6">
        <slot :visible="paginator.visible" />
      </ul>
      <ul class="flex items-center justify-center">
        <v-icon
          name="chevron_left"
          :class="{
            ['text-gray-400 hover:text-green-500 cursor-pointer']:
              paginator.hasPrevious,
            ['text-gray-200 cursor-default']: !paginator.hasPrevious,
          }"
          @click.native="paginator.previous"
        />
        <li
          v-for="page in paginator.pages"
          :key="`page_${page}`"
          class="
            mx-1
            w-8
            h-8
            flex
            justify-center
            items-center
            rounded-lg
            cursor-pointer
          "
          :class="{
            ['bg-green-400 text-white']: paginator.isActive(page),
            ['text-gray-400 hover:text-green-500']: !paginator.isActive(page),
          }"
          @click="paginator.goTo(page)"
        >
          {{ page }}
        </li>
        <v-icon
          name="chevron_right"
          :class="{
            ['text-gray-400 hover:text-green-500 cursor-pointer']:
              paginator.hasNext,
            ['text-gray-200 cursor-default']: !paginator.hasNext,
          }"
          @click.native="paginator.next"
        />
      </ul>
    </div>
  </v-paginator>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import Vue from "@/strong-vue";
import VPaginator from "@/components/Paginator.vue";
import VIcon from "@/components/_includes/Icon.vue";

@Component({
  components: { VPaginator, VIcon },
})
export default class DefaultPagination extends Vue {
  @Prop({ required: true }) private readonly elements!: Array<never>;
  @Prop({ required: false, default: 5 }) private readonly perPage!: number;
  @Prop({ required: false, default: 1 }) private readonly startingPage!: number;
}
</script>
