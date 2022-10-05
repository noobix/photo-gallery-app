import React from "react";
import { useSelector } from "react-redux";
import { showalerts } from "../../store";
import Notify from "../notify";

const NotificationMain = () => {
  const { location } = useSelector(showalerts);
  return location === "main" && <Notify />;
};

export default NotificationMain;
