import { Dialog, DialogTitle, IconButton } from "@mui/material";
import React from "react";
import { authdata, modalOpen, showalerts } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { Close } from "@mui/icons-material";
import Notify from "../notify";

const Modal = () => {
  const modal = useSelector(authdata);
  const { location, isAlert } = useSelector(showalerts);
  const dispatch = useDispatch();
  const { isOpen, title, content } = modal;
  const handleClose = () => {
    dispatch(modalOpen({ isOpen: false }));
  };
  React.useEffect(() => {
    if (isOpen) {
      if (isAlert && location === "modal") {
        dispatch(modalOpen({ isOpen: false }));
      }
    }
  }, [isOpen]);
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>
        {title}
        <IconButton
          aria-label="Close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      {location === "modal" && <Notify />}
      {content}
    </Dialog>
  );
};

export default Modal;
