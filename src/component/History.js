import React, { Component, Fragment } from 'react';
import Header from './Header.js';
import { Link } from 'react-router-dom';
import Axios from 'axios';


class History extends Component {

    constructor() {
        super();
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        Axios.get('http://localhost:3002/api/alltransaction').then((response) => {
            this.setState({
                data: response.data
            })
        }).catch(error => console.error(`Error: ${error}`))
    }


    render() {
        return (
            <Fragment>
                <Header />
                <div className="history_">
                    <div className="path">
                        <Link to="/">Home</Link> &#62; <Link to="/history">Transaction History</Link>
                    </div>
                    <div className="transaction_list">
                        <table>
                            <tr>
                                <th>Sender Name</th>
                                <th>Recever Name</th>
                                <th>Amount</th>
                                <th>Date</th>
                            </tr>
                            {
                                this.state.data.map((item) => {
                                    return <tr key={item.id}>
                                        <td>{item.sender}</td>
                                        <td>{item.receiver}</td>
                                        <td>{item.amount}</td>
                                        <td>{item.date}</td>
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

export default History;