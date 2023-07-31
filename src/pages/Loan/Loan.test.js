import { render, screen } from '@testing-library/react';

import Loan from './Loan';

test('Loan', () => {
    render(<Loan />);

    expect(
        screen.getByText('You must create a user first.')
    ).toBeInTheDocument();
});

test('Loan with user', () => {
    render(<Loan user={{ id: 1, username: 'test' }} />);

    expect(screen.getByText('Create Loan')).toBeInTheDocument();
});
