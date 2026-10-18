import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { fetchEventDetails } from '../features/events/eventsSlice.js'

function EventDetailsPage() {
  const { eventId } = useParams()
  const { selectedEvent: event, detailsLoading, detailsError } = useSelector(
    (state) => state.events,
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchEventDetails(eventId))
  }, [dispatch, eventId])

  if (detailsLoading) return <p>Loading event details...</p>
  if (detailsError) return <p className="error">{detailsError}</p>
  if (!event) return null

  const venue = event._embedded?.venues?.[0]
  const category = event.classifications?.[0]?.segment?.name

  return (
    <section className="event-details">
      <Link to="/">Back to Events</Link>

      {event.images?.[0] && <img src={event.images[0].url} alt={event.name} />}
      <h1>Event Details</h1>
      <h2>{event.name}</h2>
      <p><strong>Date:</strong> {event.dates?.start?.localDate || 'Not available'}</p>
      <p><strong>Time:</strong> {event.dates?.start?.localTime || 'Not available'}</p>
      <p><strong>Venue:</strong> {venue?.name || 'Not available'}</p>
      <p><strong>Location:</strong> {venue?.city?.name || 'Not available'}, {venue?.country?.name || 'Not available'}</p>
      <p><strong>Category:</strong> {category || 'Not available'}</p>
      {event.info && <p><strong>Information:</strong> {event.info}</p>}
    </section>
  )
}

export default EventDetailsPage
