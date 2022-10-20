export const options = (itemsSold, title, totalItemsSold) => {
    return {
        responsive: false,
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
                padding: {
                    bottom: 0
                }
            },
            datalabels: {
                color: 'white',
                font: {
                    weight: 900,
                    size: 10
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