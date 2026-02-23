<script setup lang="ts">
const { t } = useI18n();
const supabase = useSupabase();
const newPassword = ref("");
const newPasswordCheck = ref("");

useHead({
  title: t("pages.updatePassword.meta.title"),
  meta: [
    {
      name: "description",
      content: t("pages.updatePassword.meta.description"),
    },
  ],
});
useSeoMeta({
  title: t("pages.updatePassword.meta.title"),
  description: t("pages.updatePassword.meta.description"),
});
definePageMeta({
  layout: "no-navbar",
  middleware: "auth",
});

const handleUpdatePassword = async () => {
  if (newPassword.value !== newPasswordCheck.value) {
    console.error("Passwords do not match");
    return;
  }
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword.value,
  });
  if (error) {
    console.error("Error updating password:", error);
  } else {
    navigateTo("/account");
  }
};
</script>

<template>
  <div class="flex flex-col h-screen w-screen items-center justify-center">
    <h1 class="text-2xl font-bold text-gray-900 mb-4 uppercase">
      {{ t("pages.updatePassword.meta.title") }}
    </h1>
    <form
      class="flex flex-col space-y-4 w-1/4"
      @submit.prevent="handleUpdatePassword"
    >
      <input
        v-model="newPassword"
        type="password"
        :placeholder="t('pages.updatePassword.newPasswordPlaceholder')"
        class="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
        required
      />
      <input
        v-model="newPasswordCheck"
        type="password"
        :placeholder="t('pages.updatePassword.confirmPasswordPlaceholder')"
        class="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
        required
      />
      <button
        type="submit"
        class="w-full mt-4 bg-amber-300 text-black py-2 px-4 font-medium hover:bg-amber-500 transition"
      >
        {{ t("pages.updatePassword.updateButton") }}
      </button>
    </form>
  </div>
</template>
