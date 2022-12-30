import { Stack, Typography, Link, IconButton, Paper } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { useSelector } from "react-redux";

const Footer = () => {
  const isPending = useSelector((state) => state.question.isPending);

  return (
    <>
      {!isPending ? (
        <Paper component="footer" elevation={3}>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ padding: 3 }}
          >
            <Typography variant="body2" sx={{ flexGrow: 1 }}>
              {"Copyright © "}
              {new Date().getFullYear()}
              <Link
                color="inherit"
                underline="none"
                sx={{ marginLeft: 1 }}
                href="https://www.vistex.com/"
                target="_blank"
              >
                Vistex, Inc.
              </Link>
            </Typography>
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
          </Stack>
        </Paper>
      ) : null}
    </>
  );
};

export default Footer;
