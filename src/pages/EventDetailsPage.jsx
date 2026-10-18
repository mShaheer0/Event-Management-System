import { useParams } from 'react-router-dom'

function EventDetailsPage() {
  const { eventId } = useParams()

  return (
    <section>
      <h1>Event Details</h1>
      <p>Details for event: {eventId}</p>
    </section>
  )
}

export default EventDetailsPage
