export default defineNuxtPlugin(() => {
  const supabase = useSupabaseClient();
  const user = useState("user", () => null);

  const { syncCartOnLogin } = useCart();

  supabase.auth.onAuthStateChange(async (event, session) => {
    user.value = session?.user ?? null;

    if (event === "SIGNED_IN" && session?.user) {
      await syncCartOnLogin(session.user);
    }
  });
});
