import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchEvents } from '../features/events/eventsSlice.js'

function EventsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const { items: events, loading, error } = useSelector((state) => state.events)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchEvents())
  }, [dispatch])

  function handleSearch(formEvent) {
    formEvent.preventDefault()
    dispatch(
      fetchEvents({
        keyword: searchTerm.trim(),
        category: selectedCategory,
      }),
    )
  }

  return (
    <section>
      <h1>Events</h1>
      <p>Discover and register for upcoming events.</p>

      <form className="search-form" onSubmit={handleSearch}>
        <label htmlFor="event-search">Search Events</label>
        <div>
          <input
            id="event-search"
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Enter event name"
          />
          <select
            aria-label="Event category"
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Music">Music</option>
            <option value="Sports">Sports</option>
            <option value="Arts & Theatre">Arts & Theatre</option>
          </select>
          <button type="submit">Search</button>
        </div>
      </form>

      {loading && <p className="message">Loading events...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && events.length === 0 && (
        <p className="message">No events found.</p>
      )}

      <div className="events-list">
        {events.map((event) => (
          <article className="event-card" key={event.id}>
            {event.images?.[0] && (
              <img src={event.images[0].url} alt={event.name} />
            )}
            <div className="event-info">
              <h3>{event.name}</h3>
              <p>{event.dates?.start?.localDate || 'Date not available'}</p>
              <p>{event._embedded?.venues?.[0]?.name || 'Venue not available'}</p>
              <Link to={`/events/${event.id}`}>View Details</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default EventsPage
