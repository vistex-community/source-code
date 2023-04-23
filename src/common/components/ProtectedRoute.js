import { Navigate } from "react-router-dom";
import { useUserAuth } from "../../contexts/UserAuthContext";
import { useLocation } from "react-router-dom";
import {
  BLOG_ADD_POST,
  QUESTIONS_ADD_QUESTION,
  USER_SIGN_IN,
} from "../../constants/routes";

const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();
  const location = useLocation();

  if (!user) {
    if (
      location.pathname === QUESTIONS_ADD_QUESTION ||
      location.pathname === BLOG_ADD_POST
    ) {
      return <Navigate to={USER_SIGN_IN} state={{ from: location.pathname }} />;
    }
  }
  return children;
};

export default ProtectedRoute;
