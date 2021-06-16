import React, { Component, Fragment } from 'react';
import Header from './Header.js';
import { Link } from 'react-router-dom';
import Axios from 'axios';


class Alluser extends Component {

    constructor() {
        super();
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        Axios.get('http://localhost:3002/api/alluser').then((response) => {
            this.setState({
                data: response.data
            })
        }).catch(error => console.error(`Error: ${error}`))
    }

    render() {
        return (
            <Fragment>
                <Header />
                <div className="all_user">
                    <div className="path">
                        <Link to="/">Home</Link> &#62; <Link to="/alluser">All User</Link>
                    </div>
                    <div className="user_list">
                        <table>
                            <tr className="head_row">
                                <th>Name</th>
                                <th>Email</th>
                                <th>Balance</th>
                                <th>Profile</th>
                            </tr>
                            {
                                this.state.data.map((item) => {
                                    return <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.balance}</td>
                                        <td><Link to={"/allusers/" + item.id}>Select</Link></td>
                                    </tr>
                                })
                            }
                        </table>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Alluser;