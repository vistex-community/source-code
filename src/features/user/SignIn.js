import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import {
  Container,
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
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

import { useUserAuth } from "./UserAuthContext";
import ErrorMessage from "../../common/components/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { logIn } = useUserAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    // const newEmail = email.concat("@vistex.com");

    try {
      await logIn(email, data.get("password"));
      navigate("/", {
        state: {
          message: {
            text: "Login sucessful",
            position: {
              vertical: "top",
              horizontal: "center",
            },
          },
        },
      });
    } catch (err) {
      setError(err);
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
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <ErrorMessage error={error}></ErrorMessage>
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
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
            />
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" underline="none">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/user/signup" variant="body2" underline="none">
                {"Don't have an account? Create account"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
