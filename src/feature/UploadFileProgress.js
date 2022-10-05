import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase/config";

const UploadFileProgress = (file, subfolder, imageName, setprogress) => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, subfolder + "/" + imageName);
    const upload = uploadBytesResumable(storageRef, file);
    upload.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setprogress(progress);
      },
      (error) => {
        reject(error);
      },
      async () => {
        try {
          const url = await getDownloadURL(storageRef);
          resolve(url);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};

export default UploadFileProgress;
