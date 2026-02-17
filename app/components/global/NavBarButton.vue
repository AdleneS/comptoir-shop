<script setup lang="ts">
const props = defineProps({
  link: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});
const { t } = useI18n();
</script>

<template>
  <NuxtLink class="p-2 px-3 hover:underline text-white" :to="props.link"
    >{{ t(`pages.${props.label}.link`) }}
  </NuxtLink>
</template>
