import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";

import { Stack, IconButton } from "@mui/material";

const SocialMedia = () => {
  return (
    <Stack direction="row" justifyContent="center" alignItems="center">
      <IconButton
        color="inherit"
        size="large"
        href="https://twitter.com/vistex"
        target="_blank"
      >
        <TwitterIcon></TwitterIcon>
      </IconButton>
      <IconButton
        color="inherit"
        size="large"
        href="https://www.linkedin.com/company/vistex/"
        target="_blank"
      >
        <LinkedInIcon></LinkedInIcon>
      </IconButton>
      <IconButton
        color="inherit"
        size="large"
        href="https://www.facebook.com/VistexInc"
        target="_blank"
      >
        <FacebookIcon></FacebookIcon>
      </IconButton>
      <IconButton
        color="inherit"
        size="large"
        href="https://www.youtube.com/user/VistexTV"
        target="_blank"
      >
        <YouTubeIcon></YouTubeIcon>
      </IconButton>
    </Stack>
  );
};

export default SocialMedia;
