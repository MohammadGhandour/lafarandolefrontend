import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { api } from '../Config/Config';
import Loader from '../Components/Loader';
import moment from 'moment';
import { Bar } from "react-chartjs-2";
// eslint-disable-next-line
import { Chart as ChartJS } from "chart.js/auto";
import 'chartjs-adapter-moment';
import './PagesStyles/Statistics.css';
import { headers } from '../Config/Headers';
import { useRef } from 'react';

function Home() {

    const [ordersData, setOrdersData] = useState([]);
    const [ordersNumbersData, setOrdersNumbersData] = useState([]);
    const [loading, setLoading] = useState(true);

    const orders = useRef([]);

    useEffect(() => {
        axios.get(`${api}/orders/chart`, { headers: headers })
            .then(res => {
                orders.current = res.data;
                setLoading(false);
                if (orders.current.length > 0) {
                    const ordersDates = orders.current.map(order => moment(order.createdAt).format('L'));
                    const ordersDates1 = ordersDates.reduce(
                        (acc, order) =>
                            acc.includes(order) ? acc : acc.concat(order),
                        []
                    );
                    let ordersDates2 = [];
                    // eslint-disable-next-line
                    ordersDates1.map(date => {
                        var singleDay = {};
                        singleDay['date'] = date;
                        singleDay['total'] = 0;
                        ordersDates2.push(singleDay);
                    })
                    // eslint-disable-next-line
                    ordersDates2.map(date => {
                        // eslint-disable-next-line
                        orders.current.map(order => {
                            if (moment(order.createdAt).format('L') === date.date) {
                                date.total = date.total + Number(order.total);
                            }
                        })
                    });
                    setOrdersData({
                        labels: ordersDates2.map(data => data.date),
                        datasets: [
                            {
                                label: "Sales",
                                data: ordersDates2.map(data => data.total),
                                backgroundColor: "#008080",
                                pointHitRadius: 16
                            }
                        ]
                    })
                    let ordersNumbers = [];
                    // eslint-disable-next-line
                    ordersDates1.map(date => {
                        var singleDay = {};
                        singleDay['date'] = date;
                        singleDay['totalNumberOfOrders'] = 0;
                        ordersNumbers.push(singleDay);
                    });
                    // eslint-disable-next-line
                    ordersNumbers.map(date => {
                        // eslint-disable-next-line
                        orders.current.map(order => {
                            if (moment(order.createdAt).format('L') === date.date) {
                                date.totalNumberOfOrders = date.totalNumberOfOrders + 1;
                            }
                        })
                    });
                    setOrdersNumbersData({
                        labels: ordersNumbers.map(data => data.date),
                        datasets: [
                            {
                                label: "No. Of Orders",
                                data: ordersNumbers.map(data => data.totalNumberOfOrders),
                                backgroundColor: "black",
                                pointHitRadius: 16
                            }
                        ]
                    });
                } else {
                    return
                }
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            })
    }, []);

    const ordersRevenueOptions = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            y: {
                title: {
                    display: true,
                    text: '$',
                    size: 24
                }
            },
            x: {
                type: 'time',
                time: {
                    unit: 'day'
                }
            }
        }
    }

    const ordersNumberOptions = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            y: {
                title: {
                    display: true,
                    text: '',
                    size: 24
                }
            },
            x: {
                type: 'time',
                time: {
                    unit: 'day'
                }
            }
        }
    }

    if (!loading && orders.current.length > 0) {
        return (
            <div className='full-page statistics-page flex-center'>
                <div className='bar-chart'>
                    <Bar data={ordersData} options={ordersRevenueOptions} />
                </div>
                <div className='bar-chart'>
                    <Bar data={ordersNumbersData} options={ordersNumberOptions} />
                </div>
            </div>
        )
    } else if (loading) {
        return (
            <div className='full-page'>
                <Loader />
            </div>
        )
    } else {
        return (
            <div className='full-page'>No orders yet</div>
        )
    }
}

export default Home;
