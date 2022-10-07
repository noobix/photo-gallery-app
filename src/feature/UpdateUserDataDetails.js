import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
  doc,
} from "firebase/firestore";
import { firestore } from "../firebase/config";

const UpdateUserDataDetails = (collectionName, uid, updateObj) => {
  return new Promise(async (resolve, reject) => {
    const dataQuery = query(
      collection(firestore, collectionName),
      where("uid", "==", uid)
    );
    try {
      const snapshot = await getDocs(dataQuery);
      const updatePromises = [];
      snapshot.forEach((data) => {
        updatePromises.push(
          updateDoc(doc(firestore, collectionName, data.id), updateObj)
        );
      });
      await Promise.all(updatePromises);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

export default UpdateUserDataDetails;
