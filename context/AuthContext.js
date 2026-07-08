import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { getProfile } from "../services/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = Cookies.get("accessToken");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await getProfile();

        setUser(data);
      } catch (err) {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = (data) => {
    Cookies.set("accessToken", data.accessToken);
    Cookies.set("refreshToken", data.refreshToken);

    setUser(data.user);
  };

  const logout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");

    setUser(null);
  };

  if (loading) {
    return null;
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
