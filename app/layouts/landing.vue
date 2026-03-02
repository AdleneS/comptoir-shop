<script setup lang="ts">
const { t } = useI18n();
</script>
<template>
  <NavBar />
  <main class="w-full flex flex-col items-center h-full min-h-screen">
    <slot />
  </main>
  <footer
    class="bg-neutral-900 dark:text-300 py-20 text-center text-sm text-gray-500 dark:text-gray-400"
  >
    <p>© {{ new Date().getFullYear() }} - {{ $t("site.name") }}</p>
  </footer>
</template>
