import { Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useParams } from "react-router-dom";
import DOC_TYPE from "../../constants/doctype";
import {
  deleteLike,
  getLikes,
  updateLike,
} from "../../features/likes/likeSlice";
import { useUserAuth } from "../../contexts/UserAuthContext";
import { getLikeExistsWhereClause } from "../../features/likes/Util";
import { updateQuesLikes } from "../../features/question/questionSlice";
import { collection } from "firebase/firestore";
import database from "../../database/firebase";
import { getDocs } from "firebase/firestore";
import { updateBlogPostLikes } from "../../features/blog/blogSlice";
import { USER_SIGN_IN } from "../../constants/routes";

const Stats = ({ Icon, value, clickable }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useUserAuth();
  const { data: likes } = useSelector((state) => state.like);

  const [, pathname, docId] = location.pathname.split("/");
  const docType = pathname === "questions" ? DOC_TYPE.question : DOC_TYPE.blog;

  const updateLikes = () => {
    getDocs(collection(database, "likes")).then((snapshot) => {
      const likes = snapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      if (pathname === "questions") {
        dispatch(updateQuesLikes({ docId, likes }));
      } else {
        //blog
        dispatch(updateBlogPostLikes({ docId, likes }));
      }
    });
  };
  const handleLike = () => {
    // if (!user) {
    //   return <Navigate to={USER_SIGN_IN} state={{ from: location.pathname }} />;
    // }

    const like = {
      docId: docId,
      docType: docType,
      uid: user?.uid,
      timestamp: Date.now(),
    };

    getDocs(getLikeExistsWhereClause(like))
      .then((querySnapshot) => {
        if (!querySnapshot.size) {
          dispatch(updateLike(like)).then(() => {
            updateLikes();
          });
        } else {
          console.log("like already exists");
          const currendDoclikes = querySnapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              id: doc.id,
            };
          });
          dispatch(deleteLike(currendDoclikes[0].id)).then(() => {
            updateLikes();
            dispatch(getLikes());
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Stack direction="row">
      <Icon
        fontSize="small"
        className="stats-icon"
        sx={clickable && user && { cursor: "pointer" }}
        onClick={handleLike}
      />

      <Typography variant="body2" sx={{ marginLeft: "3px" }}>
        {value}
      </Typography>
    </Stack>
  );
};

export default Stats;
