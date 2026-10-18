import { createSlice } from '@reduxjs/toolkit'

const savedRegistrations = JSON.parse(localStorage.getItem('registrations')) || []

const registrationsSlice = createSlice({
  name: 'registrations',
  initialState: {
    items: savedRegistrations,
  },
  reducers: {
    addRegistration: (state, action) => {
      state.items.push(action.payload)
    },
    removeRegistration: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
  },
})

export const { addRegistration, removeRegistration } = registrationsSlice.actions
export default registrationsSlice.reducer
