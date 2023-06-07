import React from 'react'
import { orderIdClass } from "../../Pages/AllSales";

function ExpensesThead() {
    return (
        <div className="w-full flex items-center font-bold capitalize">
            <p className={orderIdClass}>id</p>
            <p className="flex-1 text-center">Date</p>
            <p className="flex-1 text-center">Category</p>
            <p className="flex-1 text-center">Comment</p>
            <p className="flex-1 text-center">Value</p>
            <p className="flex-1 text-center">Delete</p>
        </div>
    )
}

export default ExpensesThead;
