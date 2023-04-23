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

import Tags from "../../common/components/Tags";
import Timestamp from "../../common/components/Timestamp";
import UserProfile from "../user/UserProfile";
import { useDispatch, useSelector } from "react-redux";
import PreviewTextEditorContent from "../../common/components/PreviewTextEditorContent";
import MessageToast from "../../common/components/MessageToast";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import Stats from "../../common/components/Stats";
import TextEditor from "../../common/components/TextEditor";
import DOC_TYPE from "../../constants/doctype";
import { updateView } from "../views/viewSlice";
import { useUserAuth } from "../../contexts/UserAuthContext";
import { updateBlogPostViews } from "./blogSlice";
import { getViewExistsWhereClause } from "../views/Util";
import { collection } from "firebase/firestore";
import database from "../../database/firebase";
import { getDocs } from "firebase/firestore";

const PostDetails = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const commentCount = 0;
  const [showCommentEditor, setShowCommentEditor] = useState(false);
  const state = useSelector((state) => state);
  const { posts } = state.blog;
  const post = posts.find((post) => post.id === postId);
  const { user } = useUserAuth();

  /**Logic to update views */
  useEffect(() => {
    const view = {
      docId: postId,
      docType: DOC_TYPE.blog,
      ipAddress: localStorage.getItem("vs-ipaddress"),
      uid: user?.uid,
      timestamp: Date.now(),
    };
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
            dispatch(updateBlogPostViews({ postId, views }));
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
          {post && (
            <Grid item xs={12} sx={{ marginBottom: 2 }}>
              <Grid container>
                <Grid item xs={10}>
                  <Stack direction="row">
                    <Stack>
                      <UserProfile
                        size={{ width: "56px", height: "56px" }}
                        name={post.author}
                      ></UserProfile>
                    </Stack>
                    <Stack sx={{ marginLeft: 2 }}>
                      <Typography variant="subtitle2">{post.author}</Typography>
                      <Timestamp timestamp={post.timestamp}></Timestamp>
                      <Typography variant="h5" sx={{ marginTop: 2 }}>
                        {post.title}
                      </Typography>

                      <Stack direction="row" sx={{ marginTop: 1 }}>
                        <Stats
                          Icon={ThumbUpIcon}
                          value={post.likes}
                          clickable={true}
                        ></Stats>
                        {/* <Box sx={{ ml: 2 }}>
                          <Stats
                            Icon={CommentIcon}
                            value={commentCount}
                          ></Stats>
                        </Box> */}
                        <Box sx={{ ml: 2 }}>
                          <Stats
                            Icon={VisibilityIcon}
                            value={post.views}
                          ></Stats>
                        </Box>
                      </Stack>

                      <PreviewTextEditorContent
                        content={post.body}
                      ></PreviewTextEditorContent>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={2}>
                  <Typography>Assigned Tags</Typography>
                  <Tags tags={post.tags}></Tags>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Container>

      <Paper sx={{ padding: 3 }}>
        <Grid container>
          <Grid item xs={10}>
            <Box>
              {!showCommentEditor && (
                <Box
                  sx={{
                    minHeight: "150px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {user && (
                    <Button
                      onClick={() => {
                        setShowCommentEditor(!showCommentEditor);
                      }}
                    >
                      Add Comment
                    </Button>
                  )}
                </Box>
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
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default PostDetails;
