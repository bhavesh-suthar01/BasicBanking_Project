import React, { Component } from 'react';
import './Header.css';
import user from '../image/user_icon.png';
import history from '../image/history_icon.png';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <div className="header">
                <div className="h_l">Basic Banking System</div>
                <div className="h_r">
                    <Link to="/alluser">
                        <img src={user} alt="" />
                    </Link>
                    <Link to="/history">
                        <img src={history} alt="" />
                    </Link>
                </div>
            </div>
        );
    }
}

export default Header;