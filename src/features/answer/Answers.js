import {
  Container,
  Grid,
  Typography,
  Stack,
  Divider,
  Box,
} from "@mui/material";
import AnswerItem from "./AnswerItem";
import AddAnswer from "./AddAnswer";
import ErrorMessage from "../../common/components/ErrorMessage";
import Loader from "../../common/components/Loader";

const Answers = ({ answers, isPending, error }) => {
  return (
    <Box>
      <Stack direction="row" sx={{ marginLeft: 2 }}>
        <Typography>
          {answers && answers.length !== 0 && <span>{answers.length}</span>}
        </Typography>
        <Typography sx={{ marginLeft: "3px" }}>Answers</Typography>
        <Divider />
      </Stack>

      <Container maxWidth="lg" sx={{ marginTop: 2, marginBottom: 5 }}>
        <Grid container>
          <Grid item xs={12}>
            <Loader isPending={isPending}></Loader>
            <ErrorMessage error={error}></ErrorMessage>
          </Grid>
          {answers &&
            answers.map((answer) => {
              return <AnswerItem answer={answer}></AnswerItem>;
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
