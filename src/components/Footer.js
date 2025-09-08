function Footer() {
  return (
    <footer className="bg-blue-600 text-white mt-10 p-6 sm:p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-2">ShopMate</h2>
          <p className="text-gray-200 text-sm sm:text-base">
            Your one-stop shop for electronics, books, fashion, and more. Fast
            delivery, great prices!
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">Quick Links</h2>
          <ul className="space-y-1 text-sm sm:text-base">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/cart" className="hover:underline">
                Cart
              </a>
            </li>
            <li>
              <a href="/login" className="hover:underline">
                Login
              </a>
            </li>
            <li>
              <a href="/signup" className="hover:underline">
                Signup
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">Contact Us</h2>
          <p className="text-sm sm:text-base">Email: support@ShopMate.com</p>
          <p className="text-sm sm:text-base">Phone: +91 123 456 7890</p>
          <p className="text-sm sm:text-base">Address: Mumbai, India</p>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-300 text-xs sm:text-sm">
        &copy; {new Date().getFullYear()} E-Commerce. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
