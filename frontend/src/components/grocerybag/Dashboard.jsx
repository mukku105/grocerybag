import React, { Fragment } from 'react';
import format from 'date-fns/format';

import GroceryBasket from './GroceryBasket.jsx';

export default function Dashboard() {
    return (
        <Fragment>
            <div className="row">
                <div className="container mt-5">
                    <GroceryBasket />
                </div>
            </div>
            {/* 
            <p className="text-center">
                Made With 💜 by Muksam Limboo | Grocery Bag, 2021
            </p> */}
        </Fragment>
    )
}
