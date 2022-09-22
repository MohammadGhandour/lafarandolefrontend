import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { api } from '../Config/Config';
import "./PagesStyles/PriceMode.css";
import Loader from '../Components/Loader';
import logo from '../assets/defaultProductImage.jpg';
import { headers } from '../Config/Headers';

function PriceMode() {

    const noProductText = 'Scan barcode for infos';

    const barcodeScannerRef = useRef(null);
    const [productBarcode, setProductBarcode] = useState('');
    const [product, setProduct] = useState(null);
    const [noProductTitle, setNoProductTitle] = useState(noProductText);
    const [loading, setLoading] = useState(false);
    const [discount, setDiscount] = useState(false);

    useEffect(() => {
        document.addEventListener('keypress', function (e) {
            if (isFinite(e.key)) {
                barcodeScannerRef.current.focus();
            }
        })
    }, [])

    function handleSubmit(e) {
        setLoading(true);
        e.preventDefault();
        axios.get(`${api}/products/product-by-barcode/${productBarcode}`, { headers: headers })
            .then((res) => {
                setProduct(res.data);
                setProductBarcode('');
                setNoProductTitle(noProductText);
                setLoading(false);
                if (res.data.price !== res.data.priceAfterDiscount) {
                    setDiscount(true);
                } else {
                    setDiscount(false);
                }
            })
            .catch(err => {
                setProduct(null);
                setNoProductTitle(err.response.data.error);
                setProductBarcode('');
                setLoading(false);
                window.scrollTo(0, 0);
            })
    }

    function copyText() {
        navigator.clipboard.writeText(product.name);
    }

    const titleStyle = noProductTitle === 'Product not found.' ? 'scan-title-sales not-found-product' : 'scan-title-sales';

    return (
        <div className='full-page'>
            <form className='price-mode-form' onSubmit={handleSubmit}>
                <input
                    type='number'
                    ref={barcodeScannerRef}
                    id='scanner-input'
                    value={productBarcode}
                    autoFocus
                    onInput={(e) => setProductBarcode(e.target.value)} />
            </form>
            {loading ?
                <Loader />
                :
                <div>
                    {!product &&
                        <h2 className={titleStyle}>{noProductTitle}</h2>
                    }
                    {product &&
                        <div className='price-mode-product flex-column'>
                            <div className='img-name-wrapper flex-center'>
                                <img src={product.photo ? product.photo : logo} alt={product.name} />
                                <div
                                    className='product-info product-name flex-center'
                                    onClick={copyText}>
                                    {product.name}
                                    <span>(click to copy)</span>
                                </div>
                            </div>
                            <div className={discount ? 'product-info product-price with-discount' : 'product-info product-price'}>
                                {product.price}$
                            </div>
                            {discount &&
                                <div className='product-info product-price'>
                                    {product.priceAfterDiscount}$
                                </div>
                            }
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default PriceMode;
