<script setup lang="ts">
const { t } = useI18n();
const { isLoggedIn } = useAuth();
const supabase = useSupabaseClient();
const config = useRuntimeConfig();
const { totalItems } = useCart();
const logoUrl = supabase.storage
  .from(config.public.supabaseAssetsBucketName)
  .getPublicUrl("logo.svg").data.publicUrl;
</script>
<template>
  <nav
    class="left-[50%] translate-x-[-50%] text-white mt-4 p-3 py-5 backdrop-blur-lg rounded-2xl flex justify-between bg-[#000b] fixed w-1/2 top-0 z-10"
    :class="t('locale.dir') === 'rtl' ? 'flex-row-reverse' : 'flex-row'"
  >
    <ul class="flex justify-center items-center align-middle gap-2">
      <li class="mr-24">
        <img
          class="w-[5rem] absolute left-4 top-[1.3rem]"
          :src="logoUrl"
          alt="Comptoir Logo"
        />
      </li>
      <li>
        <NavBarButton link="/" label="index" />
      </li>
      <li>
        <NavBarButton link="/collection" label="collection" />
      </li>
    </ul>
    <div
      class="flex justify-center items-center font-black text-4xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      CDLP
    </div>
    <ul class="flex justify-end items-center align-middle gap-2">
      <!-- <ThemeSwitcher class="rounded-lg hover:bg-gray-100 p-2 text-white" /> -->

      <li>
        <NavBarButton link="https://press.comptoir.com" label="press" />
      </li>
      <li v-if="!isLoggedIn">
        <NavBarButton link="/login" label="login" />
      </li>
      <li v-if="isLoggedIn">
        <NavBarButton link="/account" label="account" />
      </li>
      <li>
        <LanguageSelector />
      </li>
      <li class="flex">
        <NuxtLink class="flex" to="/cart">
          <Icon name="material-symbols:shopping-cart" size="32" />
        </NuxtLink>
        <span v-if="totalItems > 0" class="text-sm font-bold">{{
          totalItems
        }}</span>
      </li>
    </ul>
  </nav>
</template>

<style lang="postcss">
ul .router-link-exact-active {
  @apply underline;
}
</style>
