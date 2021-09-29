import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadingTarget, getGroceryItems, deleteGroceryItem, addGroceryItem, updateGroceryItem, filterGroceryItems } from '../../actions/grocerybag/grocerybag';
import { format, formatRelative, parseISO } from 'date-fns';

import InfinityLoader_svg from '../../static/frontend/infinity_loader.svg';

export class GroceryBasket extends Component {

    state = {
        id_edit: null,
        name_edit: '',
        description_edit: '',
        quantity_edit: '',
        quantity_unit_edit: '',
        price_edit: '',
        status_edit: 'pending',
        scheduled_date_edit: '',
        scheduled_date_filter: '',
        status_filter: '',
    }

    static propTypes = {
        items: PropTypes.array.isRequired,
        addGroceryItem: PropTypes.func.isRequired,
        getGroceryItems: PropTypes.func.isRequired,
        deleteGroceryItem: PropTypes.func.isRequired,
        updateGroceryItem: PropTypes.func.isRequired,
        filterGroceryItems: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired,
        loadingTarget: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getGroceryItems();
    }

    componentDidUpdate() {
    }

    onChange = e => {
        this.setState({
            [e.target.name]:
                e.target.value
        });
    }

    onClickDeleteButton = (item) => {
        this.setState({
            id_edit: item.id,
            name_edit: item.name,
            description_edit: item.description,
            quantity_edit: item.quantity,
            quantity_unit_edit: item.quantity_unit,
            price_edit: item.price,
            status_edit: item.status,
            scheduled_date_edit: item.scheduled_date,
        });
    }

    onClickAddItem = e => {
        e.preventDefault();
        const { name_edit, description_edit, quantity_edit, quantity_unit_edit, price_edit, status_edit, scheduled_date_edit } = this.state;
        const newItem = { name: name_edit, description: description_edit, quantity: quantity_edit, quantity_unit: quantity_unit_edit, price: price_edit, status: status_edit, scheduled_date: scheduled_date_edit };

        this.props.addGroceryItem(newItem);
        this.handleReset();
    }

    onClickDeleteItem = e => {
        e.preventDefault();
        const { id_edit } = this.state;
        this.props.deleteGroceryItem(id_edit);

        this.handleReset();
    }

    onClickBought = e => {
        const newItem = { id: e, status: 'bought' };
        this.props.updateGroceryItem(newItem);

        this.handleReset();

    }

    onClickUpdateItem = e => {
        e.preventDefault();
        const { id_edit, name_edit, description_edit, quantity_edit, quantity_unit_edit, price_edit, status_edit, scheduled_date_edit } = this.state;
        const newItem = { id: id_edit, name: name_edit, description: description_edit, quantity: quantity_edit, quantity_unit: quantity_unit_edit, price: price_edit, status: status_edit, scheduled_date: scheduled_date_edit };

        this.props.updateGroceryItem(newItem);
        this.handleReset();
        console.log(newItem)
    }

    onClickFilterItem = () => {
        const { scheduled_date_filter, status_filter } = this.state;
        this.props.filterGroceryItems(status_filter, scheduled_date_filter);
    }

    handleReset = () => {

        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
        );
        Array.from(document.querySelectorAll("textarea")).forEach(
            textarea => (textarea.value = "")
        )
        this.setState({
            id_edit: null,
            name_edit: '',
            description_edit: '',
            quantity_edit: '',
            quantity_unit_edit: '',
            price_edit: '',
            status_edit: 'pending',
            scheduled_date_edit: '',
            scheduled_date_filter: '',
            status_filter: '',
        });
    }

    render() {
        const { name_edit, description_edit, quantity_edit, quantity_unit_edit, price_edit, status_edit, scheduled_date_edit, status_filter, scheduled_date_filter } = this.state;
        return (
            <Fragment>
                <div className="mb-4">
                    <h3>
                        <i className="bi bi-basket-fill"></i>&nbsp; Grocery Bag
                    </h3>
                    <hr />
                    <p className="text-muted text-center border-left border-right border-bottom p-3">
                        Click on the <span className="bg-danger text-light p-1 rounded">Pending</span> Button to mark as <span className="bg-success text-light p-1 rounded">Bought</span>
                    </p>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-outline-dark" data-toggle="modal" data-target="#add-item-modal" >
                            <i className="bi bi-journal-plus"></i>&nbsp;
                            Add Item
                        </button>
                        <button
                            className="btn btn-outline-dark ml-2"
                            onClick={() => {
                                this.setState({
                                    status_filter: '',
                                    scheduled_date_filter: '',
                                }, () => { this.props.filterGroceryItems('', ''); });

                            }}
                        >
                            <i className="bi bi-view-list"></i>&nbsp;
                            List all
                        </button>
                    </div>
                    <br />
                    <div className="border rounded">
                        <form action="" className="form-inline">
                            <input type="date" className="form-control m-1"
                                id="scheduled_date_filter"
                                name="scheduled_date_filter"
                                defaultValue={this.scheduled_date_filter}
                                onChange={this.onChange} />

                            <select className="form-control m-1" id="status_filter" name="status_filter" defaultValue={this.status_filter} onChange={this.onChange}>
                                <option value="">All</option>
                                <option value="pending">Pending</option>
                                <option value="unavailable">Unavailable</option>
                                <option value="bought">Bought</option>
                            </select>

                            <button type="button" className="btn btn-dark m-1" onClick={this.onClickFilterItem}>Filter</button>
                        </form>
                    </div>
                    <br />
                    <br />

                    {/* Grid Card for displaying items */}
                    <div className="row">
                        {this.props.items.length === 0 ? <div className="container">There are no Items in the Grocery Bag</div> : ""}

                        {this.props.items.map(item => (
                            <div className="col-md-4" key={item.id}>
                                <div className="card mb-4">
                                    <div className="card-header">
                                        <div className="d-flex">
                                            <div className="mr-auto">
                                                <h3>{item.name}</h3>
                                            </div>
                                            <div className="ml-auto">
                                                <button className={item.status == "bought" ? "btn btn-success text-capitalize ml-3" : "btn btn-danger text-capitalize ml-3"}
                                                    onClick={() => this.onClickBought(item.id)}
                                                    data-toggle="tooltip"
                                                    data-placement="bottom"
                                                    title={item.status == "bought" ? "Item is already bought" : "Mark as bought"}
                                                    {...item.status == "pending" ? { disabled: false } : { disabled: true }}
                                                >
                                                    {item.status}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="card-title">
                                            <p className="text-center">{item.description}</p>
                                        </div>

                                        <p className="card-text text-center text-capitalize text-light bg-secondary rounded p-1">{formatRelative(parseISO(item.scheduled_date), new Date())}</p>

                                        <table className="table table-striped table-light">
                                            <tbody>
                                                <tr>
                                                    <th scope="row">Quantity</th>
                                                    <td className="text-capitalize">{item.quantity} {item.quantity_unit}</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Rate</th>
                                                    <td>INR {item.price}/<span className="text-capitalize">{item.quantity_unit}</span></td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Total Amount</th>
                                                    <td>INR {item.price * item.quantity}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="card-footer">
                                        <div className="text-center">
                                            <button className="btn btn-outline-primary mr-2"
                                                data-toggle="modal"
                                                data-target="#edit-item-modal"
                                                onClick={() => this.setState({
                                                    id_edit: item.id,
                                                    name_edit: item.name,
                                                    description_edit: item.description,
                                                    quantity_edit: item.quantity,
                                                    quantity_unit_edit: item.quantity_unit,
                                                    price_edit: item.price,
                                                    status_edit: item.status,
                                                    scheduled_date_edit: item.scheduled_date,
                                                })}>
                                                Update
                                            </button>
                                            <button className="btn btn-outline-danger" onClick={this.onClickDeleteButton.bind(this, item)} data-toggle="modal" data-target="#delete-item-modal">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Modal for adding item */}
                <div className="modal fade" id="add-item-modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header bg-success">
                                <h5 className="modal-title text-light">
                                    Add Item to Grocery Bag
                                </h5>
                                <button type="button" className="close text-light" data-dismiss="modal">
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form action="" id="add-item">
                                    <div className="form-row">
                                        <div className="col form-group">
                                            <label htmlFor="name_edit" className="col-form-label">Name:</label>
                                            <input type="text" className="form-control" id="name_edit" name="name_edit" onChange={this.onChange} />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col form-group">
                                            <label htmlFor="description_edit">Description</label>
                                            <textarea className="form-control" id="description_edit" name="description_edit" onChange={this.onChange} placeholder="Add Description" />
                                        </div>
                                    </div>
                                    <div className="form-row form-group">
                                        <div className="col-5">
                                            <div className="input-group">
                                                <input type="number" placeholder="Quantity" className="form-control" id="quantity_edit" name="quantity_edit" onChange={this.onChange} />&nbsp;
                                                <select className="form-control" id="quantity_unit_edit" name="quantity_unit_edit" onChange={this.onChange}>
                                                    <option value="">Unit</option>
                                                    <option value="kg">Kg</option>
                                                    <option value="ltr">L</option>
                                                    <option value="nos">Nos</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-3">
                                            <input type="number" placeholder="Price" className="form-control" id="price_edit" name="price_edit" onChange={this.onChange} />
                                        </div>
                                        <div className="col-4">
                                            <select className="form-control" id="status_edit" name="status_edit" onChange={this.onChange}>
                                                <option value="pending">Pending</option>
                                                <option value="unavailable">Unavailable</option>
                                                <option value="bought">Bought</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-row form-group">
                                        <div className="col form-group">
                                            <label htmlFor="scheduled_date_edit">Scheduled Date</label>
                                            <input type="datetime-local" className="form-control" id="scheduled_date_edit" name="scheduled_date_edit" onChange={this.onChange} />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-success" data-dismiss="modal" onClick={this.onClickAddItem}>Add</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal for editing item */}
                <div className="modal fade" id="edit-item-modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header bg-primary">
                                <h5 className="modal-title text-light" id="edit-item-modal-label">Update Item</h5>
                                <button type="button" className="close" data-dismiss="modal">
                                    <span className="text-light">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form action="">
                                    <div className="form-row">
                                        <div className="col form-group">
                                            <label htmlFor="name_edit">Name</label>
                                            <input type="text" className="form-control" id="name_edit" name="name_edit" value={name_edit} onChange={this.onChange} />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col form-group">
                                            <label htmlFor="description_edit">Description</label>
                                            <textarea className="form-control" id="description_edit" name="description_edit" value={description_edit} onChange={this.onChange} placeholder="Description" />
                                        </div>
                                    </div>
                                    <div className="form-row form-group">
                                        <div className="col-5">
                                            <div className="input-group">
                                                <input type="number" placeholder="Quantity" className="form-control" id="quantity_edit" name="quantity_edit" value={quantity_edit} onChange={this.onChange} />&nbsp;
                                                <select className="form-control" id="quantity_unit_edit" name="quantity_unit_edit" value={quantity_unit_edit} onChange={this.onChange}>
                                                    <option value="">Unit</option>
                                                    <option value="kg">Kg</option>
                                                    <option value="ltr">L</option>
                                                    <option value="nos">Nos</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-3">
                                            <input type="number" placeholder="Price" className="form-control" id="price_edit" name="price_edit" value={price_edit} onChange={this.onChange} />
                                        </div>
                                        <div className="col-4">
                                            <select className="form-control" id="status_edit" name="status_edit" value={status_edit} onChange={this.onChange}>
                                                <option value="pending">Pending</option>
                                                <option value="unavailable">Unavailable</option>
                                                <option value="bought">Bought</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col form-group">
                                            <label htmlFor="scheduled_date_edit">Scheduled Date</label>
                                            <input type="datetime-local" className="form-control" id="scheduled_date_edit" name="scheduled_date_edit" defaultValue={scheduled_date_edit ? format(parseISO(scheduled_date_edit), "yyyy-MM-dd'T'hh:mm") : ""} onChange={this.onChange} />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.onClickUpdateItem}>Update</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal for deleting item */}
                <div className="modal fade" id="delete-item-modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header bg-danger">
                                <h5 className="modal-title text-light" id="delete-item-modal-label">Delete Item</h5>
                                <button type="button" className="close" data-dismiss="modal">
                                    <span className=" text-light">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete this item?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-danger" onClick={this.onClickDeleteItem} data-dismiss="modal">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>

            </Fragment >
        )
    }
}

const mapStateToProps = state => ({
    items: state.grocerybag.items,
    isLoading: state.grocerybag.isLoading,
})

export default connect(
    mapStateToProps,
    { loadingTarget, getGroceryItems, deleteGroceryItem, addGroceryItem, updateGroceryItem, filterGroceryItems }
)(GroceryBasket);
