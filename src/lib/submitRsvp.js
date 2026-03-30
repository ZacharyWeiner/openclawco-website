export async function submitRsvp({ name, email, event }) {
  const url = import.meta.env.VITE_APPS_SCRIPT_URL
  if (!url) throw new Error('Apps Script URL not configured')

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      type: 'rsvp',
      name,
      email,
      event,
      timestamp: new Date().toISOString(),
    }),
  })

  if (!response.ok) throw new Error('RSVP submission failed')
}
