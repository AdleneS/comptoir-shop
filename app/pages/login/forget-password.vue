<script setup lang="ts">
const { t } = useI18n();
const supabase = useSupabaseClient();
const config = useRuntimeConfig();

useHead({
  title: t("pages.login.forgetPassword.meta.title"),
  meta: [
    {
      name: "description",
      content: t("pages.login.forgetPassword.meta.description"),
    },
  ],
});
useSeoMeta({
  title: t("pages.login.forgetPassword.meta.title"),
  description: t("pages.login.forgetPassword.meta.description"),
});
definePageMeta({
  layout: "half",
});

const halfImage = supabase.storage
  .from(config.public.supabaseAssetsBucketName)
  .getPublicUrl("half.jpg").data.publicUrl;

const resetEmail = ref("");
const passwordResetSuccess = ref(false);

const handleResetPassword = async () => {
  console.log("awdawd");
  const { data, error } = await supabase.auth.resetPasswordForEmail(
    resetEmail.value,
    {
      redirectTo: "https://localhost:3000/update-password",
    },
  );
  if (error) {
    console.error("Error resetting password:", error);
  } else {
    passwordResetSuccess.value = true;
  }
};
</script>

<template>
  <div class="w-1/2 p-8 h-full flex flex-col items-center justify-center">
    <div class="w-full max-w-md">
      <p class="text-gray-600 mb-4">
        {{ t("pages.login.forgetPassword.resetPasswordDescription") }}
      </p>
      <form
        class="space-y-4 flex flex-col"
        @submit.prevent="handleResetPassword"
      >
        <input
          v-model="resetEmail"
          type="email"
          :placeholder="t('placeholders.emailPlaceholder')"
          class="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        />
        <button
          type="submit"
          class="w-full mt-4 bg-amber-300 text-black py-2 px-4 font-medium hover:bg-amber-500 transition"
        >
          {{ t("pages.login.forgetPassword.resetPasswordButton") }}
        </button>
        <span v-if="passwordResetSuccess" class="text-green-600 mt-2">{{
          t("pages.login.forgetPassword.resetPasswordSuccess")
        }}</span>
        <a
          class="text-sm text-gray-600 cursor-pointer hover:underline mt-4"
          @click="navigateTo('/login')"
        >
          >
          {{ t("pages.login.forgetPassword.backToLogin") }}
        </a>
      </form>
    </div>
  </div>
  <img :src="halfImage" class="w-1/2 h-screen object-cover bg-gray-100" />
</template>
