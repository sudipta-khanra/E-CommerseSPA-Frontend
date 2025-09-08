import { createContext, useState, useContext, useEffect } from "react";
import api from "../api";
import { AuthContext } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCart = async () => {
    if (!isLoggedIn) {
      setCart([]);
      setError("Please log in to view products");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await api.get("/cart");
      const validItems = res.data.items?.filter(i => i?.item) || [];
      setCart(validItems);
      setError(null);
    } catch (err) {
      console.error("Error fetching cart:", err.response?.data || err.message);
      setError(err.response?.data?.msg || "Failed to fetch cart");
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (itemId) => {
    if (!isLoggedIn) {
      setError("Please log in to add items");
      return;
    }

    try {
      const res = await api.post("/cart/add", { itemId });
      const validItems = res.data.items?.filter(i => i?.item) || [];
      setCart(validItems);
      setError(null);
    } catch (err) {
      console.error("Error adding item:", err.response?.data || err.message);
      setError(err.response?.data?.msg || "Failed to add item");
    }
  };

  const removeFromCart = async (itemId) => {
    if (!isLoggedIn) {
      setError("Please log in to remove items");
      return;
    }

    try {
      const res = await api.post("/cart/remove", { itemId });
      const validItems = res.data.items?.filter(i => i?.item) || [];
      setCart(validItems);
      setError(null);
    } catch (err) {
      console.error("Error removing item:", err.response?.data || err.message);
      setError(err.response?.data?.msg || "Failed to remove item");
    }
  };

  useEffect(() => {
    fetchCart();
  }, [isLoggedIn]);

  return (
    <CartContext.Provider value={{ cart, fetchCart, addToCart, removeFromCart, loading, error }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
