import { createSlice } from '@reduxjs/toolkit'

const savedUsers = JSON.parse(localStorage.getItem('users')) || []
const savedCurrentUser = JSON.parse(localStorage.getItem('currentUser')) || null

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: savedCurrentUser,
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
