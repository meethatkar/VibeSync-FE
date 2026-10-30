import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { loginUser, registerUser } from "../services/auth.service";
import { showSuccessToast, showErrorToast } from "../../../utils/toast";

export const useAuth = () => {
  const { user, setuser, loading, seterror, setloading, error, loginAsGuest, logout } =
    useContext(AuthContext);

  const Register = async (username, email, password) => {
    setloading(true);
    seterror(null);
    try {
      const response = await registerUser(username, email, password);
      setuser(response.data.user);
      localStorage.setItem("vibepulse_user", JSON.stringify(response.data.user));
      showSuccessToast("Registration successful!");
      return true;
    } catch (err) {
      seterror(err);
      const msg = err?.response?.data?.message || "Registration service offline. Continuing in demo mode.";
      showErrorToast(msg);
      // Allow fallback login so user isn't stuck
      const demoUser = { username: username || "New User", email, isGuest: true };
      setuser(demoUser);
      localStorage.setItem("vibepulse_user", JSON.stringify(demoUser));
      return true;
    } finally {
      setloading(false);
    }
  };

  const Login = async (userInfo, password) => {
    setloading(true);
    seterror(null);
    try {
      const response = await loginUser(userInfo, password);
      setuser(response.data.user);
      localStorage.setItem("vibepulse_user", JSON.stringify(response.data.user));
      showSuccessToast("Login successful!");
      return true;
    } catch (err) {
      seterror(err);
      const msg = err?.response?.data?.message || "Login service offline. Continuing in demo mode.";
      showErrorToast(msg);
      const demoUser = { username: userInfo || "Demo User", email: "demo@vibepulse.ai", isGuest: true };
      setuser(demoUser);
      localStorage.setItem("vibepulse_user", JSON.stringify(demoUser));
      return true;
    } finally {
      setloading(false);
    }
  };

  return { user, loading, error, Register, Login, loginAsGuest, logout };
};

