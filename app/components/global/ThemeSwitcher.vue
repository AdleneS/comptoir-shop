<script setup>
const colorMode = useColorMode();
const themeConfig = {
  dark: { next: "light", icon: "ph:moon" },
  light: { next: "dark", icon: "ph:sun" },
  // system: { next: "light", icon: "ph:sun-horizon" },
};

const name = ref(null);
const toggleColorMode = () => {
  const { next } = themeConfig[colorMode.preference];
  Object.assign(colorMode, { preference: next, value: next });
  name.value = themeConfig[next].icon;
};
onMounted(() => {
  name.value = themeConfig[colorMode.preference].icon;
});
</script>
<template>
  <ClientOnly>
    <button
      v-bind="$attrs"
      class="cursor-pointer flex w-10 h-10"
      aria-label="Toggle color modes"
      @click="toggleColorMode"
    >
      <Icon :name size="24" />
    </button>
  </ClientOnly>
</template>
