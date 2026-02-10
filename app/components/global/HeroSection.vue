<script setup lang="ts">
const supabase = useSupabase();
const config = useRuntimeConfig();

const { data, error } = await supabase.storage
  .from(config.public.supabaseBucketName)
  .createSignedUrl("assets/hero-video.mp4", 3600);
</script>

<template>
  <div
    class="flex justify-center items-center overflow-y-hidden h-[calc(100vh-5rem)]"
  >
    <video
      autoplay
      loop="true"
      muted
      class="w-full h-full object-cover absolute -z-10"
      type="video/mp4"
      :src="data?.signedUrl"
    />
    <div class="flex flex-col items-center gap-4 text-white text-4xl">
      <div>C LOGO</div>
      <div>LE COMPTOIR DE LA PRESSE</div>
    </div>
  </div>
</template>
