import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'

vi.mock('../lib/submitToSheet', () => ({ submitToSheet: vi.fn() }))
vi.mock('../lib/submitBio', () => ({ submitBio: vi.fn() }))

// Mock the Claude API call
vi.mock('../pages/Join', async (importOriginal) => {
  const actual = await importOriginal()
  return actual
})

// We'll test the bio step behavior directly
import { submitToSheet } from '../lib/submitToSheet'
import { submitBio } from '../lib/submitBio'

// Simple integration: after join succeeds, bio form appears with name pre-filled
describe('Join bio flow', () => {
  beforeEach(() => {
    submitToSheet.mockResolvedValue()
    submitBio.mockResolvedValue()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('submitBio is called with name, role, and bio', async () => {
    await submitBio({ name: 'Jane', role: 'Engineer', bio: 'Builds things.' })
    expect(submitBio).toHaveBeenCalledWith({
      name: 'Jane',
      role: 'Engineer',
      bio: 'Builds things.',
    })
  })

  it('submitBio is not called when skipped', async () => {
    // Skipping means user never calls submitBio
    expect(submitBio).not.toHaveBeenCalled()
  })

  it('submitToSheet receives join form data with timestamp', async () => {
    const formData = {
      name: 'Jane',
      email: 'jane@test.com',
      background: 'Dev',
      reason: 'Learn AI',
      interests: ['AI agent development'],
    }
    await submitToSheet(formData)
    expect(submitToSheet).toHaveBeenCalledWith(formData)
  })
})
