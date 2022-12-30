import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useUserAuth } from "../user/UserAuthContext";
import { useParams } from "react-router-dom";
// import { addAnswer } from "../../database/question";
import TextEditor from "../../common/components/TextEditor";
import { Box, Button, Typography, Link } from "@mui/material";
import { useDispatch } from "react-redux";
import { addAnswer } from "./answerSlice";
import { useLocation } from "react-router-dom";

const AddAnswer = () => {
  const { user } = useUserAuth();
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const { questionId } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();

  function handleAddAnswer(event) {
    event.preventDefault();
    console.log(user);
    console.log(value);

    const answer = {
      body: value,
      author: user && user.displayName,
      uid: user && user.uid,
      qid: questionId,
      timestamp: Date.now(),
    };
    console.log(answer);
    dispatch(addAnswer(answer));
    setValue("");
    navigate(location.pathname);
  }

  return (
    <Box component="form" noValidate onSubmit={handleAddAnswer}>
      {user ? null : (
        <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
          You must be
          <Link
            href={"/user/signin"}
            underline="none"
            sx={{ cursor: "pointer", marginLeft: "3px", marginRight: "3px" }}
          >
            Logged in
          </Link>
          to submit an answer
        </Typography>
      )}
      <TextEditor
        value={value}
        setValue={setValue}
        label="Answer"
        readyOnly={user ? false : true}
      ></TextEditor>
      <Button
        disabled={user ? false : true}
        type="submit"
        variant="contained"
        sx={{ marginTop: 2 }}
      >
        Post your answer
      </Button>
    </Box>
  );
};

export default AddAnswer;
