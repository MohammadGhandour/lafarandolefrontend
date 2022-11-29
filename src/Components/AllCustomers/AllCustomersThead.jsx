import React from 'react'

function AllCustomersThead({ admin }) {
    return (
        <thead className='thead'>
            <tr>
                <th>Name</th>
                <th>Phone Nb.</th>
                <th>No. Of Orders</th>
                {admin && <th>Revenue</th>}
                {admin && <th>Profit</th>}
            </tr>
        </thead>
    )
}

export default AllCustomersThead;
