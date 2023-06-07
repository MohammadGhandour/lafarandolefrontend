import { formatCurrency } from '../../functions/formatCurrency';

function AllSalesStatistics({ orders, orderIdClass }) {

    const totalBeforeDiscount = orders?.reduce((total, item) => (Number(total) + Number(item.totalBeforeDiscount)).toFixed(2), 0);
    const total = orders?.reduce((total, item) => (Number(total) + Number(item.total)).toFixed(2), 0);
    const profit = orders?.reduce((total, item) => (Number(total) + Number(item.profit)).toFixed(2), 0);
    const itemsSold = orders?.reduce((items, item) => ((items + item.itemsNumber)), 0)

    return (
        <>
            <div className="w-full flex items-center bg-custom-dark-gray text-white rounded-md">
                <div className={orderIdClass}>-</div>
                <div className="flex-1 text-center py-2">All Time</div>
                <div className="flex-1 text-center py-2">{itemsSold}</div>
                <div className='flex-1 text-center py-2 line-through font-bold'>{formatCurrency(totalBeforeDiscount)}</div>
                <div className='flex-1 text-center py-2 order-total'>{formatCurrency(total)}</div>
                <div className='flex-1 text-center py-2 back-green-profit'>{formatCurrency(profit)}</div>
                <div className="flex-1 text-center py-2">-</div>
            </div>
            <div className='none-div'>
                <div><br /></div>
            </div>
        </>
    )
}

export default AllSalesStatistics;
