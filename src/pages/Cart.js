import { useState, useEffect } from 'react';
import axios from 'axios';

function Cart() {
    const [cart, setCart] = useState({ items: [] });
    const token = localStorage.getItem('token');

    const fetchCart = async () => {
        const res = await axios.get('http://localhost:5000/api/cart', { headers: { 'x-auth-token': token } });
        setCart(res.data);
    };

    const removeItem = async (itemId) => {
        await axios.post('http://localhost:5000/api/cart/remove', { itemId }, { headers: { 'x-auth-token': token } });
        fetchCart();
    };

    useEffect(() => {
        if (token) fetchCart();
    }, [token]);

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">Cart</h1>
            {cart.items.length === 0 ? <p>Cart is empty</p> :
                <div className="space-y-2">
                    {cart.items.map(i => (
                        <div key={i.item._id} className="border p-2 flex justify-between">
                            <div>
                                <h2 className="font-bold">{i.item.name}</h2>
                                <p>${i.item.price} x {i.quantity}</p>
                            </div>
                            <button onClick={() => removeItem(i.item._id)} className="bg-red-500 text-white p-1">Remove</button>
                        </div>
                    ))}
                </div>
            }
        </div>
    );
}

export default Cart;
