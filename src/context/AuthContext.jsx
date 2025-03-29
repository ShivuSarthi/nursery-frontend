import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axiosConfig";
import { toast } from "react-toastify";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check for existing token on app load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      try {
        if (token) {
          const res = await api.get("/auth/me");
          setUser(res?.data);
          toast.success("Welcome back!");
        }
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  // Login function
  const login = async (phon_number, password) => {
    try {
      const response = await api.post("/auth/login", { phon_number, password });

      localStorage.setItem("token", response.data.token);
      setUser(response?.data);
      toast.success("Login successful!");

      navigate("/");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed";
      toast.error(errorMessage);
      throw errorMessage;
    }
  };

  // Signup function
  const signup = async (name, phon_number, password) => {
    try {
      const res = await api.post("/auth/signup", {
        name,
        phon_number,
        password,
      });
      localStorage.setItem("token", res.data.token);
      setUser(res.data);
      toast.success("Registration successful!");
      navigate("/");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Registration failed";
      toast.error(errorMessage);
      throw errorMessage;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
