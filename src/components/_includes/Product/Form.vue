<template>
  <div class="flex flex-col" v-if="product">
    <form-element :label="$t('product.form.title.label')">
      <template v-slot:default="title">
        <input
          :class="title._class"
          :placeholder="$t('product.form.title.placeholder')"
          v-model="product.title"
        />
      </template>
      <template v-slot:error v-if="$v.product.title.$dirty">
        <span v-if="!$v.product.title.required">{{
          $t("product.form.title.error.required")
        }}</span>
        <span v-if="!$v.product.title.min">
          {{
            $t("product.form.title.error.min", {
              length: $v.product.title.$params.min.min,
            })
          }}
        </span>
      </template>
    </form-element>
    <form-element :label="$t('product.form.price.label')">
      <template v-slot:default="price">
        <input
          :class="price._class"
          :placeholder="$t('product.form.price.placeholder')"
          v-model.number="product.price"
        />
      </template>
      <template v-slot:error v-if="$v.product.price.$dirty">
        <span v-if="!$v.product.price.required">
          {{ $t("product.form.price.error.required") }}
        </span>
        <span v-if="!$v.product.price.min">
          {{
            $t("product.form.price.error.min", {
              amount: $v.product.price.$params.min.min,
            })
          }}
        </span>
      </template>
    </form-element>
    <form-element :label="$t('product.form.category.label')">
      <template v-slot:default>
        <v-selector
          :elements="categories"
          trackBy="id"
          :multiple="false"
          v-model="category"
          v-slot="{ selectorSlot }"
        >
          <div class="flex flex-col">
            <div
              v-for="el in selectorSlot.visibleElements"
              :key="el.id"
              @click="selectorSlot.toggle(el)"
              class="
                flex
                items-center
                whitespace-nowrap
                cursor-pointer
                px-2
                py-1
                font-medium
                uppercase
                tracking-tighter
              "
              :class="{
                ['text-green-500']: selectorSlot.isSelected(el),
                ['text-gray-600 hover:text-green-500']:
                  !selectorSlot.isSelected(el),
              }"
            >
              <span class="text-sm">{{ el.name }}</span>
              <v-icon
                name="check"
                class="ml-2 text-[16px]"
                v-if="selectorSlot.isSelected(el)"
              />
            </div>
          </div>
        </v-selector>
      </template>
      <template v-slot:error v-if="$v.product.category.$dirty">
        <span v-if="!$v.product.category.required">
          {{ $t("product.form.category.error.required") }}
        </span>
      </template>
    </form-element>
    <form-element :label="$t('product.form.description.label')">
      <template v-slot:default="description">
        <textarea
          :class="description._class"
          :placeholder="$t('product.form.description.placeholder')"
          v-model="product.description"
        />
      </template>
      <template v-slot:error v-if="$v.product.description.$dirty">
        <span v-if="!$v.product.description.max">
          {{
            $t("product.form.description.error.max", {
              length: $v.product.description.$params.max.max,
            })
          }}
        </span>
      </template>
    </form-element>
    <form-element :label="$t('product.form.image.label')" v-slot="image">
      <div>
        <img
          v-if="product.image"
          class="w-24 h-24 object-contain mb-2 cursor-pointer"
          :src="product.image"
          @click.prevent="removeImage"
        />
        <input
          type="file"
          @change="setImage"
          :class="image._class"
          placeholder="Définir une image"
        />
      </div>
    </form-element>
    <div>
      <v-button
        class="flex-none"
        :class="{
          ['text-gray-400 bg-gray-200 cursor-default']:
            $v.product.$dirty && $v.product.$invalid,
          ['text-white bg-green-500']:
            !$v.product.$dirty || !$v.product.$invalid,
        }"
        @clicked="submit"
      >
        <template v-slot:text="btn">
          <span :class="btn._class">
            {{
              isEdit
                ? $t("product.form.buttons.submit.edit")
                : $t("product.form.buttons.submit.create")
            }}
          </span>
        </template>
      </v-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import {
  required,
  minLength,
  minValue,
  maxLength,
} from "vuelidate/lib/validators";
import Vue from "@/strong-vue";
import FormElement from "@/components/_includes/FormElement.vue";
import VButton from "@/components/_includes/Button.vue";
import VIcon from "@/components/_includes/Icon.vue";
import VSelector from "@/components/Selector.vue";
import helpers from "@/helpers";
import { ModelTypes } from "@/types";
import { RouteNames } from "@/router";
import { ActionTypes } from "@/store/types";

@Component({
  components: { FormElement, VButton, VIcon, VSelector },
  validations: {
    product: {
      title: { required, min: minLength(2) },
      category: { required },
      price: { required, min: minValue(0) },
      description: { max: maxLength(200) },
    },
  },
})
export default class Form extends Vue {
  private product: ModelTypes.EditableProduct = helpers.models.product.new();
  private categories: Array<{ id: number; name: string }> = [];
  private setImage(f: Event) {
    const reader = new FileReader();
    reader.onload = (e: Event) => {
      // @ts-ignore:
      this.product.image = e.target.result;
    };
    // @ts-ignore:
    const file = f.target.files[0];
    if (file) {
      reader.readAsDataURL(file);
    }
  }
  private removeImage() {
    this.product.image = "";
  }
  private setProduct() {
    const product = this.$store.state.product.actual;
    if (product) this.product = { ...product };
  }
  private async setCategories() {
    const response = await fetch(
      "https://fakestoreapi.com/products/categories"
    );
    const categories = (await response.json()) as Array<string>;
    this.categories = categories.map((c, i) => ({ id: i, name: c }));
  }
  private get isEdit() {
    return !!this.product.id;
  }
  private async submit() {
    this.$v.$touch();
    if (this.$v.product.$invalid) return;
    this.isEdit ? this.update() : this.store();
    this.$router.push({ name: RouteNames.products });
  }
  private async update() {
    // Casting to existing model since we verified model has id
    const storedProduct = this.product as ModelTypes.Product;
    await helpers.models.product.update(storedProduct);
    this.$store.dispatch(ActionTypes.products.UPDATE_PRODUCT, storedProduct);
  }
  private async store() {
    await helpers.models.product.store(this.product);
    // Since api is returning 1 as ID
    this.product.id =
      this.$store.state.products.all.reduce(
        (maxId, { id }) => Math.max(maxId, id),
        0
      ) + 1;
    // Casting to existing model since we just set model id
    const storedProduct = this.product as ModelTypes.Product;
    this.$store.dispatch(ActionTypes.products.STORE_PRODUCT, storedProduct);
  }
  private set category(value: Array<{ id: number; name: string }>) {
    this.product.category = value.length === 0 ? "" : value[0].name;
  }
  private get category() {
    return [
      {
        id: this.categories.findIndex((c) => c.name === this.product.category),
        name: this.product.category,
      },
    ];
  }
  private created() {
    this.setCategories();
    this.setProduct();
  }
}
</script>
