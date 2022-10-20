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
    ]
    if (orders.current.length > 0) {
        const thisMonthOrders = orders.current.filter(
            (order) =>
                moment(order.createdAt).month() === moment().month() &&
                moment(order.createdAt).year() === moment().year()
        );
        let ordersDates = [];
        if (sortBy === 'This Month') {
            ordersDates = thisMonthOrders.map(order => moment(order.createdAt).format('L'));
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
        } else if (sortBy === 'This Year') {
            const thisYearOrders = orders.current.filter(
                (order) =>
                    moment(order.createdAt).year() === moment().year()
            );
            // eslint-disable-next-line
            thisYearOrders.map(order => {
                // eslint-disable-next-line
                months.map(month => {
                    // eslint-disable-next-line
                    if (moment(order.createdAt).month() == Object.keys(month)[0]) {
                        // month.monthDate = moment(order.createdAt).month();
                        month.thisMonthOrders++;
                        month.totalThisMonth = (Number(month.totalThisMonth) + Number(order.total)).toFixed(2);
                    }
                })
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
    } else {
        return
    }
}