import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import database from "../../database/firebase";
import {
  sortObjectsByTimestamp,
  getRandomNum,
} from "../../common/helpers/Util";
import { sortObjects } from "../../common/helpers/Util";

/**Generates pending, fulfilled and rejected action types*/
const collectionRef = collection(database, "answers");

export const getAnswers = createAsyncThunk("getAnswers", async () => {
  const snapshot = await getDocs(collectionRef);

  return snapshot.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
      likes: getRandomNum(),
      views: getRandomNum(),
    };
  });
});

export const addAnswer = createAsyncThunk("addAnswer", async (answer) => {
  const docRef = await addDoc(collectionRef, answer);
  const snapshot = await getDoc(doc(database, "answers", docRef.id));
  return { ...snapshot.data() };
});

const answerSlice = createSlice({
  name: "answer",
  initialState: {
    isPending: false,
    data: [],
    error: false,
  },
  reducers: {
    sortAnswers: (state, action) => {
      sortObjects(state.data, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAnswers.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(getAnswers.fulfilled, (state, action) => {
      state.isPending = false;
      state.data = action.payload;
      sortObjectsByTimestamp(state.data);
      state.error = "";
    });
    builder.addCase(getAnswers.rejected, (state, action) => {
      state.isPending = false;
      state.data = [];
      state.error = action.error.message;
    });

    builder.addCase(addAnswer.fulfilled, (state, action) => {
      state.data.push(action.payload);
      sortObjectsByTimestamp(state.data);
      state.error = "";
    });

    builder.addCase(addAnswer.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default answerSlice.reducer;
export const { sortAnswers } = answerSlice.actions;
