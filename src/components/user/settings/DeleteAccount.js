import { DeleteForever } from "@mui/icons-material";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { deleteUser } from "firebase/auth";
import React from "react";
import { useDispatch } from "react-redux";
import DeleteUserFiles from "../../../feature/DeleteUserFiles";
import { auth } from "../../../firebase/config";
import { Alerts, modalOpen } from "../../../store";

const DeleteAccount = () => {
  const dispatch = useDispatch();
  const authdata = auth;
  const user = authdata.currentUser;
  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(Alerts({ isloading: true }));
    try {
      await DeleteUserFiles("gallery", user);
      await deleteUser(user);
      dispatch(modalOpen({ isOpen: false }));
      dispatch(
        Alerts({
          isAlert: true,
          severity: "success",
          message: "Your account has been deleted",
          timeout: 8000,
          location: "main",
        })
      );
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
    <form onSubmit={handleSubmit}>
      <DialogContent dividers>
        <DialogContentText>
          Are you sure you want to delete your account, This will remove all
          your activities on the site
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" type="submit" endIcon={<DeleteForever />}>
          Delete Account
        </Button>
      </DialogActions>
    </form>
  );
};

export default DeleteAccount;
