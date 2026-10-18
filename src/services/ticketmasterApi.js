const API_URL = 'https://app.ticketmaster.com/discovery/v2'

export async function getEvents(keyword = '', category = '') {
  const queryParams = new URLSearchParams({
    apikey: import.meta.env.VITE_TICKETMASTER_API_KEY,
    size: '20',
  })

  if (keyword) {
    queryParams.set('keyword', keyword)
  }

  if (category) {
    queryParams.set('classificationName', category)
  }

  const response = await fetch(`${API_URL}/events.json?${queryParams}`)

  if (!response.ok) {
    throw new Error('Could not load events.')
  }

  const data = await response.json()
  return data._embedded?.events || []
}

export async function getEventById(eventId) {
  const apiKey = import.meta.env.VITE_TICKETMASTER_API_KEY
  const response = await fetch(`${API_URL}/events/${eventId}.json?apikey=${apiKey}`)

  if (!response.ok) {
    throw new Error('Could not load event details.')
  }

  return response.json()
}
