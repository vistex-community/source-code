import { Snackbar, Alert } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { clearMessage } from "../../features/message/messageSlice";

const Message = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const message = useSelector((state) => state.message);

  useEffect(() => {
    if (message.text) {
      setOpen(true);
    }
  }, [message.text]);

  const handleClose = () => {
    setOpen(false);
    dispatch(clearMessage());
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={3000}
      onClose={handleClose}
      open={open}
      key={message.text}
    >
      <Alert
        iconMapping={{
          success: <CheckCircleOutlineIcon fontSize="inherit" />,
        }}
        severity={message.type}
        onClose={handleClose}
      >
        {message.text}
      </Alert>
    </Snackbar>
  );
};

export default Message;
