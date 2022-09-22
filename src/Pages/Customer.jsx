import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../Components/Loader';
import { api } from '../Config/Config';
import { headers } from '../Config/Headers';

function Customer() {

    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    const route = useParams();
    const navigate = useNavigate();
    const customerNumber = route.customerNumber;

    useEffect(() => {
        axios.get(`${api}/orders/customerOrders/${customerNumber}`, { headers: headers })
            .then(res => {
                setLoading(false);
                setOrders(res.data);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            })
    }, [customerNumber]);

    if (loading) {
        return (
            <div className='full-page'>
                <Loader />
            </div>
        )
    } else {
        return (
            <div className='full-page'>
                <h2>{route.customerName}</h2>
                <h3>{orders.length} REGISTERED ORDERS</h3>
                <table className='orders-table'>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>date</th>
                            <th>items</th>
                            <th style={{ textDecoration: "line-through" }}>subtotal</th>
                            <th>total</th>
                        </tr>
                    </thead>
                    {orders && orders.length > 0 &&
                        <tbody>
                            {orders.map(order => (
                                <tr onClick={() => navigate(`/order/${order.id}`)} key={order.id}>
                                    <th className='order-id'>{order.id}</th>
                                    <th>{moment(order.createdAt).format('lll')}</th>
                                    <th>{order.itemsNumber}</th>
                                    <th className='order-total order-total-before-discount'>{order.totalBeforeDiscount} $</th>
                                    <th className='order-total'>{order.total} $</th>
                                </tr>
                            ))}
                        </tbody>
                    }
                </table>
            </div>
        )
    }
}

export default Customer;
