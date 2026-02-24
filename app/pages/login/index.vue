<script setup lang="ts">
const { t } = useI18n();
const supabase = useSupabaseClient();
const config = useRuntimeConfig();

useHead({
  title: t("pages.login.meta.title"),
  meta: [{ name: "description", content: t("pages.login.meta.description") }],
});
useSeoMeta({
  title: t("pages.login.meta.title"),
  description: t("pages.index.meta.description"),
});
definePageMeta({
  layout: "half",
  middleware: "guest",
});

const halfImage = supabase.storage
  .from(config.public.supabaseAssetsBucketName)
  .getPublicUrl("half.jpg").data.publicUrl;
</script>
<template>
  <div class="w-1/2 p-8 h-screen flex flex-col items-center justify-center">
    <h1 class="text-3xl font-bold text-gray-900 mb-2 uppercase">
      {{ t("pages.login.meta.title") }}
    </h1>
    <div class="w-full max-w-md">
      <LoginForm />
      <button
        class="w-full mt-4 bg-amber-300 text-black py-2 px-4 font-medium hover:bg-amber-500 transition"
        @click="navigateTo('login/create-account')"
      >
        {{ t("pages.login.index.signInButton") }}
      </button>
      <a
        class="text-sm text-gray-600 cursor-pointer hover:underline mt-4 block w-fit"
        @click="navigateTo('/login/forget-password')"
      >
        {{ t("pages.login.index.forgetPassword") }}
      </a>
    </div>
  </div>
  <img :src="halfImage" class="w-1/2 h-screen object-cover bg-gray-100" />
</template>
