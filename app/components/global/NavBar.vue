<script setup lang="ts">
const { t } = useI18n();
const { isLoggedIn } = useAuth();
const supabase = useSupabase();
</script>
<template>
  <nav
    class="p-3 py-5 flex justify-between bg-black dark:bg-white"
    :class="t('locale.dir') === 'rtl' ? 'flex-row-reverse' : 'flex-row'"
  >
    <ul class="flex justify-center items-center align-middle gap-2">
      <li>
        <NuxtLink
          class="p-2 px-3 hover:bg-gray-100 hover:dark:bg-slate-600 text-gray-700 dark:text-white hover:dark:text-white"
          to="/"
          >{{ t("pages.index.link") }}</NuxtLink
        >
      </li>
      <li>
        <NuxtLink
          class="rounded-md dark:bg-slate-700 p-2 px-3 hover:bg-gray-100 hover:dark:bg-slate-600 text-gray-700 dark:text-white hover:dark:text-white"
          to="/minimal"
        >
          {{ t("pages.new.link") }}
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          class="rounded-md dark:bg-slate-700 p-2 px-3 hover:bg-gray-100 hover:dark:bg-slate-600 text-gray-700 dark:text-white hover:dark:text-white"
          to="/minimal"
        >
          {{ t("pages.press.link") }}
        </NuxtLink>
      </li>
    </ul>
    <div class="flex justify-end">
      <div class="flex w-full items-center justify-center gap-2">
        <ThemeSwitcher
          class="rounded-lg hover:bg-gray-100 p-2 dark:hover:bg-slate-700 text-white dark:text-black"
        />
        <LanguageSelector />
        <div v-if="!isLoggedIn">
          <NuxtLink
            class="p-2 px-3 text-white dark:text-black hover:underline"
            to="/login"
          >
            {{ t("pages.login.link") }}
          </NuxtLink>
        </div>
        <div v-if="isLoggedIn">
          <button
            class="p-2 px-3 text-white dark:text-black hover:underline"
            @click="() => supabase.auth.signOut()"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
