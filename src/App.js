import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import { Paper } from '@mui/material';

import * as UserApi from './api/user';

import Home from './pages/Home/Home';
import User from './pages/User/User';
import Users from './pages/Users/Users';
import Loan from './pages/Loan/Loan';
import Container from './pages/Loans/Container';
import NotFound from './pages/NotFound/NotFound';

import './App.css';

function App() {
    const [user, setUser] = useState();

    useEffect(() => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));

            if (UserApi.isValidUser(user)) {
                setUser(user);
            }
        } catch {}
    }, []);

    function onUserSelect(user) {
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
    }

    return (
        <BrowserRouter>
            <div className="flex-column app">
                <div className="flex-row header">
                    <div className="flex-column-header left">
                        Loan Amortization
                    </div>
                    <div className="flex-column-header right">
                        {user?.username}
                    </div>
                </div>
                <div className="flex flex-row">
                    <div className="flex-column sidebar">
                        <ul>
                            <li>
                                <NavLink to="/">Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/user">Create User</NavLink>
                            </li>
                            <li>
                                <NavLink to="/users">Select User</NavLink>
                            </li>
                            <li>
                                <NavLink to="/loan">Create Loan</NavLink>
                            </li>
                            <li>
                                <NavLink to="/loans">View Loans</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="app-body flex">
                        <Paper className="paper" elevation={3}>
                            <Routes>
                                <Route exact path="/" element={<Home />} />
                                <Route
                                    exact
                                    path="/user"
                                    element={
                                        <User onUserSelect={onUserSelect} />
                                    }
                                />
                                <Route
                                    exact
                                    path="/users"
                                    element={
                                        <Users onUserSelect={onUserSelect} />
                                    }
                                />
                                <Route
                                    exact
                                    path="/loan"
                                    element={<Loan user={user} />}
                                />
                                <Route
                                    exact
                                    path="/loans"
                                    element={<Container user={user} />}
                                />
                                <Route
                                    exact
                                    path="/loans/:id"
                                    element={<Container user={user} />}
                                />
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </Paper>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
