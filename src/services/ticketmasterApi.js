const baseUrl = 'https://app.ticketmaster.com/discovery/v2'

export async function getEvents(keyword = '') {
  const params = new URLSearchParams({
    apikey: import.meta.env.VITE_TICKETMASTER_API_KEY,
    size: '20',
  })

  if (keyword) {
    params.set('keyword', keyword)
  }

  const response = await fetch(`${baseUrl}/events.json?${params}`)

  if (!response.ok) {
    throw new Error('Could not load events.')
  }

  const data = await response.json()
  return data._embedded?.events || []
}
