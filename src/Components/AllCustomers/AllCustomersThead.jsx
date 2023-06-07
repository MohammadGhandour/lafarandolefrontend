import React from 'react'

function AllCustomersThead({ admin }) {
    return (
        <div className="w-full flex items-center font-bold mb-4">
            <div className="flex-1 text-center">Name</div>
            <div className="flex-1 text-center">Phone Nb.</div>
            <div className="flex-1 text-center">No. Of Orders</div>
            {admin && <div className="flex-1 text-center">Revenue</div>}
            {admin && <div className="flex-1 text-center">Profit</div>}
        </div>
    )
}

export default AllCustomersThead;
