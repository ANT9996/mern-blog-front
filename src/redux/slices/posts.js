import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await axios.get("/posts");
  return data;
});

export const fetchPopularPosts = createAsyncThunk("posts/fetchPopularPosts", async () => {
  const { data } = await axios.get("/posts/popular");
  return data;
});

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get("/tags");
  return data;
});

export const fetchPostsByTag = createAsyncThunk("posts/fetchPostsByTag", async (tag) => {
  console.log(tag);
  const {data} = await axios.get(`/posts/tag/${tag}`);
  console.log(data);
  return data;
});

export const fetchRemovePost = createAsyncThunk(
  "auth/fetchRemovePost",
  async (id) => {
    const { data } = await axios.delete(`/posts/${id}`);
    return data;
  }
);

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
};

const posts = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    // Получение постов
    [fetchPosts.pending]: (state, action) => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPosts.rejected]: (state, action) => {
      state.posts.items = [];
      state.posts.status = "error";
    },

    // Получение постов с опр. тэгом
    [fetchPostsByTag.pending]: (state, action) => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    [fetchPostsByTag.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPostsByTag.rejected]: (state, action) => {
      state.posts.items = [];
      state.posts.status = "error";
    },

    // Получение отсортированных постов
    [fetchPopularPosts.pending]: (state, action) => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    [fetchPopularPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPopularPosts.rejected]: (state, action) => {
      state.posts.items = [];
      state.posts.status = "error";
    },

    // Получение тэгов
    [fetchTags.pending]: (state, action) => {
      state.tags.items = [];
      state.tags.status = "loading";
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = "loaded";
    },
    [fetchTags.rejected]: (state, action) => {
      state.tags.items = [];
      state.tags.status = "error";
    },
    // Удаление статьи
    [fetchRemovePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter(obj => obj._id !== action.meta.arg);
      state.status = "loading";
    },
  },
});

export const postsReducer = posts.reducer;
