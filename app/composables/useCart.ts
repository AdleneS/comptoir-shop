export const useCart = () => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();
  const cart = useState<any[]>("cart", () => []);

  const loadCart = async () => {
    try {
      if (user.value) {
        const { data, error } = await supabase.from("carts_items").select(`
            quantity,
            product_id,
            product_sku_id,
            products (
              id,
              name,
              slug
            ),
            products_skus (
              id,
              price
            )
          `);

        if (error) {
          console.error("Erreur lors du chargement du panier:", error);
          throw new Error(`Erreur de chargement du panier: ${error.message}`);
        }

        cart.value =
          data?.map((item) => ({
            product_id: item.product_id,
            sku_id: item.product_sku_id,
            name: item.products.name,
            slug: item.products.slug,
            price: item.products_skus.price,
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
      // Peut-être notifier l'utilisateur ou logger l'erreur
    }
  };

  const addToCart = async (product: any, sku: any, quantity = 1) => {
    try {
      const existing = cart.value.find((i) => i.sku_id === sku.id);

      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.value.push({
          product_id: product.id,
          sku_id: sku.id,
          name: product.name,
          slug: product.slug,
          price: sku.price,
          quantity,
        });
      }

      if (user.value) {
        await supabase.from("carts_items").upsert({
          product_id: product.id,
          product_sku_id: sku.id,
          quantity,
          cart_id: await getCartId(),
        });
      } else {
        saveLocalCart();
      }
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
      console.log(cartData);

      if (!cartData) {
        console.log("NO CART");
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
      .from("cart")
      .select("id")
      .eq("user_id", user.value.id)
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
