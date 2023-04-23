import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  addDoc,
  getDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import database from "../../database/firebase";

const collectionRef = collection(database, "likes");

export const getLikes = createAsyncThunk("getLikes", async () => {
  const snapshot = await getDocs(collectionRef);

  const likes = snapshot.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
    };
  });

  return likes;
});

export const updateLike = createAsyncThunk("updateLike", async (like) => {
  const docRef = await addDoc(collectionRef, like);
  const snapshot = await getDoc(doc(database, "likes", docRef.id));
  return { ...snapshot.data(), id: docRef.id };
});

export const deleteLike = createAsyncThunk("deleteLike", async (likeId) => {
  await deleteDoc(doc(database, "likes", likeId));
});

const likeSlice = createSlice({
  name: "like",
  initialState: {
    isPending: false,
    data: [],
    error: false,
  },

  extraReducers: (builder) => {
    builder.addCase(getLikes.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(getLikes.fulfilled, (state, action) => {
      state.isPending = false;
      state.data = action.payload;
      state.error = "";
    });
    builder.addCase(getLikes.rejected, (state, action) => {
      state.isPending = false;
      state.data = [];
      state.error = action.error.message;
    });

    builder.addCase(updateLike.fulfilled, (state, action) => {
      state.data.push(action.payload);
      state.error = "";
    });

    builder.addCase(updateLike.rejected, (state, action) => {
      state.error = action.error.message;
    });

    builder.addCase(deleteLike.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default likeSlice.reducer;
