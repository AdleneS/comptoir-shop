<script setup lang="ts">
const { t } = useI18n();
const supabase = useSupabaseClient();
useHead({
  title: t("pages.forgetPassword.meta.title"),
  meta: [
    {
      name: "description",
      content: t("pages.forgetPassword.meta.description"),
    },
  ],
});
useSeoMeta({
  title: t("pages.forgetPassword.meta.title"),
  description: t("pages.forgetPassword.meta.description"),
});
definePageMeta({
  layout: "half",
});

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
        {{ t("pages.login.resetPasswordDescription") }}
      </p>
      <form
        class="space-y-4 flex flex-col"
        @submit.prevent="handleResetPassword"
      >
        <input
          v-model="resetEmail"
          type="email"
          :placeholder="t('pages.login.emailPlaceholder')"
          class="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
          required
        />
        <button
          type="submit"
          class="w-full mt-4 bg-amber-300 text-black py-2 px-4 font-medium hover:bg-amber-500 transition"
        >
          {{ t("pages.login.resetPasswordButton") }}
        </button>
        <span v-if="passwordResetSuccess" class="text-green-600 mt-2">{{
          t("pages.login.resetPasswordSuccess")
        }}</span>
        <a
          class="text-sm text-gray-600 cursor-pointer hover:underline mt-4"
          @click="navigateTo('/login')"
        >
          >
          {{ t("pages.login.backToLogin") }}
        </a>
      </form>
    </div>
  </div>
</template>
