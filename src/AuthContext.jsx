import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");

  const login = (name) => {
    localStorage.setItem("userName", name);
    setUserName(name);
  };

  const logout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    setUserName("");
  };

  return (
    <AuthContext.Provider value={{ userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
