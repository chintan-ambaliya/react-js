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
import {Provider} from 'react-redux';
import {useSelector} from 'react-redux';
import store from "./store";

const ProtectedRoute = ({children}) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    return isAuthenticated ? children : <Navigate to="/login"/>;
};

function App() {
    return (
        <Provider store={store}>
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
                                        <Route path="/" exact={true} element={<ProtectedRoute><Home/></ProtectedRoute>}/>
                                        <Route path="/login" exact={true} element={<Login/>}/>
                                        <Route path="/invoice" exact={true} element={<ProtectedRoute><Invoice/></ProtectedRoute>}/>
                                        <Route path="/invoice/:id" exact={true} element={<ProtectedRoute><Invoice/></ProtectedRoute>}/>
                                    </Routes>
                                </div>
                            </div>
                            <Footer/>
                        </div>
                    </main>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
