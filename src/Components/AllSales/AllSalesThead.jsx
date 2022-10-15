import React from 'react'

function AllSalesThead() {
    return (
        <thead className='thead'>
            <tr>
                <th>id</th>
                <th>date</th>
                <th>items</th>
                <th style={{ textDecoration: "line-through" }}>subtotal</th>
                <th>total</th>
                <th>profit</th>
                <th>customer name</th>
            </tr>
        </thead>
    )
}

export default AllSalesThead;
