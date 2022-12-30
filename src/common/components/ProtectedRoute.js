import { Navigate } from "react-router-dom";
import { useUserAuth } from "../../features/user/UserAuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth();

  if (!user) {
    return <Navigate to="/user/signin" />;
  }
  return children;
};

export default ProtectedRoute;
