import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  text: "",
  type: "success",
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.text = action.payload.text;
      if (action.payload.type) {
        state.type = action.payload.type;
      } else {
        state.type = "success";
      }
    },
    clearMessage: (state) => {
      state.text = "";
      state.type = "";
    },
  },
});

export default messageSlice.reducer;
export const { setMessage, clearMessage } = messageSlice.actions;
