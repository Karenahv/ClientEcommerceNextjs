import React, {useEffect, useState} from 'react'
import {forEach, map} from 'lodash'
import useCart from "../../hooks/useCart";
import {Icon, Image, Table} from "semantic-ui-react";

export default function SummaryCart(props) {
    const [totalPrice, setTotalPrice] = useState(0)
    const {removeProductCart} = useCart()
    const {products, reloadCart, setReloadCart} = props

    useEffect(()=>{
        let price = 0
        forEach(products, (product) => {
            price += product[0].precio
        })
        setTotalPrice(price)
    }, [reloadCart, products])

    const removeProduct = (product) =>{
        removeProductCart(product)
        setReloadCart(true)
    }
    return (
        <div className='summary-cart'>
            <div className='title'>
                Resumen del carrito:
            </div>
            <div className='data'>
                <Table celled structured>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>
                                Producto
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                Plataforma
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                Entrega
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                Precio
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            map(products, (product)=>(
                                <Table.Row key={product.id} className={'summary-cart__product'}>
                                    <Table.Cell>
                                        <Icon name={'close'} link onClick={()=>removeProduct(product[0].url)}/>
                                        <Image src={product[0]?.poster?.url} alt={product[0].title}/>
                                        {product[0].title}
                                    </Table.Cell>
                                    <Table.Cell>{product[0].platform.title}</Table.Cell>
                                    <Table.Cell>Inmediata</Table.Cell>
                                    <Table.Cell>USD {product[0].precio}</Table.Cell>

                                </Table.Row>
                            ))
                        }
                    </Table.Body>
                    <Table.Row className={'summary-cart__resumen'}>
                        <Table.Cell className='clear'></Table.Cell>
                        <Table.Cell colSpan='2'>Total:</Table.Cell>
                        <Table.Cell className={'total-price'}>USD {totalPrice.toFixed(2)}</Table.Cell>
                    </Table.Row>
                </Table>
            </div>
        </div>
    )

}