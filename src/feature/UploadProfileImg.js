import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React from "react";
import { storage } from "../firebase/config";

const UploadProfileImg = (file, filepath) => {
  return new Promise(async (resolve, reject) => {
    const storageRef = ref(storage, filepath);
    try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      resolve(url);
    } catch (err) {
      reject(err);
    }
  });
};

export default UploadProfileImg;
