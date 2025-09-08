import { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Items() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
  });
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const { cart, addToCart } = useCart();
  const navigate = useNavigate();

  // ✅ Fetch items with token check
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
        localStorage.removeItem("token"); // Optional: clear invalid token
        setItems([]);
      } else {
        setError(err.response?.data?.message || err.message);
        setItems([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [category, minPrice, maxPrice]);

  // ✅ Add item
  const handleAddItem = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in to add items");
      return;
    }

    try {
      await api.post("/items", { ...newItem, price: Number(newItem.price) });
      setNewItem({ name: "", category: "", price: "", description: "" });
      fetchItems();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  // ✅ Delete item
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in to delete items");
      return;
    }

    try {
      await api.delete(`/items/${id}`);
      fetchItems();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  // ✅ Update item
  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in to update items");
      return;
    }

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

  // ✅ Render
  if (loading) return <p className="p-6 text-gray-600">Loading items...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 p-6">
      {error ? (
        <p className="text-red-600 text-xl text-center mt-20">{error}</p>
      ) : (
        <>
          {/* Filters */}
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <input
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-48"
            />
            <input
              placeholder="Min Price"
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-32"
            />
            <input
              placeholder="Max Price"
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-32"
            />
            <button
              onClick={fetchItems}
              className="bg-indigo-600 text-white px-5 py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300 font-semibold"
            >
              Filter
            </button>
          </div>

          {/* Add new item */}
          {userLoggedIn && (
            <div className="max-w-4xl mx-auto mb-10 p-6 bg-white rounded-xl shadow-xl border border-gray-200">
              <h2 className="text-2xl font-bold mb-5 text-gray-800">
                Add New Product
              </h2>
              <div className="flex flex-wrap gap-4">
                <input
                  placeholder="Name"
                  value={newItem.name}
                  onChange={(e) =>
                    setNewItem({ ...newItem, name: e.target.value })
                  }
                  className="flex-1 p-3 rounded-lg border border-gray-300 shadow-inner focus:ring-2 focus:ring-green-400 focus:outline-none"
                />
                <input
                  placeholder="Category"
                  value={newItem.category}
                  onChange={(e) =>
                    setNewItem({ ...newItem, category: e.target.value })
                  }
                  className="flex-1 p-3 rounded-lg border border-gray-300 shadow-inner focus:ring-2 focus:ring-green-400 focus:outline-none"
                />
                <input
                  placeholder="Price"
                  type="number"
                  value={newItem.price}
                  onChange={(e) =>
                    setNewItem({ ...newItem, price: e.target.value })
                  }
                  className="w-32 p-3 rounded-lg border border-gray-300 shadow-inner focus:ring-2 focus:ring-green-400 focus:outline-none"
                />
                <input
                  placeholder="Description"
                  value={newItem.description}
                  onChange={(e) =>
                    setNewItem({ ...newItem, description: e.target.value })
                  }
                  className="flex-1 p-3 rounded-lg border border-gray-300 shadow-inner focus:ring-2 focus:ring-green-400 focus:outline-none"
                />
                <button
                  onClick={handleAddItem}
                  className="bg-green-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-green-700 transition font-semibold"
                >
                  Add Product
                </button>
              </div>
            </div>
          )}

          {/* Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.isArray(items) &&
              items.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-2xl shadow-lg p-6 transform hover:-translate-y-2 hover:shadow-2xl transition duration-300 relative"
                >
                  {editingItem && editingItem._id === item._id ? (
                    <div className="flex flex-col gap-3">
                      <input
                        value={editingItem.name}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            name: e.target.value,
                          })
                        }
                        className="p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                      />
                      <input
                        value={editingItem.category}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            category: e.target.value,
                          })
                        }
                        className="p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                      />
                      <input
                        type="number"
                        value={editingItem.price}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            price: e.target.value,
                          })
                        }
                        className="p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                      />
                      <input
                        value={editingItem.description}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            description: e.target.value,
                          })
                        }
                        className="p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                      />
                      <div className="flex gap-3 mt-3">
                        <button
                          onClick={handleUpdate}
                          className="bg-yellow-500 text-white px-5 py-2 rounded-lg hover:bg-yellow-600 transition font-semibold"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => setEditingItem(null)}
                          className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600 transition font-semibold"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-xl font-bold text-gray-800 mb-1">
                        {item.name}
                      </h2>
                      <p className="text-gray-500 mb-2">{item.category}</p>
                      <p className="text-indigo-600 font-semibold mb-2">
                        ₹{item.price.toLocaleString("en-IN")}
                      </p>
                      <p className="text-gray-700 mb-4">{item.description}</p>

                      {userLoggedIn && (
                        <div className="flex gap-3 flex-wrap">
                          {cart.some((c) => c.item._id === item._id) ? (
                            <button
                              onClick={() => navigate("/cart")}
                              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition font-semibold"
                            >
                              Go to Cart
                            </button>
                          ) : (
                            <>
                              <button
                                onClick={() => handleEdit(item)}
                                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition font-semibold"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(item._id)}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-semibold"
                              >
                                Delete
                              </button>
                              <button
                                onClick={() => addToCart(item._id)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
                              >
                                Add to Cart
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Items;
