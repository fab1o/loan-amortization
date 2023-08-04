import { useState, useRef } from 'react';

import { Button, TextField, Typography, Alert, Snackbar } from '@mui/material';

import * as UserApi from '../../api/user';

function User({ onUserSelect }) {
    const usernameRef = useRef();
    const [alert, setAlert] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const user = await UserApi.createUser({
                username: usernameRef.current.value,
            });

            onUserSelect(user);

            setAlert({
                type: 'success',
                message: 'User has been created.',
            });
        } catch (ex) {
            console.log(ex);
            setAlert({
                type: 'error',
                message: ex.message,
            });
        }
    }

    function handleCloseAlert() {
        setAlert(null);
    }

    return (
        <>
            <Typography variant="h5">Create User</Typography>

            <form onSubmit={handleSubmit}>
                <TextField
                    required
                    label="Username"
                    variant="standard"
                    helperText="Enter your username"
                    inputRef={usernameRef}
                />
                <Button type="submit" variant="contained">
                    Save
                </Button>
            </form>
            <Snackbar
                open={!!alert}
                autoHideDuration={3000}
                onClose={handleCloseAlert}
            >
                {alert && (
                    <Alert onClose={handleCloseAlert} severity={alert.type}>
                        {alert.message}
                    </Alert>
                )}
            </Snackbar>
        </>
    );
}

export default User;
