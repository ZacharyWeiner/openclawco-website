import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { submitBio } from '../lib/submitBio'

describe('submitBio', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
    import.meta.env.VITE_APPS_SCRIPT_URL = 'https://script.google.com/fake'
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('posts bio data with type: member to VITE_APPS_SCRIPT_URL', async () => {
    fetch.mockResolvedValueOnce({ ok: true })

    await submitBio({ name: 'Jane', role: 'Developer', bio: 'Builds cool stuff.' })

    const body = JSON.parse(fetch.mock.calls[0][1].body)
    expect(body.type).toBe('member')
    expect(body.name).toBe('Jane')
    expect(body.role).toBe('Developer')
    expect(body.bio).toBe('Builds cool stuff.')
    expect(body.timestamp).toBeDefined()
  })

  it('throws when VITE_APPS_SCRIPT_URL is not set', async () => {
    import.meta.env.VITE_APPS_SCRIPT_URL = ''
    await expect(submitBio({ name: 'Jane', role: 'Dev', bio: 'Bio.' }))
      .rejects.toThrow('Apps Script URL not configured')
  })

  it('throws when the request fails', async () => {
    fetch.mockResolvedValueOnce({ ok: false, status: 500 })
    await expect(submitBio({ name: 'Jane', role: 'Dev', bio: 'Bio.' }))
      .rejects.toThrow('Bio submission failed')
  })
})
