import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { fetchEventDetails } from '../features/events/eventsSlice.js'
import { addRegistration } from '../features/registrations/registrationsSlice.js'

function EventDetailsPage() {
  const { eventId } = useParams()
  const [message, setMessage] = useState('')
  const { selectedEvent: event, detailsLoading, detailsError } = useSelector(
    (state) => state.events,
  )
  const currentUser = useSelector((state) => state.auth.currentUser)
  const registrations = useSelector((state) => state.registrations.items)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchEventDetails(eventId))
  }, [dispatch, eventId])

  if (detailsLoading) return <p>Loading event details...</p>
  if (detailsError) return <p className="error">{detailsError}</p>
  if (!event) return null

  const venue = event._embedded?.venues?.[0]
  const category = event.classifications?.[0]?.segment?.name
  const coordinates = venue?.location
    ? `${venue.location.latitude},${venue.location.longitude}`
    : ''
  const address = [venue?.name, venue?.address?.line1, venue?.city?.name]
    .filter(Boolean)
    .join(', ')
  const mapQuery = coordinates || address
  const mapUrl = mapQuery
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`
    : ''
  const alreadyRegistered = registrations.some(
    (item) => item.userId === currentUser?.id && item.eventId === event.id,
  )

  function handleRegistration() {
    if (alreadyRegistered) {
      setMessage('You are already registered for this event.')
      return
    }

    const registration = {
      id: `${currentUser.id}-${event.id}`,
      userId: currentUser.id,
      eventId: event.id,
      name: event.name,
      date: event.dates?.start?.localDate || '',
      venue: venue?.name || '',
      image: event.images?.[0]?.url || '',
    }

    dispatch(addRegistration(registration))
    localStorage.setItem('registrations', JSON.stringify([...registrations, registration]))
    setMessage('Registration successful.')
  }

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
      {mapUrl && (
        <p>
          <a href={mapUrl} target="_blank" rel="noreferrer">Open Venue in Google Maps</a>
        </p>
      )}
      <p><strong>Category:</strong> {category || 'Not available'}</p>
      {event.info && <p><strong>Information:</strong> {event.info}</p>}

      {currentUser ? (
        <button type="button" onClick={handleRegistration} disabled={alreadyRegistered}>
          {alreadyRegistered ? 'Already Registered' : 'Register for Event'}
        </button>
      ) : (
        <p><Link to="/login">Login</Link> to register for this event.</p>
      )}

      {message && <p className="success-message">{message}</p>}
    </section>
  )
}

export default EventDetailsPage
