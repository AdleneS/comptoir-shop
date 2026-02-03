export default defineNuxtPlugin(() => {
  const supabase = useSupabase();
  const user = useState("user", () => null);

  supabase.auth.onAuthStateChange((_, session) => {
    user.value = session?.user ?? null;
  });
});
