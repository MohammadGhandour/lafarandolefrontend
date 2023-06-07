import React, { useState } from 'react';
import axios from 'axios';
import { api } from '../../Config/Config';
import { headers } from '../../Config/Headers';
import { sizes } from "../../Arrays/Sizes/sizes";
import styles from "../../styles";

function SizeForm({ arrayOfSizes, setArrayOfSizes, originalBarcode }) {

    const [size, setSize] = useState('');
    const [barcode, setBarcode] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [showSizeForm, setShowSizeForm] = useState('');

    function submitSizeBarcode(e) {
        e.preventDefault();
        const productVariant = { size, barcode, quantity };
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
            {showSizeForm &&
                <form onSubmit={submitSizeBarcode} className="flex flex-col lg:flex-row gap-4 mt-4">
                    <select className={`${styles.inputClasses} lg:max-w-[150px]`} value={size} onChange={(e) => setSize(e.target.value)}>
                        <option value=''>Size</option>
                        {sizes.map(size => (
                            <option value={size.key} key={size.key}>{size.key}</option>
                        ))}
                    </select>
                    <input type="number" className={`${styles.inputClasses}`} value={barcode} onChange={(e) => setBarcode(e.target.value)} placeholder="barcode..." />
                    <input name="quanitity"
                        type="number"
                        autoComplete='off'
                        min='1'
                        step='any'
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className={`${styles.inputClasses}`} />
                    <button type='submit' className={`${styles.blackButton} bg-custom-green text-xl py-3`}><i className="fa-solid fa-check"></i></button>
                </form>
            }
        </>
    )
}

export default SizeForm;
