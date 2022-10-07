import { DialogActions, DialogContent, DialogContentText } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../../firebase/config";
import { Alerts, unpdateAccountEmail } from "../../../store";
import EmailField from "../inputs/emailField";
import SubmitButton from "../inputs/submitButton";

const ChangeEmail = () => {
  const authdata = auth;
  const user = authdata.currentUser;
  const emailRef = React.useRef();
  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(Alerts({ isloading: true }));
    dispatch(unpdateAccountEmail(emailRef.current.value));
    setTimeout(() => dispatch(Alerts({ isloading: false })), 1000);
  }
  return (
    <form onSubmit={handleSubmit}>
      <DialogContent dividers>
        <DialogContentText>Please enter your new email</DialogContentText>
        <EmailField {...{ emailRef, defaultValue: user?.email }} />
      </DialogContent>
      <DialogActions>
        <SubmitButton />
      </DialogActions>
    </form>
  );
};

export default ChangeEmail;
