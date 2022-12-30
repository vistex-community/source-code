import { Avatar, Grid, Typography, Paper, Stack } from "@mui/material";
import parse from "html-react-parser";
import Timestamp from "../../common/components/Timestamp";
import UserProfile from "../user/UserProfile";

const AnswerItem = ({ answer }) => {
  return (
    <Grid item xs={12} sx={{ marginBottom: 2 }}>
      <Paper elevation={3} sx={{ padding: 3, display: "flex" }}>
        <Stack direction="row">
          <UserProfile
            size={{ width: "56px", height: "56px" }}
            name={answer.author}
          ></UserProfile>
          <Stack sx={{ marginLeft: 2 }}>
            <Typography variant="subtitle2">{answer.author}</Typography>
            <Timestamp timestamp={answer.timestamp}></Timestamp>
            <Stack sx={{ fontSize: "14px" }}>{parse(answer.body)}</Stack>
          </Stack>
        </Stack>
      </Paper>
    </Grid>
  );
};

export default AnswerItem;
