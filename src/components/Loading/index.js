import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { showalerts } from "../../store";

const Loading = () => {
  const { isloading } = useSelector(showalerts);
  return (
    <Backdrop
      open={isloading}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 999 }}
    >
      <CircularProgress sx={{ color: "rgb(255,255,255)" }} />
    </Backdrop>
  );
};

export default Loading;
