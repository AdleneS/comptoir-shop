export const useGetProducts = async (
  supabase: any,
  config: any,
  limit: number = 4,
) => {
  const { data: products, error } = await supabase
    .from("products")
    .select()
    .limit(limit);

  if (products) {
    await Promise.all(
      products.map(async (product) => {
        const { data, error } = await supabase.storage
          .from(config.public.supabaseBucketName)
          .createSignedUrl(`products/${product.id}/photo1.png`, 3600);

        if (!error && data) {
          product.imageUrl = data.signedUrl;
        }
      }),
    );
  }

  return { products, error };
};
