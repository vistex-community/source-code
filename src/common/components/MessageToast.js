import { useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const Message = ({ message, setMessage }) => {
  let { vertical, horizontal } = message.position;
  const [isOpen, setIsOpen] = useState(true);
  const handleClose = () => {
    setIsOpen(false);
    setMessage(undefined);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      autoHideDuration={4000}
      onClose={handleClose}
      open={isOpen}
      key={message.text}
    >
      <Alert
        iconMapping={{
          success: <CheckCircleOutlineIcon fontSize="inherit" />,
        }}
        severity="success"
        onClose={handleClose}
      >
        {message.text}
      </Alert>
    </Snackbar>
  );
};

export default Message;
