<script lang="ts" setup>
const { t } = useI18n();

const {
  cart,
  loadCart,
  updateQuantity,
  removeFromCart,
  totalPrice,
  totalItems,
} = useCart();
const loading = ref(true);

const { getImageUrl } = useProductImage();

useHead({
  title: t("pages.cart.meta.title"),
  meta: [
    {
      name: "description",
      content: t("pages.cart.meta.description"),
    },
  ],
});
useSeoMeta({
  title: t("pages.cart.meta.title"),
  description: t("pages.cart.meta.description"),
});
definePageMeta({
  layout: "default",
});

// Charger le panier au montage
onMounted(async () => {
  try {
    await loadCart();
  } finally {
    loading.value = false;
  }
});

const checkout = () => {
  // Redirection vers la page de paiement
  navigateTo("/checkout");
};

console.log(cart);
</script>

<template>
  <div class="w-full h-full flex flex-col items-center">
    <h1 v-if="cart.length !== 0 && !loading" class="text-black flex gap-2">
      <span class="text-6xl font-greatVibes">
        {{ t("pages.cart.title1") }}
      </span>
      <span class="text-6xl font-bold font-dmSans mt-8">
        {{ t("pages.cart.title2") }}
      </span>
    </h1>

    <div class="mt-32" v-if="loading">
      <Icon class="h-20 w-20" name="svg-spinners:bars-scale-fade"></Icon>
    </div>

    <div
      class="w-full h-[30rem] flex flex-col gap-8 m-auto justify-center items-center text-4xl text-bold"
      v-else-if="cart.length === 0"
    >
      <span>Votre panier est vide</span>
      <NuxtLink
        to="/collection"
        class="text-black hover:underline text-lg font-medium italic flex items-center hover:scale-110 transition-transform duration-200"
      >
        {{ t("pages.index.productSection.viewAll") }}
        <Icon name="material-symbols:arrow-right-alt" class="ml-2" />
      </NuxtLink>
    </div>

    <div v-else class="flex w-full h-full mt-12 gap-8">
      <div class="flex flex-col gap-8 w-1/2 border-r border-gray-300 p-4">
        <div
          v-for="(item, i) in cart"
          :key="item.sku_id"
          class="flex flex-col gap-8"
          :class="{ 'border-t border-gray-300': i > 0 }"
        >
          <div class="flex gap-8 p-4 items-center w-full">
            <img
              :src="getImageUrl(item.slug)"
              alt="Product Image"
              class="w-1/3 object-contain"
            />
            <div>
              <span
                class="w-full flex items-center justify-center text-4xl text-black"
                >{{ item.name }}</span
              >
              <span class="w-full flex text-3xl text-black"
                >{{ t("pages.cart.size") }}
                <span class="font-bold ml-2">
                  {{ getSizeLabelFromItem(item) }}</span
                ></span
              >
              <span class="text-3xl">{{ item.price }}€</span>
              <div class="flex h-[5rem] items-center">
                <button
                  class="bg-zinc-200 text-black rounded h-[3rem] w-[3rem] text-center font-bold text-3xl"
                  @click="updateQuantity(item.sku_id, item.quantity - 1)"
                >
                  -
                </button>
                <span class="m-4 text-3xl font-extrabold">{{
                  item.quantity
                }}</span>
                <button
                  class="bg-amber-400 text-black h-[3rem] w-[3rem] text-center rounded mr-2 font-bold text-3xl"
                  @click="updateQuantity(item.sku_id, item.quantity + 1)"
                >
                  +
                </button>
                <button
                  class="flex items-centers"
                  @click="removeFromCart(item.sku_id)"
                >
                  <Icon
                    name="mdi:cross-circle-outline"
                    class="text-red-500 h-[2rem] w-[2rem]"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="w-1/2 flex flex-col gap-8 p-4 h-fit sticky top-[10rem]">
        <div class="flex items-center justify-between">
          <h2 class="text-3xl text-bold">
            {{ t("pages.cart.articles") }}
            <span class="text-4xl font-black"> {{ totalItems }}</span>
          </h2>
          <h2 class="text-4xl text-bold">
            {{ t("pages.cart.totalPrice") }}
            <span class="text-4xl font-black">
              {{ totalPrice.toFixed(2) }}€</span
            >
          </h2>
        </div>

        <button
          class="bg-amber-300 hover:bg-amber-500 text-black font-bold py-2 px-4 rounded w-full"
          @click="checkout"
        >
          {{ t("pages.cart.checkoutButton") }}
        </button>
      </div>
    </div>
  </div>
</template>
