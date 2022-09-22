export function cartWithoutCurrentProduct(product, cart) {
    return cart.filter((item) => item.id !== product.id);
}