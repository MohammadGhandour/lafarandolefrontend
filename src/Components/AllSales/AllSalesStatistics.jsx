import { formatCurrency } from '../../functions/formatCurrency';

function AllSalesStatistics({ orders }) {

    const totalBeforeDiscount = orders?.reduce((total, item) => (Number(total) + Number(item.totalBeforeDiscount)).toFixed(2), 0);
    const total = orders?.reduce((total, item) => (Number(total) + Number(item.total)).toFixed(2), 0);
    const profit = orders?.reduce((total, item) => (Number(total) + Number(item.profit)).toFixed(2), 0);
    const itemsSold = orders?.reduce((items, item) => ((items + item.itemsNumber)), 0)

    return (
        <>
            <tr className='single-order-in-list all-sales-statistics'>
                <th className='order-id'>-</th>
                <th>All Time</th>
                <th>{itemsSold}</th>
                <th className='order-total order-total-before-discount'>{formatCurrency(totalBeforeDiscount)}</th>
                <th className='order-total'>{formatCurrency(total)}</th>
                <th className='back-green-profit'>{formatCurrency(profit)}</th>
                <th>-</th>
            </tr>
            <tr className='none-tr'>
                <th><br /></th>
            </tr>
        </>
    )
}

export default AllSalesStatistics;
