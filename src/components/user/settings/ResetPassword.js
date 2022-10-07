import { DialogActions, DialogContent, DialogContentText } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { Alerts, resetPassword } from "../../../store";
import EmailField from "../inputs/emailField";
import SubmitButton from "../inputs/submitButton";

const ResetPassword = () => {
  const emailRef = React.useRef();
  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(Alerts({ isloading: true }));
    dispatch(resetPassword(emailRef.current.value));
    setTimeout(() => dispatch(Alerts({ isloading: false })), 3000);
  }
  return (
    <form onSubmit={handleSubmit}>
      <DialogContent dividers>
        <DialogContentText>Please verify your email address</DialogContentText>
        <EmailField {...{ emailRef }} />
      </DialogContent>
      <DialogActions>
        <SubmitButton />
      </DialogActions>
    </form>
  );
};

export default ResetPassword;
