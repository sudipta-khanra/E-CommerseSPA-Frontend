function Footer() {
    return (
        <footer className="bg-blue-600 text-white mt-10 p-8">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* About */}
                <div>
                    <h2 className="text-xl font-bold mb-2">E-Commerce</h2>
                    <p className="text-gray-200">
                        Your one-stop shop for electronics, books, fashion, and more. Fast delivery, great prices!
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h2 className="text-xl font-bold mb-2">Quick Links</h2>
                    <ul className="space-y-1">
                        <li>
                            <a href="/" className="hover:underline">Home</a>
                        </li>
                        <li>
                            <a href="/cart" className="hover:underline">Cart</a>
                        </li>
                        <li>
                            <a href="/login" className="hover:underline">Login</a>
                        </li>
                        <li>
                            <a href="/signup" className="hover:underline">Signup</a>
                        </li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h2 className="text-xl font-bold mb-2">Contact Us</h2>
                    <p>Email: support@ecommerce.com</p>
                    <p>Phone: +91 123 456 7890</p>
                    <p>Address: Mumbai, India</p>
                </div>
            </div>

            {/* Bottom */}
            <div className="mt-8 text-center text-gray-300 text-sm">
                &copy; {new Date().getFullYear()} E-Commerce. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;
