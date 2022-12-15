export const options = (itemsSold, title, totalItemsSold, datalabelsColor) => {
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
                    bottom: 0
                }
            },
            datalabels: {
                color: datalabelsColor ? datalabelsColor : 'white',
                font: {
                    weight: 900,
                    size: 14
                },
                formatter: function (value, ctx) {
                    if (title === 'Products sold per price' ||
                        title === 'Price sold per brand' ||
                        title === 'Price sold per gender' ||
                        title === 'Orders location per price'
                    ) {
                        return Math.round(value * 100 / totalItemsSold) + '%'
                    } else if (title === 'Products sold per quantity' || title === 'Products sold per gender') {
                        return Math.round(value * 100 / itemsSold) + '%';
                    } else {
                        return Math.round(value * 100 / itemsSold) + '%'
                    }
                }
            }
        }
    }
}