<script setup lang="ts">
const supabase = useSupabaseClient();
const config = useRuntimeConfig();
const { t } = useI18n();
const videoUrl = ref<string | null>(null);
const loaded = ref(false);

onMounted(() => {
  // simule "lazy load" après que le DOM est prêt
  const url = supabase.storage
    .from(config.public.supabaseAssetsBucketName)
    .getPublicUrl("hero.mp4").data.publicUrl;
  videoUrl.value = url;
});
</script>

<template>
  <div class="flex justify-center items-center overflow-y-hidden h-screen">
    <div v-if="!loaded" class="w-full h-full bg-black absolute" />

    <video
      v-if="videoUrl"
      autoplay
      loop="true"
      muted
      class="w-full h-full object-cover absolute -z-10"
      type="video/mp4"
      :src="videoUrl"
      @canplay="loaded = true"
    />
    <div class="flex flex-col items-center gap-4 text-white text-4xl">
      <div>C LOGO</div>
      <div class="font-extralight">
        {{ t("pages.index.heroSection.title") }}
      </div>
    </div>
    <div class="w-full h-16 absolute bottom-0" />
  </div>
</template>
