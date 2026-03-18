export const useCart = () => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();
  const cart = useState<any[]>("cart", () => []);

  const loadCart = async () => {
    try {
      if (user.value) {
        // Récupérer l'ID du panier de l'utilisateur
        const { data: cartData, error: cartError } = await supabase
          .from("carts")
          .select("id")
          .eq("user_id", user.value.sub)
          .maybeSingle();

        if (cartError) {
          console.error("Erreur lors de la récupération du panier:", cartError);
          console.log(user.value);

          throw new Error(
            `Erreur de récupération du panier: ${cartError.message}`,
          );
        }

        if (!cartData) {
          cart.value = [];
          return;
        }

        // Récupérer les items avec jointure correcte
        const { data: cartItems, error: itemsError } = await supabase
          .from("carts_items")
          .select(
            `
            quantity,
            product_sku_id,
            product_id,
            products_skus (
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
            ),
             products (
              name,
              slug
            )
          `,
          )
          .eq("cart_id", cartData.id);

        if (itemsError) {
          console.error(
            "Erreur lors de la récupération des items:",
            itemsError,
          );
          throw new Error(
            `Erreur de récupération des items: ${itemsError.message}`,
          );
        }

        cart.value =
          cartItems?.map((item) => ({
            product_id: item.product_id,
            sku_id: item.product_sku_id,
            color: item.products_skus.color.value,
            size: item.products_skus.size.value,
            name: item.products.name, // Vous devrez récupérer le nom via une autre méthode
            slug: item.products.slug, // Vous devrez récupérer le slug via une autre méthode
            price: item.products_skus?.price || 0,
            quantity: item.quantity,
          })) ?? [];
      } else {
        const local = localStorage.getItem("cart");
        if (local) {
          cart.value = JSON.parse(local);
        }
      }
    } catch (error) {
      console.error("Erreur critique lors du chargement du panier:", error);
      // Réinitialiser le panier en cas d'erreur
      cart.value = [];
      throw error;
    }
  };

  const saveLocalCart = () => {
    try {
      if (!user.value) {
        localStorage.setItem("cart", JSON.stringify(cart.value));
      }
    } catch (error) {
      console.error("Erreur lors de la sauvegarde locale du panier:", error);
    }
  };

  const updateExistingItem = async (
    existing: any,
    sku: any,
    quantity: number,
  ) => {
    existing.quantity += quantity;
    if (user.value) {
      await updateQuantity(sku.id, existing.quantity);
    } else {
      saveLocalCart();
    }
  };

  const addNewItem = async (product: any, sku: any, quantity: number) => {
    cart.value.push({
      product_id: product.id,
      sku_id: sku.id,
      name: product.name,
      slug: product.slug,
      price: sku.price,
      quantity,
    });

    if (user.value) {
      await supabase.from("carts_items").upsert(
        {
          product_id: product.id,
          product_sku_id: sku.id,
          quantity,
          cart_id: await getCartId(),
        },
        {
          onConflict: "cart_id,product_sku_id",
        },
      );
    } else {
      saveLocalCart();
    }
  };

  const addToCart = async (product: any, sku: any, quantity = 1) => {
    try {
      const existing = cart.value.find((i) => i.sku_id === sku.id);
      if (existing) {
        return updateExistingItem(existing, sku, quantity);
      }

      return addNewItem(product, sku, quantity);
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier:", error);
      throw error;
    }
  };

  const removeFromCart = async (sku_id: string) => {
    try {
      cart.value = cart.value.filter((i) => i.sku_id !== sku_id);

      if (user.value) {
        await supabase
          .from("carts_items")
          .delete()
          .eq("product_sku_id", sku_id);
      } else {
        saveLocalCart();
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du panier:", error);
      throw error;
    }
  };

  const updateQuantity = async (sku_id: string, quantity: number) => {
    try {
      const item = cart.value.find((i) => i.sku_id === sku_id);
      if (!item) return;

      if (quantity <= 0) {
        removeFromCart(sku_id);
        return;
      }
      item.quantity = quantity;

      if (user.value) {
        await supabase
          .from("carts_items")
          .update({ quantity })
          .eq("product_sku_id", sku_id);
      } else {
        saveLocalCart();
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de quantité:", error);
      throw error;
    }
  };

  const syncCartOnLogin = async (loggedInUser: any) => {
    try {
      if (!loggedInUser) return;

      const localCart = JSON.parse(localStorage.getItem("cart") || "[]");

      if (localCart.length === 0) return;

      // récupérer ou créer le panier DB
      let { data: cartData, error: cartError } = await supabase
        .from("carts")
        .select("*")
        .eq("user_id", loggedInUser.id)
        .maybeSingle();

      if (cartError) {
        console.error("Erreur lors de la récupération du panier:", cartError);
        throw new Error(
          `Erreur de récupération du panier: ${cartError.message}`,
        );
      }

      if (!cartData) {
        const { data, error } = await supabase
          .from("carts")
          .insert({ user_id: loggedInUser.id })
          .select()
          .single();

        if (error) {
          console.error("Erreur lors de la création du panier:", error);
          throw new Error(`Erreur de création du panier: ${error.message}`);
        }
        cartData = data;
      }

      // fusionner les items
      const upsertData = localCart.map((item: any) => {
        const data = {
          cart_id: cartData.id,
          product_sku_id: item.sku_id,
          quantity: item.quantity,
          product_id: item.product_id,
        };
        return data;
      });

      await supabase.from("carts_items").upsert(upsertData, {
        onConflict: "cart_id,product_sku_id",
      });
      localStorage.removeItem("cart");
      await loadCart();
    } catch (error) {
      console.error("Erreur lors de la synchronisation du panier:", error);
      // Peut-être notifier l'utilisateur
      throw error;
    }
  };

  const totalPrice = computed(() =>
    cart.value.reduce((t, i) => t + i.price * i.quantity, 0),
  );

  const totalItems = computed(() =>
    cart.value.reduce((t, i) => t + i.quantity, 0),
  );

  return {
    cart,
    loadCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    syncCartOnLogin,
    totalPrice,
    totalItems,
  };
};

async function getCartId() {
  try {
    const supabase = useSupabaseClient();
    const user = useSupabaseUser();

    const { data, error } = await supabase
      .from("carts")
      .select("id")
      .eq("user_id", user?.value?.sub)
      .single();

    if (error) {
      console.error("Erreur lors de la récupération du cart_id:", error);
      return null;
    }

    return data?.id || null;
  } catch (error) {
    console.error("Erreur critique lors de la récupération du cart_id:", error);
    return null;
  }
}
