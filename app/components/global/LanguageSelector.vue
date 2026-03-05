<script setup lang="ts">
const { locale, t, availableLocales, setLocale } = useI18n();
const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

onMounted(() => {
  document.addEventListener("click", (event: MouseEvent) => {
    const target = event.target as Node;
    if (dropdownRef.value && !dropdownRef.value.contains(target)) {
      isOpen.value = false;
    }
  });
});

function switchLanguage(lang: string) {
  if (setLocale) {
    setLocale(lang);
  } else {
    locale.value = lang;
  }
  isOpen.value = false;
}
</script>

<template>
  <div ref="dropdownRef" class="w-auto">
    <button
      class="flex items-center gap-2 rounded-lg p-2 px-4 text-white hover:bg-zinc-900/30"
      @click="isOpen = !isOpen"
    >
      <span>{{ t("locale." + locale) }}</span>
      <Icon
        name="ph:caret-down"
        class="h-4 w-4 transition-all duration-200"
        :class="{ 'rotate-180': isOpen }"
      />
    </button>

    <div
      v-if="isOpen"
      class="absolute mt-1 min-w-32 rounded-lg bg-[#000b] shadow-lg right-[0.15rem] top-[4.8rem]"
    >
      <ul>
        <li
          v-for="lang in availableLocales"
          :key="lang"
          :class="[
            'px-4 py-2 cursor-pointer rounded-md hover:bg-zinc-800 hover:text-white ',
            { 'bg-amber-500 text-black': locale === lang },
            { 'text-right': t('locale.dir') === 'rtl' },
          ]"
          @click="switchLanguage(lang)"
        >
          <span class="block w-full cursor-pointer">{{
            t("locale." + lang)
          }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
