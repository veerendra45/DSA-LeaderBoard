import { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  loggedIn: boolean;
  login: (token: string, email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("jwtToken"));

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem("jwtToken"));
  }, []);

  const login = (token: string, email: string) => {
    localStorage.setItem("jwtToken", token);
    localStorage.setItem("userEmail", email);
    setLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userEmail");
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
