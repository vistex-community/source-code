import { Button, Grid, Paper, Typography, Stack } from "@mui/material";
import {} from "@mui/system";
import React from "react";
import TextEditor from "../../common/components/TextEditor";

const AddComment = () => {
  return (
    <Stack>
      <TextEditor></TextEditor>
      <Button variant="contained" sx={{ marginTop: 1 }}>
        Submit
      </Button>
    </Stack>
  );
};

export default AddComment;
