import React, { Component, Fragment } from 'react';
import Header from './Header.js';
import { Link, withRouter } from 'react-router-dom';
import user from '../image/users.png';
import Axios from 'axios';

class Singleuser extends Component {

    constructor() {
        super();
        this.state = {
            us: true,
            data: null,
            sender: null,
            receiver: null,
            amount: null,
            balance: null,
            mail: null,
        }
    }


    componentDidMount() {
        Axios.get('http://localhost:3002/api/alluser').then((response) => {
            this.setState({
                data: response.data,
                sender: response.data[this.props.match.params.id - 1].name,
                balance: response.data[this.props.match.params.id - 1].balance,
                mail: response.data[this.props.match.params.id - 1].email
            })
        }).catch(error => console.error(`Error: ${error}`))
    }

    senddata(name, amount) {
        Axios.put('http://localhost:3002/api/update', {
            name: name,
            amount: amount
        });
    }

    transfer() {
        if (this.state.receiver === null || this.state.receiver === "Select Receiver" || this.state.amount === null) {
            alert("Enter Detail")
        } else if (this.state.data[this.props.match.params.id - 1].balance < this.state.amount) {
            alert("Insuficiant Balance");
        } else {
            let d = new Date();
            let date = `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`

            Axios.post('http://localhost:3002/api/insert/transaction', {
                sender: this.state.sender,
                receiver: this.state.receiver,
                amount: this.state.amount,
                date: date
            }).then(() => {
            }).catch(error => console.error(`Error: ${error}`))

            let snderamount = this.state.data[this.props.match.params.id - 1].balance - this.state.amount;
            let receiveramount = null;
            this.state.data.map((item) => {
                if (item.name === this.state.receiver) {
                    receiveramount = item.balance
                }
            })
            receiveramount = receiveramount + parseInt(this.state.amount);
            console.log(receiveramount);
            console.log(snderamount);

            this.senddata(this.state.sender, snderamount);
            this.senddata(this.state.receiver, receiveramount);
            alert("Amount Transfered")
            this.setState({
                balance: this.state.balance - this.state.amount
            })
            setTimeout(() => { this.setState({ us: true }) }, 500)
        }
    }

    render() {
        return (
            <Fragment>
                <div className={this.state.us ? "user_submit" : "user_submit1 user_submit"}>

                    <input type="text" placeholder="Enter Amount" value={this.state.amount} onChange={(e) => this.setState({ amount: e.target.value })} />
                    <select onChange={(e) => this.setState({ receiver: e.target.value })}>
                        <option>Select Receiver</option>
                        {
                            this.state.data == null ?
                                <option>Users</option>
                                : this.state.data.map((item) => {
                                    return item.id == this.props.match.params.id ? null : <option>{item.name}</option>
                                })
                        }
                    </select>
                    <button onClick={() => this.transfer()}>Transfer</button>
                    <button onClick={() => this.setState({ us: true })}>Cancel</button>
                </div>
                <Header />
                <div className="user">
                    <div className="path">
                        <Link to="/">Home</Link> &#62; <Link to="/alluser">All User</Link> &#62;  {this.state.data == null ? null : this.state.data[this.props.match.params.id - 1].name}
                    </div>
                    <div className="user_detail">
                        <div className="user_img">
                            <img src={user} alt="user_image" />
                        </div>
                        <div className="user_other">
                            <p>Name:</p>
                            <p>{this.state.sender}</p>
                            <p>Email:</p>
                            <p>{this.state.mail}</p>
                            <p>Current Balance:</p>
                            <p>{this.state.balance}</p>
                        </div>
                    </div>
                    <div className="transfer_money">
                        <button onClick={() => this.setState({ us: false })}>Transfer Money</button>
                    </div>


                </div>
            </Fragment>
        );
    }
}

export default withRouter(Singleuser);