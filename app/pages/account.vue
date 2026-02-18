<script setup lang="ts">
const { t } = useI18n();
const supabase = useSupabase();
const auth = useAuth();
const user = auth.user;
const { data } = await supabase
  .from("profiles")
  .select("*")
  .eq("id", user?.value?.id)
  .single();

useHead({
  title: t("pages.account.meta.title"),
  meta: [{ name: "description", content: t("pages.account.meta.description") }],
});
useSeoMeta({
  title: t("pages.account.meta.title"),
  description: t("pages.account.meta.description"),
});
definePageMeta({
  layout: "default",
  middleware: ["auth"],
});
</script>

<template>
  <div class="p-8 pt-48 h-screen flex gap-4 justify-center">
    <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
      <h1>{{ data?.first_name }}</h1>
      <h1>{{ data?.last_name }}</h1>
      <p>{{ data?.email }}</p>
      <button
        class="p-2 px-3 text-black hover:underline"
        @click="
          () => {
            supabase.auth.signOut();
            return navigateTo('/login');
          }
        "
      >
        {{ t("pages.account.logoutButton") }}
      </button>
    </div>
    <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">qwdwqd</div>
  </div>
</template>
