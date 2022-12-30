import QuestionList from "./QuestionList";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

const QuestionPage = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/questions" && <QuestionList />}
      <Outlet></Outlet>
    </>
  );
};

export default QuestionPage;
