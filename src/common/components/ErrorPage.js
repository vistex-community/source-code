import { Box } from "@mui/material";
import error from "../../images/svg/page_not_found.svg";

const ErrorPage = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" margin={10}>
      <img src={error} alt="Error Page" height="370" />
    </Box>
  );
};

export default ErrorPage;
