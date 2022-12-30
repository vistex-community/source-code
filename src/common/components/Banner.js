import { Typography, Button, Stack, Paper, CardMedia } from "@mui/material";
import community from "../../images/svg/community.svg";

const Header = () => {
  return (
    <Paper>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ padding: 8, paddingBottom: 12 }}
      >
        <Typography component="h1" variant="h4">
          Welcome to Vistex Community!
        </Typography>
        <Typography component="h2">
          Members around the world are invited to post questions and share their
          knowledge. Join the community and help others.
        </Typography>

        <Button variant="contained" size="large" href="/questions/add-question">
          Ask Question
        </Button>
        {/* <img src={community}></img> */}
      </Stack>
    </Paper>
  );
};

export default Header;
