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
    const [profitDate, setProfitData] = useState([]);
    const [ordersNumbersData, setOrdersNumbersData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('Last 30 Days');

    useEffect(() => {
        getOrdersChart(orders, setOrdersData, setOrdersNumbersData, setProfitData, sortBy);
        setLoading(false);
        // eslint-disable-next-line
    }, []);

    function handleChange(e) {
        const sortBy = e.target.value;
        setSortBy(sortBy);
        getOrdersChart(orders, setOrdersData, setOrdersNumbersData, setProfitData, sortBy);
        setLoading(false);
    }


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
                    unit: sortBy === 'This Year' ? 'month' : 'day'
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
                    unit: sortBy === 'This Year' ? 'month' : 'day'
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
                    <select
                        name="sortby"
                        id="sortby"
                        className='select-filter'
                        value={sortBy}
                        onChange={handleChange}>
                        <option value="Last 90 Days">Last 90 Days</option>
                        <option value="Last 30 Days">Last 30 Days</option>
                        <option value="This Month">This Month</option>
                        <option value="Last Month">Last Month</option>
                        <option value="This Year">This Year</option>
                    </select>
                </div>
                <div className='bars-container'>
                    <div className='bar-chart'>
                        <Bar data={ordersData} options={ordersRevenueOptions} />
                    </div>
                    <div className='bar-chart'>
                        <Bar data={ordersNumbersData} options={ordersNumberOptions} />
                    </div>
                    <div className='bar-chart'>
                        <Bar data={profitDate} options={ordersRevenueOptions} />
                    </div>
                    <AverageRevenuePerDayOfTheWeek orders={orders} />
                </div>
            </div>
        )
    }
}

export default BarCharts;
