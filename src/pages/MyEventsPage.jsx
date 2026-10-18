import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeRegistration } from '../features/registrations/registrationsSlice.js'

const today = new Date().toISOString().split('T')[0]

function MyEventsPage() {
  const currentUser = useSelector((state) => state.auth.currentUser)
  const registrations = useSelector((state) => state.registrations.items)
  const dispatch = useDispatch()

  const myRegistrations = registrations.filter((item) => item.userId === currentUser.id)
  const upcomingEvents = myRegistrations.filter((item) => item.date >= today)
  const completedEvents = myRegistrations.filter((item) => item.date < today)

  function cancelRegistration(registrationId) {
    const updatedRegistrations = registrations.filter((item) => item.id !== registrationId)
    dispatch(removeRegistration(registrationId))
    localStorage.setItem('registrations', JSON.stringify(updatedRegistrations))
  }

  return (
    <section>
      <h1>My Events</h1>

      {myRegistrations.length === 0 && <p>You have not registered for any events yet.</p>}

      {upcomingEvents.length > 0 && (
        <div className="my-events-section">
          <h2>Upcoming Events</h2>
          {upcomingEvents.map((event) => (
            <article className="my-event" key={event.id}>
              {event.image && <img src={event.image} alt={event.name} />}
              <div>
                <h3>{event.name}</h3>
                <p>{event.date}</p>
                <p>{event.venue}</p>
                <Link to={`/events/${event.eventId}`}>View Details</Link>
                <button type="button" onClick={() => cancelRegistration(event.id)}>
                  Cancel Registration
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {completedEvents.length > 0 && (
        <div className="my-events-section">
          <h2>Completed Events</h2>
          {completedEvents.map((event) => (
            <article className="my-event" key={event.id}>
              {event.image && <img src={event.image} alt={event.name} />}
              <div>
                <h3>{event.name}</h3>
                <p>{event.date}</p>
                <p>{event.venue}</p>
                <Link to={`/events/${event.eventId}`}>View Details</Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default MyEventsPage
