// client\src\contexts\AuthContext.tsx
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getMe, login as loginApi, register as registerApi } from "@/services/api/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface AuthContextType {
  user: any;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ On mount — restore user from localStorage if token exists
  useEffect(() => {
    const fetchUser = async () => {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) return setLoading(false);

      try {
        const res = await getMe();
        setUser(res.user);
      } catch (err) {
        console.error("Token invalid:", err);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // ✅ Login
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const data = await loginApi({ email, password });
      if (data.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);

        const userData = data.user || { email };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));

        toast.success("Logged in successfully!");
        navigate("/dashboard");
      }
    } catch (err: any) {
      console.error("Login failed:", err);
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Register
  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      await registerApi({ name, email, password });
      // await login(email, password); // Auto-login after register
      toast.success("Registered successfully! Please verfiy your email and log in.");
      navigate("/login");
    } catch (err: any) {
      console.error("Registration failed:", err);
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    navigate("/login");
    toast.success("Logged out successfully!");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
