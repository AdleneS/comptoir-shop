<script setup lang="ts">
const { t } = useI18n();
const supabase = useSupabase();
const config = useRuntimeConfig();
const { products, error } = await useGetProducts(supabase, config, 10);
</script>

<template>
  <div
    class="p-8 w-screen h-[calc(100vh-5rem)] bg-white items-center flex flex-col gap-8"
  >
    <h1 class="text-black flex gap-2">
      <span class="text-6xl font-greatVibes">
        {{ t("pages.collection.title1") }}
      </span>
      <span class="text-6xl font-bold font-dmSans mt-8">
        {{ t("pages.collection.title2") }}
      </span>
    </h1>
    <div class="flex flex-col w-full gap-8">
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
