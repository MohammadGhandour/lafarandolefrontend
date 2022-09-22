import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Loader from '../Components/Loader';
import { api } from '../Config/Config';
import moment from 'moment';
import SingleProductInOrder from '../Components/AllSales/SingleProductInOrder';
import OrderThead from '../Components/SalesMode/OrderThead';
import OrderFooter from '../Components/AllSales/OrderFooter';
import { headers } from '../Config/Headers';

function Order() {

    const params = useParams();
    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${api}/orders/${params.id}`, { headers: headers })
            .then(res => {
                setOrder(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            })
    }, [params.id])

    if (loading) {
        return (
            <div className='full-page'>
                <Loader />
            </div>
        )
    } else {
        return (
            <div className='full-page'>
                <div className='flex-between'>
                    <h3># {order._id}</h3>
                    <h4 className='order-date'>{moment(order.createdAt).format('lll')}</h4>
                </div>
                <table className='order-table'>
                    <OrderThead />
                    <tbody className='order-tbody'>
                        {JSON.parse(order.cart).map(product => (
                            <SingleProductInOrder
                                key={product.id}
                                product={product} />
                        ))
                        }
                    </tbody>
                </table>
                <OrderFooter order={order} />
            </div>
        )
    }
}

export default Order;
