import {createContext} from 'react';
import {removeAllProductsCart} from "../api/cart";

const CartContext = createContext({
    productsCart:0,
    addProductCart: () => null,
    getProductsCart: () => null,
    removeProductCart: () => null,
    removeAllProductsCart: () => removeAllProductsCart,

})

export default CartContext