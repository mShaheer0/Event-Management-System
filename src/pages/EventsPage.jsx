import { Link } from 'react-router-dom'

function EventsPage() {
  return (
    <section>
      <h1>Events</h1>
      <p>Discover and register for upcoming events.</p>

      <div className="event-box">
        <h3>Events will be shown here</h3>
        <p>We will load them from Ticketmaster later.</p>
        <Link to="/events/sample-event">View sample details</Link>
      </div>
    </section>
  )
}

export default EventsPage
