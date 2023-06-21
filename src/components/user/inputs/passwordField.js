import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";

const PasswordField = ({
  passwordRef,
  id = "password",
  label = "Password",
  autoFocus = true,
}) => {
  const [showpassword, setshowpassword] = React.useState(false);
  const handleClick = () => {
    setshowpassword(!showpassword);
  };
  const handleMouseDown = (e) => {
    e.preventDefault();
  };
  return (
    <TextField
      autoFocus={autoFocus}
      margin="normal"
      variant="standard"
      id={id}
      label={label}
      type={showpassword ? "text" : "password"}
      fullWidth
      required
      inputRef={passwordRef}
      inputProps={{
        minLength: 6,
        endadornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="Password Visibility"
              onClick={handleClick}
              onMouseDown={handleMouseDown}
            >
              {showpassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordField;
