import { useState, useEffect } from "react";
import axios from "axios";

function Items() {
  const [items, setItems] = useState([]);
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

  const fetchItems = async () => {
    try {
      const params = {};
      if (category) params.category = category;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;
      const res = await axios.get("http://localhost:5000/api/items", {
        params,
      });
      setItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAddItem = async () => {
    try {
      await axios.post("http://localhost:5000/api/items", {
        ...newItem,
        price: Number(newItem.price),
      });
      setNewItem({ name: "", category: "", price: "", description: "" });
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/items/${id}`);
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (item) => setEditingItem(item);
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/items/${editingItem._id}`, {
        ...editingItem,
        price: Number(editingItem.price),
      });
      setEditingItem(null);
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={fetchItems}
          className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition duration-300"
        >
          Filter
        </button>
      </div>

      {/* Add New Item */}
      <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
        <div className="flex flex-wrap gap-3">
          <input
            placeholder="Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="border p-2 rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            placeholder="Category"
            value={newItem.category}
            onChange={(e) =>
              setNewItem({ ...newItem, category: e.target.value })
            }
            className="border p-2 rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            placeholder="Price"
            type="number"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            className="border p-2 rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            placeholder="Description"
            value={newItem.description}
            onChange={(e) =>
              setNewItem({ ...newItem, description: e.target.value })
            }
            className="border p-2 rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleAddItem}
            className="bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-700 transition duration-300"
          >
            Add Item
          </button>
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item._id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300 relative"
          >
            {editingItem && editingItem._id === item._id ? (
              <div className="flex flex-col gap-2">
                <input
                  value={editingItem.name}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, name: e.target.value })
                  }
                  className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <input
                  value={editingItem.category}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, category: e.target.value })
                  }
                  className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <input
                  type="number"
                  value={editingItem.price}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, price: e.target.value })
                  }
                  className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <input
                  value={editingItem.description}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      description: e.target.value,
                    })
                  }
                  className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={handleUpdate}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setEditingItem(null)}
                    className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="font-bold text-lg mb-1">{item.name}</h2>
                <p className="text-gray-500 mb-1">{item.category}</p>
                <p className="text-blue-600 font-semibold mb-1">
                  ₹{item.price}
                </p>
                <p className="text-gray-700 mb-3">{item.description}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Items;
