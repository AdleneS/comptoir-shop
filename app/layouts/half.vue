<script setup lang="ts">
const { t } = useI18n();
</script>
<template>
  <div class="flex h-screen flex-col items-center overflow-auto">
    <NavBar />
    <main class="relative w-full flex bg-gray-50">
      <slot />
    </main>
    <footer
      class="w-full bg-neutral-900 dark:text-300 py-20 text-center text-sm text-gray-500 dark:text-gray-400"
    >
      <p>© {{ new Date().getFullYear() }} - {{ $t("site.name") }}</p>
    </footer>
  </div>
</template>
