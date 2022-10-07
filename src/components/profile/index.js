import {
  Avatar,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase/config";
import { Alerts, updateUserProfile } from "../../store";
import SubmitButton from "../user/inputs/submitButton";

const Profile = () => {
  const authdata = auth;
  const user = authdata.currentUser;
  const dispatch = useDispatch();
  const [name, setname] = React.useState(user?.displayName);
  const [file, setfile] = React.useState(null);
  const [photoURL, setphotoURL] = React.useState(user?.photoURL);
  function handleChange(e) {
    const select = e.target.files[0];
    if (select) {
      setfile(select);
      setphotoURL(URL.createObjectURL(select));
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(Alerts({ isloading: true }));
    const userObj = { displayName: name };
    const imagesObj = { uName: name };
    const data = {
      file: file,
      userObj: userObj,
      imagesObj: imagesObj,
    };
    dispatch(updateUserProfile(data));
    setTimeout(() => dispatch(Alerts({ isloading: false })), 1000);
  };
  return (
    <form onSubmit={handleSubmit}>
      <DialogContent dividers>
        <DialogContentText>
          You can update your profile by updating these fields:
        </DialogContentText>
        <TextField
          autoFocus
          margin="normal"
          type="text"
          inputProps={{ minLenght: 2 }}
          fullWidth
          variant="standard"
          value={name || ""}
          required
          onChange={(e) => setname(e.target.value)}
        />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <label htmlFor="photourl">
            <input
              type="file"
              accept="image/*"
              id="photourl"
              style={{ display: "none" }}
              onChange={handleChange}
            />
            <Avatar
              src={photoURL}
              sx={{ height: 75, width: 75, cursor: "pointer" }}
            />
          </label>
        </Box>
      </DialogContent>
      <DialogActions>
        <SubmitButton />
      </DialogActions>
    </form>
  );
};

export default Profile;
