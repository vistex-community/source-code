import { formatDateTime } from "../helpers/Util";
import { Typography } from "@mui/material";

const Timestamp = ({ timestamp }) => {
  return (
    <Typography variant="body2" sx={{ fontSize: "13px" }}>
      {formatDateTime(timestamp)}
    </Typography>
  );
};

export default Timestamp;
