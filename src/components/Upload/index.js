import React from "react";
import Form from "./Form";
import ProgressList from "./ProgressList";

export const Upload = () => {
  const [files, setfiles] = React.useState([]);
  return (
    <div>
      <Form setfiles={setfiles} />
      <ProgressList files={files} />
    </div>
  );
};
