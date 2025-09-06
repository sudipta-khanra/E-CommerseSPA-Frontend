import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);
        navigate('/');
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h1 className="text-2xl mb-4">Login</h1>
            <form onSubmit={handleSubmit} className="space-y-2">
                <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="border p-2 w-full" />
                <input placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} type="password" className="border p-2 w-full" />
                <button type="submit" className="bg-blue-600 text-white p-2 w-full">Login</button>
            </form>
        </div>
    );
}

export default Login;
