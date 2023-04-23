import { Paper, Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestions } from "../../features/question/questionSlice";
import { getAnswers } from "../../features/answer/answerSlice";
import CardItem from "./CardItem";
import fixedCards from "../../constants/cards";
import { getLikes } from "../../features/likes/likeSlice";
import { getViews } from "../../features/views/viewSlice";
import { fetchIPAddress } from "../helpers/Util";

const Cards = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuestions());
    dispatch(getAnswers());
    dispatch(getLikes());
    dispatch(getViews());
    fetchIPAddress();
  }, []);

  const state = useSelector((state) => state);
  const cards = fixedCards;

  if (!state.question.isPending && !state.answer.isPending) {
    cards[0].title = `${state.question.data.length} Questions`;
    cards[0].subtitle = `${state.answer.data.length} Answers`;
  }

  if (!state.blog.isPending) {
    cards[1].title = `${state.blog.posts.length} Posts`;
  }

  return (
    <Paper elevation={2} sx={{ paddingY: 5 }}>
      <Grid container justifyContent="center" spacing={3}>
        {cards.map((card) => {
          return <CardItem key={card.id} card={card}></CardItem>;
        })}
      </Grid>
    </Paper>
  );
};

export default Cards;
