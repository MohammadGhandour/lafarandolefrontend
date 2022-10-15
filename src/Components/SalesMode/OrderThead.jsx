import React from 'react'

function OrderThead() {
    return (
        <thead className='thead'>
            <tr>
                <th>Photo</th>
                <th className='p-i-c-name'>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Size</th>
            </tr>
        </thead>
    )
}

export default OrderThead;
