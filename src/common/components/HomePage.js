import React from "react";
// import { useState } from "react";
import Banner from "./Banner";
import Cards from "./Cards";
// import MessageToast from "./MessageToast";
import { Box } from "@mui/material";
// import { useLocation } from "react-router-dom";

const HomePage = () => {
  // const [message, setMessage] = useState();
  // const location = useLocation();

  // if (location.state.message) {
  //   setMessage(location.state.message);
  //   location.state.message = undefined;
  // }
  // console.log(message + " from Home Page");

  return (
    <Box>
      {/* {message && message.text && (
        <MessageToast message={message} setMessage={setMessage} />
      )} */}
      <Banner></Banner>
      <Cards></Cards>
    </Box>
  );
};

export default HomePage;
