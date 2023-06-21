import { Google } from "@mui/icons-material";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import {
  Alerts,
  authWithGoogle,
  modalOpen,
  registerUser,
  signInUser,
} from "../../../store";
import EmailField from "../inputs/emailField";
import PasswordField from "../inputs/passwordField";
import SubmitButton from "../inputs/submitButton";
import ResetPassword from "../settings/ResetPassword";

const Login = () => {
  const emailRef = React.useRef();
  const passwordRef = React.useRef();
  const confirmPasswordRef = React.useRef();
  const [isRegister, setisRegister] = React.useState(false);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(Alerts({ isloading: true }));
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (isRegister) {
      const confirmPassword = confirmPasswordRef.current.value;
      try {
        if (password !== confirmPassword) {
          throw new Error("Passwords Don't Match");
        }
        const regdata = { email, password };
        dispatch(registerUser(regdata));
        dispatch(modalOpen({ isOpen: false }));
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
    } else {
      try {
        dispatch(signInUser({ email, password }));
        dispatch(modalOpen({ isOpen: false }));
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
    }
    setTimeout(() => dispatch(Alerts({ isloading: false })), 1000);
  };
  const handleGoogleAccount = () => {
    dispatch(authWithGoogle());
    dispatch(modalOpen({ isOpen: false }));
  };
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <DialogContentText>
            Please enter your email and your password here:
          </DialogContentText>
          <EmailField {...{ emailRef }} />
          <PasswordField {...{ passwordRef, autoFocus: false }} />
          {isRegister && (
            <PasswordField
              {...{
                passwordRef: confirmPasswordRef,
                id: "confirmPassword",
                label: "Confirm Password",
                autoFocus: false,
              }}
            />
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-between", px: "19px" }}>
          <Button
            size="small"
            onClick={() =>
              dispatch(
                modalOpen({
                  isOpen: true,
                  title: "Reset Password",
                  content: <ResetPassword />,
                })
              )
            }
          >
            Forgot Password ?
          </Button>
          <SubmitButton />
        </DialogActions>
      </form>
      <DialogActions sx={{ justifyContent: "left", p: "5px 24px" }}>
        {isRegister
          ? "Do you have an account, Sign In now"
          : "Don't have an account, Create one now"}
        <Button onClick={() => setisRegister(!isRegister)}>
          {isRegister ? "Login" : "Register"}
        </Button>
      </DialogActions>
      <DialogActions sx={{ justifyContent: "center", py: "24px" }}>
        <Button
          variant="outlined"
          startIcon={<Google />}
          onClick={handleGoogleAccount}
        >
          Login with google
        </Button>
      </DialogActions>
    </React.Fragment>
  );
};

export default Login;
