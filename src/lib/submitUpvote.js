export async function submitUpvote({ event, name }) {
  const url = import.meta.env.VITE_APPS_SCRIPT_URL
  if (!url) throw new Error('Apps Script URL not configured')

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      type: 'upvote',
      event,
      name: name || 'Anonymous',
      timestamp: new Date().toISOString(),
    }),
  })

  if (!response.ok) throw new Error('Upvote submission failed')
}
