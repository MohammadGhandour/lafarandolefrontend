import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Loader from '../Components/Loader';
import { api } from '../Config/Config';
import moment from 'moment';
import SingleProductInOrder from '../Components/AllSales/SingleProductInOrder';
import OrderThead from '../Components/SalesMode/OrderThead';
import OrderFooter from '../Components/Order/OrderFooter';
import { headers } from '../Config/Headers';
import ErrorMessage from "../Components/ErrorMessage";
import './PagesStyles/Order.css';
import { useAdminContext } from '../Hooks/useAdminContext';

function Order() {

    const { admin } = useAdminContext();

    const params = useParams();
    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(`${api}/orders/${params.id}`, { headers: headers })
            .then(res => {
                setOrder(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                if (err.response.status === 404) {
                    setError(err.response.data.error);
                } else if (err.message === 'Network Error') {
                    setError('An error occured while communicating with the server.');
                }
                setLoading(false);
            })
    }, [params.id])

    if (loading) {
        return (
            <div className='full-page'>
                <Loader />
            </div>
        )
    } else if (error) {
        return (
            <div className='full-page form-page'>
                <h2>
                    <ErrorMessage classes='product-error'>{error}</ErrorMessage>
                </h2>
            </div>
        )
    } else {
        return (
            <div className='full-page'>
                <div className='flex-between'>
                    <h3># {order.id}</h3>
                    <h4 className='order-date'>{moment(order.createdAt).format('lll')}</h4>
                </div>
                <table className='order-table'>
                    <OrderThead />
                    <tbody className='order-tbody'>
                        {order.cart.map(product => (
                            <SingleProductInOrder
                                key={product.id}
                                product={product} />
                        ))
                        }
                    </tbody>
                </table>
                <OrderFooter order={order} admin={admin} />
            </div>
        )
    }
}

export default Order;
