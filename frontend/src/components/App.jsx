import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import { Provider } from "react-redux";
import store from "../store";
import { loadUser, userLoading } from "../actions/auth";

import Header from "./layout/Header.jsx";
import Alerts from "./layout/Alerts.jsx";

import PrivateRoute from './common/PrivateRoute';

import Dashboard from "./grocerybag/Dashboard.jsx";

import Login from "./accounts/login.jsx";
import Register from './accounts/register.jsx';



//Alert Options
const alertOptions = {
    timeout: 4000,
    position: "bottom center",
}

class App extends Component {

    componentDidMount() {
        store.dispatch(userLoading());
        store.dispatch(loadUser());
    }

    render() {
        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Router>
                        <Fragment>
                            <Header />
                            <Alerts />

                            <div className="container-fluid">
                                <Switch>
                                    <PrivateRoute exact path="/" component={Dashboard}></PrivateRoute>

                                    <Route exact path="/register" component={Register}></Route>
                                    <Route exact path="/login" component={Login}></Route>
                                </Switch>
                            </div>

                        </Fragment>
                    </Router>
                </AlertProvider>

                <div className="mb-4">
                    &nbsp;
                </div>
                <hr />
                <div>
                    <p className="text-center">
                        Made With 💜 by Muksam Limboo | Grocery Bag, 2021
                    </p>
                </div>

            </Provider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("App"));
