export const options = (itemsSold, title, totalItemsSold) => {
    return {
        responsive: true,
        // maintainAspectRatio: true,
        plugins: {
            legend: {
                display: true,
                position: 'right',
                padding: {
                    left: 20,
                }
            },
            title: {
                display: true,
                text: title,
                position: 'bottom',
                font: {
                    size: 14
                },
                padding: {
                    bottom: title === 'Orders Location' ? 0 : 0
                }
            },
            datalabels: {
                color: 'white',
                font: {
                    weight: 900,
                    size: 14
                },
                formatter: function (value, ctx) {
                    if (title === 'Products sold per price') {
                        return Math.round(value * 100 / totalItemsSold) + '%'
                    } else if (title === 'Products sold per quantity') {
                        return Math.round(value * 100 / itemsSold) + '%';
                    } else {
                        return Math.round(value * 100 / itemsSold) + '%'
                    }
                }
            }
        }
    }
}