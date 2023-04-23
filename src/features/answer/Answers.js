import { Container, Grid, Typography, Stack, Box } from "@mui/material";
import AnswerItem from "./AnswerItem";
import AddAnswer from "./AddAnswer";
import ErrorMessage from "../../common/components/ErrorMessage";
import Loader from "../../common/components/Loader";
import SortBy from "../../common/components/SortBy";
import { useState } from "react";

const Answers = ({ answers, isPending, error }) => {
  const ansCount = !isPending && answers.length;
  const [selectedSortBy, setselectedSortBy] = useState("timestamp");
  const sortBy = [
    { value: "timestamp", descr: "Newest" },
    { value: "oldest", descr: "Oldest" },
    { value: "likes", descr: "Likes" },
  ];
  return (
    <Box>
      <Container maxWidth="lg" sx={{ marginTop: 2, marginBottom: 5 }}>
        <Grid container>
          <Grid item xs={12}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>{ansCount} Answers</Typography>
              <SortBy
                list={sortBy}
                selectedValue={selectedSortBy}
                setSelectedValue={setselectedSortBy}
              ></SortBy>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Loader isPending={isPending}></Loader>
            <ErrorMessage error={error}></ErrorMessage>
          </Grid>
          {answers &&
            answers.map((answer) => {
              return <AnswerItem key={answer.id} answer={answer}></AnswerItem>;
            })}
        </Grid>
      </Container>

      <Box sx={{ marginLeft: 2 }}>
        <AddAnswer></AddAnswer>
      </Box>
    </Box>
  );
};

export default Answers;
