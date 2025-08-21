// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = { name: string; email: string } | null;

type AuthContextType = {
  user: User;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("loggedInUser");
        if (storedUser) setUser(JSON.parse(storedUser));
      } catch (err) {
        console.log("Error loading user", err);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  // Login
  const login = async (email: string, password: string) => {
    try {
      const storedData = await AsyncStorage.getItem("userData");
      if (!storedData) return false; 

      const { name, userEmail, userPassword } = JSON.parse(storedData);
      if (email === userEmail && password === userPassword) {
        const loggedInUser = { name, email: userEmail };
        setUser(loggedInUser);
        await AsyncStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
        return true;
      }
      return false; // invalid credentials
    } catch (err) {
      console.log("Login error", err);
      return false;
    }
  };

  // Signup
  const signup = async (name: string, email: string, password: string) => {
    try {
      await AsyncStorage.setItem(
        "userData",
        JSON.stringify({ name, userEmail: email, userPassword: password })
      );
      const newUser = { name, email };
      setUser(newUser);
      await AsyncStorage.setItem("loggedInUser", JSON.stringify(newUser));
      return true;
    } catch (err) {
      console.log("Signup error", err);
      return false;
    }
  };

  // Logout
  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("loggedInUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
