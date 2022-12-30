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

  return (
    <Grid item xl={4} sx={{ paddingBottom: 4 }}>
      <Slide direction="left" in="true" style={{ transitionDelay: delay }}>
        <Card sx={{ maxWidth: 345, padding: 2, "&:hover": { boxShadow: 10 } }}>
          <CardMedia
            component="img"
            height={220}
            image={card.url}
            alt={card.name}
            sx={{ objectFit: "contain" }}
          />
          <CardContent sx={{ textAlign: "center" }}>
            <Typography gutterBottom variant="h5" component="div">
              {card.name}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {card.title} / {card.subtitle}
            </Typography>
          </CardContent>
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button variant="contained" href={card.linkTo}>
              {card.label}
            </Button>
          </CardActions>
        </Card>
      </Slide>
    </Grid>
  );
};

export default CardItem;
