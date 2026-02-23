<script setup lang="ts">
const { t } = useI18n();
const supabase = useSupabaseClient();
const auth = useAuth();
const user = auth.user;
const currentTab = ref(1);

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
  <div
    class="pt-48 h-screen w-full px-4 md:w-1/2 md:px-0 flex flex-col gap-4 items-center"
  >
    <div class="flex whitespace-nowrap justify-center gap-4 mb-4 w-full">
      <h3
        :class="{ active: currentTab === 1 }"
        class="flex-1 text-xl font-bold p-2 border rounded-lg border-gray-300 hover:bg-gray-200 cursor-pointer"
        @click="currentTab = 1"
      >
        {{ t("pages.account.informationSection.title") }}
      </h3>
      <h3
        :class="{ active: currentTab === 2 }"
        class="flex-1 text-xl font-bold p-2 border rounded-lg border-gray-300 hover:bg-gray-200 cursor-pointer"
        @click="currentTab = 2"
      >
        {{ t("pages.account.ordersSection.title") }}
      </h3>
    </div>
    <div
      class="bg-white rounded-lg border border-gray-300 px-4 h-fit py-2 w-full"
    >
      <div v-if="currentTab === 1" class="w-full flex flex-col gap-4">
        <div class="flex gap-4 flex-wrap">
          <p class="mb-2 flex-1 min-w-[10rem]">
            <strong
              >{{ t("pages.account.informationSection.firstName") }}:</strong
            >
            <input
              v-model="data.first_name"
              type="text"
              readonly
              disabled
              class="border border-gray-300 rounded px-2 py-1 w-full"
            />
          </p>

          <p class="mb-2 flex-1 min-w-[10rem]">
            <strong
              >{{ t("pages.account.informationSection.lastName") }}:</strong
            >
            <input
              v-model="data.last_name"
              type="text"
              readonly
              disabled
              class="border border-gray-300 rounded px-2 py-1 w-full"
            />
          </p>
          <p class="mb-2 flex-1 min-w-[10rem]">
            <strong>{{ t("pages.account.informationSection.email") }}:</strong>
            <input
              v-model="data.email"
              type="text"
              readonly
              disabled
              class="border border-gray-300 rounded px-2 py-1 w-full"
            />
          </p>
        </div>
        <div class="flex items-center gap-4">
          <button
            class="p-2 px-3 text-black hover:bg-amber-500 bg-amber-300 rounded"
            @click="
              () => {
                return navigateTo('/login/update-password');
              }
            "
          >
            {{ t("pages.account.informationSection.updatePasswordButton") }}
          </button>
        </div>
        <button
          class="h-fit p-2 px-3 text-black hover:bg-amber-500 bg-amber-300 rounded"
          @click="
            async () => {
              await supabase.auth.signOut();
              return navigateTo('/login');
            }
          "
        >
          {{ t("pages.account.logoutButton") }}
        </button>
      </div>
      <div v-else-if="currentTab === 2">
        <h2 class="text-2xl font-bold mb-4">
          {{ t("pages.account.ordersSection.title") }}
        </h2>
        <p>{{ t("pages.account.ordersSection.noOrders") }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.active {
  background-color: #ffdc41;
}
</style>
