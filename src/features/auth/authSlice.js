import { createSlice } from '@reduxjs/toolkit'

const savedUsers = JSON.parse(localStorage.getItem('users')) || []

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: null,
    users: savedUsers,
  },
  reducers: {
    registerUser: (state, action) => {
      state.users.push(action.payload)
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload
    },
    logout: (state) => {
      state.currentUser = null
    },
  },
})

export const { registerUser, setCurrentUser, logout } = authSlice.actions
export default authSlice.reducer
