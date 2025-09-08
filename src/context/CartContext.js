import { createContext, useState, useContext, useEffect } from "react";
import api from "../api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch cart items
  const fetchCart = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please login.");
        setCart([]);
        setLoading(false);
        return;
      }

      const res = await api.get("/cart");
      const validItems = res.data.items?.filter(i => i?.item) || [];
      setCart(validItems);
    } catch (err) {
      console.error("Error fetching cart:", err.response?.data || err.message);
      setError(err.response?.data?.msg || "Failed to fetch cart");
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  // Add item to cart
  const addToCart = async (itemId) => {
    try {
      const res = await api.post("/cart/add", { itemId });
      const validItems = res.data.items?.filter(i => i?.item) || [];
      setCart(validItems);
    } catch (err) {
      console.error("Error adding item:", err.response?.data || err.message);
      setError(err.response?.data?.msg || "Failed to add item");
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    try {
      const res = await api.post("/cart/remove", { itemId });
      const validItems = res.data.items?.filter(i => i?.item) || [];
      setCart(validItems);
    } catch (err) {
      console.error("Error removing item:", err.response?.data || err.message);
      setError(err.response?.data?.msg || "Failed to remove item");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, fetchCart, addToCart, removeFromCart, loading, error }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook
export const useCart = () => useContext(CartContext);
