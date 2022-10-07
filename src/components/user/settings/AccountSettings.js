import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../../firebase/config";
import { googleAccountSettings, modalOpen } from "../../../store";
import ReAuth from "./ReAuth";

const AccountSettings = () => {
  const authdata = auth;
  const user = authdata.currentUser;
  const dispatch = useDispatch();
  const isProvider = user.providerData[0].providerId === "password";
  async function handleAction(action) {
    if (isProvider) {
      dispatch(
        modalOpen({
          isOpen: true,
          title: "Enter Login Password",
          content: <ReAuth {...{ action }} />,
        })
      );
    } else {
      dispatch(googleAccountSettings(action));
    }
  }
  return (
    <React.Fragment>
      <DialogContent dividers>
        <DialogContentText>
          To enable this features you are required to login with your
          credentials
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ flexDirection: "column", gap: 2, my: 3 }}>
        {isProvider && (
          <Button onClick={() => handleAction("change_password")}>
            Change Password
          </Button>
        )}
        <Button onClick={() => handleAction("change_email")}>
          Change Email
        </Button>
        <Button onClick={() => handleAction("remove_account")}>
          Delete Account
        </Button>
      </DialogActions>
    </React.Fragment>
  );
};

export default AccountSettings;
