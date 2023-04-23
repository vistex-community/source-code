import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import copy from "copy-to-clipboard";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setMessage } from "../../features/message/messageSlice";

const Share = ({ open, setOpen, title }) => {
  const dispatch = useDispatch();
  const url = window.location.href;

  const handleClose = () => {
    setOpen(false);
  };

  const handleContentCopy = () => {
    copy(url);
    dispatch(
      setMessage({
        text: "Copied to clipboard",
      })
    );
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          id="url"
          label={url}
          type="text"
          fullWidth
          disabled
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleContentCopy}>
                  <ContentCopyIcon></ContentCopyIcon>
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Share;
