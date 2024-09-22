import { FastOptionsDocument, UserFastType } from "@/types/fastTypes";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

export const fetchFastOptions = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "fastOptions"));
    const fastOptions = querySnapshot.docs.map((doc) => doc.data());
    if (!fastOptions) {
      throw new Error();
    }
    return fastOptions as FastOptionsDocument[];
  } catch (error) {
    console.error("Error fetching fastOptions: ", error);
    return [];
  }
};

export const createFastRecord = async ({
  userId,
  fastOptionId,
  startTime = new Date().toLocaleDateString(),
  endTime = null,
  status = "ongoing",
  notes = "",
}: UserFastType) => {
  try {
    const fastsCollection = collection(db, "fasts");

    // Add a new document with a generated ID
    const docRef = await addDoc(fastsCollection, {
      userId,
      fastOptionId,
      // startTime: Timestamp.fromDate(new Date(startTime)),
      // endTime: endTime ? Timestamp.fromDate(new Date(endTime)) : null,
      status,
      notes,
    });

    console.log("Fast record created with ID: ", docRef.id);
  } catch (error) {
    console.error("Error creating fast record: ", error);
  }
};

export const getFastsForUser = async (userId: string) => {
  try {
    const fastsCollection = collection(db, "fasts");
    const q = query(fastsCollection, where("userId", "==", userId));

    const querySnapshot = await getDocs(q);
    const fastRecords: UserFastType[] = [];

    querySnapshot.forEach((doc) => {
      fastRecords.push({ id: doc.id, ...doc.data() });
    });
    console.log({ fastRecords });
    console.log("Fasting records for user: ", fastRecords);
    return fastRecords;
  } catch (error) {
    console.error("Error fetching fasting records: ", error);
  }
};

export const updateFastRecord = async (
  fastId: string,
  updates: UserFastType,
) => {
  try {
    const fastDoc = doc(db, "fasts", fastId);

    // Add the updates to the document
    await updateDoc(fastDoc, updates);

    console.log("Fast record updated.");
  } catch (error) {
    console.error("Error updating fast record: ", error);
  }
};

export const deleteFastRecord = async (fastId: string) => {
  try {
    const fastDoc = doc(db, "fasts", fastId);
    await deleteDoc(fastDoc);

    console.log("Fast record deleted.");
  } catch (error) {
    console.error("Error deleting fast record: ", error);
  }
};
