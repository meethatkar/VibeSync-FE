import { createContext, useState, useEffect } from "react";
import api from "../../utils/apiClient";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(() => {
    try {
      const stored = localStorage.getItem("vibepulse_user");
      return stored ? JSON.parse(stored) : {
        username: "Guest Reviewer",
        email: "demo@vibepulse.ai",
        isGuest: true,
      };
    } catch {
      return {
        username: "Guest Reviewer",
        email: "demo@vibepulse.ai",
        isGuest: true,
      };
    }
  });

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/auth/get-me");
        if (response.data?.user) {
          setuser(response.data.user);
          localStorage.setItem("vibepulse_user", JSON.stringify(response.data.user));
        }
      } catch (err) {
        // If backend get-me fails, keep current session or fallback to guest
        if (!user) {
          const guestUser = {
            username: "Guest Reviewer",
            email: "demo@vibepulse.ai",
            isGuest: true,
          };
          setuser(guestUser);
          localStorage.setItem("vibepulse_user", JSON.stringify(guestUser));
        }
      }
    };

    fetchUser();
  }, []);

  const loginAsGuest = () => {
    const guestUser = {
      username: "Guest Reviewer",
      email: "demo@vibepulse.ai",
      isGuest: true,
    };
    setuser(guestUser);
    localStorage.setItem("vibepulse_user", JSON.stringify(guestUser));
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      // ignore
    }
    localStorage.removeItem("vibepulse_user");
    setuser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, setuser, loading, seterror, setloading, error, loginAsGuest, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

