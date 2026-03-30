export async function submitBio({ name, role, bio }) {
  const url = import.meta.env.VITE_APPS_SCRIPT_URL
  if (!url) throw new Error('Apps Script URL not configured')

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      type: 'member',
      name,
      role,
      bio,
      timestamp: new Date().toISOString(),
    }),
  })

  if (!response.ok) throw new Error('Bio submission failed')
}
