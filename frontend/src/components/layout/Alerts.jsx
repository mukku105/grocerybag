import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alerts extends Component {

    static propTypes = {
        error: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error, alert, message } = this.props;
        if (error != prevProps.error) {
            if (error.msg.name)
                alert.error(<div className="text-center bg-danger p-1 rounded" style={{ fontSize: 10 }}>Name: {error.msg.name}</div>)
            if (error.msg.description)
                alert.error(<div className="text-center bg-danger p-1 rounded" style={{ fontSize: 10 }}>description: {error.msg.description}</div>)
            if (error.msg.non_field_errors)
                alert.error(<div className="text-center bg-danger p-1 rounded" style={{ fontSize: 10 }}>{error.msg.non_field_errors}</div>)
            if (error.msg.username)
                alert.error(<div className="text-center bg-danger p-1 rounded" style={{ fontSize: 10 }}>{error.msg.username}</div>)
            if (error.status == 500) {
                alert.error(
                    <div className="text-center bg-danger p-1 rounded" style={{ fontSize: 10 }}>
                        (Your Process could not be completed.)
                        <br />
                        {console.log(error.msg)}
                        <strong style={{ fontSize: 12 }}>
                            Internal Server Error!
                        </strong>
                    </div>
                )
            }
        }

        if (message != prevProps.message) {
            if (message.deleteItem)
                alert.success(<div className="text-center bg-success p-1 rounded" style={{ fontSize: 10 }}>{message.deleteItem}</div>);
            if (message.addItem)
                alert.success(<div className="text-center bg-success p-1 rounded" style={{ fontSize: 10 }}>{message.addItem}</div>);
            if (message.updateItem)
                alert.success(<div className="text-center bg-success p-1 rounded" style={{ fontSize: 10 }}>{message.updateItem}</div>);
        }
    }
    render() {
        return <Fragment />;
    }
}

const mapStateToProps = state => ({
    error: state.errors,
    message: state.messages
})

export default connect(mapStateToProps)(withAlert()(Alerts));