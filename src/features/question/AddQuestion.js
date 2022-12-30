import React, { useEffect, useState } from "react";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { useNavigate } from "react-router-dom";

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
import { useUserAuth } from "../user/UserAuthContext";
import ErrorMessage from "../../common/components/ErrorMessage";
import TextEditor from "../../common/components/TextEditor";
import tagOptions from "../../constants/tags";
import { useDispatch } from "react-redux";
import { addQuestion } from "./questionSlice";

const AddQuestion = () => {
  const navigate = useNavigate();
  const { user } = useUserAuth();
  const [error] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [value, setValue] = useState("");
  const [disablePostQuesBtn, setDisablePostQuesBtn] = useState(true);

  console.log(title);
  console.log(value);
  console.log(tags);
  console.log(disablePostQuesBtn);

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

  function getViews() {
    return Math.floor(Math.random() * 100 + 1);
  }

  const handleTagsChange = (event, newTagValue) => {
    setTags(newTagValue);
  };

  function handleSubmit(event) {
    event.preventDefault();

    const question = {
      title: title,
      body: value,
      tags: tags,
      author: user.displayName,
      views: getViews(),
      uid: user.uid,
      timestamp: Date.now(),
    };

    dispatch(addQuestion(question));
    navigate("/questions");
  }

  return (
    <Container component="main" maxWidth="md" sx={{ marginBottom: 10 }}>
      <Box
        sx={{
          marginTop: 4,
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
            <QuestionMarkIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Ask Question
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
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
                label="Question"
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
            Post your question
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddQuestion;
