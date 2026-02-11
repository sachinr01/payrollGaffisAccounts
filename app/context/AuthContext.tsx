"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface UserType {
  id: number;
  name: string;
  email: string;
  role: { role_id: number }[];
}

interface AuthContextType {
  user: UserType | null;
  isAdmin: boolean;
  loadingData: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  loadingData: true,
  logout: () => {},
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      const hasRoleOne = parsedUser.role?.some(
        (r: any) => r.role_id === 1
      );

      setIsAdmin(hasRoleOne);
    }

    setLoadingData(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/dashboard";
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loadingData, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
