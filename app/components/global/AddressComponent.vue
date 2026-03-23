<script setup lang="ts">
const supabase = useSupabaseClient();
const searchTerm = ref("");
const suggestions = ref<any[]>([]);
const modelValue = defineModel<boolean>();
let debounceTimer: any = null;

const form = reactive({
  address_line_1: "",
  address_line_2: "",
  city: "",
  postal_code: "",
  country: "France",
});

const emit = defineEmits(["created"]);

const handleSubmit = async () => {
  const supabase = useSupabaseClient();
  const auth = useAuth();
  const user = auth.user;

  await supabase.from("addresses").upsert(
    {
      ...form,
      user_id: user.value.id,
    },
    { onConflict: "user_id" },
  );

  emit("created"); // 🔥 refresh côté parent
  modelValue.value = false;
};

function debounceSearch() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    searchAddresses();
  }, 300);
}

const searchAddresses = async () => {
  if (searchTerm.value.length < 3) {
    suggestions.value = [];
    return;
  }

  try {
    const response = await fetch(
      `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(searchTerm.value)}`,
    );
    const data = await response.json();

    suggestions.value = data.features.map((feature: any) => ({
      id: feature.properties.id,
      label: feature.properties.label,
      ...feature.properties,
    }));
  } catch (error) {
    console.error("Erreur de recherche:", error);
  }
};

const selectAddress = (suggestion: any) => {
  searchTerm.value = suggestion.label;
  suggestions.value = [];

  // 🔥 AUTO-FILL FORM
  form.address_line_1 = suggestion.name;
  form.city = suggestion.city;
  form.postal_code = suggestion.postcode;
};

onMounted(() => {
  document.querySelector("input")?.focus();
});
</script>

<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    @click.self="modelValue = false"
  >
    <div class="bg-white p-6 rounded-lg w-full max-w-md">
      <h2 class="text-xl font-bold mb-4">Ajouter une adresse</h2>

      <!-- 🔍 SEARCH -->
      <input
        v-model="searchTerm"
        @input="debounceSearch"
        placeholder="Rechercher une adresse..."
        class="w-full border p-2 rounded mb-8"
      />

      <!-- 📍 SUGGESTIONS -->
      <ul
        v-if="suggestions.length"
        class="border rounded mb-4 max-h-40 overflow-auto"
      >
        <li
          v-for="suggestion in suggestions"
          :key="suggestion.id"
          @click="selectAddress(suggestion)"
          class="p-2 hover:bg-gray-100 cursor-pointer"
        >
          {{ suggestion.label }}
        </li>
      </ul>

      <!-- 🧾 FORM -->
      <form @submit.prevent="handleSubmit">
        <input
          v-model="form.address_line_1"
          placeholder="Adresse"
          class="w-full border p-2 rounded mb-2"
        />
        <input
          v-model="form.address_line_2"
          placeholder="Complément"
          class="w-full border p-2 rounded mb-2"
        />
        <input
          v-model="form.city"
          placeholder="Ville"
          class="w-full border p-2 rounded mb-2"
        />
        <input
          v-model="form.postal_code"
          placeholder="Code postal"
          class="w-full border p-2 rounded mb-2"
        />

        <div class="flex gap-2 mt-8">
          <button
            type="submit"
            class="bg-amber-300 px-4 py-2 rounded hover:bg-amber-500 bg-amber-300"
          >
            Enregistrer
          </button>
          <button
            class="bg-amber-300 px-4 py-2 rounded hover:bg-amber-500 bg-amber-300"
            @click="modelValue = false"
          >
            Fermer
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
