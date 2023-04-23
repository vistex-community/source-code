import { Paper, Grid, Stack, Typography, Box } from "@mui/material";
import CardItem from "../../common/components/CardItem";
import fixedCards from "../../constants/resources";

const cards = fixedCards;

const Resources = () => {
  return (
    <Box>
      <Stack
        direction="column"
        justifyContent="centre"
        alignItems="centre"
        spacing={2}
      >
        <Typography
          component="h1"
          variant="h5"
          textAlign="center"
          sx={{ marginY: 4 }}
        >
          All Resources
        </Typography>
        {/* <Typography component="h3" variant="subtitle1">
              Get started on the new Vistex Community! Stay up to date with the
              latest Community news, projects, and features. <br></br>
              Find out how to blog, ask a question, all about tags, and more.
              <br></br>
              <br></br>
            </Typography> */}
      </Stack>

      <Paper elevation={2} sx={{ paddingY: 5 }}>
        <Grid container justifyContent="center" spacing={3}>
          {cards.map((card) => {
            return <CardItem key={card.id} card={card}></CardItem>;
          })}
        </Grid>
      </Paper>
    </Box>
  );
};

export default Resources;
