import QuestionList from "./QuestionList";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { QUESTIONS } from "../../constants/routes";

const QuestionPage = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname === QUESTIONS && <QuestionList />}
      <Outlet></Outlet>
    </>
  );
};

export default QuestionPage;
