import React, { Component } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';

class Register extends Component {
    constructor(props) {
        super();
        this.state = {
            name: '',
            mob: '',
            password: '',
            Email: ''
        };
    }

    changename = (event) => this.setState({ name: event.target.value });
    changemob = (event) => this.setState({ mob: event.target.value });
    changeemail = (event) => this.setState({ Email: event.target.value });
    changepassword = (event) => this.setState({ password: event.target.value });

    changeSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:5000/register', {
            mob: this.state.mob,
            name: this.state.name,
            Email: this.state.Email,
            password: this.state.password
        })
        .then(() => {
            alert("🎉 You have successfully registered " + this.state.name);
            this.props.history.push('/Login');
        })
        .catch((err) => {
            console.error(err);
            alert("Something went wrong. Please try again.");
        });
    };

    render() {
        return (
            <div style={{
                backgroundColor: '#121212',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white'
            }}>
                <div style={{
                    backgroundColor: '#1f1f1f',
                    padding: '40px',
                    borderRadius: '15px',
                    boxShadow: '0 0 25px rgba(255, 193, 7, 0.5)',
                    width: '400px'
                }}>
                    <h2 style={{ textAlign: 'center', color: '#ffc107', marginBottom: '30px' }}>🍕 Hey Foodie, Register Here</h2>
                    <form onSubmit={this.changeSubmit}>
                        <div className="form-group mb-3">
                            <label>👤 Username</label>
                            <input type="text" className="form-control" value={this.state.name} onChange={this.changename} placeholder="Enter username"
                                style={inputStyle} required />
                        </div>
                        <div className="form-group mb-3">
                            <label>📧 Email</label>
                            <input type="email" className="form-control" value={this.state.Email} onChange={this.changeemail} placeholder="Enter email"
                                style={inputStyle} required />
                        </div>
                        <div className="form-group mb-3">
                            <label>📱 Mobile</label>
                            <input type="text" className="form-control" value={this.state.mob} onChange={this.changemob} placeholder="Enter mobile number"
                                style={inputStyle} required />
                        </div>
                        <div className="form-group mb-4">
                            <label>🔒 Password</label>
                            <input type="password" className="form-control" value={this.state.password} onChange={this.changepassword} placeholder="Enter password"
                                style={inputStyle} required />
                        </div>
                        <button type="submit" className="btn btn-warning w-100 fw-bold" style={{ padding: '10px' }}>
                            🚀 Register
                        </button>
                    </form>
                    <p className="mt-4 text-center" style={{ fontSize: '14px' }}>
                        Already registered? <Link to="/Login" style={{ color: '#ffc107' }}>Login here</Link>
                    </p>
                </div>
            </div>
        );
    }
}

const inputStyle = {
    background: '#2a2a2a',
    border: '1px solid #444',
    color: 'white',
    padding: '10px',
    borderRadius: '5px'
};

export default withRouter(Register);
