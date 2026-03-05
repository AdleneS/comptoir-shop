<script setup lang="ts">
const { t } = useI18n();
defineProps<{ product: { type: object; default: null } }>();
</script>
<template>
  <!-- <NuxtLink
    class="w-[30rem] h-[40rem] bg-transparent flex flex-col hover:scale-[105%] transition-transform duration-800"
    :to="`/product/${product.slug}`"
  >
    <img
      v-if="product.id"
      :src="product.image"
      alt="Product Image"
      class="w-full h-[80%] object-contain flex-1 border-4 rounded-xl border-black"
    />
    <h2 class="text-2xl font-bold text-black py-2">{{ product.name }}</h2>
  </NuxtLink> -->
  <NuxtLink
    :to="`/product/${product.slug}`"
    class="flex-1 relative w-full aspect-[4/5] border border-solid border-white/40 rounded-2xl overflow-hidden hover:scale-[101%] transition duration-100 shadow-[0_2px_5px_2px_rgba(0,0,0,0.25)]"
  >
    <div class="w-full h-full p-1 absolute bg-[#dddddd]">
      <div
        class="w-full h-full rounded-xl rounded-tr-[100px] rounded-br-[40px] bg-[#fff]"
      />
    </div>

    <div
      class="w-full h-full flex items-center justify-center relative backdrop-blur-lg rounded-2xl border border-solid border-white/20"
    >
      <div
        class="aspect-square w-3/4 rounded-full bg-gradient-to-tr from-white to-[#c1c1c1] animate-spin"
        style="animation-duration: 4s"
      />
    </div>

    <div class="p-2 w-full h-full flex justify-between absolute inset-0">
      <div
        class="p-2 pt-3 pb-1.5 flex flex-col rounded-xl backdrop-blur-lg bg-gray-50/10 text-black font-light"
      >
        <div class="w-full mt-auto flex items-center justify-center">
          <span class="text-4xl text-black">{{ product.name }}</span>
        </div>
        <img
          v-if="product.id"
          :src="product.image"
          alt="Product Image"
          class="w-full h-full object-contain flex-1"
        />
        <span class="text-2xl font-medium"> {{ product.skus[0]?.price }}€</span>
        <span class="text-xl text-black">{{ product.category.name }}</span>
      </div>
    </div>
  </NuxtLink>
</template>
