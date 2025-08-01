import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token
      state.user = action.payload.user
    },
    logout: (state) => {
      state.token = null
      state.user = null
    },
  },
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer
