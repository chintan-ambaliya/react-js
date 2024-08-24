import React from 'react';
import {useEffect, useRef} from "react";
import {ReactComponent as Logo} from './../../images/logo.svg'
import './Header.scss';
import Dropdown from 'bootstrap/js/dist/dropdown';
import {useAuth} from "../../contexts/AuthContext";

const Header = () => {
    const userDropdown = useRef(null);
    const {logout, toggleSidebar} = useAuth();

    useEffect(() => {
        new Dropdown(userDropdown.current, {autoClose: true, display: 'right-start'});
    }, []);

    const handleToggleSidebar = () => {
        toggleSidebar();
    };

    return (
        <header className="o_Header">
            <nav className="navbar bg-white">
                <div className="container-fluid">
                    <div className="o_logo">
                        <Logo/>
                    </div>
                    <div className="o_sidebar_toggle">
                        <span className="fa fa-bars" onClick={handleToggleSidebar}/>
                    </div>
                    <form className="d-flex ms-3 order-1 order-md-0" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    </form>
                    <div className="o_systray flex-fill d-flex gap-1 justify-content-end align-content-center">
                        <div className="o_systray_item">
                            <div className="btn btn-primary btn-sm"><i className="fa fa-plus"/> Upgrade</div>
                        </div>
                        <div className="o_systray_item"><span className="fa fa-bell"/></div>
                        <div className="o_systray_item"><span className="fa fa-message"/></div>
                        <div className="o_systray_item"><span className="fa fa-calendar"/></div>
                        <div className="o_systray_item"><span className="fa fa-th-large"/></div>
                        <div className="o_systray_item">
                            <div className="dropdown" ref={userDropdown}>
                                <span className="dropdown-toggle" id="userDropdown" data-toggle="dropdown" data-bs-toggle="dropdown"
                                      aria-haspopup="true" aria-expanded="false">
                                    <i className="fa fa-user"/>
                                </span>
                                <div className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                                    <a className="dropdown-item" href="#">Admin</a>
                                    <div className="dropdown-divider"/>
                                    <a className="dropdown-item" href="#" onClick={logout}>Logout</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="d-block bg-primary-subtle">
                <ul className="list-inline d-flex flex-wrap m-0 px-3 py-2 gap-4">
                    <li className="list-inline-item">
                        <span>Shop</span>
                    </li>
                    <li className="list-inline-item">
                        <span>Assessments</span>
                    </li>
                    <li className="list-inline-item">
                        <span>Events</span>
                    </li>
                    <li className="list-inline-item">
                        <span>Programs</span>
                    </li>
                    <li className="list-inline-item">
                        <span>Courses</span>
                    </li>
                    <li className="list-inline-item">
                        <span>Subscriptions</span>
                    </li>
                    <li className="list-inline-item">
                        <span>Bookings</span>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;
