import { Close } from "@mui/icons-material";
import { Alert, Button, Collapse, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../../firebase/config";
import { Alerts, verifyEmail } from "../../../store";

const Verification = () => {
  const [isOpen, setisOpen] = React.useState(true);
  const [isClicked, setisClicked] = React.useState(false);
  const dispatch = useDispatch();
  const authdata = auth.currentUser;
  const isVerified =
    !authdata?.currentUser?.emailVerified === null
      ? authdata.currentUser.emailVerified
      : false;
  function verify() {
    setisClicked(true);
    dispatch(Alerts({ isloading: true }));
    dispatch(verifyEmail(authdata));
    setTimeout(() => dispatch(Alerts({ isloading: false })), 3000);
  }
  return (
    authdata &&
    isVerified === false && (
      <Box>
        <Collapse in={isOpen}>
          <Alert
            severity="warning"
            action={
              <IconButton
                aria-label="Close"
                size="small"
                onClick={() => setisOpen(false)}
              >
                <Close fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 3 }}
          >
            Your email has not been verified
            <Button
              size="small"
              onClick={verify}
              disabled={isClicked}
              sx={{ lineHeight: "initial" }}
            >
              verify account
            </Button>
          </Alert>
        </Collapse>
      </Box>
    )
  );
};

export default Verification;
