import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const login = (newToken, name) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("userName", name);
    setToken(newToken);
    setUserName(name);
  };

  const logout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    setUserName("");
    setToken("");
  };

  const isLoggedIn = !!token;

  return (
    <AuthContext.Provider value={{ userName, token, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
