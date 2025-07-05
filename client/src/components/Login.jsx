import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../queries';
import { setToken, setRole, setUser } from '../auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [form, setForm] = useState({ username: '', password: '' });
    const [login, { error }] = useMutation(LOGIN_MUTATION);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await login({ variables: form });
        setToken(data.login.token);
        setRole(data.login.user.role);
        setUser(data.login.user.username);
        navigate('/grid');
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '400px' }}>
            <h4 className="mb-3">Login</h4>
            <form onSubmit={handleSubmit}>
                <input
                    className="form-control mb-2"
                    placeholder="Username"
                    value={form.username}
                    onChange={e => setForm({ ...form, username: e.target.value })}
                />
                <input
                    className="form-control mb-3"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                />
                <button className="btn btn-primary w-100">Login</button>
                {error && <div className="alert alert-danger mt-3">Invalid credentials</div>}
            </form>
        </div>
    );
};

export default Login;
