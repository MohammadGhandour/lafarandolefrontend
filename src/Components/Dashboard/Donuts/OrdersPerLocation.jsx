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

function OrdersPerLocation({ orders }) {

    const [donutOrdersData, setDonutOrdersData] = useState([]);

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
            return ordersLocationData.push(singleLocation);
        });

        orders.current.map(order => {
            // eslint-disable-next-line
            return ordersLocationData.map(singleLocation => {
                if (order.orderLocation === singleLocation.location) {
                    singleLocation.numberOfOrders += 1;
                }
            })
        });

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
        // eslint-disable-next-line
    }, []);

    const plugins = [ChartDataLabels];

    if (!donutOrdersData.labels) {
        <div>Loading....</div>
    } else {
        return (
            <div className='donut'>
                <Doughnut
                    data={donutOrdersData}
                    plugins={plugins}
                    options={options(orders.current.length, 'Orders Location', undefined, undefined)} />
            </div>
        )
    }

}

export default OrdersPerLocation;
