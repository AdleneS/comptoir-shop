<script setup lang="ts">
const { t } = useI18n();
</script>
<template>
  <div class="flex h-screen flex-col items-center overflow-auto">
    <NavBar />
    <main
      class="relative h-full w-full flex items-center justify-center bg-gray-50"
    >
      <slot />
      <div class="w-1/2 h-full bg-cover bg-center bg-gray-100" />
    </main>
    <footer
      class="w-full bg-neutral-900 dark:text-300 py-20 text-center text-sm text-gray-500 dark:text-gray-400"
    >
      <p>© {{ new Date().getFullYear() }} - {{ $t("site.name") }}</p>
    </footer>
  </div>
</template>
