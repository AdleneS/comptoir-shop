<script setup lang="ts">
const { t } = useI18n();

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
});
</script>
<template>
  <div class="w-1/2 p-8 h-full flex flex-col items-center justify-center">
    <h1 class="text-3xl font-bold text-gray-900 mb-2 uppercase">
      {{ t("pages.login.meta.title") }}
    </h1>
    <div class="w-full max-w-md">
      <LoginForm />
      <button
        class="w-full mt-4 bg-amber-300 text-black py-2 px-4 font-medium hover:bg-amber-500 transition"
      >
        {{ t("pages.login.signInButton") }}
      </button>
      <a
        class="text-sm text-gray-600 cursor-pointer hover:underline"
        @click="navigateTo('/login/forget-password')"
      >
        {{ t("pages.login.forgetPassword") }}
      </a>
    </div>
  </div>
</template>
