import { Feedback } from "@mui/icons-material";
import { Box } from "@mui/material";
import Banner from "../common/components/Banner";
import Cards from "../common/components/Cards";
import MessageToast from "../common/components/MessageToast";
import AddFeedback from "../features/feedback/AddFeedback";

const HomePage = () => {
  return (
    <Box>
      <MessageToast></MessageToast>
      <Banner></Banner>
      <Cards></Cards>
      {/* <AddFeedback></AddFeedback> */}
    </Box>
  );
};

export default HomePage;
