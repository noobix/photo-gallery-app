import { doc, collection, setDoc, serverTimestamp } from "firebase/firestore";
import { firestore } from "../firebase/config";

const AddDocument = (collectionName, documentobj, id) => {
  const docRef = doc(collection(firestore, collectionName), id);
  return setDoc(docRef, { ...documentobj, timestamp: serverTimestamp() });
};
export default AddDocument;
