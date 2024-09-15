import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { UserData } from "@/types/user.types";

export const fetchUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "Users"));
    const usersList = querySnapshot.docs.map((doc) => doc.data());
    console.log("Users:", usersList);
    return usersList;
  } catch (error) {
    console.error("Error fetching users: ", error);
  }
};

export const createUser = async ({ uid, email }: UserData) => {
  try {
    await setDoc(doc(db, "Users", uid), {
      email,
    });
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to create user");
  }
};
