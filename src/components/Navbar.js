import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || ""
  );
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const updateUser = () =>
      setUserName(localStorage.getItem("userName") || "");
    window.addEventListener("login", updateUser);
    return () => window.removeEventListener("login", updateUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setUserName("");
    navigate("/login");
    setIsOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <div className="font-bold text-2xl text-gray-900 tracking-wide cursor-pointer">
          <Link to="/">ShopMate</Link>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        <div
          className={`flex flex-col md:flex-row md:items-center md:static absolute top-full left-0 w-full md:w-auto bg-white md:bg-transparent transition-all duration-300 overflow-hidden ${
            isOpen ? "max-h-96 py-4" : "max-h-0 md:max-h-full"
          }`}
        >
          <Link
            to="/cart"
            className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 md:hover:bg-transparent transition duration-200"
            onClick={() => setIsOpen(false)}
          >
            Cart
          </Link>

          {userName ? (
            <>
             <span className="px-4 py-2 text-gray-700 font-medium">
  Hi, {userName?.trim().split(" ")[0] || "User"}
</span>

              <button
                onClick={handleLogout}
                className="px-4 py-2 text-gray-700 rounded-md font-medium transition duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 md:hover:bg-transparent transition duration-200"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 text-gray-700  transition duration-200"
                onClick={() => setIsOpen(false)}
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
