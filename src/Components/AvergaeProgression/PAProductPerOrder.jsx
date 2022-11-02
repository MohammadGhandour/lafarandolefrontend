import { Line } from "react-chartjs-2";
// eslint-disable-next-line
import { Chart as ChartJS } from "chart.js/auto";
import 'chartjs-adapter-moment';
import { useState } from "react";
import { useEffect } from "react";

function PAProdcutPerOrder({ sortedArray, options }) {

    const [progressionAverageProductPerOrder, setProgressionAverageProductPerOrder] = useState([]);

    useEffect(() => {
        setProgressionAverageProductPerOrder({
            labels: sortedArray.map(obj => obj.date),
            datasets: [
                {
                    label: "Average product per order",
                    data: sortedArray.map(obj => obj.averageProductPerOrder),
                    backgroundColor: '#B1DCFF',
                    borderColor: '#056DBE',
                    fill: true,
                    borderWidth: 2,
                    pointRadius: 0,
                    pointHoverRadius: 5,
                    pointHitRadius: 5
                }
            ]
        });
    }, [sortedArray]);

    if (progressionAverageProductPerOrder.labels) {
        return (
            <section className="line-chart">
                <h2>Average product per order</h2>
                <Line data={progressionAverageProductPerOrder} options={options} />
            </section>
        )
    }
}

export default PAProdcutPerOrder;
