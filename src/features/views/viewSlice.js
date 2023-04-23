import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, addDoc, getDoc, doc } from "firebase/firestore";
import database from "../../database/firebase";

const collectionRef = collection(database, "views");

export const getViews = createAsyncThunk("getViews", async () => {
  const snapshot = await getDocs(collectionRef);

  const views = snapshot.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
    };
  });

  return views;
});

export const updateView = createAsyncThunk("updateView", async (view) => {
  const docRef = await addDoc(collectionRef, view);
  const snapshot = await getDoc(doc(database, "views", docRef.id));
  return { ...snapshot.data(), id: docRef.id };
});

const viewSlice = createSlice({
  name: "view",
  initialState: {
    isPending: false,
    data: [],
    error: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getViews.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(getViews.fulfilled, (state, action) => {
      state.isPending = false;
      state.data = action.payload;
      state.error = "";
    });
    builder.addCase(getViews.rejected, (state, action) => {
      state.isPending = false;
      state.data = [];
      state.error = action.error.message;
    });
    builder.addCase(updateView.fulfilled, (state, action) => {
      console.log("views updated");
      state.data.push(action.payload);
      state.error = "";
    });
    builder.addCase(updateView.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default viewSlice.reducer;
