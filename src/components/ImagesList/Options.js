import * as React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Delete, Download, MoreVert } from "@mui/icons-material";
import DeleteDocument from "../../feature/DeleteDocument";
import DeleteImage from "../../feature/DeleteImage";
import { useDispatch, useSelector } from "react-redux";
import { Alerts, authdata } from "../../store";
import { auth } from "../../firebase/config";

export default function Options({ imageId, uid, imageURL }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { user } = useSelector(authdata);
  const login = auth.currentUser;
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = async () => {
    try {
      await DeleteDocument("gallery", imageId);
      await DeleteImage(`gallery/${user.uid}/${imageId}`);
    } catch (err) {
      dispatch(
        Alerts({
          isAlert: true,
          severity: "error",
          message: err.message,
          timeout: 8000,
          location: "main",
        })
      );
    }
  };
  async function handleDownload() {
    try {
      const response = await fetch(imageURL);
      const data = await response.blob();
      const blob = URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = blob;
      link.download = imageId;
      link.click();
      URL.revokeObjectURL(blob);
      link.remove();
    } catch (err) {
      dispatch(
        Alerts({
          isAlert: true,
          severity: "error",
          message: err.message,
          timeout: 8000,
          location: "main",
        })
      );
    }
  }
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Options">
          <IconButton
            onClick={handleClick}
            sx={{
              position: "absolute",
              right: 0,
              top: 0,
              color: "rgb(255,255,255)",
              background: "rgba(0,0,0,0.3)",
            }}
          >
            <MoreVert fontSize="large" />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleDownload}>
          <ListItemIcon>
            <Download />
          </ListItemIcon>
          Download
        </MenuItem>
        {login && login.uid === uid && (
          <MenuItem onClick={handleDelete}>
            <ListItemIcon>
              <Delete />
            </ListItemIcon>
            Delete
          </MenuItem>
        )}
      </Menu>
    </React.Fragment>
  );
}
