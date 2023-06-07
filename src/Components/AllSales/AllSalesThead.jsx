import React from "react"

function AllSalesThead({ admin, orderIdClass }) {
    return (
        <div className="w-full capitalize flex items-center font-bold">
            <div className={orderIdClass}>id</div>
            <div className="flex-1 text-center">date</div>
            <div className="flex-1 text-center">items</div>
            <div className="flex-1 text-center line-through">subtotal</div>
            <div className="flex-1 text-center">total</div>
            {admin && <div className="flex-1 text-center">profit</div>}
            <div className="flex-1 text-center">customer name</div>
        </div>
    )
}

export default AllSalesThead;
