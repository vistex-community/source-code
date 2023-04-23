import { Box } from "@mui/material";
import error from "../images/svg/page_not_found.svg";

const ErrorPage = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ marginTop: 1 }}
    >
      <img src={error} alt="Error Page" />
    </Box>
  );
};

export default ErrorPage;
