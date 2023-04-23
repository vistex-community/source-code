import { Chip, Grid } from "@mui/material";

const Tags = ({ tags }) => {
  return (
    <Grid container sx={{ mt: 1 }}>
      <Grid item>
        {tags &&
          tags.map((tag, index) => {
            return <Chip key={index} label={tag} />;
          })}
      </Grid>
    </Grid>
  );
};

export default Tags;
