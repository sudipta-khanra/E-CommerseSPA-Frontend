import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/api/auth/signup', { name, email, password });
        navigate('/login');
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h1 className="text-2xl mb-4">Signup</h1>
            <form onSubmit={handleSubmit} className="space-y-2">
                <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="border p-2 w-full" />
                <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="border p-2 w-full" />
                <input placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} type="password" className="border p-2 w-full" />
                <button type="submit" className="bg-blue-600 text-white p-2 w-full">Signup</button>
            </form>
        </div>
    );
}

export default Signup;
