import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'

vi.mock('../lib/submitBio', () => ({
  submitBio: vi.fn(),
}))

vi.mock('../lib/fetchMembers', () => ({
  fetchMembers: vi.fn().mockResolvedValue([]),
}))

import Members from '../pages/Members'
import { submitBio } from '../lib/submitBio'

describe('Manual bio form', () => {
  beforeEach(() => {
    submitBio.mockResolvedValue()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders name, role, and bio fields', () => {
    render(<Members />)
    expect(screen.getByPlaceholderText(/first name/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/developer, founder/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/tell the club/i)).toBeInTheDocument()
  })

  it('submits name, role, and bio to submitBio', async () => {
    render(<Members />)

    fireEvent.change(screen.getByPlaceholderText(/first name/i), { target: { value: 'Jane' } })
    fireEvent.change(screen.getByPlaceholderText(/developer, founder/i), { target: { value: 'Engineer' } })
    fireEvent.change(screen.getByPlaceholderText(/tell the club/i), { target: { value: 'I build things.' } })

    fireEvent.click(screen.getByRole('button', { name: /submit my bio/i }))

    await waitFor(() => {
      expect(submitBio).toHaveBeenCalledWith({
        name: 'Jane',
        role: 'Engineer',
        bio: 'I build things.',
      })
    })
  })

  it('shows confirmation after successful submission', async () => {
    render(<Members />)

    fireEvent.change(screen.getByPlaceholderText(/first name/i), { target: { value: 'Jane' } })
    fireEvent.change(screen.getByPlaceholderText(/developer, founder/i), { target: { value: 'Engineer' } })
    fireEvent.change(screen.getByPlaceholderText(/tell the club/i), { target: { value: 'I build things.' } })
    fireEvent.click(screen.getByRole('button', { name: /submit my bio/i }))

    await waitFor(() => {
      expect(screen.getByText(/pending approval/i)).toBeInTheDocument()
    })
  })
})
