import { handleQuantity } from "./handleQuantity";

export function cartToSet(product, cart, type) {
    if (type) {
        return handleQuantity(product, cart, type);
    }

    if (cart.length < 1) {
        return (
            current => [
                {
                    id: product.id,
                    barcode: product.barcode,
                    photo: product.photo,
                    name: product.name,
                    quantity: 1,
                    size: product.size,
                    price: product.price,
                    cost: product.cost,
                    priceAfterDiscount: product.priceAfterDiscount,
                    inStock: product.inStock
                }, ...current]
        )
    } else {
        const productAlreadyInCart = cart.find((item) => item.id === product.id);
        if (productAlreadyInCart) {
            const updatedCart =
                cart.map(item => item.id === productAlreadyInCart.id ?
                    { ...item, quantity: productAlreadyInCart.quantity + 1 } : item);
            return (updatedCart);
        } else {
            return (
                current => [
                    {
                        id: product.id,
                        barcode: product.barcode,
                        photo: product.photo,
                        name: product.name,
                        quantity: 1,
                        size: product.size,
                        price: product.price,
                        cost: product.cost,
                        priceAfterDiscount: product.priceAfterDiscount,
                        inStock: product.inStock
                    }, ...current]
            )
        }
    }
}