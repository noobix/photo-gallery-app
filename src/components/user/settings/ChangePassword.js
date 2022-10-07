import { DialogActions, DialogContent, DialogContentText } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { Alerts, updateAccountPassword } from "../../../store";
import PasswordField from "../inputs/passwordField";
import SubmitButton from "../inputs/submitButton";

const ChangePassword = () => {
  const passwordRef = React.useRef();
  const confirmPasswordRef = React.useRef();
  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(Alerts({ isloading: true }));
    if (passwordRef.current.value === confirmPasswordRef.current.value) {
      dispatch(
        Alerts({
          isAlert: true,
          severity: "error",
          message: "Password mismatch",
          timeout: 5000,
          location: "modal",
        })
      );
    }
    dispatch(updateAccountPassword(passwordRef.current.value));
    setTimeout(() => dispatch(Alerts({ isloading: false })), 1000);
  }
  return (
    <form onSubmit={handleSubmit}>
      <DialogContent dividers>
        <DialogContentText>Please enter your new password</DialogContentText>
        <PasswordField {...{ passwordRef }} />
        <PasswordField
          {...{
            passwordRef: confirmPasswordRef,
            id: "confirmPassword",
            label: "Confirm Password",
            autoFocus: false,
          }}
        />
      </DialogContent>
      <DialogActions>
        <SubmitButton />
      </DialogActions>
    </form>
  );
};

export default ChangePassword;
