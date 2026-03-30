import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { fetchMembers } from '../lib/fetchMembers'

describe('fetchMembers', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
    import.meta.env.VITE_APPS_SCRIPT_URL = 'https://script.google.com/fake'
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('fetches approved members from VITE_APPS_SCRIPT_URL with ?type=members', async () => {
    const mockMembers = [
      { name: 'Jane', role: 'Developer', bio: 'Builds cool stuff.' },
    ]
    fetch.mockResolvedValueOnce({ ok: true, json: async () => mockMembers })

    const result = await fetchMembers()

    expect(fetch).toHaveBeenCalledWith('https://script.google.com/fake?type=members')
    expect(result).toEqual(mockMembers)
  })

  it('returns empty array when no members exist', async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: async () => [] })
    const result = await fetchMembers()
    expect(result).toEqual([])
  })

  it('throws when VITE_APPS_SCRIPT_URL is not set', async () => {
    import.meta.env.VITE_APPS_SCRIPT_URL = ''
    await expect(fetchMembers()).rejects.toThrow('Apps Script URL not configured')
  })

  it('throws when the request fails', async () => {
    fetch.mockResolvedValueOnce({ ok: false, status: 500 })
    await expect(fetchMembers()).rejects.toThrow('Failed to fetch members')
  })
})
