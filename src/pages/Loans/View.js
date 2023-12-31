import { useState, useEffect } from 'react';

import {
    Alert,
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
} from '@mui/material';

import { toCurrency } from '../utils';

import * as UserApi from '../../api/user';
import * as LoanApi from '../../api/loan';

function View({ id, user }) {
    const [alert, setAlert] = useState(false);
    const [loanSchedule, setLoanSchedule] = useState([]);

    useEffect(() => {
        let update = true;

        async function getLoanSchedule() {
            try {
                const data = await LoanApi.getLoanSchedule(id, user.id);

                if (update) {
                    setLoanSchedule(data);
                }
            } catch (ex) {
                setAlert(true);
            }
        }

        if (user) {
            getLoanSchedule();
        }

        return () => {
            update = false;
        };
    }, [id, user]);

    if (UserApi.isValidUser(user) === false) {
        return <Alert severity="error">You must create a user first.</Alert>;
    }

    if (alert) {
        return <Alert severity="error">Could not get data from server.</Alert>;
    }

    return (
        <>
            <TableContainer sx={{ maxHeight: 620 }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Month</TableCell>
                            <TableCell>Open Balance</TableCell>
                            <TableCell>Total Payment</TableCell>
                            <TableCell>Principal</TableCell>
                            <TableCell>Interest</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loanSchedule?.map((loan, i) => (
                            <TableRow key={i}>
                                <TableCell>{loan.month}</TableCell>
                                <TableCell>
                                    {toCurrency(loan.open_balance)}
                                </TableCell>
                                <TableCell>
                                    {toCurrency(loan.total_payment)}
                                </TableCell>
                                <TableCell>
                                    {toCurrency(loan.principal_payment)}
                                </TableCell>
                                <TableCell>
                                    {toCurrency(loan.interest_payment)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default View;
