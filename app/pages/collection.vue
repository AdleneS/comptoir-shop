<script setup lang="ts">
const { t } = useI18n();
useHead({
  title: t("pages.collection.meta.title"),
  meta: [
    { name: "description", content: t("pages.collection.meta.description") },
  ],
});
useSeoMeta({
  title: t("pages.collection.meta.title"),
  description: t("pages.collection.meta.description"),
});
definePageMeta({
  layout: "default",
});
</script>
<template>
  <CollectionComponent />
</template>
