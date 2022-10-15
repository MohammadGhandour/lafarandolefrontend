import moment from "moment";

export function getOrdersChart(orders, setOrdersData, setOrdersNumbersData) {
    if (orders.current.length > 0) {
        const ordersDates = orders.current.map(order => moment(order.createdAt).format('L'));
        const ordersDates1 = ordersDates.reduce(
            (acc, order) =>
                acc.includes(order) ? acc : acc.concat(order),
            []
        );
        let ordersDates2 = [];
        // eslint-disable-next-line
        ordersDates1.map(date => {
            var singleDay = {};
            singleDay['date'] = date;
            singleDay['total'] = 0;
            ordersDates2.push(singleDay);
        })
        // eslint-disable-next-line
        ordersDates2.map(date => {
            // eslint-disable-next-line
            orders.current.map(order => {
                if (moment(order.createdAt).format('L') === date.date) {
                    date.total = date.total + Number(order.total);
                }
            })
        });
        // console.log(ordersDates2);
        setOrdersData({
            labels: ordersDates2.map(data => data.date),
            datasets: [
                {
                    label: "Sales",
                    data: ordersDates2.map(data => data.total),
                    backgroundColor: "#008080",
                    pointHitRadius: 16
                }
            ]
        })
        let ordersNumbers = [];
        // eslint-disable-next-line
        ordersDates1.map(date => {
            var singleDay = {};
            singleDay['date'] = date;
            singleDay['totalNumberOfOrders'] = 0;
            ordersNumbers.push(singleDay);
        });
        // eslint-disable-next-line
        ordersNumbers.map(date => {
            // eslint-disable-next-line
            orders.current.map(order => {
                if (moment(order.createdAt).format('L') === date.date) {
                    date.totalNumberOfOrders = date.totalNumberOfOrders + 1;
                }
            })
        });
        setOrdersNumbersData({
            labels: ordersNumbers.map(data => data.date),
            datasets: [
                {
                    label: "No. Of Orders",
                    data: ordersNumbers.map(data => data.totalNumberOfOrders),
                    backgroundColor: "black",
                    pointHitRadius: 16
                }
            ]
        });
    } else {
        return
    }
}