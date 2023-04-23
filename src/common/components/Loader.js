import { Box, CircularProgress, Typography } from "@mui/material";

const Loader = ({ isPending }) => {
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {isPending && (
        <Box>
          <CircularProgress />
          <Typography sx={{ marginTop: 1 }} variant="subtitle1">
            Loading...
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Loader;
