<script setup lang="ts">
const { t } = useI18n();
const supabase = useSupabase();
const config = useRuntimeConfig();
async function getProducts() {
  const { data: products, error } = await supabase
    .from("products")
    .select()
    .limit(4);

  if (products) {
    await Promise.all(
      products.map(async (product) => {
        const { data, error } = await supabase.storage
          .from(config.public.supabaseBucketName)
          .createSignedUrl(`products/${product.id}/photo1.png`, 3600);

        if (!error && data) {
          product.imageUrl = data.signedUrl;
        }
      }),
    );
  }

  return { products, error };
}

const { products, error } = await getProducts();
console.log(products);
</script>
<template>
  <div class="p-8 w-screen bg-white items-center flex flex-col gap-8">
    <h1 class="text-4xl font-bold text-black">
      {{ t("productSection.title") }}
    </h1>
    <div class="flex w-full gap-8">
      <div
        v-for="product in products"
        :key="product.id"
        class="w-[30rem] h-[40rem] bg-gray-100 flex flex-col"
      >
        <img
          v-if="product.id"
          :src="product.imageUrl"
          alt="Product Image"
          class="w-full h-[80%] object-contain flex-1"
        />
        <div class="p-4">
          <h2 class="text-2xl font-bold text-black">{{ product.name }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>
