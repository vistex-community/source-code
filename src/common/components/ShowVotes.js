import { IconButton, Typography, Stack, Tooltip } from "@mui/material";
import UpIcon from "../../images/svg/up.svg";
import DownIcon from "../../images/svg/down.svg";

const ShowVotes = ({ votes }) => {
  let noOfVotes = votes;

  /**temp code to generate random votes*/
  if (noOfVotes == "0") {
    noOfVotes = Math.floor(Math.random() * 10 + 1);
  }

  return (
    <Stack display="flex" alignItems="center" sx={{ marginTop: 2 }}>
      <div class="vote-btn">
        <Tooltip title="Up Vote" arrow placement="right">
          <img src={UpIcon} height="32px"></img>
        </Tooltip>
      </div>
      <Typography variant="subtitle1">{noOfVotes}</Typography>
      <div class="vote-btn">
        <Tooltip title="Down Vote" arrow placement="right">
          <img src={DownIcon} height="32px"></img>
        </Tooltip>
      </div>
    </Stack>
  );
};

export default ShowVotes;
