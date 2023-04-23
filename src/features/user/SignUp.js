import React, { useState } from "react";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { sendEmailVerification, updateProfile } from "firebase/auth";

import {
  Container,
  Avatar,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
} from "@mui/material";

import { useLocation, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../contexts/UserAuthContext";
import ErrorMessage from "../../common/components/ErrorMessage";
import { useDispatch } from "react-redux";
import { setMessage } from "../message/messageSlice";
import LoadingButton from "@mui/lab/LoadingButton";
import { HOME, USER_SIGN_IN } from "../../constants/routes";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { createUser, logOut } = useUserAuth();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleShowPassword = () => setShowPassword((show) => !show);

  function isFormDataValid(email, firstName, lastName, password) {
    const validEmail = new RegExp("^[a-zA-Z.]+$");

    if (!firstName) {
      setError({ code: "auth/enter-first-name" });
      return false;
    }
    if (!lastName) {
      setError({ code: "auth/enter-last-name" });
      return false;
    }
    if (!validEmail.test(email)) {
      setError({ code: "auth/invalid-email" });
      return false;
    }
    if (!password) {
      setError({ code: "auth/enter-password" });
      return false;
    }
    return true;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const firstName = data.get("firstName");
    const lastName = data.get("lastName");
    const email = data.get("email");
    const password = data.get("password");

    if (isFormDataValid(email, firstName, lastName, password)) {
      const newEmail = email.concat("@vistex.com");

      setIsSubmitting(true);
      try {
        const userCred = await createUser(newEmail, password);
        await updateProfile(userCred.user, {
          displayName: getDisplayName(firstName, lastName),
        });
        await sendEmailVerification(userCred.user, {
          url: `${window.location.origin}${USER_SIGN_IN}}`,
        });
        await logOut();
        dispatch(
          setMessage({
            text: "Your account has been created, please verify your email",
          })
        );
        setIsSubmitting(false);
        navigate(location.state?.from ?? HOME, { replace: true });
      } catch (err) {
        setError(err);
        console.log(err);
        setIsSubmitting(false);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 5,
          marginBottom: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create account
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ErrorMessage error={error}></ErrorMessage>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                placeholder="firstname.lastname"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      @vistex.com
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  placeholder="******"
                />
              </FormControl>
            </Grid>
          </Grid>

          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            loading={isSubmitting}
            loadingPosition="start"
            sx={{ marginTop: 3, marginBottom: 2 }}
          >
            Create Account
          </LoadingButton>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                href={USER_SIGN_IN}
                variant="body2"
                underline="none"
                sx={{ fontSize: "13px" }}
              >
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

function getDisplayName(firstName, lastName) {
  return firstName + " " + lastName;
}
