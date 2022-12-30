import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import ErrorPage from "../common/components/ErrorPage";
import HomePage from "../common/components/HomePage";
import Footer from "../common/components/Footer";
import Navbar from "../common/components/Navbar";
import QuestionPage from "../features/question/QuestionPage";
import UserPage from "../features/user/UserPage";
import QuestionDetails from "../features/question/QuestionDetails";
import AddQuestion from "../features/question/AddQuestion";
import SignIn from "../features/user/SignIn";
import SignUp from "../features/user/SignUp";
import { UserAuthContextProvider } from "../features/user/UserAuthContext";
import ProtectedRoute from "../common/components/ProtectedRoute";

const AppRouter = () => {
  let mode = localStorage.getItem("vs-mui-theme-mode");
  if (!mode) {
    mode = "light";
  }
  const [themeMode, setThemeMode] = useState(mode);

  const toggleThemeMode = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = createTheme({
    palette: {
      mode: themeMode,
    },
  });

  return (
    <Router>
      <UserAuthContextProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navbar toggleThemeMode={toggleThemeMode}></Navbar>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="questions" element={<QuestionPage />}>
              <Route path=":questionId" element={<QuestionDetails />} />
              <Route
                path="add-question"
                element={
                  <ProtectedRoute>
                    <AddQuestion />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="user" element={<UserPage />}>
              <Route path="signin" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />
            </Route>
            <Route path="*" element={<ErrorPage />}></Route>
          </Routes>
          <Footer></Footer>
        </ThemeProvider>
      </UserAuthContextProvider>
    </Router>
  );
};

export default AppRouter;
