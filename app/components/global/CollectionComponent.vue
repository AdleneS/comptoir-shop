<script setup lang="ts">
const { t } = useI18n();
const { getProducts } = useCatalog();
const { data: products } = await useAsyncData("products-collection", () =>
  getProducts(1),
);
</script>

<template>
  <div
    class="p-8 w-screen h-[calc(100vh-5rem)] bg-white items-center flex flex-col gap-8"
  >
    <h1 class="text-black flex gap-2">
      <span class="text-6xl font-greatVibes">
        {{ t("pages.collection.title1") }}
      </span>
      <span class="text-6xl font-bold font-dmSans mt-8">
        {{ t("pages.collection.title2") }}
      </span>
    </h1>
    <div class="flex w-full gap-8">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>
