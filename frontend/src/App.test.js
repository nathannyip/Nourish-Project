import { render, screen } from '@testing-library/react';
import Dashboard from '.pages/dashboard';

test('renders dashbaord', () => {
  render(<Dashboard />);
  const heading = screen.getByText(/dashboard/i);
  expect(heading).toBeInTheDocument();
});
