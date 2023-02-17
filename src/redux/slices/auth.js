import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from '../../axios';

export const fetchUserData = createAsyncThunk('auth/fetchUserData', async (params) => {
  const {data} = await axios.post('/auth/login', params)
  return data
})

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
  const {data} = await axios.get('/auth/me')
  return data
})

export const fetchRegister = createAsyncThunk('auth/fetchAuthMe', async (params) => {
  const {data} = await axios.post('/auth/register', params)
  return data
}) 





const initialState = {
  data: null,
  status: 'loading'
}

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state, action) => {
      state.data = null
    }
  },
  extraReducers: {
    // Получение информации о пользователе
    [fetchUserData.pending]: (state, action) => {
      state.data = null;
      state.status = 'loading';
    },
    [fetchUserData.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.data = action.payload;
      state.status = 'loaded';
    },
    [fetchUserData.rejected]: (state, action) => {
      state.data = null;
      state.status = 'error';
    },

    // Авторизация
    [fetchAuthMe.pending]: (state, action) => {
      state.data = null;
      state.status = 'loading';
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.data = action.payload;
      state.status = 'loaded';
    },
    [fetchAuthMe.rejected]: (state, action) => {
      state.data = null;
      state.status = 'error';
    },
    // Регистрация
    [fetchRegister.pending]: (state, action) => {
      state.data = null;
      state.status = 'loading';
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    },
    [fetchRegister.rejected]: (state, action) => {
      state.data = null;
      state.status = 'error';
    },
  }
})

export const selectIsAuth = state => Boolean(state.auth.data)
export const {logout} = auth.actions
export const authReducer = auth.reducer