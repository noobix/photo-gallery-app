import { Cancel } from "@mui/icons-material";
import CropIcon from "@mui/icons-material/Crop";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Slider,
  Typography,
} from "@mui/material";
import React from "react";
import Cropper from "react-easy-crop";
import { useDispatch } from "react-redux";
import { Alerts, modalOpen } from "../../store";
import getCroppedImg from "./utils/cropImage";

const CropEasy = ({ image, setopenCrop, setphotoURL, setfile }) => {
  const [crop, setcrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setzoom] = React.useState(1);
  const [rotation, setrotation] = React.useState(0);
  const [croppedAreaPixels, setcropedAreaPixels] = React.useState(null);
  const dispatch = useDispatch();
  function cropComplete(croppedArea, croppedAreaPixels) {
    setcropedAreaPixels(croppedAreaPixels);
  }
  async function cropImage() {
    dispatch(Alerts({ isloading: true }));
    try {
      const { file, url } = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation
      );
      setphotoURL(url);
      setfile(file);
      setopenCrop(false);
    } catch (err) {
      dispatch(
        Alerts({
          isAlert: true,
          severity: "error",
          message: err.message,
          timeout: 5000,
          location: "modal",
        })
      );
    }
    setTimeout(() => dispatch(Alerts({ isloading: false })), 2000);
  }
  return (
    <React.Fragment>
      <DialogContent
        dividers
        sx={{
          background: "rgb(105,105,105)",
          position: "relative",
          height: 400,
          width: "auto",
          maxWidth: { sm: 500 },
        }}
      >
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={1}
          onZoomChange={setzoom}
          onRotationChange={setrotation}
          onCropChange={setcrop}
          onCropComplete={cropComplete}
        />
      </DialogContent>
      <DialogActions sx={{ flexDirection: "column", mx: 3, my: 2 }}>
        <Box sx={{ width: "100%", mb: 1 }}>
          <Box>
            <Typography>Zoom: {zoomPercent(zoom)}</Typography>
            <Slider
              valueLabelDisplay="auto"
              valueLabelFormat={zoomPercent}
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e, zoom) => setzoom(zoom)}
            />
          </Box>
          <Box>
            <Typography>Rotation: {rotation}</Typography>
            <Slider
              valueLabelDisplay="auto"
              min={0}
              max={360}
              value={rotation}
              onChange={(e, rotation) => setrotation(rotation)}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Button
            variant="outlined"
            startIcon={<Cancel />}
            onClick={() => setopenCrop(false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            startIcon={<CropIcon />}
            onClick={cropImage}
          >
            Crop
          </Button>
        </Box>
      </DialogActions>
    </React.Fragment>
  );
};

export default CropEasy;
const zoomPercent = (value) => {
  return `${Math.round(value * 100)}%`;
};
