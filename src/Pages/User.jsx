import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../Components/Loader";
import { api } from "../Config/Config";
import { headers } from "../Config/Headers";
import { formatCurrency } from "../functions/formatCurrency";
import { orderIdClass } from "./AllSales";
import styles from "../styles";
import { useQuery } from "react-query";

function User() {
    const params = useParams();
    const [userOrders, setUserOrders] = useState([]);
    const itemsSold = (orders) => orders?.reduce((items, item) => ((items + item.itemsNumber)), 0);
    const totalOfAllOrders = (orders) => orders?.reduce((total, item) => (Number(total) + Number(item.total)).toFixed(2), 0);

    const [endDate, setEndDate] = useState("");
    const [startDate, setStartDate] = useState("");
    const [comission, setComission] = useState(2);

    async function getUsersData() {
        const data = await axios.get(`${api}/users/${params.id}`, {
            headers: headers,
            params: {
                startDate,
                endDate
            }
        })
        return data.data;
    };

    const { isLoading, refetch } = useQuery(
        ["user", params.id],
        getUsersData,
        {
            onSuccess: (orders) => {
                setUserOrders(orders);
            },
            refetchOnWindowFocus: false,
            // onSuccess
        }
    )


    if (isLoading) {
        return (
            <div className="full-page">
                <Loader />
            </div>
        )
    } else {
        return (
            <div className="full-page">
                {userOrders.length > 0 ?
                    <div className="w-full overflow-x-auto">

                        <div className="w-full flex items-end gap-8 flex-wrap">
                            <div className="flex flex-col items-start">
                                <span>Start date</span>
                                <input
                                    type="date"
                                    className={`${styles.inputClasses} focus:!outline-none select-none w-max`}
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)} />
                            </div>
                            <div className="flex flex-col items-start">
                                <span>End date</span>
                                <input
                                    type="date"
                                    className={`${styles.inputClasses} focus:!outline-none select-none w-max`}
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)} />
                            </div>
                            <button className={`${styles.blackButton}`} onClick={refetch}>Fetch</button>
                        </div>

                        <div className="w-full flex flex-col items-start mt-8">
                            <label htmlFor="comission" className="w-max">Comission</label>
                            <input
                                id="comission"
                                type="number"
                                step="any"
                                value={comission}
                                onChange={(e) => setComission(e.target.value)}
                                className={`${styles.inputClasses} max-w-[150px] focus:!outline-none`} />
                        </div>

                        <div className="w-full flex-col flex mt-4 min-w-[800px]">
                            <div className="w-full flex items-center bg-custom-light-gray font-bold capitalize py-2 rounded-md">
                                <p className={orderIdClass}>id</p>
                                <p className="flex-1 text-center">date</p>
                                <p className="flex-1 text-center">items</p>
                                <p className="flex-1 text-center">total</p>
                                <p className="flex-1 text-center">customer name</p>
                            </div>
                            <div className="w-full flex flex-col gap-1">
                                <div className="w-full flex items-center my-8 font-bold bg-custom-green text-white rounded-md py-4">
                                    <p className={orderIdClass}>-</p>
                                    <p className="flex-1 text-center">-</p>
                                    <p className="flex-1 text-center">{itemsSold(userOrders)}</p>
                                    <p className="flex-1 text-center">{formatCurrency(totalOfAllOrders(userOrders))} ({formatCurrency(totalOfAllOrders(userOrders) * comission / 100)})</p>
                                    <p className="flex-1 text-center">-</p>
                                </div>
                                {userOrders.map(order => (
                                    <Link to={`/order/${order.id}`} key={order.id} className="w-full flex items-center py-2 rounded-md bg-custom-gray hover:bg-[#eee]">
                                        <p className={orderIdClass} to={`/order/${order.id}`} key={order.id}>#{order.id}</p>
                                        <p className="flex-1 text-center">{moment(order.createdAt).format('lll')}</p>
                                        <p className="flex-1 text-center">{order.itemsNumber}</p>
                                        <p className="flex-1 text-center">{formatCurrency(order.total)}</p>
                                        <p className="flex-1 text-center">{order.customerName}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div> :
                    <h2>No orders for this user</h2>
                }
            </div>
        );
    }
}

export default User;
