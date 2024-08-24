import React, {createContext, useContext, useState} from 'react';
import {getCookie, setCookie, deleteCookie} from './../utils/CookieUtils';
import {getAccessToken} from "../api/API";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setAccessToken] = useState(getCookie('accessToken'));
    const [isOpenSidebar, setOpenSidebar] = useState(true);

    const login = async (email, password) => {
        const result = await getAccessToken({email, password});
        if (result.authToken) {
            setCookie('accessToken', result.authToken, 365);
            setAccessToken(result.authToken);
            return true;
        }
        return false;
    };

    const logout = () => {
        deleteCookie('accessToken');
        setAccessToken(null);
    };

    const toggleSidebar = () => setOpenSidebar(!isOpenSidebar);

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout, isOpenSidebar, toggleSidebar}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
