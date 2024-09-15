import { setDoc, doc, getDocs, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { FastOptionsDocument } from "@/types/fastTypes";

// const fastingOptions = {
//   16: {
//     label: "post 16 godzinny",
//     value: 16,
//     description:
//       "Post trwający 16 godzin, znany jako metoda 16:8, gdzie pościsz przez 16 godzin, a masz okno jedzenia przez 8 godzin.",
//   },
//   18: {
//     label: "post 18 godzinny",
//     value: 18,
//     description:
//       "Post trwający 18 godzin, znany jako metoda 18:6, gdzie pościsz przez 18 godzin, a masz okno jedzenia przez 6 godzin.",
//   },
//   20: {
//     label: "post 20 godzinny",
//     value: 20,
//     description:
//       "Post trwający 20 godzin, znany jako metoda 20:4, gdzie pościsz przez 20 godzin, a masz okno jedzenia przez 4 godziny.",
//   },
//   36: {
//     label: "post 36 godzinny",
//     value: 36,
//     description:
//       "Post trwający 36 godzin, dłuższa forma postu, stosowana rzadziej. Polega na całkowitym powstrzymaniu się od jedzenia przez 36 godzin.",
//   },
//   48: {
//     label: "post 48 godzinny",
//     value: 48,
//     description:
//       "Post trwający 48 godzin, dłuższa forma postu, wymagająca większej ostrożności. Powstrzymujesz się od jedzenia przez 48 godzin.",
//   },
// };

// export const postFastingOptions = async () => {
//   try {
//     // Loop through each fasting option and create a document for each one
//     for (const key in fastingOptions) {
//       const fastingOption = fastingOptions[key];

//       // Reference to the document in "fastOptions" collection, using the key as the document ID
//       const fastingOptionDoc = doc(db, "fastOptions", key);

//       // Set the document with the fasting option data
//       await setDoc(fastingOptionDoc, fastingOption);
//     }

//     console.log("Fasting options successfully added to Firestore!");
//   } catch (error) {
//     console.error("Error adding fasting options to Firestore: ", error);
//   }
// };

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
