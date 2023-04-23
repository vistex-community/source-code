import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Posts from "./Posts";
import { BLOGS } from "../../constants/routes";

const Blogs = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname === BLOGS && <Posts />}
      <Outlet></Outlet>
    </>
  );
};

export default Blogs;
