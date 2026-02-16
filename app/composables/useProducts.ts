export const useProducts = () => {
  const supabase = useSupabase();

  const getProductBySlug = async (slug: string) => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .is("deleted_at", null)
      .eq("slug", slug)
      .single();

    if (error) throw error;
    return data;
  };

  return { getProductBySlug };
};
