import { useState, useEffect, useContext } from "react";
import api from "../api";
import { useCart } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Items() {
  const { cart, addToCart } = useCart();
  const { userName } = useContext(AuthContext);
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Filters (optional)
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Fetch items
  const fetchItems = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in to view products");
      setItems([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const params = {};
      if (category) params.category = category;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;

      const res = await api.get("/items", { params });
      setItems(Array.isArray(res.data.items) ? res.data.items : []);
      setError("");
    } catch (err) {
      console.error("Error fetching items:", err.response?.data || err.message);
      if (err.response?.status === 401) {
        setError("Please log in to view products");
        localStorage.removeItem("token"); // optional: clear invalid token
        setItems([]);
      } else {
        setError(err.response?.data?.msg || err.message);
        setItems([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [category, minPrice, maxPrice]);

  // Add item to cart
  const handleAddToCart = (itemId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in to add items to cart");
      return;
    }
    addToCart(itemId);
  };

  if (loading) return <p className="p-6 text-gray-600">Loading items...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">🛍️ Items</h1>

      {items.length === 0 ? (
        <p className="text-gray-600">No items available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between"
            >
              <h2 className="font-semibold text-lg">{item.name}</h2>
              <p className="text-gray-600">₹{item.price?.toLocaleString("en-IN")}</p>
              <p className="text-gray-500 text-sm">{item.description}</p>

              <button
                onClick={() => handleAddToCart(item._id)}
                className="mt-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Items;
