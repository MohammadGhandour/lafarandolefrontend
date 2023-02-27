import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Components/Loader";
import { api } from "../Config/Config";
import { headers } from "../Config/Headers";
import { formatCurrency } from "../functions/formatCurrency";

function User() {
    const params = useParams();
    const [userOrders, setUserOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const itemsSold = (orders) => orders?.reduce((items, item) => ((items + item.itemsNumber)), 0);
    const totalOfAllOrders = (orders) => orders?.reduce((total, item) => (Number(total) + Number(item.total)).toFixed(2), 0);

    useEffect(() => {
        axios.get(`${api}/users/${params.id}`, { headers: headers })
            .then(res => {
                setUserOrders(res.data);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(setLoading(false))
    }, [params.id]);

    const navigate = useNavigate();

    function goOrder(e, order) {
        if (e.button === 1 || e.ctrlKey) {
            window.open(`${window.location.origin}/order/${order.id}`, '_blank');
        } else if (e.button === 0) {
            navigate(`/order/${order.id}`);
        }
    };

    if (loading) {
        return (
            <div className="full-page">
                <Loader />
            </div>
        )
    } else {
        return (
            <div className="full-page">
                {userOrders.length > 0 ?
                    <div className="table-wrapper">
                        <table className='orders-table'>
                            <thead className='thead'>
                                <tr>
                                    <th>id</th>
                                    <th>date</th>
                                    <th>items</th>
                                    <th>total</th>
                                    <th>customer name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userOrders.map(order => (
                                    <tr onMouseDown={(e) => goOrder(e, order)} key={order.id} className="single-order-in-list">
                                        <th to={`/order/${order.id}`} key={order.id}>#{order.id}</th>
                                        <th>{moment(order.createdAt).format('lll')}</th>
                                        <th>{order.itemsNumber}</th>
                                        <th>{formatCurrency(order.total)}</th>
                                        <th>{order.customerName}</th>
                                    </tr>
                                ))}
                                <tr style={{ backgroundColor: "var(--profit-green)", color: "#fff", cursor: "default !important" }}>
                                    <th>-</th>
                                    <th>-</th>
                                    <th>{itemsSold(userOrders)}</th>
                                    <th>{formatCurrency(totalOfAllOrders(userOrders))}</th>
                                    <th>-</th>
                                </tr>
                            </tbody>
                        </table>
                    </div> :
                    <h2>No orders for this user</h2>
                }
            </div>
        );
    }
}

export default User;
