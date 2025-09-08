import { createContext, useState, useContext, useEffect } from "react";
import api from "../api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    try {
      const res = await api.get("/cart");
      const validItems = res.data.items?.filter(i => i?.item) || [];
      setCart(validItems);
    } catch (err) {
      console.error("Error fetching cart:", err.response?.data || err.message);
      setCart([]);
    }
  };

  const addToCart = async (itemId) => {
    try {
      const res = await api.post("/cart/add", { itemId });
      const validItems = res.data.items?.filter(i => i?.item) || [];
      setCart(validItems);
    } catch (err) {
      console.error("Error adding item:", err.response?.data || err.message);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const res = await api.post("/cart/remove", { itemId });
      const validItems = res.data.items?.filter(i => i?.item) || [];
      setCart(validItems);
    } catch (err) {
      console.error("Error removing item:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, fetchCart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
