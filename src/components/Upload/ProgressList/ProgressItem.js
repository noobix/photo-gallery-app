import { CheckCircleOutline } from "@mui/icons-material";
import { Box, ImageListItem } from "@mui/material";
import React from "react";
import { v4 as uuid } from "uuid";
import CircularPregressWithLabel from "./CircularPregressWithLabel";
import UploadFileProgress from "../../../feature/UploadFileProgress";
import AddDocument from "../../../feature/AddDocument";
import { useDispatch } from "react-redux";
import { Alerts } from "../../../store";
import { auth } from "../../../firebase/config";

const ProgressItem = ({ file }) => {
  const [progress, setprogress] = React.useState(100);
  const [imageURL, setimageURL] = React.useState(null);
  const authdata = auth;
  const user = authdata.currentUser;
  const dispatch = useDispatch();
  React.useEffect(() => {
    const uploadImage = async () => {
      const imageName = uuid() + "." + file.name.split(".").pop();
      try {
        const url = await UploadFileProgress(
          file,
          `gallery/${user?.uid}`,
          imageName,
          setprogress
        );
        const gallerDoc = {
          imageURL: url,
          uid: user?.uid || "",
          uEmail: user?.email || "",
          uName: user?.displayName || "",
          uPhoto: user?.photoURL || "",
        };
        await AddDocument("gallery", gallerDoc, imageName);
        setimageURL(null);
      } catch (err) {
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
    };
    setimageURL(URL.createObjectURL(file));
    uploadImage();
  }, [file]);
  return (
    imageURL && (
      <ImageListItem cols={1} rows={1}>
        <img src={imageURL} alt="..." loading="lazy" />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(0,0,0,0.4)",
          }}
        >
          {progress < 100 ? (
            <CircularPregressWithLabel value={progress} />
          ) : (
            <CheckCircleOutline
              sx={{ width: 60, height: 60, color: "rgb(144,238,144)" }}
            />
          )}
        </Box>
      </ImageListItem>
    )
  );
};

export default ProgressItem;
