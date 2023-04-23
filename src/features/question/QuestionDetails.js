import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Stack,
  Box,
  Button,
  Paper,
} from "@mui/material";

import Answers from "../answer/Answers";
import Tags from "../../common/components/Tags";
import Timestamp from "../../common/components/Timestamp";
import UserProfile from "../user/UserProfile";
import { useSelector, useDispatch } from "react-redux";
import PreviewTextEditorContent from "../../common/components/PreviewTextEditorContent";

import MessageToast from "../../common/components/MessageToast";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Stats from "../../common/components/Stats";
import Share from "../../common/components/Share";
import TextEditor from "../../common/components/TextEditor";
import { getDocs } from "firebase/firestore";
import { updateView } from "../views/viewSlice";
import { useUserAuth } from "../../contexts/UserAuthContext";
import DOC_TYPE from "../../constants/doctype";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { updateQuesViews } from "./questionSlice";
import { getViewExistsWhereClause } from "../views/Util";
import { collection } from "firebase/firestore";
import database from "../../database/firebase";

const QuestionDetails = () => {
  const { questionId } = useParams();
  const [showCommentEditor, setShowCommentEditor] = useState(false);
  const [open, setOpen] = useState(false);
  const state = useSelector((state) => state);
  const { data: questions } = state.question;
  const question = questions.find((question) => question.id === questionId);

  const {
    data: ansData,
    isPending: isAnsPending,
    error: ansError,
  } = state.answer;

  const dispatch = useDispatch();
  const { user } = useUserAuth();
  console.log(user);
  const answers = ansData.filter((answer) => answer.qid === questionId);

  /**Logic to update views */
  useEffect(() => {
    const view = {
      docId: questionId,
      docType: DOC_TYPE.question,
      ipAddress: localStorage.getItem("vs-ipaddress"),
      uid: user?.uid,
      timestamp: Date.now(),
    };
    console.log(view);
    getDocs(getViewExistsWhereClause(view)).then((querySnapshot) => {
      if (!querySnapshot.size) {
        dispatch(updateView(view)).then(() => {
          getDocs(collection(database, "views")).then((snapshot) => {
            const views = snapshot.docs.map((doc) => {
              return {
                ...doc.data(),
                id: doc.id,
              };
            });
            dispatch(updateQuesViews({ questionId, views }));
          });
        });
      } else {
        console.log("view aleady exists");
      }
    });
  }, []);
  /**Logic to update views */
  return (
    <>
      <Container maxWidth="xl" sx={{ marginTop: 3, marginBottom: 5 }}>
        <Grid container>
          <Grid item xs={12} sx={{ marginBottom: 2 }}>
            <MessageToast></MessageToast>
          </Grid>
          {question && (
            <Grid item xs={12} sx={{ marginBottom: 2 }}>
              <Grid container>
                <Grid item xs={10}>
                  <Stack direction="row">
                    <Stack>
                      <UserProfile
                        size={{ width: "56px", height: "56px" }}
                        name={question.author}
                      ></UserProfile>
                      {/* <ShowVotes votes="0" /> */}
                    </Stack>
                    <Stack sx={{ marginLeft: 2 }}>
                      <Typography variant="subtitle2">
                        {question.author}
                      </Typography>
                      <Timestamp timestamp={question.timestamp}></Timestamp>
                      <Typography variant="h5" sx={{ marginTop: 2 }}>
                        {question.title}
                      </Typography>

                      <Stack direction="row" sx={{ marginTop: 1 }}>
                        <Stats
                          Icon={ThumbUpIcon}
                          value={question.likes}
                          clickable={true}
                        ></Stats>
                        <Box sx={{ ml: 2 }}>
                          <Stats
                            Icon={VisibilityIcon}
                            value={question.views}
                          ></Stats>
                        </Box>
                      </Stack>

                      <PreviewTextEditorContent
                        content={question.body}
                      ></PreviewTextEditorContent>

                      <Stack direction="row">
                        <Grid container>
                          <Grid item xs={12}>
                            {!showCommentEditor && (
                              <>
                                {user && (
                                  <Button
                                    sx={{ ml: -1 }}
                                    onClick={() => {
                                      setShowCommentEditor(!showCommentEditor);
                                    }}
                                  >
                                    Add Comment
                                  </Button>
                                )}
                                <Button
                                  onClick={() => {
                                    setOpen(true);
                                  }}
                                >
                                  Share
                                </Button>
                              </>
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

                        <Share
                          open={open}
                          setOpen={setOpen}
                          title="Share a link"
                        ></Share>
                      </Stack>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={2}>
                  <Typography>Assigned Tags</Typography>
                  <Tags tags={question.tags}></Tags>
                </Grid>
              </Grid>
            </Grid>
          )}
          {/* <Grid item xs={12} sx={{ marginBottom: 2 }}></Grid> */}
        </Grid>
      </Container>
      <Paper sx={{ padding: 3 }}>
        <Grid container>
          <Grid item xs={12}>
            <Answers
              answers={answers}
              isPending={isAnsPending}
              error={ansError}
            ></Answers>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default QuestionDetails;
