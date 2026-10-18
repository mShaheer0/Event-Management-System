import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeRegistration } from '../features/registrations/registrationsSlice.js'

const today = new Date().toISOString().split('T')[0]

function MyEventsPage() {
  const currentUser = useSelector((state) => state.auth.currentUser)
  const allRegistrations = useSelector((state) => state.registrations.items)
  const dispatch = useDispatch()

  const myRegistrations = allRegistrations.filter(
    (registration) => registration.userId === currentUser.id,
  )
  const upcomingEvents = myRegistrations.filter(
    (registration) => registration.date >= today,
  )
  const completedEvents = myRegistrations.filter(
    (registration) => registration.date < today,
  )

  function cancelRegistration(registrationId) {
    const updatedRegistrations = allRegistrations.filter(
      (registration) => registration.id !== registrationId,
    )
    dispatch(removeRegistration(registrationId))
    localStorage.setItem('registrations', JSON.stringify(updatedRegistrations))
  }

  return (
    <section>
      <h1>My Events</h1>

      {myRegistrations.length === 0 && (
        <p>You have not registered for any events yet.</p>
      )}

      {upcomingEvents.length > 0 && (
        <div className="my-events-section">
          <h2>Upcoming Events</h2>
          {upcomingEvents.map((registration) => (
            <article className="my-event" key={registration.id}>
              {registration.image && (
                <img src={registration.image} alt={registration.name} />
              )}
              <div>
                <h3>{registration.name}</h3>
                <p>{registration.date}</p>
                <p>{registration.venue}</p>
                <Link to={`/events/${registration.eventId}`}>View Details</Link>
                <button
                  type="button"
                  onClick={() => cancelRegistration(registration.id)}
                >
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
          {completedEvents.map((registration) => (
            <article className="my-event" key={registration.id}>
              {registration.image && (
                <img src={registration.image} alt={registration.name} />
              )}
              <div>
                <h3>{registration.name}</h3>
                <p>{registration.date}</p>
                <p>{registration.venue}</p>
                <Link to={`/events/${registration.eventId}`}>View Details</Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default MyEventsPage
