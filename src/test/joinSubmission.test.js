import { describe, it, expect, vi, beforeEach } from 'vitest'
import { submitToSheet } from '../lib/submitToSheet'

describe('submitToSheet', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('posts form data to VITE_APPS_SCRIPT_URL', async () => {
    import.meta.env.VITE_APPS_SCRIPT_URL = 'https://script.google.com/fake'
    fetch.mockResolvedValueOnce({ ok: true })

    const formData = {
      name: 'Jane',
      email: 'jane@example.com',
      background: 'Developer',
      reason: 'Learn AI',
      interests: ['AI agent development'],
    }

    await submitToSheet(formData)

    expect(fetch).toHaveBeenCalledWith(
      'https://script.google.com/fake',
      expect.objectContaining({
        method: 'POST',
        body: expect.any(String),
      })
    )

    const body = JSON.parse(fetch.mock.calls[0][1].body)
    expect(body.name).toBe('Jane')
    expect(body.email).toBe('jane@example.com')
    expect(body.timestamp).toBeDefined()
  })

  it('throws when VITE_APPS_SCRIPT_URL is not set', async () => {
    import.meta.env.VITE_APPS_SCRIPT_URL = ''

    await expect(submitToSheet({ name: 'Jane', email: 'jane@example.com' }))
      .rejects.toThrow('Apps Script URL not configured')
  })

  it('throws when the request fails', async () => {
    import.meta.env.VITE_APPS_SCRIPT_URL = 'https://script.google.com/fake'
    fetch.mockResolvedValueOnce({ ok: false, status: 500 })

    await expect(submitToSheet({ name: 'Jane', email: 'jane@example.com' }))
      .rejects.toThrow('Sheet submission failed')
  })
})
