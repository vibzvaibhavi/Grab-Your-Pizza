import React, { Component } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super();
        this.state = {
            Name: '',
            Password: ''
        };
    }

    changename = (event) => {
        this.setState({ Name: event.target.value });
    };

    changepwd = (event) => {
        this.setState({ Password: event.target.value });
    };

    changeSubmit = (event) => {
        axios.post('http://localhost:5000/login', {
            Password: this.state.Password,
            Name: this.state.Name,
        })
            .then((res) => {
                if (res.data.data === 1) {
                    localStorage.setItem('loggedIn', 1);
                    this.props.history.push("/OrderPizza");
                } else {
                    alert("Invalid Username or Password");
                }
            })
            .catch(() => {
                alert("Invalid Username or Password");
            });
    };

    render() {
        return (
            <div style={{ backgroundColor: '#121212', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{
                    background: '#1e1e1e',
                    padding: '40px',
                    borderRadius: '15px',
                    boxShadow: '0px 0px 15px rgba(255, 193, 7, 0.3)',
                    width: '400px',
                    color: '#fff'
                }}>
                    <h2 style={{ textAlign: 'center', color: '#ffc107', marginBottom: '30px' }}>🔐 Login to Your Account</h2>

                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter username"
                            value={this.state.Name}
                            onChange={this.changename}
                            style={{
                                background: '#2b2b2b',
                                border: '1px solid #444',
                                color: '#fff',
                                marginBottom: '20px'
                            }}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            value={this.state.Password}
                            onChange={this.changepwd}
                            style={{
                                background: '#2b2b2b',
                                border: '1px solid #444',
                                color: '#fff',
                                marginBottom: '30px'
                            }}
                            required
                        />
                    </div>

                    <div className="text-center">
                        <button
                            className="btn btn-warning btn-block"
                            style={{ width: '100%', fontWeight: 'bold' }}
                            onClick={this.changeSubmit}
                        >
                            🚀 Login
                        </button>
                    </div>

                    <p className="text-center mt-3" style={{ fontSize: '14px', marginTop: '20px' }}>
                        New here? <Link to="/Register" style={{ color: '#ffc107' }}>Create an account</Link>
                    </p>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);
