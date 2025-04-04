import React from 'react';
import { useHistory } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
    const history = useHistory();

    return (
        <nav className="pizza-navbar">
            <div className="navbar-title" onClick={() => history.push('/Homes')}>
                QuickSlice
            </div>

            <ul className="pizza-nav-links">
                <li onClick={() => history.push('/OrderPizza')}>Menu</li>
                <li onClick={() => history.push('/BuildUrPizza')}>Build Your Pizza</li>
                <li onClick={() => history.push('/Cart')}>Cart 🛒</li>
            </ul>
        </nav>
    );
}
