<script setup lang="ts">
const { t } = useI18n();
const supabase = useSupabase();
const config = useRuntimeConfig();

useHead({
  title: t("pages.index.meta.title"),
  meta: [{ name: "description", content: t("pages.index.meta.description") }],
});
useSeoMeta({
  title: t("pages.index.meta.title"),
  description: t("pages.index.meta.description"),
});
definePageMeta({
  layout: "default",
});

const { data, error } = await supabase.storage
  .from(config.public.supabaseBucketName)
  .createSignedUrl("assets/hero-video.mp4", 3600);
</script>
<template>
  <div class="justify-center w-full">
    <div class="overflow-y-hidden h-[calc(100vh-5rem)]">
      <video
        autoplay
        loop="true"
        muted
        class="w-full"
        type="video/mp4"
        :src="data?.signedUrl"
      />
    </div>
    <div class="w-screen h-screen bg-red-500">wdqwdwqd</div>
  </div>
</template>
