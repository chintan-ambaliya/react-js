import React from 'react';
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../../store/auth";
import './Sidebar.scss'

const Sidebar = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const isOpenSidebar = useSelector(state => state.ui.isOpenSidebar);

    const handleLogout = () => {
        dispatch(authActions.logout());
    }

    return (
        <>
            {isAuthenticated && isOpenSidebar &&
            <div className="sidebar">
                <ul className="nav nav-pills flex-column">
                    <li className="nav-item">
                        <NavLink to="/" exact className="nav-link">
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/invoice" className="nav-link">
                            Invoice
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <span onClick={handleLogout} className="nav-link">
                            Logout
                        </span>
                    </li>
                </ul>
            </div>
            }
        </>
    );
};

export default Sidebar;
