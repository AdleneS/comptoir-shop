<script setup lang="ts">
const { t } = useI18n();
const supabase = useSupabaseClient();

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const firstname = ref("");
const lastname = ref("");
const inputError = ref<string | null>(null);

useHead({
  title: t("pages.login.createAccount.meta.title"),
  meta: [
    {
      name: "description",
      content: t("pages.login.createAccount.meta.description"),
    },
  ],
});
useSeoMeta({
  title: t("pages.login.createAccount.meta.title"),
  description: t("pages.login.createAccount.meta.description"),
});
definePageMeta({
  layout: "default",
});

const handleCreateAccount = async () => {
  if (password.value !== confirmPassword.value) {
    inputError.value = t("pages.login.passwordMismatch");
    return;
  }
  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  });
  if (error) {
    inputError.value = error.message;
    console.error("Error signing in:", error);
  } else {
    inputError.value = null;
    console.log("Sign up successful:", email.value);
  }
};
</script>

<template>
  <h1 class="text-3xl font-bold text-gray-900 mb-2 uppercase">
    {{ t("pages.login.createAccount.meta.title") }}
  </h1>
  <div class="flex flex-cols w-full md:w-1/2 p-4">
    <form
      class="space-y-4 flex flex-col w-full"
      @submit.prevent="handleCreateAccount"
    >
      <!-- <div class="flex gap-4 flex-wrap">
        <input
          v-model="firstname"
          type="text"
          :placeholder="t('placeholders.firstnamePlaceholder')"
          class="flex-1 px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-300"
          required
        />
        <input
          v-model="lastname"
          type="text"
          :placeholder="t('placeholders.lastnamePlaceholder')"
          class="flex-1 px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-300"
          required
        />
      </div> -->
      <input
        v-model="email"
        type="email"
        :placeholder="t('placeholders.emailPlaceholder')"
        class="flex-1 px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-300"
        required
      />
      <div class="flex gap-4 flex-wrap">
        <input
          v-model="password"
          type="password"
          :placeholder="t('placeholders.passwordPlaceholder')"
          class="flex-1 px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-300"
          required
        />
        <input
          v-model="confirmPassword"
          type="password"
          :placeholder="t('placeholders.confirmPasswordPlaceholder')"
          class="flex-1 px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-300"
          required
        />
      </div>
      <div v-if="inputError" class="text-red-500">
        {{ inputError }}
      </div>
      <button
        type="submit"
        class="w-full bg-amber-300 text-black py-2 px-4 font-medium hover:bg-amber-500 transition"
      >
        {{ t("pages.login.createAccount.createAccountButton") }}
      </button>
    </form>
  </div>
</template>
