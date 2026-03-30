export async function submitSuggestion({ name, email, title, description }) {
  const url = import.meta.env.VITE_APPS_SCRIPT_URL
  if (!url) throw new Error('Apps Script URL not configured')

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      type: 'suggestion',
      name,
      email,
      title,
      description,
      votes: 0,
      timestamp: new Date().toISOString(),
    }),
  })

  if (!response.ok) throw new Error('Suggestion submission failed')
}
