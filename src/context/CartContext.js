import { createContext, useContext, useState, useEffect } from "react";
import api from "../api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Fetch cart from backend
  const fetchCart = async () => {
    try {
      const res = await api.get("/api/cart");
      setCart(res.data.items || []);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (itemId) => {
    try {
      const res = await api.post("/api/cart/add", { itemId });
      setCart(res.data.items || []);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const res = await api.post("/api/cart/remove", { itemId });
      setCart(res.data.items || []);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, setCart, addToCart, removeFromCart, fetchCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
