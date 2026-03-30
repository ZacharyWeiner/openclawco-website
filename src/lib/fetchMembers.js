export async function fetchMembers() {
  const url = import.meta.env.VITE_APPS_SCRIPT_URL
  if (!url) throw new Error('Apps Script URL not configured')

  const response = await fetch(`${url}?type=members`)
  if (!response.ok) throw new Error('Failed to fetch members')

  return response.json()
}
