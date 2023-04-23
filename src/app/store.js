import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import questionReducer from "../features/question/questionSlice";
import answerReducer from "../features/answer/answerSlice";
import messageReducer from "../features/message/messageSlice";
import blogReducer from "../features/blog/blogSlice";
import likeReducer from "../features/likes/likeSlice";
import viewReducer from "../features/views/viewSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  question: questionReducer,
  answer: answerReducer,
  blog: blogReducer,
  like: likeReducer,
  view: viewReducer,
  message: messageReducer,
});

export const store = configureStore({
  reducer: persistReducer(persistConfig, reducer),
});
