import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/config";
import DeleteDocument from "../feature/DeleteDocument";
import DeleteImage from "./DeleteImage";

const DeleteUserFiles = (collectionName, currentUser) => {
  return new Promise(async (resolve, reject) => {
    const datapile = query(
      collection(firestore, collectionName),
      where("uid", "==", currentUser.uid)
    );
    try {
      const snapshot = await getDocs(datapile);
      const storagePromises = [];
      const storePromises = [];
      snapshot.forEach((doc) => {
        storePromises.push(DeleteDocument(collectionName, doc.id));
        storagePromises.push(
          DeleteImage(`${collectionName}/${currentUser.uid}/${doc.id}`)
        );
      });
      await Promise.all(storePromises);
      await Promise.all(storagePromises);
      if (currentUser?.photoURL) {
        const file = currentUser?.photoURL
          ?.split(`${currentUser.uid}%2F`)[1]
          ?.split("?")[0];
        if (file)
          try {
            await DeleteImage(`profile/${currentUser.uid}/${file}`);
          } catch (err) {
            console.log(err);
          }
      }
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

export default DeleteUserFiles;
