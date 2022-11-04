import { Line } from "react-chartjs-2";
// eslint-disable-next-line
import { Chart as ChartJS } from "chart.js/auto";
import 'chartjs-adapter-moment';
import { useState } from "react";
import { useEffect } from "react";

function PAProfitPerOrder({ sortedArray, options }) {

    const [progressionAverageProfitPerOrder, setProgressionAverageProfitPerOrder] = useState([]);

    useEffect(() => {
        setProgressionAverageProfitPerOrder({
            labels: sortedArray.map(obj => obj.date),
            datasets: [
                {
                    label: "Average profit per order",
                    data: sortedArray.map(obj => obj.averageProfitPerOrder),
                    backgroundColor: 'rgba(0, 128, 128, 1)',
                    borderColor: '#333',
                    fill: true,
                    borderWidth: 2,
                    pointRadius: 0,
                    pointHoverRadius: 5,
                    pointHitRadius: 15
                }
            ]
        });
    }, [sortedArray]);

    if (progressionAverageProfitPerOrder.labels) {
        return (
            <section className="line-chart">
                <h2>Average profit per order</h2>
                <Line data={progressionAverageProfitPerOrder} options={options} />
            </section>
        )
    }
}

export default PAProfitPerOrder;
