import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loader from '../Components/Loader';
import { api } from '../Config/Config';
import { headers } from '../Config/Headers';
import { formatCurrency } from '../functions/formatCurrency';
import { orderIdClass } from "./AllSales";

function Customer() {

    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    const route = useParams();
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
                <p>{orders[orders.length - 1].customerName} - {orders[orders.length - 1].customerNumber}</p>
                <h3 className="mt-4 font-bold text-xl">{orders.length} REGISTERED ORDERS</h3>
                <div className="w-full overflow-x-auto">
                    <div className="w-full flex-col flex mt-4 min-w-[800px]">
                        <div className="w-full flex items-center capitalize font-bold">
                            <div className={orderIdClass}>id</div>
                            <div className="flex-1 text-center">date</div>
                            <div className="flex-1 text-center">items</div>
                            <div className="flex-1 text-center line-through">subtotal</div>
                            <div className="flex-1 text-center">total</div>
                        </div>
                        {orders && orders.length > 0 &&
                            <div className="w-full flex flex-col gap-1 mt-4">
                                {orders.map(order => (
                                    <Link to={`/order/${order.id}`} className="w-full flex items-center bg-custom-gray rounded-md py-2">
                                        <div className={orderIdClass}>{order.id}</div>
                                        <div className="flex-1 text-center">{moment(order.createdAt).format('lll')}</div>
                                        <div className="flex-1 text-center">{order.itemsNumber}</div>
                                        <div className="flex-1 text-center">{formatCurrency(order.totalBeforeDiscount)}</div>
                                        <div className="flex-1 text-center">{formatCurrency(order.total)}</div>
                                    </Link>
                                ))}
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Customer;
