import { collection, query, where, getDocs } from "firebase/firestore";
import database from "../../database/firebase";

export const getLikeCount = (docId, docType, likes) => {
  const filteredLikes = likes?.filter(
    (like) => like.docId === docId && like.docType === docType
  );
  return filteredLikes?.length;
};

export const getLikeExistsWhereClause = (like) => {
  let q;
  const collectionRef = collection(database, "likes");

  q = query(
    collectionRef,
    where("docId", "==", like.docId),
    where("docType", "==", like.docType),
    where("uid", "==", like?.uid)
  );

  return q;
};
