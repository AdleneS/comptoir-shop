<script setup lang="ts">
const { t } = useI18n();
const { getProducts } = useCatalog();
const {
  data: products,
  pending,
  error,
} = await useAsyncData("products-collection", () => getProducts(1));
</script>

<template>
  <div class="flex flex-col gap-8 items-center container">
    <h1 class="text-black flex gap-2">
      <span class="text-6xl font-greatVibes">
        {{ t("pages.collection.title1") }}
      </span>
      <span class="text-6xl font-bold font-dmSans mt-8">
        {{ t("pages.collection.title2") }}
      </span>
    </h1>
    <div
      class="flex w-full h-full gap-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 m-auto"
    >
      <ProductCard
        v-if="!pending"
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>
