import { Alert, Box } from "@mui/material";

const ErrorMessage = ({ error }) => {
  let errorMessage = "";

  if (error) {
    if (error.code === "auth/weak-password") {
      errorMessage = "Password should be at least 6 characters";
    } else if (error.code) {
      /**auth/invalid-email to Invalid email*/
      errorMessage = error.code.split("/")[1].split("-").join(" "); //invalid email
      errorMessage =
        errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1); //"Invalid email"
    }
  }

  return (
    <Box sx={{ marginTop: 2, marginBottom: 1 }}>
      {errorMessage && (
        <Alert severity="error" sx={{ padding: 1.5 }}>
          {errorMessage}
        </Alert>
      )}
    </Box>
  );
};

export default ErrorMessage;
