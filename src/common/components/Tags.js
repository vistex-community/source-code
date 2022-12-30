import { Stack, Chip } from "@mui/material";

const Tags = ({ tags }) => {
  return (
    <Stack direction="row" spacing={1} sx={{ marginTop: 1 }}>
      {tags &&
        tags.map((tag, index) => {
          return <Chip label={tag} />;
        })}
    </Stack>
  );
};

export default Tags;
