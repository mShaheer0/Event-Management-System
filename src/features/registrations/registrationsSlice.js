import { createSlice } from '@reduxjs/toolkit'

const registrationsSlice = createSlice({
  name: 'registrations',
  initialState: {
    items: [],
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
