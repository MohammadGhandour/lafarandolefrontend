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
    const [sortBy, setSortBy] = useState('All Time');

    useEffect(() => {
        getOrdersChart(orders, setOrdersData, setOrdersNumbersData);
        setLoading(false);
    }, [orders]);

    useEffect(() => {
        getOrdersChart(orders, setOrdersData, setOrdersNumbersData, sortBy);
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

    if (loading) {
        return <div>Loading...</div>
    } else {
        return (
            <div className='statistic-row bar-charts-container flex-column gap-l'>
                <div className='flex-center'>
                    <h2>Sales:</h2>
                    <div className="sort-orders-statistics-wrapper">
                        <div className={sortBy === 'Today' ? 'sort-orders-statistics active' : 'sort-orders-statistics'} onClick={() => setSortBy('Today')}>Today</div>
                        <div className={sortBy === 'Yesterday' ? 'sort-orders-statistics active' : 'sort-orders-statistics'} onClick={() => setSortBy('Yesterday')}>Yesterday</div>
                        <div className={sortBy === 'Last Week' ? 'sort-orders-statistics active' : 'sort-orders-statistics'} onClick={() => setSortBy('Last Week')}>Last Week</div>
                        <div className={sortBy === 'All Time' ? 'sort-orders-statistics active' : 'sort-orders-statistics'} onClick={() => setSortBy('All Time')}>All Time</div>
                    </div>
                </div>
                <div className='flex-center'>
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
