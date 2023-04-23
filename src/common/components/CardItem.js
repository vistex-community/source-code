import {
  Grid,
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Button,
  Typography,
  Slide,
} from "@mui/material";

const CardItem = ({ card }) => {
  const delay = card.id * 400 + "ms";
  const cardContentTitle =
    card.title && card.subtitle
      ? `${card.title} / ${card.subtitle}`
      : `${card.title}`;

  return (
    <Grid item xl={4}>
      <Slide direction="left" in="true" style={{ transitionDelay: delay }}>
        <Card
          sx={{
            maxWidth: 345,
            paddingBottom: 3,
            "&:hover": { boxShadow: 10 },
          }}
        >
          <CardMedia
            component="img"
            height={200}
            image={card.url}
            alt={card.name}
            sx={{ paddingX: 4 }}
          />
          <CardContent sx={{ textAlign: "center" }}>
            <Typography gutterBottom variant="h5" component="div">
              {card.name}
            </Typography>

            {card.title && (
              <Typography variant="body2" color="text.secondary">
                {cardContentTitle}
              </Typography>
            )}
          </CardContent>
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button variant="contained" href={card.linkTo} target={card.target}>
              {card.label}
            </Button>
          </CardActions>
        </Card>
      </Slide>
    </Grid>
  );
};

export default CardItem;
