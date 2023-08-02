export function toCurrency(value, currency = 'USD') {
    return value.toLocaleString('en-US', {
        style: 'currency',
        currency,
    });
}
