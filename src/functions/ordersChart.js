import moment from "moment";

export function getOrdersChart(orders, setOrdersData, setOrdersNumbersData, sortBy) {
    const months = [
        { 0: Date.parse('2022-1-1 00:00:00 GMT+3'), thisMonthOrders: 0, totalThisMonth: 0, monthDate: '' },
        { 1: Date.parse('2022-2-1 00:00:00 GMT+3'), thisMonthOrders: 0, totalThisMonth: 0, monthDate: '' },
        { 2: Date.parse('2022-3-1 00:00:00 GMT+3'), thisMonthOrders: 0, totalThisMonth: 0, monthDate: '' },
        { 3: Date.parse('2022-4-1 00:00:00 GMT+3'), thisMonthOrders: 0, totalThisMonth: 0, monthDate: '' },
        { 4: Date.parse('2022-5-1 00:00:00 GMT+3'), thisMonthOrders: 0, totalThisMonth: 0, monthDate: '' },
        { 5: Date.parse('2022-6-1 00:00:00 GMT+3'), thisMonthOrders: 0, totalThisMonth: 0, monthDate: '' },
        { 6: Date.parse('2022-7-1 00:00:00 GMT+3'), thisMonthOrders: 0, totalThisMonth: 0, monthDate: '' },
        { 7: Date.parse('2022-8-1 00:00:00 GMT+3'), thisMonthOrders: 0, totalThisMonth: 0, monthDate: '' },
        { 8: Date.parse('2022-9-1 00:00:00 GMT+3'), thisMonthOrders: 0, totalThisMonth: 0, monthDate: '' },
        { 9: Date.parse('2022-10-1 00:00:00 GMT+3'), thisMonthOrders: 0, totalThisMonth: 0, monthDate: '' },
        { 10: Date.parse('2022-11-1 00:00:00 GMT+3'), thisMonthOrders: 0, totalThisMonth: 0, monthDate: '' },
        { 11: Date.parse('2022-12-1 00:00:00 GMT+3'), thisMonthOrders: 0, totalThisMonth: 0, monthDate: '' },
    ];
    if (orders.current.length > 0) {
        const lastMonthOrders = orders.current.filter((order) =>
            moment(order.createdAt).month() === moment().month() - 1 &&
            moment(order.createdAt).year() === moment().year());

        const thisMonthOrders = orders.current.filter((order) =>
            moment(order.createdAt).month() === moment().month() &&
            moment(order.createdAt).year() === moment().year());

        let ordersDates = [];

        if (sortBy === 'This Month') {
            getMonthOrdersChartData(ordersDates, thisMonthOrders, orders, setOrdersData, setOrdersNumbersData)
        } else if (sortBy === 'This Year') {
            getThisYearsOrdersChartData(orders, months, setOrdersData, setOrdersNumbersData)
        } else if (sortBy === 'Last Month') {
            getMonthOrdersChartData(ordersDates, lastMonthOrders, orders, setOrdersData, setOrdersNumbersData)
        }
    } else {
        return
    }
}

function getThisYearsOrdersChartData(orders, months, setOrdersData, setOrdersNumbersData) {
    const thisYearOrders = orders.current.filter(
        (order) =>
            moment(order.createdAt).year() === moment().year()
    );
    thisYearOrders.map(order => {
        months.map(month => {
            // eslint-disable-next-line
            if (moment(order.createdAt).month() == Object.keys(month)[0]) {
                month.thisMonthOrders++;
                month.totalThisMonth = (Number(month.totalThisMonth) + Number(order.total)).toFixed(2);
            }
            return month
        })
        return order
    });
    setOrdersData({
        labels: months.map(data => Object.values(data)[0]),
        datasets: [
            {
                label: "Sales",
                data: months.map(data => Number(Object.values(data)[2])),
                backgroundColor: "#008080",
                pointHitRadius: 16
            }
        ]
    });

    setOrdersNumbersData({
        labels: months.map(data => Object.values(data)[0]),
        datasets: [
            {
                label: "No. Of Orders",
                data: months.map(data => Object.values(data)[1]),
                backgroundColor: "black",
                pointHitRadius: 16
            }
        ]
    });
}

function getMonthOrdersChartData(ordersDates, monthOrders, orders, setOrdersData, setOrdersNumbersData) {
    ordersDates = monthOrders.map(order => moment(order.createdAt).format('L'));
    const ordersDates1 = ordersDates.reduce(
        (acc, order) =>
            acc.includes(order) ? acc : acc.concat(order),
        []
    );
    let ordersDates2 = [];
    ordersDates1.map(date => {
        var singleDay = {};
        singleDay['date'] = date;
        singleDay['total'] = 0;
        return ordersDates2.push(singleDay);
    })
    ordersDates2.map(date => {
        orders.current.map(order => {
            if (moment(order.createdAt).format('L') === date.date) {
                date.total = date.total + Number(order.total);
            }
            return order
        })
        return date
    });
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
    });
    let ordersNumbers = [];
    ordersDates1.map(date => {
        var singleDay = {};
        singleDay['date'] = date;
        singleDay['totalNumberOfOrders'] = 0;
        return ordersNumbers.push(singleDay);
    });
    ordersNumbers.map(date => {
        orders.current.map(order => {
            if (moment(order.createdAt).format('L') === date.date) {
                date.totalNumberOfOrders = date.totalNumberOfOrders + 1;
            }
            return date
        })
        return date
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
}