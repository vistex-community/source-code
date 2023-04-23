import { collection, query, where, getDocs } from "firebase/firestore";
import database from "../../database/firebase";

export const getViewCount = (docId, docType, views) => {
  const filteredViews = views?.filter(
    (view) => view.docId === docId && view.docType === docType
  );
  return filteredViews?.length;
};

export const getViewExistsWhereClause = (view) => {
  let q;
  const collectionRef = collection(database, "views");
  if (view?.uid) {
    q = query(
      collectionRef,
      where("docId", "==", view.docId),
      where("docType", "==", view.docType),
      where("uid", "==", view.uid)
    );
  } else {
    q = query(
      collectionRef,
      where("docId", "==", view.docId),
      where("docType", "==", view.docType),
      where("ipAddress", "==", view.ipAddress)
    );
    view.uid = "Anonymous";
  }
  return q;
};
