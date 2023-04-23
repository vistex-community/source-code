import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { collection, getDocs, addDoc, query } from "firebase/firestore";
import database from "../../database/firebase";
import {
  getRandomNum,
  sortObjectsByTimestamp,
} from "../../common/helpers/Util";
import { sortObjects } from "../../common/helpers/Util";
import DOC_TYPE from "../../constants/doctype";
import { getViewCount } from "../../features/views/Util";
import { getLikeCount } from "../../features/likes/Util";

const collectionRef = collection(database, "questions");

/**Generates pending, fulfilled and rejected action types*/
export const getQuestions = createAsyncThunk("getQuestions", async (input) => {
  let q;

  if (input) {
    var { sConstraints, sortBy, views, likes } = input;
  }

  if (sConstraints?.length) {
    q = query(collectionRef, ...sConstraints);
  } else {
    q = query(collectionRef);
  }

  const snapshot = await getDocs(q);

  const questions = snapshot.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
      likes: getLikeCount(doc.id, DOC_TYPE.question, likes),
      views: getViewCount(doc.id, DOC_TYPE.question, views),
    };
  });

  if (sortBy?.length) {
    sortObjects(questions, sortBy);
  } else {
    sortObjectsByTimestamp(questions);
  }
  return questions;
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
  reducers: {
    sortQuestions: (state, action) => {
      sortObjects(state.data, action.payload);
    },
    updateQuesViews: (state, action) => {
      const question = state.data.find((question) => {
        return question.id === action.payload.questionId;
      });

      question.views = getViewCount(
        question.id,
        DOC_TYPE.question,
        action.payload.views
      );
    },

    updateQuesLikes: (state, action) => {
      const question = state.data.find((question) => {
        return question.id === action.payload.docId;
      });

      question.likes = getLikeCount(
        question.id,
        DOC_TYPE.question,
        action.payload.likes
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getQuestions.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(getQuestions.fulfilled, (state, action) => {
      state.isPending = false;
      state.data = action.payload;
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
export const { sortQuestions, updateQuesViews, updateQuesLikes } =
  questionSlice.actions;
