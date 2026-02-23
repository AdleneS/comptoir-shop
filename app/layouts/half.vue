<script setup lang="ts">
const { t } = useI18n();
const supabase = useSupabaseClient();
const config = useRuntimeConfig();
const halfImage = supabase.storage
  .from(config.public.supabaseAssetsBucketName)
  .getPublicUrl("half.jpg").data.publicUrl;
</script>
<template>
  <div class="flex h-screen flex-col items-center overflow-auto">
    <NavBar />
    <main
      class="relative h-full w-full flex items-center justify-center bg-gray-50"
    >
      <slot />
      <img :src="halfImage" class="w-1/2 h-full object-cover bg-gray-100" />
    </main>
    <footer
      class="w-full bg-neutral-900 dark:text-300 py-20 text-center text-sm text-gray-500 dark:text-gray-400"
    >
      <p>© {{ new Date().getFullYear() }} - {{ $t("site.name") }}</p>
    </footer>
  </div>
</template>
