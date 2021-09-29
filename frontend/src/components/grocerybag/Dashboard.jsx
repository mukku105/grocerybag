import React, { Fragment } from 'react';
import format from 'date-fns/format';

import GroceryBasket from './GroceryBasket.jsx';

export default function Dashboard() {
    return (
        <Fragment>
            <div className="row">
                {/* <div className="col-md-2 rounded mt-4 mb-4">
                    <div className="nav flex-column nav-pills bg-light border rounded mt-3" id="v-pills-tab" role="tablist">
                        <a className="nav-link active" id="v-pills-add-item-tab" data-toggle="pill" href="#v-pills-add-item" role="tab">
                            <i className="bi bi-journal-plus"></i> Add Grocery Item
                        </a>
                    </div>
                </div> */}
                <div className="container mt-5">
                    <GroceryBasket />
                </div>
            </div>
            <hr />
        </Fragment>
    )
}
