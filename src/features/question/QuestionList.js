import {
  Container,
  Button,
  TextField,
  Grid,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";
import { useEffect } from "react";
import ErrorMessage from "../../common/components/ErrorMessage";
import QuestionItem from "./QuestionItem";
import Loader from "../../common/components/Loader";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { getQuestions } from "./questionSlice";

const QuestionList = () => {
  const {
    data: questions,
    isPending,
    error,
  } = useSelector((state) => state.question);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuestions());
  }, []);

  return (
    <Container maxWidth="lg" sx={{ marginTop: 5, marginBottom: 5 }}>
      <Grid container>
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ marginBottom: 4 }}
          >
            <TextField
              placeholder="Search Questions"
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
            <Button
              variant="contained"
              size="large"
              href="/questions/add-question"
            >
              Add Question
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ marginBottom: 1 }} variant="subtitle1">
            All Questions
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Loader isPending={isPending}></Loader>

          {!isPending &&
            questions &&
            questions.map((question, index) => {
              return (
                <QuestionItem index={index} question={question}></QuestionItem>
              );
            })}
        </Grid>
      </Grid>
    </Container>
  );
};

export default QuestionList;
