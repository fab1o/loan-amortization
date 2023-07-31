import React from 'react';

import { Typography } from '@mui/material';

function Home() {
    return (
        <>
            <Typography variant="h5">
                Welcome to Loan Amortization App!
            </Typography>
            <Typography component="p">
                Select an item from the left side bar menu to create users,
                loans and view all loans.
            </Typography>
        </>
    );
}

export default Home;
