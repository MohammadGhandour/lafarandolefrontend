import React from 'react'

function FooterThead() {
    return (
        <div className="w-full flex items-center font-bold">
            <div className="w-14">Photo</div>
            <div className="w-[300px] ml-4">Name</div>
            <div className="flex-1 text-center">Price</div>
            <div className="flex-1 text-center">Quantity</div>
            <div className="flex-1 text-center">Subtotal</div>
            <div className="flex-1 text-center">Size</div>
            <div className="w-12 aspect-square"></div>
        </div>
    )
}

export default FooterThead;
