<script setup lang="ts">
const { t } = useI18n();
useHead({
  title: t("pages.index.meta.title"),
  meta: [{ name: "description", content: t("pages.index.meta.description") }],
});
useSeoMeta({
  title: t("pages.index.meta.title"),
  description: t("pages.index.meta.description"),
});
definePageMeta({
  layout: "default",
});
</script>
<template>
  <div class="justify-center">
    <section class="flex flex-col items-center mt-10" />
  </div>
</template>
