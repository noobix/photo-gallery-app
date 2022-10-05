import { doc, deleteDoc } from "firebase/firestore";
import { firestore } from "../firebase/config";

const DeleteDocument = (collectionName, documentId) => {
  return deleteDoc(doc(firestore, collectionName, documentId));
};

export default DeleteDocument;
