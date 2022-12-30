import { configureStore } from "@reduxjs/toolkit";
import questionReducer from "../features/question/questionSlice";
import answerReducer from "../features/answer/answerSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  question: questionReducer,
  answer: answerReducer,
});

export const store = configureStore({
  reducer: persistReducer(persistConfig, reducer),
});
