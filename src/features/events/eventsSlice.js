import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getEventById, getEvents } from '../../services/ticketmasterApi.js'

export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (keyword = '') => getEvents(keyword),
)

export const fetchEventDetails = createAsyncThunk(
  'events/fetchEventDetails',
  async (eventId) => getEventById(eventId),
)

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    items: [],
    selectedEvent: null,
    loading: false,
    error: null,
    detailsLoading: false,
    detailsError: null,
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
      .addCase(fetchEventDetails.pending, (state) => {
        state.detailsLoading = true
        state.detailsError = null
        state.selectedEvent = null
      })
      .addCase(fetchEventDetails.fulfilled, (state, action) => {
        state.detailsLoading = false
        state.selectedEvent = action.payload
      })
      .addCase(fetchEventDetails.rejected, (state) => {
        state.detailsLoading = false
        state.detailsError = 'Could not load event details.'
      })
  },
})

export default eventsSlice.reducer
