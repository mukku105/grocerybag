import React, { Component } from 'react'
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login, userLoading } from "../../actions/auth";
import InfinityLoader_svg from '../../static/frontend/infinity_loader.svg';

export class Login extends Component {
    state = {
        username: '',
        password: '',
    }

    static propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
        isLoading: PropTypes.bool.isRequired,
        userLoading: PropTypes.func.isRequired
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.userLoading();
        console.log(this.props.isLoading)
        this.props.login(this.state.username, this.state.password)
    }

    onChange = e => this.setState({
        [e.target.name]: e.target.value
    });

    render() {

        if (this.props.isAuthenticated) {
            return <Redirect to="/" />;
        }

        const { username, password } = this.state

        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                    <h1 className="text-center">
                        <i className="bi bi-basket" style={{ fontSize: 100 }}></i>&nbsp;
                        <br />Grocery Bag
                    </h1>
                    <h5 className="text-center bg-dark text-light p-2 rounded">Sweating while you shop counts as Exercise 😜</h5>
                    <h4 className="text-center">Login <i className="bi bi-box-arrow-in-right"></i>&nbsp;</h4>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                id="username"
                                onChange={this.onChange}
                                value={username}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                id="password"
                                onChange={this.onChange}
                                value={password}
                            />
                        </div>

                        <div className="form-group">
                            <button type="submit" className="btn btn-outline-primary btn-block" disabled={this.props.isLoading}>
                                {this.props.isLoading ? <img src={InfinityLoader_svg} alt="" /> : "LOGIN"}
                            </button>
                        </div>
                        <p>
                            Don't have an Account? <Link to="/register">Register</Link>
                        </p>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading,
})

export default connect(mapStateToProps, { login, userLoading })(Login)
