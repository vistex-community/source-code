import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, addDoc, query } from "firebase/firestore";
import { getDoc } from "firebase/firestore";
import { sortObjectsByTimestamp } from "../../common/helpers/Util";
import database from "../../database/firebase";
import { sortObjects, getRandomNum } from "../../common/helpers/Util";
import { getViewCount } from "../../features/views/Util";
import { getLikeCount } from "../../features/likes/Util";
import DOC_TYPE from "../../constants/doctype";

const collectionRef = collection(database, "blogs");

/**Generates pending, fulfilled and rejected action types*/
export const getPosts = createAsyncThunk("getPosts", async (input) => {
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

  const blogPosts = snapshot.docs.map((doc) => {
    return {
      ...doc.data(),
      id: doc.id,
      likes: getLikeCount(doc.id, DOC_TYPE.blog, likes),
      views: getViewCount(doc.id, DOC_TYPE.blog, views),
    };
  });

  if (sortBy?.length) {
    sortObjects(blogPosts, sortBy);
  } else {
    sortObjectsByTimestamp(blogPosts);
  }

  return blogPosts;
});

export const addPost = createAsyncThunk("addPost", async (blog) => {
  await addDoc(collectionRef, blog);
});

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    isPending: false,
    posts: [],
    error: false,
  },
  reducers: {
    sortBlogs: (state, action) => {
      sortObjects(state.posts, action.payload);
    },
    updateBlogPostViews: (state, action) => {
      const blog = state.posts.find((blog) => {
        return blog.id === action.payload.postId;
      });

      blog.views = getViewCount(blog.id, DOC_TYPE.blog, action.payload.views);
    },
    updateBlogPostLikes: (state, action) => {
      const blog = state.posts.find((blog) => {
        return blog.id === action.payload.docId;
      });

      blog.likes = getLikeCount(blog.id, DOC_TYPE.blog, action.payload.likes);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.isPending = false;
      state.posts = action.payload;
      state.error = "";
    });
    builder.addCase(getPosts.rejected, (state, action) => {
      state.isPending = false;
      state.posts = [];
      state.error = action.error.message;
    });

    builder.addCase(addPost.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default blogSlice.reducer;
export const { sortBlogs, updateBlogPostViews, updateBlogPostLikes } =
  blogSlice.actions;
