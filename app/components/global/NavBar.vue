<script setup lang="ts">
const { t } = useI18n();
const { isLoggedIn } = useAuth();
const supabase = useSupabase();
const config = useRuntimeConfig();

const { data, error } = await supabase.storage
  .from(config.public.supabaseBucketName)
  .createSignedUrl("assets/logo.svg", 3600);
</script>
<template>
  <nav
    class="text-white mt-4 p-3 py-5 backdrop-blur-lg rounded-2xl flex justify-between bg-[#000b] fixed w-1/2 top-0 z-10"
    :class="t('locale.dir') === 'rtl' ? 'flex-row-reverse' : 'flex-row'"
  >
    <ul class="flex justify-center items-center align-middle gap-2">
      <li class="mr-24">
        <img
          class="w-[5rem] absolute left-4 top-[1.3rem] revert"
          :src="data?.signedUrl"
          alt="Comptoir Logo"
        />
      </li>
      <li>
        <NavBarButton link="/" label="index" />
      </li>
      <li>
        <NavBarButton link="/collection" label="collection" />
      </li>
      <li>
        <NavBarButton link="https://press.comptoir.com" label="press" />
      </li>
    </ul>
    <div
      class="flex justify-center items-center font-black text-4xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      CDLP
    </div>
    <div class="flex justify-end">
      <div class="flex w-full items-center justify-center gap-2">
        <ThemeSwitcher class="rounded-lg hover:bg-gray-100 p-2 text-white" />
        <LanguageSelector />
        <div v-if="!isLoggedIn">
          <NavBarButton link="/login" label="login" />
        </div>
        <div v-if="isLoggedIn">
          <button
            class="p-2 px-3 text-white hover:underline"
            @click="() => supabase.auth.signOut()"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="postcss">
ul .router-link-exact-active {
  @apply underline;
}
</style>
