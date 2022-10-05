import React from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { firestore } from "../firebase/config";
import { useDispatch } from "react-redux";
import { Alerts } from "../store";

const useFirestore = (collectionName = "gallery") => {
  const [documents, setDocuments] = React.useState([]);
  const dispatch = useDispatch();
  React.useEffect(() => {
    const fetch = query(
      collection(firestore, collectionName),
      orderBy("timestamp", "desc")
    );
    const unsubscribe = onSnapshot(
      fetch,
      (snapshot) => {
        const docs = [];
        snapshot.forEach((doc) => {
          docs.push({ id: doc.id, data: doc.data() });
        });
        setDocuments(docs);
      },
      (err) => {
        dispatch(
          Alerts({
            isAlert: true,
            severity: "error",
            message: err.message,
            timeout: 8000,
            location: "main",
          })
        );
      }
    );
    return () => unsubscribe();
  }, [collectionName]);
  return { documents };
};

export default useFirestore;
