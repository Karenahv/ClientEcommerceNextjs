import React, {useMemo, useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import '../scss/global.scss'
import 'semantic-ui-css/semantic.min.css'
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from "../context/AuthContext";
import {getToken, removeToken, setToken} from "../api/token";
import jwtDecode from "jwt-decode";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CartContext from "../context/CartContext";
import {addProductCart, countProductsCart, getProductsCart, removeProductCart} from "../api/cart";
import {toast} from 'react-toastify'


function MyApp({Component, pageProps}) {
    const [auth, setAuth] = useState(undefined)
    const [reloadUser, setReloadUser] = useState(false)
    const [totalProductsCart, setTotalProductsCart] = useState(0)
    const [reloadCart, setReloadCart] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const token = getToken()
        if (token) {
            setAuth({
                token,
                idUser: jwtDecode(token).id
            })
        } else {
            setAuth(null)
        }
        setReloadUser(false)
    }, [reloadUser])

    useEffect(() => {
        setTotalProductsCart(countProductsCart())
        setReloadCart(false)
    },[reloadCart, auth])

    const login = (token) => {
        setToken(token)
        setAuth({
            token,
            idUser: jwtDecode(token).id
        })
    }

    const logout = () => {
        if (auth) {
            removeToken()
            setAuth(null)
            router.push('/')
        }
    }
    const authData = useMemo(
        () => ({
            auth,
            login,
            logout,
            setReloadUser
        }),
        [auth]
    )

    const removeProduct = (product) =>{
        removeProductCart(product)
        setReloadCart(true)

    }

    const addProduct = (product) => {
         const token = getToken()
        if(token){
            addProductCart(product)
            setReloadCart(true)
        } else {
            toast.warning('Por favor inicia sesión')
        }
    }

    const cartData = useMemo(
        () => ({
            productsCart: totalProductsCart,
            addProductCart: (product) => addProduct(product),
            getProductsCart: getProductsCart,
            removeProductCart: (product) => removeProduct(product),
            removeAllProductsCart: () => null,

        }),
        [totalProductsCart]
    )

    if (auth === undefined) return null
    return (
        <AuthContext.Provider value={authData}>
            <CartContext.Provider value={cartData}>
                <Component {...pageProps} />
                <ToastContainer
                    position={'top-right'}
                    autoClose={5000}
                    hideProgressBar
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable
                    pauseOnHover
                />
            </CartContext.Provider>

        </AuthContext.Provider>
    )
}

export default MyApp
