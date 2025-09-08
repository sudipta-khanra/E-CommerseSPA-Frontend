import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { useCart } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

function Items() {
  const { cart, addToCart } = useCart();
  const { userName } = useContext(AuthContext);
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Add / Edit Item
  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
  });
  const [editingItem, setEditingItem] = useState(null);

  const userLoggedIn = !!localStorage.getItem("token");

  // Fetch items
  const fetchItems = async () => {
    try {
      setLoading(true);
      const params = {};
      if (category) params.category = category;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;

      const res = await api.get("/items", { params });

      // ✅ FIX: use res.data directly (backend returns array)
      setItems(Array.isArray(res.data) ? res.data : []);
      setError("");
    } catch (err) {
      console.error("Error fetching items:", err.response?.data || err.message);
      if (err.response?.status === 401) {
        setError("Please log in to view products");
      } else {
        setError(err.response?.data?.message || "Failed to fetch items");
      }
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [category, minPrice, maxPrice]);

  // Add new item
  const handleAddItem = async () => {
    try {
      await api.post("/items", { ...newItem, price: Number(newItem.price) });
      setNewItem({ name: "", category: "", price: "", description: "" });
      fetchItems();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  // Delete item
  const handleDelete = async (id) => {
    try {
      await api.delete(`/items/${id}`);
      fetchItems();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  // Update item
  const handleUpdate = async () => {
    try {
      await api.put(`/items/${editingItem._id}`, {
        ...editingItem,
        price: Number(editingItem.price),
      });
      setEditingItem(null);
      fetchItems();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const handleEdit = (item) => setEditingItem(item);

  // Handle Add to Cart
  const handleAddToCart = (id) => {
    if (!userLoggedIn) {
      setError("Please log in to add items to cart");
      return;
    }
    addToCart(id);
  };

  if (loading) return <p className="p-6 text-gray-600">Loading items...</p>;
  if (error) return <p className="p-6 text-red-600 text-center">{error}</p>;

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center">🛍️ Products</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-3 rounded shadow w-48 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          placeholder="Min Price"
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border p-3 rounded shadow w-32 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          placeholder="Max Price"
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border p-3 rounded shadow w-32 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={fetchItems}
          className="bg-indigo-600 text-white px-5 py-3 rounded hover:bg-indigo-700 transition font-semibold"
        >
          Filter
        </button>
      </div>

      {/* Add new item */}
      {userLoggedIn && (
        <div className="max-w-4xl mx-auto mb-10 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold mb-5">Add New Product</h2>
          <div className="flex flex-wrap gap-4">
            <input
              placeholder="Name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="flex-1 p-3 rounded border focus:ring-2 focus:ring-green-400"
            />
            <input
              placeholder="Category"
              value={newItem.category}
              onChange={(e) =>
                setNewItem({ ...newItem, category: e.target.value })
              }
              className="flex-1 p-3 rounded border focus:ring-2 focus:ring-green-400"
            />
            <input
              placeholder="Price"
              type="number"
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
              className="w-32 p-3 rounded border focus:ring-2 focus:ring-green-400"
            />
            <input
              placeholder="Description"
              value={newItem.description}
              onChange={(e) =>
                setNewItem({ ...newItem, description: e.target.value })
              }
              className="flex-1 p-3 rounded border focus:ring-2 focus:ring-green-400"
            />
            <button
              onClick={handleAddItem}
              className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition font-semibold"
            >
              Add Product
            </button>
          </div>
        </div>
      )}

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-lg p-6 transform hover:-translate-y-2 hover:shadow-2xl transition relative"
          >
            {editingItem && editingItem._id === item._id ? (
              <div className="flex flex-col gap-3">
                <input
                  value={editingItem.name}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, name: e.target.value })
                  }
                  className="p-2 rounded border focus:ring-2 focus:ring-yellow-400"
                />
                <input
                  value={editingItem.category}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, category: e.target.value })
                  }
                  className="p-2 rounded border focus:ring-2 focus:ring-yellow-400"
                />
                <input
                  type="number"
                  value={editingItem.price}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, price: e.target.value })
                  }
                  className="p-2 rounded border focus:ring-2 focus:ring-yellow-400"
                />
                <input
                  value={editingItem.description}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, description: e.target.value })
                  }
                  className="p-2 rounded border focus:ring-2 focus:ring-yellow-400"
                />
                <div className="flex gap-3 mt-3">
                  <button
                    onClick={handleUpdate}
                    className="bg-yellow-500 text-white px-5 py-2 rounded hover:bg-yellow-600 font-semibold"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setEditingItem(null)}
                    className="bg-gray-500 text-white px-5 py-2 rounded hover:bg-gray-600 font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-gray-800 mb-1">{item.name}</h2>
                <p className="text-gray-500 mb-2">{item.category}</p>
                <p className="text-indigo-600 font-semibold mb-2">
                  ₹{item.price.toLocaleString("en-IN")}
                </p>
                <p className="text-gray-700 mb-4">{item.description}</p>

                {userLoggedIn && (
                  <div className="flex gap-3 flex-wrap">
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 font-semibold"
                    >
                      Delete
                    </button>
                    {cart.some((c) => c.item._id === item._id) ? (
                      <button
                        onClick={() => navigate("/cart")}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 font-semibold"
                      >
                        Go to Cart
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(item._id)}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-semibold"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Items;
