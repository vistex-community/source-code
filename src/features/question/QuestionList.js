import {
  Container,
  Button,
  TextField,
  Grid,
  Typography,
  IconButton,
  Stack,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";
import Loader from "../../common/components/Loader";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { getQuestions } from "./questionSlice";
import SortBy from "../../common/components/SortBy";
import MessageToast from "../../common/components/MessageToast";
import { QUESTIONS_ADD_QUESTION } from "../../constants/routes";
import { useLocation, useNavigate } from "react-router-dom";
import { where } from "firebase/firestore";
import { useTrigram } from "../../hooks/useTrigram";
import { usePagination } from "../../hooks/usePagination";
import LoadMoreButton from "../../common/components/LoadMoreButton";
import { getViews } from "../../features/views/viewSlice";

const QuestionList = () => {
  const [searchTerm, setSearchTerm] = useState();
  const state = useSelector((state) => state);
  const { data: questions, isPending } = state.question;
  const { data: likes } = state.like;
  const { data: views } = state.view;
  const location = useLocation();
  const navigate = useNavigate();
  const triGram = useTrigram();
  const [pageSize, increasePageSize, resetPageSize] = usePagination();
  const [selectedSortBy, setselectedSortBy] = useState("timestamp");

  const sortBy = [
    { value: "timestamp", descr: "Newest" },
    { value: "oldest", descr: "Oldest" },
    { value: "views", descr: "Views" },
    { value: "likes", descr: "Likes" },
    // { value: "unanswered", descr: "Unanswered" },
  ];
  const quesCount = !isPending && questions.length;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuestions({ views: views, likes: likes }));
  }, []);

  const handleSearch = () => {
    const searchConstraints = [];
    resetPageSize();
    const searchText = searchTerm?.replace(/\s/g, "");

    if (searchText?.length >= 3) {
      const searchObj = triGram(searchText);

      for (const prop in searchObj) {
        searchConstraints.push(where(`_smeta.${prop}`, "==", true));
      }

      dispatch(
        getQuestions({
          sConstraints: searchConstraints,
          sortBy: selectedSortBy,
          views: views,
          likes: likes,
        })
      );
    } else {
      dispatch(getQuestions({ views: views, likes: likes }));
    }
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 5, marginBottom: 5 }}>
      <Grid container>
        <Grid item xs={12} sx={{ marginBottom: 2 }}>
          <MessageToast></MessageToast>
        </Grid>
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ marginBottom: 4 }}
          >
            <TextField
              placeholder="Search Questions"
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
              value={searchTerm}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearch();
                }
              }}
              sx={{
                width: { md: 400 },
              }}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => {
                      handleSearch();
                    }}
                  >
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />

            <Button
              variant="contained"
              size="large"
              onClick={() => {
                navigate(QUESTIONS_ADD_QUESTION, {
                  state: { from: location.pathname },
                });
              }}
            >
              Add Question
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            marginBottom={2}
          >
            <Typography variant="subtitle1">{quesCount} Questions</Typography>
            <SortBy
              list={sortBy}
              selectedValue={selectedSortBy}
              setSelectedValue={setselectedSortBy}
            ></SortBy>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Loader isPending={isPending}></Loader>

          {!isPending &&
            questions?.slice(0, pageSize)?.map((question, index) => {
              return (
                <QuestionItem
                  key={question.id}
                  index={index}
                  question={question}
                ></QuestionItem>
              );
            })}
          {!isPending && pageSize < questions?.length && (
            <LoadMoreButton
              increasePageSize={increasePageSize}
            ></LoadMoreButton>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default QuestionList;
