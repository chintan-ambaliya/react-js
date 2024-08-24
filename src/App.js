import React from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import './App.scss';
import './styles/global.scss';
import Sidebar from './components/sidebar/Sidebar';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Breadcrumb from "./components/breadcrumb/Breadcrumb";
import Home from './pages/home/Home';
import Invoice from './pages/invoice/Invoice';
import Login from './pages/login/Login';
import {AuthProvider, useAuth} from './contexts/AuthContext';

const ProtectedRoute = ({children}) => {
    const {isAuthenticated} = useAuth();
    return isAuthenticated ? children : <Navigate to="/login"/>;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Header/>
                    <main>
                        <Sidebar/>
                        <div className="content">
                            <Breadcrumb/>
                            <div className="page">
                                <div>
                                    <Routes>
                                        <Route path="/login" element={<Login/>}/>
                                        <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
                                        <Route path="/invoice" element={<ProtectedRoute><Invoice/></ProtectedRoute>}/>
                                        <Route path="/invoice/:id" element={<ProtectedRoute><Invoice/></ProtectedRoute>}/>
                                    </Routes>
                                </div>
                            </div>
                            <Footer/>
                        </div>
                    </main>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
