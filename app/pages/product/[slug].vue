<script setup lang="ts">
const { t } = useI18n();
const route = useRoute();
const { getProductBySlug } = useProducts();
const activeImage = ref("");
const activeSize = ref("");
const activeColor = ref("");
const { addToCart } = useCart();

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

const { sizes } = useSizes(product);

activeImage.value = product.value?.images[0] || "";
activeSize.value = product.value?.skus[0].size.value || "";
activeColor.value = product.value?.skus[0].color.value || "";

const selectedSku = computed(() => {
  return product.value?.skus.find((sku) => {
    return (
      sku.size.value === activeSize.value
      // sku.color.value === activeColor.value
    );
  });
});
console.log(product);
</script>
<template>
  <div class="bg-white flex gap-8 justify-center w-full h-full">
    <div class="w-1/2 flex flex-col items-center justify-center">
      <div class="w-2/3 flex flex-col bg-white p-4">
        <div class="flex flex-wrap gap-2 w-full pt-4 mb-4">
          <img
            v-for="(image, index) in product?.images"
            :key="index"
            :src="image"
            :class="{ active: activeImage === image }"
            class="w-24 h-24 bg-white border border-2 rounded-md border-gray-300 object-cover hover:border-black hover:scale-105 cursor-pointer p-2"
            @click="activeImage = image"
          />
        </div>
        <img
          :src="activeImage"
          :alt="product.name"
          class="w-full object-contain border-t border-gray-300"
        />
      </div>
    </div>
    <div class="bg-white border-l border-gray-300 w-1/2 p-8 flex flex-col">
      <div class="flex flex-col gap-4">
        <h1 class="text-4xl font-bold mb-4">{{ product.name }}</h1>
        <p class="text-lg mb-6">{{ product.description }}</p>
        <div>
          <div class="mb-6 flex gap-8">
            <div
              v-for="size in sizes"
              :class="[
                'aspect-square w-[4rem] text-lg font-bold cursor-pointer p-4 flex justify-center items-center border border-gray-300',
                activeSize === size.value ? 'bg-amber-300' : 'bg-white',
                activeSize !== size.value ? 'hover:bg-gray-100' : '',
              ]"
              @click="activeSize = size.value"
            >
              {{ size.label }}
            </div>
          </div>
        </div>
        <p class="text-2xl font-semibold">{{ product.skus[0].price }} €</p>
        <button
          class="bg-amber-300 hover:bg-amber-500 text-black font-bold py-2 px-4 rounded"
          @click="addToCart(product, selectedSku, 1)"
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.active {
  border: 2px solid black;
  transform: scale(1.05);
}
</style>
