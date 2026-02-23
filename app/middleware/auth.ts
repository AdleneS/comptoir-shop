export default defineNuxtRouteMiddleware(async () => {
  const supabase = useSupabase();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log(session);
  if (!session) {
    return navigateTo("/login");
  }
});

// export default defineNuxtRouteMiddleware(() => {
//   const user = useSupabaseUser();

//   if (!user.value) {
//     return navigateTo("/login");
//   }
// });
