import { useCart } from "../context/CartContext";

function Cart() {
  const { cart, removeFromCart } = useCart();

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600 text-lg">Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cart.map(({ item }) => (
            <div
              key={item._id}
              className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md"
            >
              <div>
                <h2 className="font-semibold text-lg">{item.name}</h2>
                <p className="text-gray-600">
                  ₹{item.price?.toLocaleString("en-IN")}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;
