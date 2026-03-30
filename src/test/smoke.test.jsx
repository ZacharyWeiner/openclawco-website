import { render, screen } from '@testing-library/react'

test('testing framework is working', () => {
  render(<h1>OpenClaw</h1>)
  expect(screen.getByText('OpenClaw')).toBeInTheDocument()
})
