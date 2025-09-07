import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [shake, setShake] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset errors
        setFieldErrors({});
        setError('');

        // Validate inputs
        const errors = {};
        if (!name) errors.name = 'Name is required';
        if (!email) errors.email = 'Email is required';
        if (!password) errors.password = 'Password is required';

        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            setShake(true);
            setTimeout(() => setShake(false), 500);
            return;
        }

        // API call
        try {
            await axios.post('http://localhost:5000/api/auth/signup', { name, email, password });
            navigate('/login');
        } catch (err) {
            setError('Signup failed. Email may already be in use.');
            setShake(true);
            setTimeout(() => setShake(false), 500);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className={`bg-white p-8 rounded-lg shadow-md w-full max-w-md ${shake ? 'animate-shake' : ''}`}>
                <h1 className="text-3xl font-semibold text-gray-900 mb-6 text-center">Signup</h1>

                {error && (
                    <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-center font-medium">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {fieldErrors.name && <p className="text-red-600 text-sm mt-1">{fieldErrors.name}</p>}
                    </div>

                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {fieldErrors.email && <p className="text-red-600 text-sm mt-1">{fieldErrors.email}</p>}
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {fieldErrors.password && <p className="text-red-600 text-sm mt-1">{fieldErrors.password}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition duration-200"
                    >
                        Signup
                    </button>
                </form>

                <p className="mt-4 text-center text-gray-500 text-sm">
                    Already have an account? <a href="/login" className="text-blue-600 font-medium hover:underline">Login</a>
                </p>
            </div>

            {/* Shake Animation */}
            <style>
                {`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    50% { transform: translateX(5px); }
                    75% { transform: translateX(-5px); }
                }
                .animate-shake {
                    animation: shake 0.5s ease;
                }
                `}
            </style>
        </div>
    );
}

export default Signup;
