import { Container, Button, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import TextEditor from "../../common/components/TextEditor";

const AddFeedback = () => {
  return (
    <Paper elevation={2} sx={{ paddingY: 5 }}>
      <Container sx={{ marginLeft: 2 }}>
        <Grid container spacing={5}>
          <Grid item md={10}>
            <Typography sx={{ mb: 1 }}>Feedback</Typography>
            <TextEditor placeholder="If you have any suggestions, please mention here."></TextEditor>
            <Button variant="contained" sx={{ marginTop: 1 }}>
              Save
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
};

export default AddFeedback;
