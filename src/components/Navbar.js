import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-50">
            {/* Logo */}
            <div className="font-bold text-2xl text-blue-600 hover:text-blue-800 transition-colors duration-300">
                E-Commerce
            </div>

            {/* Navigation Links */}
            <div className="flex space-x-4">
                <Link
                    to="/"
                    className="px-3 py-2 rounded-md hover:bg-blue-600 hover:text-white transition duration-300"
                >
                    Home
                </Link>
                <Link
                    to="/cart"
                    className="px-3 py-2 rounded-md hover:bg-blue-600 hover:text-white transition duration-300"
                >
                    Cart
                </Link>
                <Link
                    to="/login"
                    className="px-3 py-2 rounded-md hover:bg-blue-600 hover:text-white transition duration-300"
                >
                    Login
                </Link>
                <Link
                    to="/signup"
                    className="px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
                >
                    Signup
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
