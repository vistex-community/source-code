import { Avatar, Box } from "@mui/material";
import { getInitialName } from "../../common/helpers/Util";

const UserProfile = ({ size, name }) => {
  return (
    <Box>
      {size ? (
        <Avatar
          sx={{
            width: size.width,
            height: size.height,
            color: "#121212",
            // bgcolor: "#757575",
          }}
        >
          {getInitialName(name)}
        </Avatar>
      ) : (
        <Avatar sx={{ color: "#121212" }}>{getInitialName(name)}</Avatar>
      )}
    </Box>
  );
};

export default UserProfile;
