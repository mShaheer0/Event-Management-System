import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getEvents } from '../../services/ticketmasterApi.js'

export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (keyword = '') => getEvents(keyword),
)

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchEvents.rejected, (state) => {
        state.loading = false
        state.error = 'Could not load events.'
      })
  },
})

export default eventsSlice.reducer
