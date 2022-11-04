import { Line } from "react-chartjs-2";
// eslint-disable-next-line
import { Chart as ChartJS } from "chart.js/auto";
import 'chartjs-adapter-moment';
import { useState } from "react";
import { useEffect } from "react";

function PAPricePerOrder({ sortedArray, options }) {

    const [progressionAveragePricePerOrder, setProgressionAveragePricePerOrder] = useState([]);

    useEffect(() => {
        setProgressionAveragePricePerOrder({
            labels: sortedArray.map(obj => obj.date),
            datasets: [
                {
                    label: "Average price per order",
                    data: sortedArray.map(obj => obj.averagePricePerOrder),
                    backgroundColor: '#B1DCFF',
                    borderColor: '#056DBE',
                    fill: true,
                    borderWidth: 2,
                    pointRadius: 0,
                    pointHoverRadius: 5,
                    pointHitRadius: 15
                }
            ]
        });
    }, [sortedArray]);

    if (progressionAveragePricePerOrder.labels) {
        return (
            <section className="line-chart">
                <h2>Average price per order</h2>
                <Line data={progressionAveragePricePerOrder} options={options} />
            </section>
        )
    }
}

export default PAPricePerOrder;
