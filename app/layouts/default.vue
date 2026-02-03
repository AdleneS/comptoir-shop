<script setup lang="ts">
const { t } = useI18n();
</script>
<template>
  <div>
    <NavBar />
    <main class="flex min-h-64 w-full justify-center">
      <slot />
    </main>
    <footer
      class="dark:text-300 py-20 text-center text-sm text-gray-500 dark:text-gray-400"
    >
      <p>© {{ new Date().getFullYear() }} - {{ $t("site.name") }}</p>
    </footer>
  </div>
</template>
<style lang="postcss">
ul .router-link-exact-active {
  @apply bg-gray-200 text-gray-700 border-green-300 dark:bg-gray-200 dark:text-black;
}
</style>
