import React, { useEffect, useState } from 'react';
import { Bar } from "react-chartjs-2";
// eslint-disable-next-line
import { Chart as ChartJS } from "chart.js/auto";
import 'chartjs-adapter-moment';
import moment from 'moment';
import ChartDataLabels from 'chartjs-plugin-datalabels';

function AverageRevenuePerDayOfTheWeek({ orders }) {

    const [ordersPerDay, setOrdersPerDay] = useState([]);

    useEffect(() => {
        let days = [
            { 'day': 1, 'orders': [], 'total': 0, 'countDay': 0 },
            { 'day': 2, 'orders': [], 'total': 0, 'countDay': 0 },
            { 'day': 3, 'orders': [], 'total': 0, 'countDay': 0 },
            { 'day': 4, 'orders': [], 'total': 0, 'countDay': 0 },
            { 'day': 5, 'orders': [], 'total': 0, 'countDay': 0 },
            { 'day': 6, 'orders': [], 'total': 0, 'countDay': 0 },
            { 'day': 0, 'orders': [], 'total': 0, 'countDay': 0 },
        ];
        orders.current.map(order => {
            return (
                // eslint-disable-next-line
                days.map(item => {
                    if (moment(order.createdAt).day() === item.day) {
                        item.orders.push(order);
                        item.total += Math.round(Number(order.total));
                    }
                })
            )
        });

        // eslint-disable-next-line
        days.map((day, i) => {
            if (day.orders.length > 1) {
                const diffTime = Math.abs(new Date(day.orders[day.orders.length - 1].createdAt)
                    - new Date(day.orders[0].createdAt));
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                const daysCount = Math.round(diffDays / 7);
                day.countDay = daysCount + 1;

                let daysToAdd = 0;
                const DFTT = new Date() - new Date(day.orders[day.orders.length - 1].createdAt);
                const DFTD = Math.ceil(DFTT / (1000 * 60 * 60 * 24));
                console.log(DFTD);
                if (7 < DFTD && DFTD <= 14) {
                    daysToAdd = 1
                } else if (14 < DFTD && DFTD <= 21) {
                    daysToAdd = 2
                } else if (21 < DFTD && DFTD <= 28) {
                    daysToAdd = 3
                } else if (28 < DFTD && DFTD <= 35) {
                    daysToAdd = 4
                } else if (35 < DFTD && DFTD <= 42) {
                    daysToAdd = 5
                } else if (42 < DFTD && DFTD <= 49) {
                    daysToAdd = 6
                } else if (56 < DFTD && DFTD <= 63) {
                    daysToAdd = 7
                } else if (63 < DFTD && DFTD <= 70) {
                    daysToAdd = 8
                } else if (70 < DFTD && DFTD <= 77) {
                    daysToAdd = 9
                } else if (77 < DFTD && DFTD <= 84) {
                    daysToAdd = 10
                } else if (84 < DFTD && DFTD <= 91) {
                    daysToAdd = 11
                }

                day.countDay = day.countDay + daysToAdd;
            }
        });

        setOrdersPerDay({
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            datasets: [
                {
                    label: "Average revenue per day",
                    data: days.map(item => (item.total / item.countDay).toFixed(1)),
                    backgroundColor: "#008080",
                    pointHitRadius: 16
                }
            ]
        });
    }, [orders]);

    const options = {
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
        },
        plugins: {
            datalabels: {
                color: 'white',
                font: {
                    weight: 700,
                    size: 12
                },
                formatter: function (value, ctx) {
                    return ('$ ' + value)
                }
            }
        }
    };

    const plugins = [ChartDataLabels];

    if (!ordersPerDay.labels) {
        return (
            <div>Loading...</div>
        )
    } else {
        return (
            <div className='bar-chart'>
                <Bar data={ordersPerDay} options={options} plugins={plugins} />
            </div>
        )
    }
}

export default AverageRevenuePerDayOfTheWeek;
