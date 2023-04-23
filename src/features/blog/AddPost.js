import React, { useEffect, useState } from "react";
import ArticleIcon from "@mui/icons-material/Article";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Container,
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Autocomplete,
} from "@mui/material";

// import { addQuestion } from "../../database/question";
import { useUserAuth } from "../../contexts/UserAuthContext";
import ErrorMessage from "../../common/components/ErrorMessage";
import TextEditor from "../../common/components/TextEditor";
import tagOptions from "../../constants/tags";
import { useDispatch } from "react-redux";
import { addPost } from "../blog/blogSlice";
import { setMessage } from "../message/messageSlice";
import MessageToast from "../../common/components/MessageToast";
import { BLOGS, HOME } from "../../constants/routes";
import { getRandomNum } from "../../common/helpers/Util";
import { useTrigram } from "../../hooks/useTrigram";
import LZString from "lz-string";

const AddPost = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUserAuth();
  const [error] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [value, setValue] = useState("");
  const [disablePostQuesBtn, setDisablePostQuesBtn] = useState(true);
  const triGram = useTrigram();

  useEffect(() => {
    if (tags.length === 0) {
      setDisablePostQuesBtn(true);
    } else if (value && tags && title) {
      setDisablePostQuesBtn(false);
    } else {
      setDisablePostQuesBtn(true);
    }
  }, [value, tags, title]);

  const dispatch = useDispatch();

  const handleTagsChange = (event, newTagValue) => {
    setTags(newTagValue);
  };

  function handleSubmit(event) {
    event.preventDefault();

    const post = {
      title: title,
      body: LZString.compress(value),
      tags: tags,
      author: user.displayName,
      uid: user.uid,
      timestamp: Date.now(),
      _smeta: triGram(title.replace(/\s/g, "")), //replace all whitespace in the string
    };

    dispatch(addPost(post));
    dispatch(
      setMessage({
        text: "Blog post has been created",
      })
    );
    navigate(BLOGS);
  }

  return (
    <Container component="main" maxWidth="md" sx={{ marginBottom: 15 }}>
      <Box
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <ArticleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create New Blog Post
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <MessageToast></MessageToast>
            </Grid>
            <Grid item xs={12}>
              <ErrorMessage error={error}></ErrorMessage>
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="Title"
                name="title"
                fullWidth
                id="title"
                label="Title"
                autoFocus
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextEditor
                value={value}
                setValue={setValue}
                placeholder="Details"
              ></TextEditor>
            </Grid>

            <Grid item xs={12}>
              <Autocomplete
                multiple
                id="tags-outlined"
                options={tagOptions}
                fullWidth
                getOptionLabel={(option) => option}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tags"
                    placeholder="Select Tags"
                  />
                )}
                sx={{ marginY: 1 }}
                onChange={handleTagsChange}
                freeSolo
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={disablePostQuesBtn}
          >
            Save
          </Button>
          <Button
            type="button"
            variant="outlined"
            sx={{ ml: 2, mt: 3, mb: 2 }}
            onClick={() => {
              navigate(location.state?.from ?? HOME);
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddPost;
