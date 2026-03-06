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
  layout: "half",
});

// Charger le panier au montage
onMounted(async () => {
  try {
    await loadCart();
    console.log(cart);
  } finally {
    loading.value = false;
  }
});

const checkout = () => {
  // Redirection vers la page de paiement
  navigateTo("/checkout");
};
</script>

<template>
  <div class="cart-page">
    <h1>Mon Panier</h1>

    <div v-if="loading" class="loading">Chargement...</div>

    <div v-else-if="cart.length === 0" class="empty-cart">
      Votre panier est vide
    </div>

    <div v-else class="cart-items">
      <div v-for="item in cart" :key="item.sku_id" class="cart-item">
        <div class="item-info">
          <h3>{{ item.name }}</h3>
          <p>{{ item.slug }}</p>
          <p>Prix: {{ item.price }}€</p>
        </div>

        <div class="item-controls">
          <button @click="updateQuantity(item.sku_id, item.quantity - 1)">
            -
          </button>
          <span>{{ item.quantity }}</span>
          <button @click="updateQuantity(item.sku_id, item.quantity + 1)">
            +
          </button>
          <button @click="removeFromCart(item.sku_id)">Retirer</button>
        </div>

        <div class="item-total">
          {{ (item.price * item.quantity).toFixed(2) }}€
        </div>
      </div>

      <div class="cart-summary">
        <h2>Total: {{ totalPrice.toFixed(2) }}€</h2>
        <p>Articles: {{ totalItems }}</p>
        <button @click="checkout">Procéder au paiement</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #eee;
  margin-bottom: 10px;
}

.item-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.item-controls button {
  padding: 5px 10px;
}

.cart-summary {
  margin-top: 30px;
  padding: 20px;
  border-top: 2px solid #eee;
  text-align: right;
}

.loading,
.empty-cart {
  text-align: center;
  padding: 40px;
}
</style>
