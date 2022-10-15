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

    useEffect(() => {
        getOrdersChart(orders, setOrdersData, setOrdersNumbersData);
        setLoading(false);
    }, [orders]);

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
            <div className='statistic-row flex-center bar-charts-container'>
                <h2>Sales:</h2>
                <div className='bar-chart'>
                    <Bar data={ordersData} options={ordersRevenueOptions} />
                </div>
                <div className='bar-chart'>
                    <Bar data={ordersNumbersData} options={ordersNumberOptions} />
                </div>
            </div>
        )
    }
}

export default BarCharts;
