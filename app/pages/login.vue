<script setup lang="ts">
const { t } = useI18n();
const supabase = useSupabase();
useHead({
  title: t("pages.login.meta.title"),
  meta: [{ name: "description", content: t("pages.login.meta.description") }],
});
useSeoMeta({
  title: t("pages.login.meta.title"),
  description: t("pages.index.meta.description"),
});
definePageMeta({
  layout: "default",
});
const email = ref("");
const password = ref("");
const handleAuth = async () => {
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });
  if (error) {
    console.error("Error signing in:", error);
  } else {
    console.log("Sign in successful:", email.value);
  }
};
</script>
<template>
  <div class="flex h-screen w-screen">
    <!-- Left side - Auth Form -->
    <div class="w-1/2 flex flex-col items-center justify-center bg-gray-50 p-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2 uppercase">
          {{ t("pages.login.meta.title") }}
        </h1>
      </div>
      <div class="w-full max-w-md">
        <form class="space-y-4" @submit.prevent="handleAuth">
          <input
            v-model="email"
            type="email"
            :placeholder="t('pages.login.emailPlaceholder')"
            class="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
          <input
            v-model="password"
            type="password"
            :placeholder="t('pages.login.passwordPlaceholder')"
            class="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
          <button
            type="submit"
            class="w-full bg-blue-600 text-white py-2 px-4 font-medium hover:bg-blue-700 transition"
          >
            {{ t("pages.login.signUpButton") }}
          </button>
        </form>
        <button
          type="submit"
          class="w-full mt-4 bg-blue-600 text-white py-2 px-4 font-medium hover:bg-blue-700 transition"
        >
          {{ t("pages.login.signInButton") }}
        </button>
      </div>
    </div>

    <!-- Right side - Image -->
    <div
      class="w-1/2 bg-cover bg-center"
      style="background-image: url(&quot;/login-hero.jpg&quot;)"
    />
  </div>
</template>
