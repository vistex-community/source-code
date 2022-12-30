import { Box, CircularProgress, Typography } from "@mui/material";

const Loader = ({ isPending }) => {
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {isPending && (
        <Box>
          <CircularProgress color="inherit" />
        </Box>
      )}
    </Box>
  );
};

export default Loader;
