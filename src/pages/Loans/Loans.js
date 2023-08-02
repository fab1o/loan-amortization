import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    Alert,
    Button,
    Checkbox,
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    FormControl,
    NativeSelect,
    Snackbar,
} from '@mui/material';

import { toCurrency } from '../utils';

import * as UserApi from '../../api/user';
import * as LoanApi from '../../api/loan';

function Loans({ user }) {
    const [loans, setLoans] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedLoans, setSelectedLoans] = useState([]);
    const [userIdShare, setUserIdShare] = useState(1);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertType, setAlertType] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function getLoans() {
            try {
                const data = await LoanApi.getLoansByUserId(user.id);

                setLoans(data);
            } catch (ex) {
                // TODO add error handling
            }
        }

        async function getUsers() {
            try {
                const data = await UserApi.getUsers();

                setUsers(data);
            } catch (ex) {
                // TODO add error handling
            }
        }

        if (user) {
            getLoans();
        }

        getUsers();
    }, [user]);

    async function handleShareButton() {
        const success = await LoanApi.shareLoans(selectedLoans, userIdShare);

        if (success) {
            setAlertType('success');
        } else {
            setAlertType('error');
        }

        setOpenAlert(true);
    }

    function handleLoanSelect(loan) {
        const selectedIndex = selectedLoans.indexOf(loan);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selectedLoans, loan);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selectedLoans.slice(1));
        } else if (selectedIndex === selectedLoans.length - 1) {
            newSelected = newSelected.concat(selectedLoans.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selectedLoans.slice(0, selectedIndex),
                selectedLoans.slice(selectedIndex + 1)
            );
        }

        setSelectedLoans(newSelected);
    }

    function handleViewDetails(e) {
        const id = e.target.getAttribute('data-loan-id');

        navigate(`/loan/${id}`);
    }

    function handleCloseAlert() {
        setOpenAlert(false);
    }

    function handleUserSelect(event) {
        setUserIdShare(Number(event.target.value));
    }

    if (UserApi.isValidUser(user) === false) {
        return <Alert severity="error">You must create a user first.</Alert>;
    }

    return (
        <>
            <TableContainer sx={{ maxHeight: 620 }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                component="th"
                                align="center"
                                colSpan="5"
                            >
                                <FormControl
                                    sx={{
                                        margin: '0 10px 0 0',
                                        minWidth: '280px',
                                    }}
                                    size="small"
                                >
                                    <NativeSelect
                                        defaultValue={1}
                                        onChange={handleUserSelect}
                                        inputProps={{
                                            name: 'user',
                                            id: 'uncontrolled-native',
                                        }}
                                    >
                                        {users &&
                                            users.map((user) => (
                                                <option
                                                    name={user.username}
                                                    key={user.id}
                                                    value={user.id}
                                                >
                                                    {user.username}
                                                </option>
                                            ))}
                                    </NativeSelect>
                                </FormControl>
                                <Button
                                    variant="contained"
                                    onClick={handleShareButton}
                                >
                                    Share
                                </Button>
                            </TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>APR</TableCell>
                            <TableCell>Term</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Details</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loans &&
                            loans.map((loan) => {
                                const isItemSelected =
                                    selectedLoans.includes(loan);
                                return (
                                    <TableRow
                                        hover
                                        aria-checked={isItemSelected}
                                        selected={isItemSelected}
                                        onClick={() => handleLoanSelect(loan)}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {toCurrency(loan.amount)}
                                        </TableCell>
                                        <TableCell>{`${loan.apr}%`}</TableCell>
                                        <TableCell>{loan.term}</TableCell>
                                        <TableCell>{loan.status}</TableCell>
                                        <TableCell>
                                            <Button
                                                data-loan-id={loan.id}
                                                variant="contained"
                                                onClick={handleViewDetails}
                                            >
                                                View
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Snackbar
                open={openAlert}
                autoHideDuration={3000}
                onClose={handleCloseAlert}
            >
                {alertType && (
                    <Alert onClose={handleCloseAlert} severity={alertType}>
                        {alertType === 'success'
                            ? 'Loans have been shared.'
                            : 'Could not share some or all loans.'}
                    </Alert>
                )}
            </Snackbar>
        </>
    );
}

export default Loans;
