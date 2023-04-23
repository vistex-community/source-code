import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import Footer from "../common/components/Footer";
import Navbar from "../common/components/Navbar";
import QuestionPage from "../features/question/QuestionPage";
import UserPage from "../features/user/UserPage";
import QuestionDetails from "../features/question/QuestionDetails";
import AddQuestion from "../features/question/AddQuestion";
import SignIn from "../features/user/SignIn";
import SignUp from "../features/user/SignUp";
import { UserAuthContextProvider } from "../contexts/UserAuthContext";
import ProtectedRoute from "../common/components/ProtectedRoute";
import ForgotPassword from "../features/user/ForgotPassword";
import Blogs from "../features/blog/Blogs";
import AddPost from "../features/blog/AddPost";
import PostDetails from "../features/blog/PostDetails";
import Resources from "../features/resources/Resources";
import {
  HOME,
  SIGN_IN,
  SIGN_UP,
  FORGOT_PASSWORD,
  USER,
  QUESTIONS,
  QUESTION_DETAILS,
  ADD_QUESTION,
  ERROR,
  BLOGS,
  ADD_POST,
  POST_DETAILS,
  RESOURCES,
} from "../constants/routes";

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
            <Route path={HOME} element={<HomePage />}></Route>
            <Route path={QUESTIONS} element={<QuestionPage />}>
              <Route path={QUESTION_DETAILS} element={<QuestionDetails />} />
              <Route
                path={ADD_QUESTION}
                element={
                  <ProtectedRoute>
                    <AddQuestion />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path={BLOGS} element={<Blogs />}>
              <Route path={POST_DETAILS} element={<PostDetails />} />
              <Route
                path={ADD_POST}
                element={
                  <ProtectedRoute>
                    <AddPost />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path={USER} element={<UserPage />}>
              <Route path={SIGN_IN} element={<SignIn />} />
              <Route path={SIGN_UP} element={<SignUp />} />
              <Route path={FORGOT_PASSWORD} element={<ForgotPassword />} />
            </Route>
            <Route path={RESOURCES} element={<Resources />}></Route>
            <Route path={ERROR} element={<ErrorPage />}></Route>
          </Routes>
          <Footer></Footer>
        </ThemeProvider>
      </UserAuthContextProvider>
    </Router>
  );
};

export default AppRouter;
