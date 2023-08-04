import { useReducer, useState } from 'react';

import { Button, TextField, Typography, Alert, Snackbar } from '@mui/material';

import * as UserApi from '../../api/user';
import * as LoanApi from '../../api/loan';

function Loan({ user }) {
    const [formInput, setFormInput] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            name: '',
            email: '',
        }
    );
    const [alert, setAlert] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();

        const { amount, apr, term } = formInput;

        try {
            await LoanApi.createLoan({
                amount,
                apr,
                term,
                status: 'active',
                owner_id: user.id,
            });

            setAlert({
                type: 'success',
                message: 'Loan has been created.',
            });
        } catch (ex) {
            setAlert({
                type: 'error',
                message: ex.message,
            });
        }
    }

    function handleInput(e) {
        const name = e.target.name;
        const newValue = e.target.value;

        setFormInput({ [name]: newValue });
    }

    function handleCloseAlert() {
        setAlert(null);
    }

    if (UserApi.isValidUser(user) === false) {
        return <Alert severity="error">You must create a user first.</Alert>;
    }

    return (
        <>
            <Typography variant="h5">Create Loan</Typography>

            <form onSubmit={handleSubmit}>
                <TextField
                    required
                    label="Amount"
                    name="amount"
                    variant="standard"
                    helperText="Enter your loan amount"
                    onChange={handleInput}
                />
                <TextField
                    required
                    label="APR"
                    name="apr"
                    variant="standard"
                    helperText="Enter APR"
                    onChange={handleInput}
                />
                <TextField
                    required
                    label="Term"
                    name="term"
                    variant="standard"
                    helperText="Enter term"
                    onChange={handleInput}
                />
                <Button type="submit" variant="contained">
                    Save
                </Button>

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
            </form>
        </>
    );
}

export default Loan;
