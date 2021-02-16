import React, {useEffect, useState} from 'react'
import {map, size} from 'lodash'
import useAuth from "../../../hooks/useAuth";
import {getAddressApi} from "../../../api/address";
import Link from "next/link";
import {Grid} from "semantic-ui-react";
import classNames from 'classnames'


export default function AddressShiping(props) {
    const {setAddress} = props
    const [addresses, setAdresses] = useState(null)
    const [addressActive, setAdressActive] = useState(null)

    const {auth, logout} = useAuth()
    useEffect(() =>{
        (async() =>{
            const response = await getAddressApi(auth.idUser, logout)
            if (response){
                setAdresses(response)
            } else {
                setAdresses([])
            }

        })()
    },[])
    return (
        <div className={'address-shipping'}>
            <div className='title'>Dirección de envío

            </div>
            <div className='data'>
                {
                    size(addresses) === 0 ?
                        <h3>No hay ninguna dirección creara
                            <Link href='/account'>Añadir tu primera dirección</Link>
                        </h3>:
                       <Grid>
                           {map(addresses, (add) =>(
                                   <Grid.Column key={add.id}
                                                mobile={16}
                                                tablet={8}
                                                computer={4}>
                                    <Address setAddress={setAddress} setAddressActive={setAdressActive}
                                             addressActive={addressActive} address={add}></Address>
                                   </Grid.Column>
                               ))}
                       </Grid>
                }
            </div>
        </div>
    )

}

function Address(props) {
    const {address, setAddress, setAddressActive, addressActive} = props;
    const changeAdd = () => {
        setAddressActive(address.id)
        setAddress(address)
    }
    return (
        <div className={classNames('address',{
            active: addressActive === address.id,
        })}
        onClick={changeAdd}>
            <p>{address.title}</p>
            <p>{address.name}</p>
            <p>{address.address}</p>
            <p>
                {address.city}, {address.state}, {address.postalCode}
            </p>
            <p>{address.phone}</p>
        </div>
    )

}