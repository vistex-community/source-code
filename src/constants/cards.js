import qa from "../images/svg/questions.svg";
import blog from "../images/svg/posts.svg";
// import latest_updates from "../images/svg/trends.svg";
import resources from "../images/svg/road_to_knowledge.svg";

const cards = [
  {
    id: 1,
    name: "QA Section",
    label: "See All Questions",
    url: qa,
    title: "10 Questions",
    subtitle: "20 Answers",
    linkTo: "questions",
  },
  {
    id: 2,
    name: "Blog Section",
    label: "Join The Blog",
    url: blog,
    title: "5 Topics",
    subtitle: "10 Posts",
    linkTo: "blogs",
  },
  // {
  //   id: 3,
  //   name: "Latest Updates",
  //   label: "Get Updates",
  //   url: latest_updates,
  //   title: "10 Updates",
  //   subtitle: "5 Comments",
  //   linkTo: "updates",
  // },
  {
    id: 3,
    name: "Resources",
    label: "Resources",
    url: resources,
    title: "3 Resources",
    subtitle: "5 Comments",
    linkTo: "resources",
  },
];

export default cards;
