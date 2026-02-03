export const useAuth = () => {
  const user = useState<any>("user");

  const isLoggedIn = computed(() => !!user.value);

  return {
    user,
    isLoggedIn,
  };
};
