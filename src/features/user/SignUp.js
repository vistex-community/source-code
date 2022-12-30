import React, { useState } from "react";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { updateProfile } from "firebase/auth";

import {
  Container,
  Avatar,
  Button,
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

import { useNavigate } from "react-router-dom";
import { useUserAuth } from "./UserAuthContext";
import ErrorMessage from "../../common/components/ErrorMessage";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { createUser } = useUserAuth();

  const handleShowPassword = () => setShowPassword((show) => !show);
  const handleShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  function getDisplayName(firstName, lastName) {
    return firstName + " " + lastName;
  }

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
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const firstName = data.get("firstName");
    const lastName = data.get("lastName");
    const email = data.get("email");
    const password = data.get("password");

    if (isFormDataValid(email, firstName, lastName, password)) {
      const newEmail = email.concat("@vistex.com");

      createUser(newEmail, password)
        .then((userCred) => {
          updateProfile(userCred.user, {
            displayName: getDisplayName(firstName, lastName),
          }).then(() => {
            navigate("/");
          });
        })
        .catch((err) => {
          setError(err);
        });
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ marginBottom: 10 }}>
      <Box
        sx={{
          marginTop: 4,
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
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                />
              </FormControl>
            </Grid>
            {/* <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth required>
                <InputLabel htmlFor="confirmPassword">
                  Confirm Password
                </InputLabel>
                <OutlinedInput
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleShowConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="ConfirmPassword"
                />
              </FormControl>
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create Account
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/user/signin" variant="body2" underline="none">
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
