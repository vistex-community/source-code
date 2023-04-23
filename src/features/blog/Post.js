import { Link, Grid, Typography, Paper, Stack, Zoom } from "@mui/material";
import Tags from "../../common/components/Tags";
import Timestamp from "../../common/components/Timestamp";
import UserProfile from "../user/UserProfile";
import { useSelector } from "react-redux";
import { BLOGS } from "../../constants/routes";

const Post = ({ index, post }) => {
  const delay = index * 300 + "ms";

  return (
    <Grid item xs={12} sx={{ marginBottom: 2 }}>
      <Zoom in={true} style={{ transitionDelay: delay }}>
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            display: "flex",
            "&:hover": {
              boxShadow: 10,
            },
          }}
        >
          <Grid container>
            <Grid item xs={10}>
              <Stack direction="row">
                <UserProfile
                  size={{ width: "56px", height: "56px" }}
                  name={post.author}
                ></UserProfile>

                <Stack sx={{ marginLeft: 2 }}>
                  <Typography variant="subtitle2">{post.author}</Typography>
                  <Timestamp timestamp={post.timestamp}></Timestamp>
                  <Link
                    href={`${BLOGS}/${post.id}`}
                    underline="none"
                    sx={{ marginTop: 2, marginRight: 2, cursor: "pointer" }}
                  >
                    {post.title}
                  </Link>
                  <Tags tags={post.tags}></Tags>
                </Stack>
              </Stack>
            </Grid>
            <Grid item md={2}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={3}
                sx={{ marginLeft: 9, marginTop: 2 }}
              >
                <Stack display="flex" alignItems="center">
                  <Typography variant="subtitle2">{post.likes}</Typography>
                  <Typography variant="body2">Likes</Typography>
                </Stack>
                <Stack display="flex" alignItems="center">
                  <Typography variant="subtitle2">{post.views}</Typography>
                  <Typography variant="body2">Views</Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Zoom>
    </Grid>
  );
};

export default Post;
