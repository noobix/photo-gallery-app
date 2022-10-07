import { TextField } from "@mui/material";
import React from "react";

const EmailField = ({ emailRef, defaultValue = "", autoFocus = true }) => {
  return (
    <TextField
      autoFocus={autoFocus}
      margin="normal"
      variant="standard"
      id="email"
      label="Email Address"
      type="email"
      fullWidth
      required
      inputRef={emailRef}
      defaultValue={defaultValue}
    />
  );
};

export default EmailField;
