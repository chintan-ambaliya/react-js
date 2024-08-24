import React, {useState} from 'react';
import {useAuth} from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.scss';

const Login = () => {
    const [username, setUsername] = useState('test@test.com');
    const [password, setPassword] = useState('test');
    const [isLoading, setLoading] = useState(false);
    const {login} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLoading) return;
        setLoading(true);
        const result = await login(username, password);
        if (result) {
            navigate('/');
        }
        setLoading(false);
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col align-items-center justify-content-center d-flex">
                    <div className='o_Login'>
                        <div className='o_Login_container'>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        id="email"
                                        className="form-control"
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder={'Email'}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        id="password"
                                        className="form-control"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder={'Password'}
                                        required
                                    />
                                </div>
                                <button className={'btn btn-primary w-100 ' + (isLoading && 'disabled')} type="submit">
                                    Login
                                    {isLoading && <i className="fa fa-spinner fa-spin ms-2"/>}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
