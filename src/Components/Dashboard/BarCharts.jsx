import React, { useState } from 'react';
import { Bar } from "react-chartjs-2";
// eslint-disable-next-line
import { Chart as ChartJS } from "chart.js/auto";
import 'chartjs-adapter-moment';
import { getOrdersChart } from '../../functions/ordersChart';
import { useEffect } from 'react';
import AverageRevenuePerDayOfTheWeek from './AverageRevenuePerDayOfTheWeek';
import moment from 'moment';

function BarCharts({ orders }) {

    const [ordersData, setOrdersData] = useState([]);
    const [ordersNumbersData, setOrdersNumbersData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('This Month');

    useEffect(() => {
        getOrdersChart(orders, setOrdersData, setOrdersNumbersData, sortBy);
        setLoading(false);
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
        },
        plugins: {
            tooltip: {
                callbacks: {
                    beforeTitle: function (ctx) {
                        return moment(new Date(ctx[0].label)).format('dddd')
                    }
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
        },
        plugins: {
            tooltip: {
                callbacks: {
                    beforeTitle: function (ctx) {
                        return moment(new Date(ctx[0].label)).format('dddd')
                    }
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
                    <h2>Sales</h2>
                    <div className="sort-orders-statistics-wrapper">
                        <div className={sortBy === 'This Month' ? 'sort-orders-statistics active' : 'sort-orders-statistics'} onClick={() => setSortBy('This Month')}>This Month</div>
                        <div className={sortBy === 'This Year' ? 'sort-orders-statistics active' : 'sort-orders-statistics'} onClick={() => setSortBy('This Year')}>This Year</div>
                    </div>
                </div>
                <div className='bars-container'>
                    <div className='bar-chart'>
                        <Bar data={ordersData} options={ordersRevenueOptions} />
                    </div>
                    <div className='bar-chart'>
                        <Bar data={ordersNumbersData} options={ordersNumberOptions} />
                    </div>
                    <AverageRevenuePerDayOfTheWeek orders={orders} />
                </div>
            </div>
        )
    }
}

export default BarCharts;