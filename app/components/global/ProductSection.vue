<script setup lang="ts">
const { t } = useI18n();
const { getFeaturedProducts } = useCatalog();
const { data: featured } = await useAsyncData(
  "featured-products",
  getFeaturedProducts,
);
</script>
<template>
  <div class="p-8 w-screen bg-white items-center flex flex-col gap-8">
    <h1 class="text-black flex gap-2">
      <span class="text-6xl font-greatVibes">
        {{ t("pages.index.productSection.title1") }}
      </span>
      <span class="text-6xl font-bold font-dmSans mt-8">
        {{ t("pages.index.productSection.title2") }}
      </span>
    </h1>

    <div class="flex flex-wrap justify-center gap-8">
      <ProductCard
        v-for="product in featured"
        :key="product.id"
        :product="product"
      />
    </div>
    <NuxtLink
      to="/collection"
      class="ml-auto text-black hover:underline text-lg font-medium italic flex items-center hover:scale-110 transition-transform duration-200"
    >
      {{ t("pages.index.productSection.viewAll") }}
      <Icon name="material-symbols:arrow-right-alt" class="ml-2" />
    </NuxtLink>
  </div>
</template>
