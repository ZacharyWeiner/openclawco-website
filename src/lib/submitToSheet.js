export async function submitToSheet(formData) {
  const url = import.meta.env.VITE_APPS_SCRIPT_URL
  if (!url) throw new Error('Apps Script URL not configured')

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      ...formData,
      interests: Array.isArray(formData.interests)
        ? formData.interests.join(', ')
        : '',
      timestamp: new Date().toISOString(),
    }),
  })

  if (!response.ok) throw new Error('Sheet submission failed')
}
