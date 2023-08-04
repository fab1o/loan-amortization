import { render, screen } from '@testing-library/react';

import User from '../../pages/User/User';

test('User', () => {
    render(<User />);

    expect(screen.getByText('Create User')).toBeInTheDocument();
});
