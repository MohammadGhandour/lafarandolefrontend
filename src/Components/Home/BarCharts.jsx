import React, { useState } from 'react';
import { Bar } from "react-chartjs-2";
// eslint-disable-next-line
import { Chart as ChartJS } from "chart.js/auto";
import 'chartjs-adapter-moment';
import { getOrdersChart } from '../../functions/ordersChart';
import { useEffect } from 'react';

function BarCharts({ orders }) {

    const [ordersData, setOrdersData] = useState([]);
    const [ordersNumbersData, setOrdersNumbersData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('This Month');

    // useEffect(() => {
    //     getOrdersChart(orders, setOrdersData, setOrdersNumbersData);
    //     setLoading(false);
    // }, [orders]);

    useEffect(() => {
        getOrdersChart(orders, setOrdersData, setOrdersNumbersData, sortBy);
        setLoading(false);
        console.log(ordersData);
        // eslint-disable-next-line
    }, [orders, sortBy]);

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
                    unit: sortBy === 'This Month' ? 'day' : 'month'
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
                    unit: sortBy === 'This Month' ? 'day' : 'month'
                }
            }
        }
    }

    if (loading) {
        return <div>Loading...</div>
    } else {
        return (
            <div className='statistic-row bar-charts-container flex-column gap-l'>
                <div className='flex-center'>
                    <h2>Sales:</h2>
                    <div className="sort-orders-statistics-wrapper">
                        <div className={sortBy === 'This Month' ? 'sort-orders-statistics active' : 'sort-orders-statistics'} onClick={() => setSortBy('This Month')}>This Month</div>
                        <div className={sortBy === 'This Year' ? 'sort-orders-statistics active' : 'sort-orders-statistics'} onClick={() => setSortBy('This Year')}>This Year</div>
                        {/* <div className={sortBy === 'Today' ? 'sort-orders-statistics active' : 'sort-orders-statistics'} onClick={() => setSortBy('Today')}>Today</div> */}
                    </div>
                </div>
                <div className='bars-container'>
                    <div className='bar-chart'>
                        <Bar data={ordersData} options={ordersRevenueOptions} />
                    </div>
                    <div className='bar-chart'>
                        <Bar data={ordersNumbersData} options={ordersNumberOptions} />
                    </div>
                </div>
            </div>
        )
    }
}

export default BarCharts;
