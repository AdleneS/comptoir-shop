export default defineNuxtPlugin(() => {
  const supabase = useSupabaseClient();
  const user = useState("user", () => null);

  supabase.auth.onAuthStateChange((_, session) => {
    user.value = session?.user ?? null;
  });
});
