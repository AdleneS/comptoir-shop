<script setup lang="ts">
const { t } = useI18n();
</script>
<template>
  <div class="overflow-auto h-screen">
    <NavBar />
    <main class="pt-48 w-full px-4 flex flex-col gap-4 items-center h-screen">
      <slot />
    </main>
    <footer
      class="bg-neutral-900 dark:text-300 py-20 text-center text-sm text-gray-500 dark:text-gray-400 w-full"
    >
      <p>© {{ new Date().getFullYear() }} - {{ $t("site.name") }}</p>
    </footer>
  </div>
</template>
