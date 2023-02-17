import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';


export const fetchCreateComments = createAsyncThunk('comments/fetchCreateComments', async ({text, post}) => {
  console.log({text, post});
  const {data} = await axios.post('/comments', {text: text, post: post})
  console.log(data);
  return data
})

export const fetchComments = createAsyncThunk('comments/fetchComments', async (params) => {
  // console.log({post: params});
  const {data} = await axios.get(`/comments/${params}`)
  console.log(data);
  return data;
})

const initialState = {
  comments: {
    items: null,
    status: 'loading',
  }
    
}

const comments = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addToItems: (state, action) => {
      state.comments.items = [...state.comments.items, action.payload]
    }
  },
  extraReducers: {
    [fetchComments.pending]: (state, action) => {
      state.comments.status = 'loading'
      state.comments.items = null
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.comments.status = 'loaded'
      state.comments.items = action.payload
    },
    [fetchComments.rejected]: (state, action) => {
      state.comments.status = 'loaded'
      state.comments.items = null
    },
    [fetchCreateComments.pending]: (state, action) => {
      state.comments.status = 'loading'
      // state.comments.items = null
    },
    [fetchCreateComments.fulfilled]: (state, action) => {
      state.comments.status = 'loaded'
      console.log(action.payload);
      state.comments.items = action.payload
    },

  }
})

export const {addToItems} = comments.actions
export const commentsReducer = comments.reducer