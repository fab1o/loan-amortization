import { useState, useEffect } from 'react';

import {
    Table,
    TableContainer,
    TableBody,
    TableCell,
    TableRow,
} from '@mui/material';

import * as UserApi from '../../api/user';

/**
 * @desc Switches between users
 */
function Users({ onUserSelect }) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function getUsers() {
            const users = await UserApi.getUsers();

            setUsers(users);
        }

        getUsers();
    }, []);

    return (
        <TableContainer sx={{ maxHeight: 620 }}>
            <Table>
                <TableBody>
                    {users.map((user) => (
                        <TableRow
                            hover
                            onClick={() => onUserSelect(user)}
                            key={user.id}
                            sx={{
                                cursor: 'pointer',
                            }}
                        >
                            <TableCell>{user.username}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Users;
