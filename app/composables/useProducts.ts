export const useProducts = () => {
  const supabase = useSupabaseClient();
  const { getProductImages } = useProductImage();

  const getProductBySlug = async (slug: string) => {
    const { data: product, error } = await supabase
      .from("products")
      .select(
        `
      *,
      category:categories (
        id,
        name
      ),
      skus:products_skus (
        id,
        price,
        size:product_attributes!products_skus_size_attribute_id_fkey (
          id,
          value
        ),
        color:product_attributes!products_skus_color_attribute_id_fkey (
          id,
          value
        )
    )
    `,
        { count: "exact" },
      )
      .is("deleted_at", null)
      .eq("slug", slug)
      .single();

    const images = await getProductImages(slug);

    // 3. enrichir objet
    return {
      ...product,
      images,
    };
  };

  return { getProductBySlug };
};
