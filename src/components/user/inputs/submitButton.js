import { Send } from "@mui/icons-material";
import { Button } from "@mui/material";

const SubmitButton = () => {
  return (
    <Button type="submit" endIcon={<Send />} variant="contained">
      Submit
    </Button>
  );
};

export default SubmitButton;
