import React from "react";
import { Button, Box } from "@mui/material";

const LoadMoreButton = ({ increasePageSize }) => {
  return (
    <Box textAlign="center">
      <Button variant="text" onClick={increasePageSize} sx={{ marginTop: 2 }}>
        Load More
      </Button>
    </Box>
  );
};

export default LoadMoreButton;
