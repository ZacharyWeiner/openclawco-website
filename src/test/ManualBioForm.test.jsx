import { render, screen } from '@testing-library/react'
import { vi, describe, it, expect } from 'vitest'

vi.mock('../lib/fetchMembers', () => ({
  fetchMembers: vi.fn().mockResolvedValue([]),
}))

import Members from '../pages/Members'

describe('Members page', () => {
  it('renders the members grid', () => {
    render(<Members />)
    expect(screen.getByText(/the builders/i)).toBeInTheDocument()
  })

  it('does not render a bio submission form', () => {
    render(<Members />)
    expect(screen.queryByPlaceholderText(/tell the club/i)).not.toBeInTheDocument()
  })
})
