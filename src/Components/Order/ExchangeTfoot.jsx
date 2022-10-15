import React from 'react';

function ExchangeTfoot({ totalProductsToExchange }) {
    return (
        <tfoot className={totalProductsToExchange > 0 ? 'exchange-total-filled' : 'exchange-total-0'}>
            <tr>
                <th className='checkbox-container'>
                </th>
                <th className='text-left p-i-c-photo'>
                </th>
                <th className='p-i-c-name'>Total</th>
                <th>{totalProductsToExchange} $</th>
                <th></th>
            </tr>
        </tfoot>
    )
}

export default ExchangeTfoot;
