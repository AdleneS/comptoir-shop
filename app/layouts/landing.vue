<script setup lang="ts">
const { t } = useI18n();
</script>
<template>
  <div class="overflow-auto flex flex-col items-center">
    <NavBar />
    <main class="relative h-screen flex flex-col w-full">
      <slot />
      <footer
        class="bg-neutral-900 dark:text-300 py-20 text-center text-sm text-gray-500 dark:text-gray-400"
      >
        <p>© {{ new Date().getFullYear() }} - {{ $t("site.name") }}</p>
      </footer>
    </main>
  </div>
</template>
