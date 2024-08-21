import { auth } from "@/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, "test@test.pl", "123456");
      const user = userCredential.user;
      console.log("Signed in as:", user.email);
      // Do something after sign in, like navigating to another screen
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  export const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, "email", "password");
      const user = userCredential.user;
      console.log("Signed up as:", user.email);
      // Do something after sign up, like navigating to another screen
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };