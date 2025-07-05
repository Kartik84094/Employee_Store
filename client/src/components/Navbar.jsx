import React from 'react';
//import avatar from '../assets/avatar.png'; // Replace with your actual avatar path
import { Link, useNavigate } from 'react-router-dom';
import { removeToken, removeRole, getRole, removeUser, getUser } from '../auth';

const Navbar = () => {

    const navigate = useNavigate();
    const role = getRole();
    const user = getUser(); // Assuming user info is stored in localStorage

    const logout = () => {
        removeToken();
        removeRole();
        removeUser();
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
            <Link to="/grid" className="navbar-brand">Store App</Link>

            {role && (
                <>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarContent"
                        aria-controls="navbarContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>


                    <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
                        <ul className="navbar-nav">

                            {role === 'admin' && <>
                                <li className="nav-item">
                                    <a className="nav-link active" href="#">Home</a>
                                </li>

                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Employee
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><a className="dropdown-item" href="/add-employee">Add New</a></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><a className="dropdown-item" href="/grid">List All</a></li>
                                    </ul>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link" aria-current="page" href="#">About Us</a>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link" aria-current="page" href="#">Contact</a>
                                </li>

                            </>
                            }

                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link d-flex align-items-center"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <img
                                        src={'data:image/jpeg;base64,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'}
                                        alt="User"
                                        className="rounded-circle"
                                        width="32"
                                        height="32"
                                    />
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li><a className="dropdown-item" href="#">User: {user}</a></li>
                                    <li><a className="dropdown-item" href="#">Role: {role}</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li onClick={logout}><a className="dropdown-item" href="#">Logout</a></li>
                                </ul>
                            </li>

                        </ul>
                    </div>
                </>
            )}
        </nav>
    );
};

export default Navbar;
