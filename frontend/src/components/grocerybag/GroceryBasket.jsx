import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadingTarget, getGroceryItems, deleteGroceryItem, addGroceryItem, updateGroceryItem } from '../../actions/grocerybag/grocerybag';

import InfinityLoader_svg from '../../static/frontend/infinity_loader.svg';

export class GroceryBasket extends Component {

    state = {
        id_edit: null,
        name_edit: '',
        description_edit: '',
        quantity_edit: '',
        quantity_unit_edit: '',
        price_edit: '',
        status_edit: '',
        scheduled_date_edit: '',
    }

    static propTypes = {
        items: PropTypes.array.isRequired,
        addGroceryItem: PropTypes.func.isRequired,
        getGroceryItems: PropTypes.func.isRequired,
        deleteGroceryItem: PropTypes.func.isRequired,
        updateGroceryItem: PropTypes.func.isRequired,
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

        this.setState({
            id_edit: null,
            name_edit: '',
            description_edit: '',
            quantity_edit: '',
            quantity_unit_edit: '',
            price_edit: '',
            status_edit: '',
            scheduled_date_edit: '',
        });
    }

    onClickDeleteItem = e => {
        e.preventDefault();
        console.log(e.target.id);
        const { id_edit } = this.state;
        this.props.deleteGroceryItem(id_edit);

        this.setState({
            id_edit: null,
            name_edit: '',
            description_edit: '',
            quantity_edit: '',
            quantity_unit_edit: '',
            price_edit: '',
            status_edit: '',
            scheduled_date_edit: '',
        });
    }

    onClickUpdateItem = e => {
        e.preventDefault();
        this.props.updateGroceryItem(e.target.id, this.state);
    }

    render() {
        const { name_edit, description_edit, quantity_edit, quantity_unit_edit, price_edit, status_edit, scheduled_date_edit } = this.state;
        return (
            <Fragment>
                <div className="mb-4">
                    <h3>
                        <i className="bi bi-basket-fill"></i>&nbsp; Grocery Basket
                    </h3>
                    <hr />
                    <button className="btn btn-outline-dark" data-toggle="modal" data-target="#add-item-modal" >
                        <i className="bi bi-journal-plus"></i>&nbsp;
                        Add Item
                    </button>
                    <br />
                    <br />

                    {/* Grid Card for displaying items */}
                    <div className="row">
                        {this.props.items.map(item => (
                            <div className="col-md-4" key={item.id}>
                                <div className="card mb-4">
                                    <div className="card-body">
                                        <h3 className="card-title">{item.name}</h3>
                                        <hr />
                                        <p className="card-text">{item.description}</p>
                                        <p className="card-text">{item.quantity} {item.quantity_unit}</p>
                                        <p className="card-text">{item.price}</p>
                                        <p className="card-text">{item.status}</p>
                                        <p className="card-text">{item.scheduled_date}</p>
                                        <hr />
                                        <div className="text-center">
                                            <button className="btn btn-outline-dark mr-3" data-toggle="modal" data-target="#edit-item-modal" onClick={() => this.setState({
                                                name_edit: item.name,
                                                description_edit: item.description,
                                                quantity_edit: item.quantity,
                                                quantity_unit_edit: item.quantity_unit,
                                                price_edit: item.price,
                                                status_edit: item.status,
                                                scheduled_date_edit: item.scheduled_date,
                                            })}>Update</button>
                                            <button className="btn btn-outline-dark" onClick={this.onClickDeleteButton.bind(this, item)} data-toggle="modal" data-target="#delete-item-modal">Delete</button>
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
                            <div className="modal-header bg-dark">
                                <h5 className="modal-title text-light">
                                    Add Item to Grocery Basket
                                </h5>
                                <button type="button" className="close text-light" data-dismiss="modal">
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form action="">
                                    <div className="form-group">
                                        <div className="col form-group">
                                            <label htmlFor="name_edit" className="col-form-label">Name:</label>
                                            <input type="text" className="form-control" id="name_edit" name="name_edit" onChange={this.onChange} defaultValue={name_edit} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col form-group">
                                            <label htmlFor="description_edit">Description</label>
                                            <input type="text" className="form-control" id="description_edit" name="description_edit" value={description_edit} onChange={this.onChange} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col form-group">
                                            <label htmlFor="quantity_edit">Quantity</label>
                                            <input type="number" className="form-control" id="quantity_edit" name="quantity_edit" value={quantity_edit} onChange={this.onChange} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col form-group">
                                            <label htmlFor="quantity_unit_edit">Quantity Unit</label>
                                            <input type="text" className="form-control" id="quantity_unit_edit" name="quantity_unit_edit" value={quantity_unit_edit} onChange={this.onChange} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="price_edit">Price</label>
                                        <input type="number" className="form-control" id="price_edit" name="price_edit" value={price_edit} onChange={this.onChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="status_edit">Status</label>
                                        <input type="text" className="form-control" id="status_edit" name="status_edit" value={status_edit} onChange={this.onChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="scheduled_date_edit">Scheduled Date</label>
                                        <input type="datetime-local" className="form-control" id="scheduled_date_edit" name="scheduled_date_edit" value={scheduled_date_edit} onChange={this.onChange} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.onClickAddItem}>Add</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal for editing item */}
                <div className="modal fade" id="edit-item-modal" tabIndex="-1" role="dialog" aria-labelledby="edit-item-modal-label" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="edit-item-modal-label">Edit Item</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div
                                className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="name_edit">Name</label>
                                        <input type="text" className="form-control" id="name_edit" name="name_edit" value={name_edit} onChange={this.onChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description_edit">Description</label>
                                        <input type="text" className="form-control" id="description_edit" name="description_edit" value={description_edit} onChange={this.onChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="quantity_edit">Quantity</label>
                                        <input type="text" className="form-control" id="quantity_edit" name="quantity_edit" value={quantity_edit} onChange={this.onChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="quantity_unit_edit">Quantity Unit</label>
                                        <input type="text" className="form-control" id="quantity_unit_edit" name="quantity_unit_edit" value={quantity_unit_edit} onChange={this.onChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="price_edit">Price</label>
                                        <input type="text" className="form-control" id="price_edit" name="price_edit" value={price_edit} onChange={this.onChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="status_edit">Status</label>
                                        <input type="text" className="form-control" id="status_edit" name="status_edit" value={status_edit} onChange={this.onChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="scheduled_date_edit">Scheduled Date</label>
                                        <input type
                                            type="text" className="form-control" id="scheduled_date_edit" name="scheduled_date_edit" value={scheduled_date_edit} onChange={this.onChange} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.onClickEditItem}>Edit</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal for deleting item */}
                <div className="modal fade" id="delete-item-modal" tabIndex="-1" role="dialog" aria-labelledby="delete-item-modal-label" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="delete-item-modal-label">Delete Item</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete this item?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={this.onClickDeleteItem} data-dismiss="modal">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal to Add Item to Basket */}
                {/* <div className="modal fade" id="add-item-modal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header bg-dark">
                                <h5 className="modal-title text-light">
                                    Add Item to Grocery Basket
                                </h5>
                                <button type="button" className="close text-light" data-dismiss="modal">
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form action="">
                                    <div className="form-row">
                                        <div className="col form-group">
                                            <label htmlFor="name_edit" className="col-form-label">Name:</label>
                                            <input type="text" className="form-control" id="name_edit" name="name_edit" onChange={this.onChange} defaultValue={name_edit} />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col form-group">
                                            <label htmlFor="description_edit" className="col-form-label">Description:</label>
                                            <textarea className="form-control" id="description_edit" name="description_edit" onChange={this.onChange} placeholder="Add Description" defaultValue={description_edit} />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer bg-dark">
                                <button type="button" className="btn btn-sm btn-danger" data-dismiss="modal">Cancel</button>
                                <button type="button" className="btn btn-sm btn-primary" onClick={this.onClickAddItem} data-dismiss="modal">Add to Basket</button>
                            </div>
                        </div>

                    </div>
                </div> */}
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    items: state.grocerybag.items,
    isLoading: state.grocerybag.isLoading,
})

export default connect(
    mapStateToProps,
    { loadingTarget, getGroceryItems, deleteGroceryItem, addGroceryItem, updateGroceryItem }
)(GroceryBasket);
