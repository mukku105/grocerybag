import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

export class Header extends Component {
    static propType = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    }
    render() {

        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                <span className="badge p-2 mr-1">
                    <i className="bi bi-shield-lock" style={{ fontSize: 20, color: 'white' }}></i>
                </span>
                <span className="navbar-text text-center ml-1 mr-1 text-black-50 bg-warning p-2 rounded">
                    Welcome, <strong>{user ? `${user.username}` : ""}</strong>
                </span>

                <li className="nav-item text-center bg-dark ml-1 mr-1 rounded">
                    <button
                        onClick={this.props.logout}
                        className="nav-link btn btn-outline-danger btn-sm text-light font-weight-bold col-md-12 pl-3 pr-3"
                    >
                        <i className="bi bi-box-arrow-left mr-1"></i> Logout
                    </button>
                </li>
            </ul >
        );

        const guestLinks = (
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                <li className="nav-item">
                    <Link to="/register" className="nav-link">Register</Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="nav-link">Login</Link>
                </li>
            </ul>
        )

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <h4 className="text-light">
                            <i className="bi bi-basket"></i>&nbsp;&nbsp;&nbsp;
                        </h4>

                        <a className="navbar-brand" href="#">
                            Grocery Bag
                        </a>

                        {/* <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" href="#/">Reading Right</a>
                            </li>
                        </ul> */}
                        {/* <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form> */}
                        {isAuthenticated ? authLinks : guestLinks}
                    </div>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(Header)
