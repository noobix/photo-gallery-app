import { DialogActions, DialogContent, DialogContentText } from "@mui/material";
import { EmailAuthProvider } from "firebase/auth";
import React from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../../firebase/config";
import { Alerts, userAccountSettings } from "../../../store";
import PasswordField from "../inputs/passwordField";
import SubmitButton from "../inputs/submitButton";

const ReAuth = ({ action }) => {
  const passwordRef = React.useRef();
  const dispatch = useDispatch();
  const authdata = auth;
  const user = authdata.currentUser;
  function handleSubmit(e) {
    e.preventDefault();
    const credentails = EmailAuthProvider.credential(
      user?.email,
      passwordRef.current.value
    );
    dispatch(Alerts({ isloading: true }));
    const token = {
      action: action,
      credentails: credentails,
    };
    dispatch(userAccountSettings(token));
    setTimeout(() => dispatch(Alerts({ isloading: false })), 1000);
  }
  return (
    <form onSubmit={handleSubmit}>
      <DialogContent dividers>
        <DialogContentText>
          Please enter your current password
        </DialogContentText>
        <PasswordField {...{ passwordRef }} />
      </DialogContent>
      <DialogActions>
        <SubmitButton />
      </DialogActions>
    </form>
  );
};

export default ReAuth;
