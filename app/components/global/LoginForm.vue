<script setup lang="ts">
const { t } = useI18n();
const supabase = useSupabaseClient();

const email = ref("");
const password = ref("");
const inputError = ref<string | null>(null);

const handleAuth = async () => {
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });
  if (error) {
    inputError.value = error.message;
    console.error("Error signing in:", error);
  } else {
    inputError.value = null;
    console.log("Sign in successful:", email.value);
    navigateTo("/");
  }
};
</script>

<template>
  <form class="space-y-4 flex flex-col w-full" @submit.prevent="handleAuth">
    <input
      v-model="email"
      type="email"
      :placeholder="t('pages.login.emailPlaceholder')"
      class="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-300"
      required
    />
    <input
      v-model="password"
      type="password"
      :placeholder="t('pages.login.passwordPlaceholder')"
      class="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-300"
      required
    />
    <div v-if="inputError" class="text-red-500">
      {{ t("pages.login.credentialsError") }}
    </div>
    <button
      type="submit"
      class="w-full bg-amber-300 text-black py-2 px-4 font-medium hover:bg-amber-500 transition"
    >
      {{ t("pages.login.signUpButton") }}
    </button>
  </form>
</template>
