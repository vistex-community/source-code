import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Container, Grid, Typography, Stack } from "@mui/material";
import parse from "html-react-parser";
import Loader from "../../common/components/Loader";
import Answers from "../answer/Answers";
import ErrorMessage from "../../common/components/ErrorMessage";
import Tags from "../../common/components/Tags";
import Timestamp from "../../common/components/Timestamp";
import UserProfile from "../user/UserProfile";
import { useSelector, useDispatch } from "react-redux";
import { getAnswers } from "../answer/answerSlice";

const QuestionDetails = () => {
  const { questionId } = useParams();

  const state = useSelector((state) => state);
  const {
    data: questions,
    isPending: isPending,
    error: error,
  } = state.question;
  const question = questions.find((question) => question.id === questionId);

  const {
    data: ansData,
    isPending: isAnsPending,
    error: ansError,
  } = state.answer;

  const answers = ansData.filter((answer) => answer.qid === questionId);

  return (
    <Container maxWidth="xl" sx={{ marginTop: 3, marginBottom: 5 }}>
      <Grid container>
        <Grid item xs={12} sx={{ marginBottom: 2 }}>
          <Loader isPending={isPending}></Loader>
          <ErrorMessage error={error}></ErrorMessage>
        </Grid>
        {question && (
          <Grid item xs={12} sx={{ marginBottom: 2 }}>
            <Grid container>
              <Grid item xs={10}>
                <Stack direction="row">
                  <UserProfile
                    size={{ width: "56px", height: "56px" }}
                    name={question.author}
                  ></UserProfile>
                  <Stack sx={{ marginLeft: 2 }}>
                    <Typography variant="subtitle2">
                      {question.author}
                    </Typography>
                    <Timestamp timestamp={question.timestamp}></Timestamp>
                    <Typography variant="h5" sx={{ marginTop: 2 }}>
                      {question.title}
                    </Typography>
                    <Typography variant="body2" sx={{ marginTop: 1 }}>
                      {question.views} Views
                    </Typography>

                    <Stack sx={{ fontSize: "14px" }}>
                      {parse(question.body)}
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
        <Grid item xs={12} sx={{ marginBottom: 2 }}>
          <Answers
            answers={answers}
            isPending={isAnsPending}
            error={ansError}
          ></Answers>
        </Grid>
      </Grid>
    </Container>
  );
};

export default QuestionDetails;
