import React, { Component, Fragment } from 'react';
import Header from './Header.js';
import user from '../image/users.png';
import history from '../image/history.png';
import { Link } from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <Fragment>
                <Header />
                <div className="home">
                    <Link to="/alluser">
                        <div className="alluser wd-200">
                            <img src={user} width="20px" alt="User" />
                            <p>All User</p>
                        </div>
                    </Link>
                    <Link to="/history">
                        <div className="history wd-200">
                            <img src={history} width="20px" alt="History" />
                            <p>Transaction History</p>
                        </div>
                    </Link>
                </div>
            </Fragment>
        );
    }
}

export default Home;