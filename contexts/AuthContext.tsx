import { handleSignIn, handleSignOut, handleSignUp } from "@/api/auth";
import { createUser } from "@/api/users";
import { SignInData } from "@/types/auth.types";
import { User } from "firebase/auth";
import { createContext, useState, useContext } from "react";

type AuthContextType = {
  user: User | null;
  signIn: (userData: SignInData) => Promise<void>;
  signUp: (userData: SignInData) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<User | null>(null);

  const signIn = async (userData: SignInData) => {
    const user = await handleSignIn(userData);
    console.log("user?.uid", user?.uid);
    if (user?.uid) {
      createUser({ uid: user?.uid, email: userData.email });
    } else {
      alert("create user error");
    }

    console.log({ user });
    if (user) {
      setUser(user);
    } else {
      alert("sign in error");
    }
  };

  const signUp = async (userData: SignInData) => {
    const user = await handleSignUp(userData);
    console.log("user?.uid", user?.uid);
    if (user?.uid) {
      createUser({ uid: user?.uid, email: userData.email });
    } else {
      alert("create user error");
    }
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
