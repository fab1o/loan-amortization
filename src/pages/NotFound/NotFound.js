import React from 'react';

import { Typography } from '@mui/material';

function NotFound() {
    return (
        <>
            <Typography variant="h5">
                404 Not Found
            </Typography>
            <Typography component="p">
                Use the menu on the left side bar to navigate.
            </Typography>
        </>
    );
}

export default NotFound;
