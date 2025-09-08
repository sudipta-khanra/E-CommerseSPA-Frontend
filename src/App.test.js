import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders products page', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  // Look for Products heading on home page
  const heading = screen.getByText(/products/i); 
  expect(heading).toBeInTheDocument();
});
