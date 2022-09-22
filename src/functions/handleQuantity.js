export function handleQuantity(product, cart, type) {
    if (type) {
        if (type === 'increment') {
            const updatedCart =
                cart.map(item => item.id === product.id ? { ...item, quantity: product.quantity + 1 } : item);
            return (updatedCart);
        } else if (type === 'decrement') {
            const updatedCart =
                cart.map(item => item.id === product.id ? { ...item, quantity: product.quantity - 1 } : item);
            return (updatedCart);
        }
    }
}