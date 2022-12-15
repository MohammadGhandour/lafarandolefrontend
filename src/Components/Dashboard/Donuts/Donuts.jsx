import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { api } from '../../../Config/Config';
import { headers } from '../../../Config/Headers';
import 'chartjs-adapter-moment';
import ProductsSoldPerQuantity from './ProductsSoldPerQuantity';
import OrdersPerLocation from './OrdersPerLocation';
import ProductsSoldPerGender from './ProductsSoldPerGender';
import ProductsSoldPerBrand from './ProductsSoldPerBrand';


function Donuts({ orders, donutsSortBy }) {

    const [loading, setLoading] = useState(true);
    const [itemsSold, setItemsSold] = useState(0);
    const [totalItemsSold, setTotalItemsSold] = useState(0);
    const [rawProductsSold, setRawProductsSold] = useState([]);

    useEffect(() => {
        axios.get(`${api}/products/products-sold`, { headers: headers })
            .then(res => {
                let productsSold = res.data;
                setRawProductsSold(res.data);
                setItemsSold(productsSold.reduce((total, item) => Number(total) + Number(item.quantitySold), 0));
                setTotalItemsSold(productsSold.reduce((total, item) => Number(total) + Math.round(Number(item.price) * item.quantitySold), 0));

                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            })
        // eslint-disable-next-line
    }, [itemsSold]);

    if (loading) {
        return (
            <div>Loading...</div>
        )
    } else {
        return (
            <div className='donut-charts-wrapper'>
                <ProductsSoldPerQuantity
                    rawProductsSold={rawProductsSold}
                    itemsSold={itemsSold}
                    totalItemsSold={totalItemsSold}
                    donutsSortBy={donutsSortBy} />
                <ProductsSoldPerBrand
                    rawProductsSold={rawProductsSold}
                    itemsSold={itemsSold}
                    totalItemsSold={totalItemsSold}
                    donutsSortBy={donutsSortBy} />
                <ProductsSoldPerGender
                    rawProductsSold={rawProductsSold}
                    itemsSold={itemsSold}
                    totalItemsSold={totalItemsSold}
                    donutsSortBy={donutsSortBy} />
                <OrdersPerLocation
                    orders={orders}
                    donutsSortBy={donutsSortBy} />
            </div>
        )
    }
}

export default Donuts;
