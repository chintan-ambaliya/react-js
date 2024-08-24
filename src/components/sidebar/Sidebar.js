import React from 'react';
import {NavLink} from 'react-router-dom';
import {useAuth} from '../../contexts/AuthContext';
import './Sidebar.scss'

const Sidebar = () => {
    const {isAuthenticated, logout, isOpenSidebar} = useAuth();

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
                        <a onClick={logout} className="nav-link">
                            Logout
                        </a>
                    </li>
                </ul>
            </div>
            }
        </>
    );
};

export default Sidebar;
