import { ref, deleteObject } from "firebase/storage";
import { storage } from "../firebase/config";

const DeleteImage = (filepath) => {
  const imageRef = ref(storage, filepath);
  return deleteObject(imageRef);
};

export default DeleteImage;
