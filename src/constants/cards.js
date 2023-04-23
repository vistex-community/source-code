import qa from "../images/svg/questions.svg";
import blog from "../images/svg/posts.svg";
import latest_updates from "../images/svg/trends.svg";
import resources from "../images/svg/road_to_knowledge.svg";
import feedback from "../images/svg/feedback.svg";

import { QUESTIONS, BLOGS, RESOURCES } from "./routes";

const cards = [
  {
    id: 1,
    name: "QA",
    label: "All Questions",
    url: qa,
    title: "10 Questions",
    subtitle: "20 Answers",
    linkTo: QUESTIONS,
  },
  {
    id: 2,
    name: "Blog",
    label: "All Blog Posts",
    url: blog,
    title: "5 Topics",
    // subtitle: "10 Posts",
    linkTo: BLOGS,
  },
  {
    id: 3,
    name: "Resources",
    label: "All Resources",
    url: resources,
    title: "3 Resources",
    linkTo: RESOURCES,
  },

  {
    id: 4,
    name: "Latest Updates",
    label: "Get Updates",
    url: latest_updates,
    // title: "10 Updates",
    // subtitle: "5 Comments",
    linkTo: "updates",
  },

  // {
  //   id: 5,
  //   name: "Feedback",
  //   label: "Feedback",
  //   url: feedback,
  //   title: "3 Suggestions",
  //   linkTo: RESOURCES,
  // },
];

export default cards;
