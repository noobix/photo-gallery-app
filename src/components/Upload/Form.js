import { Fab, Input } from "@mui/material";
import React from "react";
import { Add } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { authdata, modalOpen } from "../../store";
import Login from "../user/login";

const Form = ({ setfiles }) => {
  const fileRef = React.useRef();
  const dispatch = useDispatch();
  const { user } = useSelector(authdata);
  const handleClick = () => {
    if (!user) {
      return dispatch(
        modalOpen({ isOpen: true, title: "Login", content: <Login /> })
      );
    }
    fileRef.current.click();
  };
  const handleChange = (e) => {
    setfiles([...e.target.files]);
    fileRef.current.value = null;
  };
  return (
    <form>
      <Input
        type="file"
        inputProps={{ multiple: true }}
        sx={{ display: "none" }}
        inputRef={fileRef}
        onChange={handleChange}
      />
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleClick}
        style={{ zIndex: 0 }}
      >
        <Add fontSize="large" />
      </Fab>
    </form>
  );
};

export default Form;
