import { render, screen } from '@testing-library/react';

import Home from './Home';

test('Home', () => {
    render(<Home />);

    expect(
        screen.getByText('Welcome to Loan Amortization App!')
    ).toBeInTheDocument();
});
