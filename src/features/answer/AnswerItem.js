import {
  Avatar,
  Grid,
  Typography,
  Paper,
  Stack,
  Button,
  Box,
} from "@mui/material";
import parse from "html-react-parser";
import { useState } from "react";
import Timestamp from "../../common/components/Timestamp";
import UserProfile from "../user/UserProfile";
import PreviewTextEditorContent from "../../common/components/PreviewTextEditorContent";
import ShowVotes from "../../common/components/ShowVotes";
import TextEditor from "../../common/components/TextEditor";
import { useUserAuth } from "../../contexts/UserAuthContext";

const AnswerItem = ({ answer }) => {
  const [showCommentEditor, setShowCommentEditor] = useState(false);
  const { user } = useUserAuth();

  return (
    <Grid item xs={12} sx={{ marginBottom: 2 }}>
      <Paper elevation={3} sx={{ padding: 3, display: "flex" }}>
        <Stack direction="row">
          <Stack>
            <UserProfile
              size={{ width: "56px", height: "56px" }}
              name={answer.author}
            ></UserProfile>
            {/* <ShowVotes votes="0"></ShowVotes> */}
          </Stack>
          <Stack sx={{ marginLeft: 2 }}>
            <Typography variant="subtitle2">{answer.author}</Typography>
            <Timestamp timestamp={answer.timestamp}></Timestamp>
            <PreviewTextEditorContent
              content={answer.body}
            ></PreviewTextEditorContent>
            <Stack direction="row" marginTop={2}>
              <Grid container>
                <Grid item xs={12}>
                  {!showCommentEditor && user && (
                    <Button
                      sx={{ ml: -1 }}
                      onClick={() => {
                        setShowCommentEditor(!showCommentEditor);
                      }}
                    >
                      Add Comment
                    </Button>
                  )}
                  {showCommentEditor && (
                    <Box>
                      <TextEditor></TextEditor>
                      <Stack direction="row" sx={{ mt: 1 }}>
                        <Button variant="contained">Save</Button>
                        <Button
                          variant="outlined"
                          sx={{ ml: 2 }}
                          onClick={() => {
                            setShowCommentEditor(false);
                          }}
                        >
                          Cancel
                        </Button>
                      </Stack>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </Grid>
  );
};

export default AnswerItem;
