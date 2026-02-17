export const useCatalog = () => {
  const supabase = useSupabase();
  const { getImageUrl } = useProductImage();
  const PAGE_SIZE = 10;

  const getProducts = async (page: number = 1) => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data, count, error } = await supabase
      .from("products")
      .select(
        `
      *,
      category:categories (
        id,
        name
      ),
      skus:products_skus (
        price
    )
    `,
        { count: "exact" },
      )
      .is("deleted_at", null)
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw error;
    return data.map((p) => ({
      ...p,
      image: getImageUrl?.(p.slug),
    }));
  };

  const getFeaturedProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select(
        `
      *,
      category:categories (
        id,
        name
      ),
      skus:products_skus (
        price
    )
    `,
        { count: "exact" },
      )
      .is("deleted_at", null)
      .order("created_at", { ascending: false })
      .limit(4);

    if (error) throw error;
    return data.map((p) => ({
      ...p,
      image: getImageUrl?.(p.slug),
    }));
  };

  return {
    getProducts,
    getFeaturedProducts,
  };
};
