<script setup lang="ts">
const { t } = useI18n();
const route = useRoute();
const { getProductBySlug } = useProducts();
const activeImage = ref("");
useHead({
  title: t("pages.product.meta.title"),
  meta: [{ name: "description", content: t("pages.product.meta.description") }],
});
useSeoMeta({
  title: t("pages.product.meta.title"),
  description: t("pages.product.meta.description"),
});
definePageMeta({
  layout: "default",
});

const { data: product } = await useAsyncData(
  `product-${route.params.slug}`,
  () => getProductBySlug(route.params.slug as string),
);
activeImage.value = product.value?.images[0] || "";
console.log(product);
</script>
<template>
  <div class="p-8 pt-48 w-screen h-screen bg-white flex gap-8 justify-center">
    <div class="w-1/2 flex flex-col items-center justify-center">
      <div class="w-2/3 h-full flex flex-col bg-white p-4">
        <div class="flex flex-wrap gap-2 w-full pt-4 mb-4">
          <img
            v-for="(image, index) in product?.images"
            :key="index"
            :src="image"
            class="w-24 h-24 bg-white border border-gray-300 object-cover hover:border-black hover:scale-105 cursor-pointer p-2"
            @click="activeImage = image"
          />
        </div>
        <img
          :src="activeImage"
          :alt="product.name"
          class="w-full object-contain min-h-96 mb-4 border-t border-gray-300 pt-4"
        />
      </div>
    </div>
    <div class="bg-white border-l border-gray-300 w-1/2 p-8 flex flex-col">
      <div class="flex flex-col gap-4">
        <h1 class="text-4xl font-bold mb-4">{{ product.name }}</h1>
        <p class="text-lg mb-6">{{ product.description }}</p>
        <p class="text-2xl font-semibold">{{ product.skus[0].price }} €</p>
        <button
          class="bg-amber-300 hover:bg-amber-500 text-black font-bold py-2 px-4 rounded"
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  </div>
</template>
