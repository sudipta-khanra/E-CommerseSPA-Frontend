import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
  const navigate = useNavigate();

  useEffect(() => {
    const updateUser = () => setUserName(localStorage.getItem("userName") || "");
    window.addEventListener("login", updateUser);

    return () => window.removeEventListener("login", updateUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setUserName("");
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 z-50">
      <div className="font-bold text-2xl text-gray-900 tracking-wide cursor-pointer">
        <Link to="/">ShopMate</Link>
      </div>

      <div className="flex space-x-6 items-center">
        <Link to="/cart" className="text-gray-700 font-medium transition duration-200">Cart</Link>

        {userName ? (
          <>
            <span className="text-gray-700 font-medium">Hi, {userName}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-gray-700 rounded-md font-medium border border-gray-300 hover:bg-gray-100 transition duration-200"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-700 font-medium transition duration-200">Login</Link>
            <Link
              to="/signup"
              className="px-4 py-2 text-gray-700 rounded-md font-medium border border-gray-300 hover:bg-gray-100 transition duration-200"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
