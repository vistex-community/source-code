import { QUESTIONS, BLOGS } from "../../constants/routes";
import { sortQuestions } from "../../features/question/questionSlice";
import { sortAnswers } from "../../features/answer/answerSlice";
import { sortBlogs } from "../../features/blog/blogSlice";

export function getInitialName(name) {
  if (name) {
    return name.split(" ")[0].charAt(0).toUpperCase();
  }
}

export function formatDateTime(timestamp) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    // second: "2-digit",
  }).format(timestamp);
}

export function sortObjectsByTimestamp(objects) {
  return objects.sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1));
}

export function getRandomNum() {
  return Math.floor(Math.random() * 100 + 1);
}

export function sortObjects(objects, sortByValue) {
  if (sortByValue == "oldest") {
    return objects.sort((a, b) => (a.timestamp < b.timestamp ? -1 : 1));
  } else {
    return objects.sort((a, b) => (a[sortByValue] > b[sortByValue] ? -1 : 1));
  }
}

export function sortObjectData(sortByValue, location, dispatch) {
  switch (location.pathname) {
    case QUESTIONS: //sortQuestions(event.target.value);
      dispatch(sortQuestions(sortByValue));
      break;

    case BLOGS:
      dispatch(sortBlogs(sortByValue));
      break;

    default:
      dispatch(sortAnswers(sortByValue));
  }
}

export const fetchIPAddress = async () => {
  const url = "https://api.ipify.org/?format=json";
  const response = await fetch(url);
  const data = await response.json();
  localStorage.setItem("vs-ipaddress", data.ip);
};
