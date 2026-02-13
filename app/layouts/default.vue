<script setup lang="ts">
const { t } = useI18n();
</script>
<template>
  <div class="flex flex-col">
    <NavBar />
    <div
      class="overflow-auto relative h-[calc(100vh-5rem)] top-20 flex flex-col"
    >
      <main class="flex flex-col w-full justify-center">
        <slot />
      </main>
      <footer
        class="bg-neutral-900 dark:text-300 py-20 text-center text-sm text-gray-500 dark:text-gray-400"
      >
        <p>© {{ new Date().getFullYear() }} - {{ $t("site.name") }}</p>
      </footer>
    </div>
  </div>
</template>
