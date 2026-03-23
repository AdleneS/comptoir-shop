<script setup lang="ts">
const { t } = useI18n();
const supabase = useSupabaseClient();
const auth = useAuth();
const user = auth.user;
const currentTab = ref(1);
const data = ref<any>(null);
const isAddressModalOpen = ref(false);

const fetchUserData = async () => {
  try {
    const { data: userData } = await supabase
      .from("profiles")
      .select(
        `
      *,
      addresses (
        id,
        user_id,
        title,
        address_line_1,
        address_line_2,
        country,
        city,
        postal_code,
        phone_number
      )
    `,
      )
      .eq("id", user.value.id)
      .maybeSingle();

    data.value = userData;
    console.log(userData);
  } catch (error) {
    navigateTo("/");
    console.error("Error fetching profile:", error);
  }
};

await fetchUserData();

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
  middleware: "auth",
});
</script>

<template>
  <div
    class="w-full px-4 md:w-1/2 md:px-0 flex flex-col gap-4 items-center mt-4"
  >
    <div class="flex whitespace-nowrap justify-center gap-4 mb-8 w-full">
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
    <div class="bg-white rounded-lg h-fit w-full">
      <div v-if="currentTab === 1" class="w-full flex flex-col gap-4">
        <div class="flex gap-4 flex-wrap mb-4 border-b border-gray-200 pb-4">
          <DisabledInputComponent
            title-key="pages.account.informationSection.firstName"
            :data="data.first_name"
          />
          <DisabledInputComponent
            title-key="pages.account.informationSection.lastName"
            :data="data.last_name"
          />
          <DisabledInputComponent
            title-key="pages.account.informationSection.email"
            :data="data.email"
          />
        </div>
        <div v-if="!data.addresses">
          <button
            class="h-fit p-2 px-3 text-black hover:bg-amber-500 bg-amber-300 rounded-xl"
            @click="isAddressModalOpen = true"
          >
            Ajouter une adresse
          </button>
        </div>

        <div
          class="border-b border-gray-200 grid grid-cols-1 xl:grid-cols-2 gap-4 mb-4 pb-4"
          v-else
        >
          <DisabledInputComponent
            title-key="pages.account.informationSection.address1"
            :data="data.addresses.address_line_1"
          />
          <DisabledInputComponent
            title-key="pages.account.informationSection.address2"
            :data="data.addresses.addresses_line_2"
          />
          <DisabledInputComponent
            title-key="pages.account.informationSection.city"
            :data="data.addresses.city"
          />
          <DisabledInputComponent
            title-key="pages.account.informationSection.postalCode"
            :data="data.addresses.postal_code"
          />
          <DisabledInputComponent
            title-key="pages.account.informationSection.country"
            :data="data.addresses.country"
          />
          <button
            class="w-full h-fit p-2 px-3 text-black hover:bg-amber-500 bg-amber-300 rounded xl:col-span-2"
            @click="isAddressModalOpen = true"
          >
            Modifier mon adresse
          </button>

          <!-- <button
            class="h-fit p-2 px-3 text-black hover:bg-amber-500 bg-amber-300 rounded"
            @click="isAddressModalOpen = true"
          >
            Ajouter une autre adresse
          </button> -->
        </div>

        <!-- 🔥 MODAL -->
        <AddressComponent
          v-model="isAddressModalOpen"
          @created="fetchUserData"
        />
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
