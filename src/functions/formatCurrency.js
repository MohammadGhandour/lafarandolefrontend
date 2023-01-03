const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: "USD", style: "currency"
});

export function formatCurrency(number) {
    // let stringToReturn = CURRENCY_FORMATTER.format(number).split('$').join('$ ');
    let stringToReturn = CURRENCY_FORMATTER.format(number);
    return stringToReturn;
}