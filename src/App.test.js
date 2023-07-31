import { render, screen } from '@testing-library/react';

import App from './App';

test('App', () => {
    render(<App />);

    expect(screen.getByText('Create User')).toBeInTheDocument();
    expect(screen.getByText('Create Loan')).toBeInTheDocument();
    expect(screen.getByText('View Loans')).toBeInTheDocument();
});
