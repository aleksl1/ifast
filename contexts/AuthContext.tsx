import { handleSignIn, handleSignOut, handleSignUp } from "@/api/auth";
import { SignInData } from "@/types/auth.types";
import { User } from "firebase/auth";
import { createContext, useState, useContext } from "react";

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<User | null>(null);

  const signIn = async (userData: SignInData) => {
    const user = await handleSignIn(userData);
    if (user) {
      setUser(user);
    } else {
      alert("sign in error");
    }
  };

  const signUp = async (userData: SignInData) => {
    const user = await handleSignUp(userData);
    if (user) {
      setUser(user);
    } else {
      alert("register error");
    }
  };

  const signOut = async () => {
    await handleSignOut();
    setUser(null);
  };

  const value = {
    user,
    signIn,
    signUp,
    signOut,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
