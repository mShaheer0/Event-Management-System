import { createSlice } from '@reduxjs/toolkit'

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    setEvents: (state, action) => {
      state.items = action.payload
    },
  },
})

export const { setEvents } = eventsSlice.actions
export default eventsSlice.reducer
