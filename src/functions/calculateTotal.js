export function calculateTotal(
    cart,
    setFinalTotal,
    discountCurrency,
    discountValue,
    currencyExchange,
    setFinalTotalBeforeDiscount
) {
    let total = cart.reduce((total, item) => ((total + item.quantity * item.priceAfterDiscount)), 0);
    setFinalTotal(
        (
            discountCurrency === 'USD' ? total - discountValue
                : discountCurrency === '%' && discountValue ? (total - (discountValue / 100 * total))
                    : total - (discountValue / currencyExchange).toFixed(2)
        )
    );

    let totalBeforeDiscount = cart.reduce((totalBeforeDiscount, item) => ((totalBeforeDiscount + item.quantity * item.price)), 0);
    setFinalTotalBeforeDiscount(totalBeforeDiscount);
};