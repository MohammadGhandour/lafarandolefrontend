import React, { useState } from 'react';
import { numberSizes } from "../../Arrays/Sizes/numberSizes";
import { generalSizes } from "../../Arrays/Sizes/generalSizes";
import { kidsSizes } from "../../Arrays/Sizes/kidsSizes";
import { babySizes } from "../../Arrays/Sizes/babySizes";
import { preMature } from "../../Arrays/Sizes/preMature";
import axios from 'axios';
import { api } from '../../Config/Config';
import { headers } from '../../Config/Headers';

function SizeForm({ arrayOfSizes, setArrayOfSizes, originalBarcode }) {

    const [size, setSize] = useState('');
    const [barcode, setBarcode] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [showSizeForm, setShowSizeForm] = useState('');

    function submitSizeBarcode(e) {
        e.preventDefault();
        const productVariant = { size, barcode, quantity };

        console.log(originalBarcode);

        const barcodeAlreadyAdded = arrayOfSizes.find((item) => item.barcode === barcode);
        if (size === '' || barcode === '' || quantity === 0) alert("Please fill both size and barcode");
        else if (barcodeAlreadyAdded || barcode === originalBarcode) {
            alert("A product with this barcode is already added.")
        } else if (size !== '' && barcode !== '') {
            axios.get(`${api}/products/product-by-barcode/${barcode}`, { headers: headers })
                .then(res => {
                    alert("A product with this barcode already exists in the database.")
                })
                .catch(err => {
                    if (err.response.data.error === 'Product not found.') {
                        setArrayOfSizes(current => [productVariant, ...current]);
                        setSize('');
                        setBarcode('');
                    }
                })
        }
    }

    return (
        <>
            <button
                type="button"
                className="primary-btn add-size-btn"
                title="Add Size"
                onClick={() => setShowSizeForm(!showSizeForm)}>
                <i className={showSizeForm ? "fa-solid fa-minus" : "fa-solid fa-plus"}></i>
            </button>
            {showSizeForm && <form onSubmit={submitSizeBarcode} className="flex-between gap-l mt-l">
                <select className='select-category-single-product' style={{ marginBottom: 0 }} value={size} onChange={(e) => setSize(e.target.value)}>
                    <option value=''>Size</option>
                    <optgroup label="premature">
                        {preMature.map(label => (
                            <option value={label} key={label}>{label}</option>
                        ))}
                    </optgroup>
                    <optgroup label='Baby'>
                        {babySizes.map(label => (
                            <option value={label} key={label}>{label}</option>
                        ))}
                    </optgroup>
                    <optgroup label='Kids'>
                        {kidsSizes.map(label => (
                            <option value={label} key={label}>{label}</option>
                        ))}
                    </optgroup>
                    <optgroup label='Generals'>
                        {generalSizes.map(label => (
                            <option value={label} key={label}>{label}</option>
                        ))}
                    </optgroup>
                    <optgroup label='Generals'>
                        {numberSizes.map(label => (
                            <option value={label} key={label}>{label}</option>
                        ))}
                    </optgroup>
                </select>
                <input type="number" className="form-input" value={barcode} onChange={(e) => setBarcode(e.target.value)} placeholder="barcode..." />
                <div className="small-input">
                    <input name="quanitity"
                        type="number"
                        autoComplete='off'
                        min='1'
                        step='any'
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className='form-input' />
                </div>
                <button type='submit' className="primary-btn submit-size-btn"><i className="fa-solid fa-check"></i></button>
            </form>}
        </>
    )
}

export default SizeForm;
