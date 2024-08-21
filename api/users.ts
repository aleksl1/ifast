import { getFirestore, collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig"

export const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Users"));
      const usersList = querySnapshot.docs.map(doc => doc.data());
      console.log("Users:", usersList);
      return usersList;
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  };