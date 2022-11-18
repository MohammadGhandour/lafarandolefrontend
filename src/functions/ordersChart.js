import moment from "moment";

export function getOrdersChart(orders, setOrdersData, setOrdersNumbersData, setProfitData, sortBy) {
    const months = [
        { 0: Date.parse('2022-1-1 00:00:00 GMT+2'), thisMonthOrders: 0, totalThisMonth: 0, monthDate: '', profitThisMonth: 0 },
        { 1: Date.parse('2022-2-1 00:00:00 GMT+2'), thisMonthOrders: 0, totalThisMonth: 0, monthDate: '', profitThisMonth: 0 },
        { 2: Date.parse('2022-3-1 00:00:00 GMT+2'), thisMonthOrders: 0, totalThisMonth: 0, monthDate: '', profitThisMonth: 0 },
        { 3: Date.parse('2022-4-1 00:00:00 GMT+2'), thisMonthOrders: 0, totalThisMonth: 0, monthDate: '', profitThisMonth: 0 },
        { 4: Date.parse('2022-5-1 00:00:00 GMT+2'), thisMonthOrders: 0, totalThisMonth: 0, monthDate: '', profitThisMonth: 0 },
        { 5: Date.parse('2022-6-1 00:00:00 GMT+3'), thisMonthOrders: 0, totalThisMonth: 0, monthDate: '', profitThisMonth: 0 },
        { 6: Date.parse('2022-7-1 00:00:00 GMT+3'), thisMonthOrders: 0, totalThisMonth: 0, monthDate: '', profitThisMonth: 0 },
        { 7: Date.parse('2022-8-1 00:00:00 GMT+3'), thisMonthOrders: 0, totalThisMonth: 0, monthDate: '', profitThisMonth: 0 },
        { 8: Date.parse('2022-9-1 00:00:00 GMT+3'), thisMonthOrders: 0, totalThisMonth: 0, monthDate: '', profitThisMonth: 0 },
        { 9: Date.parse('2022-10-1 00:00:00 GMT+2'), thisMonthOrders: 0, totalThisMonth: 0, monthDate: '', profitThisMonth: 0 },
        { 10: Date.parse('2022-11-1 00:00:00 GMT+2'), thisMonthOrders: 0, totalThisMonth: 0, monthDate: '', profitThisMonth: 0 },
        { 11: Date.parse('2022-12-1 00:00:00 GMT+2'), thisMonthOrders: 0, totalThisMonth: 0, monthDate: '', profitThisMonth: 0 },
    ];
    if (orders.current.length > 0) {
        const lastMonthOrders = orders.current.filter((order) =>
            moment(order.createdAt).month() === moment().month() - 1 &&
            moment(order.createdAt).year() === moment().year());

        const thisMonthOrders = orders.current.filter((order) =>
            moment(order.createdAt).month() === moment().month() &&
            moment(order.createdAt).year() === moment().year());

        // eslint-disable-next-line
        const last30DaysOrders = orders.current.filter((order) => {
            const now = moment(new Date()).startOf('day');
            const orderDate = moment(order.createdAt).startOf('day');
            const diff = moment.duration(now.diff(orderDate));
            const diffDays = diff.asDays();
            if (diffDays < 30) return order;
        });

        // eslint-disable-next-line
        const last90DaysOrders = orders.current.filter((order) => {
            const now = moment(new Date()).startOf('day');
            const orderDate = moment(order.createdAt).startOf('day');
            const diff = moment.duration(now.diff(orderDate));
            const diffDays = diff.asDays();
            if (diffDays < 90) return order;
        });


        let ordersDates = [];

        if (sortBy === 'Last 30 Days') {
            getMonthOrdersChartData(ordersDates, last30DaysOrders, orders, setOrdersData, setOrdersNumbersData, setProfitData)
        } else if (sortBy === 'Last 90 Days') {
            getMonthOrdersChartData(ordersDates, last90DaysOrders, orders, setOrdersData, setOrdersNumbersData, setProfitData)
        } else if (sortBy === 'This Month') {
            getMonthOrdersChartData(ordersDates, thisMonthOrders, orders, setOrdersData, setOrdersNumbersData, setProfitData)
        } else if (sortBy === 'This Year') {
            getThisYearsOrdersChartData(orders, months, setOrdersData, setOrdersNumbersData, setProfitData)
        } else if (sortBy === 'Last Month') {
            getMonthOrdersChartData(ordersDates, lastMonthOrders, orders, setOrdersData, setOrdersNumbersData, setProfitData)
        }
    } else {
        return
    }
}

function getThisYearsOrdersChartData(orders, months, setOrdersData, setOrdersNumbersData, setProfitData) {
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
                month.profitThisMonth = (Number(month.profitThisMonth) + (Number(order.total) - Number(order.cost))).toFixed(2);
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
                data: months.map(data => Number(data.totalThisMonth)),
                backgroundColor: "#008080",
                pointHitRadius: 16
            }
        ]
    });

    setProfitData({
        labels: months.map(data => Object.values(data)[0]),
        datasets: [
            {
                label: "Profit",
                data: months.map(data => Number(data.profitThisMonth)),
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
                data: months.map(data => data.thisMonthOrders),
                backgroundColor: "black",
                pointHitRadius: 16
            }
        ]
    });
}

function getMonthOrdersChartData(ordersDates, monthOrders, orders, setOrdersData, setOrdersNumbersData, setProfitData) {
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
        singleDay['profit'] = 0;
        return ordersDates2.push(singleDay);
    })
    ordersDates2.map(date => {
        orders.current.map(order => {
            if (moment(order.createdAt).format('L') === date.date) {
                date.total = date.total + Number(order.total);
                date.profit = date.profit + Number(order.total - order.cost);
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
    setProfitData({
        labels: ordersDates2.map(data => data.date),
        datasets: [
            {
                label: "Profits",
                data: ordersDates2.map(data => data.profit),
                backgroundColor: "rgb(39, 149, 108)",
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