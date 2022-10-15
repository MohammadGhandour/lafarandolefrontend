import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { api } from '../../Config/Config';
import { headers } from '../../Config/Headers';
import { Doughnut } from "react-chartjs-2";
// eslint-disable-next-line
import { Chart as ChartJS } from "chart.js/auto";
import 'chartjs-adapter-moment';

function CategoryStatistics() {

    const [productsSold, setProductsSold] = useState([]);
    // const [productsSoldPerPrice, setProductsSoldPerPrice] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalItemsSold, setTotalItemsSold] = useState(0);
    const backgroundColors = ["#C52233", "#A51C30", "#A7333F", "#74121D", "#580C1F", "#0B132B", "#1C2541", "#3A506B", "#5BC0BE", "#DA3E52", "#C1EDCC", "#B0C0BC", "#A7A7A9", "#797270", "#453F3C",]

    useEffect(() => {
        axios.get(`${api}/products/products-sold`, { headers: headers })
            .then(res => {
                let productsSold = res.data;
                // let productsSoldPerPrice = res.data;
                let categoriesPerQuantity = [];
                // let categoriesPerPrice = [];

                setTotalItemsSold(productsSold.reduce((total, item) => Number(total) + Number(item.quantitySold), 0));

                let basicCategories = productsSold.reduce((acc, product) =>
                    acc.includes(product.category) ? acc : acc.concat(product.category),
                    []
                );

                basicCategories.map(category => {
                    var singleCategory = {};
                    singleCategory['category'] = category;
                    singleCategory['quantitySold'] = 0;
                    return categoriesPerQuantity.push(singleCategory);
                });

                // basicCategories.map(category => {
                //     var singleCategory = {};
                //     singleCategory['category'] = category;
                //     singleCategory['priceSold'] = 0;
                //     return categoriesPerPrice.push(singleCategory);
                // });

                // categoriesPerPrice.map(category => {
                //     // eslint-disable-next-line
                //     return productsSoldPerPrice.map(product => {
                //         if (product.category === category.category) {
                //             category.quantitySold += 1;
                //         }
                //     })
                // });

                categoriesPerQuantity.map(category => {
                    // eslint-disable-next-line
                    return productsSold.map(product => {
                        if (product.category === category.category) {
                            category.quantitySold += 1;
                        }
                    })
                });

                // console.log(categoriesPerPrice);


                setProductsSold({
                    labels: categoriesPerQuantity.map(category => `${category.category} ${(category.quantitySold * 100 / totalItemsSold).toFixed(2)}%`),
                    datasets: [
                        {
                            label: "Categories",
                            data: categoriesPerQuantity.map(category => (category.quantitySold * 100 / totalItemsSold).toFixed(2)),
                            backgroundColor: backgroundColors
                        }
                    ]
                });

                // setProductsSoldPerPrice({
                //     labels: categoriesPerPrice.map(category => `${category.category} ${category.priceSold}$`),
                //     datasets: [
                //         {
                //             label: "Categories",
                //             data: categoriesPerPrice.map(category => (`${category.priceSold}$`)),
                //             backgroundColor: backgroundColors
                //         }
                //     ]
                // });
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            })
        // eslint-disable-next-line
    }, [totalItemsSold]);

    const options = {
        labels: {
            render: 'percentage',
            precision: 2
        }
    }

    if (loading) {
        return (
            <div>Loading...</div>
        )
    } else {
        return (
            <div className='statistic-row flex-center'>
                <div className='pie-chart'>
                    <Doughnut data={productsSold} options={{ options }} />
                    {/* <Pie data={productsSoldPerPrice} /> */}
                </div>
            </div>
        )
    }
}

export default CategoryStatistics;
