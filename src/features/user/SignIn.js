import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import {
  Container,
  Avatar,
  TextField,
  Link,
  Grid,
  Box,
  Stack,
  Typography,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
} from "@mui/material";

import {
  HOME,
  USER_SIGN_UP,
  USER_FORGOT_PASSWORD,
  USER_SIGN_IN,
} from "../../constants/routes";

import LoadingButton from "@mui/lab/LoadingButton";
import { useUserAuth } from "../../contexts/UserAuthContext";
import ErrorMessage from "../../common/components/ErrorMessage";
import { useDispatch } from "react-redux";
import { setMessage } from "../message/messageSlice";
import { useLocation } from "react-router-dom";
import MessageToast from "../../common/components/MessageToast";
import { sendEmailVerification } from "firebase/auth";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { logIn, logOut } = useUserAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    // const newEmail = email.concat("@vistex.com");
    if (email && password) {
      try {
        setIsSubmitting(true);
        const userCredential = await logIn(email, password);

        if (!userCredential.user.emailVerified) {
          dispatch(
            setMessage({
              text: "Email not verified, please verify your email",
              type: "error",
            })
          );
          await sendEmailVerification(userCredential.user, {
            url: `${window.location.origin}${USER_SIGN_IN}`,
          });
          await logOut();
        } else {
          dispatch(
            setMessage({
              text: "You are now logged in",
            })
          );
        }
        navigate(location.state?.from ?? HOME, { replace: true });
      } catch (err) {
        setError(err);
        console.log(err);
        setIsSubmitting(false);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      if (!email) {
        setError({ code: "auth/enter-email" });
        return;
      }
      if (!password) {
        setError({ code: "auth/enter-password" });
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <MessageToast></MessageToast>

        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <ErrorMessage error={error}></ErrorMessage>
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            placeholder="firstname.lastname@vistex.com"
            autoFocus
            // InputProps={{
            //   endAdornment: (
            //     <InputAdornment position="start">@vistex.com</InputAdornment>
            //   ),
            // }}
          />

          <FormControl variant="outlined" fullWidth sx={{ marginY: 1 }}>
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              placeholder="******"
            />
          </FormControl>

          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            loading={isSubmitting}
            loadingPosition="start"
            sx={{ marginTop: 3, marginBottom: 2 }}
          >
            Login
          </LoadingButton>
        </Box>
      </Box>
      <Stack>
        <Grid container>
          <Grid item xs>
            <Link
              href={USER_FORGOT_PASSWORD}
              variant="body2"
              underline="none"
              sx={{ fontSize: "13px" }}
            >
              Forgot password?
            </Link>
          </Grid>
          <Grid item xs>
            <Link
              component="button"
              variant="body2"
              underline="none"
              sx={{ fontSize: "13px" }}
              onClick={() => {
                navigate(USER_SIGN_UP, {
                  state: { from: location.pathname },
                });
              }}
            >
              {"Don't have an account? Create account"}
            </Link>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}
