export const useProductImage = () => {
  const supabase = useSupabase();
  const config = useRuntimeConfig();

  const getImageUrl = (slug: string, file = "cover.png") => {
    const { data } = supabase.storage
      .from(config.public.supabaseProductsBucketName)
      .getPublicUrl(`${slug}/${file}`);

    return data.publicUrl;
  };

  const getProductImages = async (slug: string) => {
    console.log(`/products/${slug}`);
    const { data, error } = await supabase.storage
      .from(config.public.supabaseProductsBucketName)
      .list(slug, { limit: 10 });
    if (error) throw error;

    return data.map((file) => {
      const { data: url } = supabase.storage
        .from(config.public.supabaseProductsBucketName)
        .getPublicUrl(`${slug}/${file.name}`);
      return url.publicUrl ?? [];
    });
  };

  return { getImageUrl, getProductImages };
};
