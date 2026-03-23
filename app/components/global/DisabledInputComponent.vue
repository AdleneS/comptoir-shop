<script setup lang="ts">
const { t } = useI18n();
const props = defineProps({
  titleKey: {
    type: String,
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <p class="mb-2 flex-1 min-w-[10rem] flex flex-col gap-2">
    <strong class="text-gray-500">{{ t(`${titleKey}`) }}:</strong>
    <input
      :value="data"
      type="text"
      readonly
      disabled
      class="border border-gray-300 rounded-2xl px-2 py-1 w-full font-medium shadow-inner bg-gray-100"
    />
  </p>
</template>
