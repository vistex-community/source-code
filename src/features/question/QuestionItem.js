import { Link, Grid, Typography, Paper, Stack, Zoom } from "@mui/material";

import Tags from "../../common/components/Tags";
import Timestamp from "../../common/components/Timestamp";
import UserProfile from "../user/UserProfile";
import { useSelector } from "react-redux";
import { QUESTIONS } from "../../constants/routes";

const Question = ({ index, question }) => {
  const { data: answers, isPending } = useSelector((state) => state.answer);

  const ansCount = !isPending
    ? answers.filter((answer) => answer.qid === question.id).length
    : 0;

  const delay = index * 300 + "ms";

  return (
    <Grid item xs={12} sx={{ marginBottom: 2 }}>
      <Zoom in="true" style={{ transitionDelay: delay }}>
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
            <Grid item xs={9}>
              <Stack direction="row">
                <UserProfile
                  size={{ width: "56px", height: "56px" }}
                  name={question.author}
                ></UserProfile>

                <Stack sx={{ marginLeft: 2 }}>
                  <Typography variant="subtitle2">{question.author}</Typography>
                  <Timestamp timestamp={question.timestamp}></Timestamp>
                  <Link
                    href={`${QUESTIONS}/${question.id}`}
                    underline="none"
                    sx={{ marginTop: 2, marginRight: 2, cursor: "pointer" }}
                  >
                    {question.title}
                  </Link>
                  <Tags tags={question.tags}></Tags>
                </Stack>
              </Stack>
            </Grid>
            <Grid item md={3}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={3}
                sx={{ marginLeft: 9, marginTop: 2 }}
              >
                <Stack display="flex" alignItems="center">
                  <Typography variant="subtitle2">{ansCount}</Typography>
                  <Typography variant="body2">Answers</Typography>
                </Stack>
                <Stack display="flex" alignItems="center">
                  <Typography variant="subtitle2">{question.likes}</Typography>
                  <Typography variant="body2">Likes</Typography>
                </Stack>
                <Stack display="flex" alignItems="center">
                  <Typography variant="subtitle2">{question.views}</Typography>
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

export default Question;
