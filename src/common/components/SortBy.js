import {
  Typography,
  Stack,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { sortObjectData } from "../helpers/Util";

const SortBy = ({ list, selectedValue, setSelectedValue }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  return (
    <Stack direction="row" alignItems="center">
      <Typography variant="subtitle1">Sort by:</Typography>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <Select
          id="sortBy"
          value={selectedValue}
          displayEmpty
          onChange={(event) => {
            setSelectedValue(event.target.value);
            sortObjectData(event.target.value, location, dispatch);
          }}
        >
          {list &&
            list.map((item) => {
              return (
                <MenuItem key={item.value} value={item.value}>
                  {item.descr}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
    </Stack>
  );
};

export default SortBy;
