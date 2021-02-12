import React, {useEffect, useState} from 'react'
import BasicLayout from "../layouts/BasicLayout";
import useCart from "../hooks/useCart";
import {getGameByUrlApi} from "../api/game";
import SummaryCart from "../components/Cart";
import AddressShiping from "../components/Cart/AddressShiping";

export default function cart() {

    const {getProductsCart} = useCart()
    const products = getProductsCart()

    return !products ? <EmptyCart></EmptyCart>: <FullCart products={products}></FullCart>

}


function EmptyCart() {
    return (
        <BasicLayout className='empty-cart'>
            No hay productos en el carrito
        </BasicLayout>
    )

}

function FullCart(props) {
     const [productsData, setProductsData] = useState(null)
     const [reloadCart, setReloadCart] = useState(false)
     const [address, setAddress] = useState(null)
    const {products} = props

    useEffect(()=>{
        (async()=>{
            const productsTemp = []
            for await (const product of products) {
                const data = await  getGameByUrlApi(product)
                productsTemp.push(data)
            }
            setProductsData(productsTemp)

        })()
        setReloadCart(false)
    }, [reloadCart])
    return (
        <BasicLayout className='empty-cart'>
           <SummaryCart products={productsData}
           setReloadCart={setReloadCart}
           reloadCart={reloadCart}></SummaryCart>
            <AddressShiping setAddress={setAddress}></AddressShiping>
        </BasicLayout>
    )

}