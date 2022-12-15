import React from 'react';
import { Doughnut } from "react-chartjs-2";
// eslint-disable-next-line
import { Chart as ChartJS } from "chart.js/auto";
import 'chartjs-adapter-moment';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { options } from '../chartsUtils/donutsOptions';
import { backgroundColors } from '../chartsUtils/backgroundColors';
import { useEffect } from 'react';
import { useState } from 'react';

function OrdersPerLocation({ orders, donutsSortBy }) {

    const [donutOrdersData, setDonutOrdersData] = useState([]);
    const totalOfAllOrders = Math.round(orders.current.reduce((total, order) => total + Number(order.total), 0));

    useEffect(() => {
        let ordersLocationData = [];

        let ordersLocations = orders.current.reduce((acc, order) =>
            acc.includes(order.orderLocation) ? acc : acc.concat(order.orderLocation),
            []
        );

        ordersLocations.map(location => {
            var singleLocation = {};
            singleLocation['location'] = location;
            singleLocation['numberOfOrders'] = 0;
            singleLocation['totalSold'] = 0;
            return ordersLocationData.push(singleLocation);
        });

        orders.current.map(order => {
            // eslint-disable-next-line
            return ordersLocationData.map(singleLocation => {
                if (order.orderLocation === singleLocation.location) {
                    singleLocation.numberOfOrders += 1;
                    singleLocation.totalSold += Math.round(Number(order.total));
                }
            })
        });

        if (donutsSortBy === 'quantitySold') {
            setDonutOrdersData({
                labels: ordersLocationData.map(orderLocation => orderLocation.location),
                datasets: [
                    {
                        label: "Orders Location",
                        data: ordersLocationData.map(orderLocation => orderLocation.numberOfOrders),
                        backgroundColor: backgroundColors
                    }
                ]
            });
        } else {
            setDonutOrdersData({
                labels: ordersLocationData.map(orderLocation => orderLocation.location),
                datasets: [
                    {
                        label: "Orders Location",
                        data: ordersLocationData.map(orderLocation => orderLocation.totalSold),
                        backgroundColor: backgroundColors
                    }
                ]
            });
        }
        // eslint-disable-next-line
    }, [donutsSortBy]);

    const plugins = [ChartDataLabels];

    if (!donutOrdersData.labels) {
        <div>Loading....</div>
    } else if (donutsSortBy === 'quantitySold') {
        return (
            <div className='donut'>
                <Doughnut
                    data={donutOrdersData}
                    plugins={plugins}
                    options={options(orders.current.length, 'Orders location per quantity', undefined, undefined)} />
            </div>
        )
    } else if (donutsSortBy === 'priceSold') {
        return (
            <div className='donut'>
                <Doughnut
                    data={donutOrdersData}
                    plugins={plugins}
                    options={options(orders.current.length, 'Orders location per price', totalOfAllOrders, undefined)} />
            </div>
        )
    }

}

export default OrdersPerLocation;
