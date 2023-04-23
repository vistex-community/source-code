import { Typography, Button, Stack, Paper, Grid } from "@mui/material";
import { BLOG_ADD_POST, QUESTIONS_ADD_QUESTION } from "../../constants/routes";
import community from "../../images/svg/community.svg";
const Header = () => {
  return (
    <Paper sx={{ padding: 4 }}>
      <Grid
        container
        spacing={3}
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid item lg={3.5}>
          <img src={community} alt="Community" height="250px"></img>
        </Grid>
        <Grid item lg={8.5}>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Typography component="h1" variant="h4">
              Welcome to Vistex Community!
            </Typography>
            <Typography component="h3" variant="subtitle1">
              Members around the world are invited to post questions and share
              their knowledge. Join the community and help others.
            </Typography>

            <Stack direction="row">
              <Button
                variant="contained"
                size="large"
                href={QUESTIONS_ADD_QUESTION}
              >
                Ask Question
              </Button>
              <Button
                variant="contained"
                size="large"
                href={BLOG_ADD_POST}
                sx={{ marginLeft: 2 }}
              >
                Write Blog Post
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Header;
