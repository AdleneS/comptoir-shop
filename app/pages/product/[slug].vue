<script setup lang="ts">
const { t } = useI18n();
const route = useRoute();
const { getProductBySlug } = useProducts();
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
</script>
<template>
  <div class="p-8 w-screen bg-white items-center flex flex-col gap-8">
    <p>{{ $route.params.group }} - {{ $route.params.id }}</p>
    {{ product }}
  </div>
</template>
