import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import database from "../../database/firebase";
import { sortObjectsByTimestamp } from "../../common/helpers/Util";

const collectionRef = collection(database, "questions");

/**Generates pending, fulfilled and rejected action types*/
export const getQuestions = createAsyncThunk("getQuestions", async () => {
  const snapshot = await getDocs(collectionRef);

  return snapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
});

export const addQuestion = createAsyncThunk("addQuestion", async (question) => {
  await addDoc(collectionRef, question);
});

const questionSlice = createSlice({
  name: "question",
  initialState: {
    isPending: false,
    data: [],
    error: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getQuestions.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(getQuestions.fulfilled, (state, action) => {
      state.isPending = false;
      state.data = action.payload;
      sortObjectsByTimestamp(state.data);
      state.error = "";
    });
    builder.addCase(getQuestions.rejected, (state, action) => {
      state.isPending = false;
      state.data = [];
      state.error = action.error.message;
    });

    builder.addCase(addQuestion.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default questionSlice.reducer;
