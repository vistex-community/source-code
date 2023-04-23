import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Link, Box, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useUserAuth } from "../../contexts/UserAuthContext";
import ErrorMessage from "../../common/components/ErrorMessage";
import { setMessage } from "../message/messageSlice";
import { HOME, USER_SIGN_IN } from "../../constants/routes";

const ForgotPassword = () => {
  const [error, setError] = useState();
  const { forgotPassword } = useUserAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const data = new FormData(event.currentTarget);

    try {
      console.log(`${window.location.origin}/user/signin`);
      await forgotPassword(
        data.get("email"),
        `${window.location.origin}${USER_SIGN_IN}`
      );
      dispatch(
        setMessage({
          text: "Reset password email has been sent",
        })
      );
      navigate(location.state?.from ?? HOME, { replace: true });
    } catch (err) {
      setError(err);
      console.log(err);
    } finally {
      setIsSubmitting(false);
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
        <Typography component="h1" variant="h5">
          Forgot password
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
            helperText="You will receive a link to create a new password via email"
            autoFocus
          />

          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            loading={isSubmitting}
            loadingPosition="start"
            sx={{ marginTop: 3, marginBottom: 2 }}
          >
            Reset Password
          </LoadingButton>
          <Link
            href={USER_SIGN_IN}
            variant="body2"
            underline="none"
            sx={{ fontSize: "13px" }}
          >
            Remember your password?
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
