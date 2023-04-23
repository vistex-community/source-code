import { Stack, Typography, Link, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  USER_FORGOT_PASSWORD,
  USER_SIGN_IN,
  USER_SIGN_UP,
} from "../../constants/routes";
import SocialMedia from "./SocialMedia";

const Footer = () => {
  const isPending = useSelector((state) => state.question.isPending);
  const isBlogPending = useSelector((state) => state.blog.isPending);
  const { pathname } = useLocation();

  return (
    <>
      {!isPending && !isBlogPending ? (
        <>
          {pathname === USER_SIGN_IN ||
          pathname === USER_SIGN_UP ||
          pathname === USER_FORGOT_PASSWORD ? null : (
            <Paper component="footer" elevation={3}>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ padding: 3 }}
              >
                <Typography
                  variant="body2"
                  sx={{ flexGrow: 1, fontSize: "13px" }}
                >
                  {"Copyright © "}
                  {new Date().getFullYear()}
                  <Link
                    color="inherit"
                    underline="none"
                    sx={{ marginLeft: 0.5 }}
                    href="https://www.vistex.com/"
                    target="_blank"
                  >
                    Vistex, Inc.
                  </Link>
                </Typography>
                <SocialMedia></SocialMedia>
              </Stack>
            </Paper>
          )}
        </>
      ) : null}
    </>
  );
};

export default Footer;
