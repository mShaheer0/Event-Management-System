import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { fetchEventDetails } from '../features/events/eventsSlice.js'
import { addRegistration } from '../features/registrations/registrationsSlice.js'

function EventDetailsPage() {
  const { eventId } = useParams()
  const [message, setMessage] = useState('')
  const { selectedEvent, detailsLoading, detailsError } = useSelector(
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
  if (!selectedEvent) return null

  const venue = selectedEvent._embedded?.venues?.[0]
  const category = selectedEvent.classifications?.[0]?.segment?.name
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
    (registration) =>
      registration.userId === currentUser?.id &&
      registration.eventId === selectedEvent.id,
  )

  function handleRegistration() {
    if (alreadyRegistered) {
      setMessage('You are already registered for this event.')
      return
    }

    const newRegistration = {
      id: `${currentUser.id}-${selectedEvent.id}`,
      userId: currentUser.id,
      eventId: selectedEvent.id,
      name: selectedEvent.name,
      date: selectedEvent.dates?.start?.localDate || '',
      venue: venue?.name || '',
      image: selectedEvent.images?.[0]?.url || '',
    }

    const updatedRegistrations = [...registrations, newRegistration]
    dispatch(addRegistration(newRegistration))
    localStorage.setItem('registrations', JSON.stringify(updatedRegistrations))
    setMessage('Registration successful.')
  }

  return (
    <section className="event-details">
      <Link to="/">Back to Events</Link>

      {selectedEvent.images?.[0] && (
        <img src={selectedEvent.images[0].url} alt={selectedEvent.name} />
      )}
      <h1>Event Details</h1>
      <h2>{selectedEvent.name}</h2>
      <p>
        <strong>Date:</strong>{' '}
        {selectedEvent.dates?.start?.localDate || 'Not available'}
      </p>
      <p>
        <strong>Time:</strong>{' '}
        {selectedEvent.dates?.start?.localTime || 'Not available'}
      </p>
      <p>
        <strong>Venue:</strong> {venue?.name || 'Not available'}
      </p>
      <p>
        <strong>Location:</strong> {venue?.city?.name || 'Not available'},{' '}
        {venue?.country?.name || 'Not available'}
      </p>
      {mapUrl && (
        <p>
          <a href={mapUrl} target="_blank" rel="noreferrer">
            Open Venue in Google Maps
          </a>
        </p>
      )}
      <p>
        <strong>Category:</strong> {category || 'Not available'}
      </p>
      {selectedEvent.info && (
        <p>
          <strong>Information:</strong> {selectedEvent.info}
        </p>
      )}

      {currentUser ? (
        <button type="button" onClick={handleRegistration} disabled={alreadyRegistered}>
          {alreadyRegistered ? 'Already Registered' : 'Register for Event'}
        </button>
      ) : (
        <p>
          <Link to="/login">Login</Link> to register for this event.
        </p>
      )}

      {message && <p className="success-message">{message}</p>}
    </section>
  )
}

export default EventDetailsPage
