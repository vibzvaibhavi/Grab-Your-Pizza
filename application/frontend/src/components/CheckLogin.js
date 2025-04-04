import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect, withRouter } from 'react-router-dom'
import { Button, Divider } from 'semantic-ui-react';
class CheckLogin extends Component {
    constructor(props) {
        super();
        this.state = {
            cheklogin: localStorage.getItem("loggedIn")
        };
        this.Logout = this.Logout.bind(this);
    }
    Logout() {
        axios.get("http://localhost:5000/logout")
            .then((res) => {
                this.props.history.push("/Homes")
            }).catch((err) => {
                console.log(err)
            })
            localStorage.clear()
    }
    render() {
        if (this.state.cheklogin) {
            return (

                <button className="btn btn-primary btn-xs" onClick={this.Logout}>Logout</button>
            )
        }
        return (
        <h1></h1>)
    }
}

export default withRouter(CheckLogin);