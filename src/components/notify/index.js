import { Close } from "@mui/icons-material";
import { Alert, Collapse, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alerts, showalerts } from "../../store";

const Notify = () => {
  const alertRef = React.useRef();
  const dispatch = useDispatch();
  const { isAlert, severity, message, timeout } = useSelector(showalerts);
  React.useEffect(() => {
    alertRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
    let timer;
    if (timeout) {
      timer = setTimeout(() => dispatch(Alerts({ isAlert: false })), timeout);
    }
    return () => clearTimeout(timer);
  }, [timeout]);
  return (
    <Box sx={{ mb: 2 }} ref={alertRef}>
      <Collapse in={isAlert}>
        <Alert
          severity={severity}
          action={
            <IconButton
              aria-label="Close"
              size="small"
              onClick={() => dispatch(Alerts({ isAlert: false }))}
            >
              <Close fontSize="small" />
            </IconButton>
          }
        >
          {message}
        </Alert>
      </Collapse>
    </Box>
  );
};

export default Notify;
