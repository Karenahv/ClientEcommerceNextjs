import React, {useState, useEffect} from 'react'
import {getAddressApi} from "../../../api/address";
import useAuth from "../../../hooks/useAuth";
import {map, size} from 'lodash'
import {Button, Grid} from "semantic-ui-react";


export default function ListAddress() {
    const [addresses, setAddresses] = useState(null)
    const {auth, logout} = useAuth()

    useEffect(() => {
        (async () => {
            const response = await getAddressApi(auth.idUser, logout)
            setAddresses(response || [])
        })()
    }, [auth.idUser])

    return (
        <div className="list-address">
            {size(addresses) === 0 ? (
                <h3>No hay ninguna dirección creada</h3>
            ) : (
                <Grid>
                    {map(addresses, (address) => (
                        <Grid.Column key={address.id} mobile={16} tablet={8} computer={4}>
                            <Address
                                address={address}
                                logout={logout}
                                // setReloadAddreses={setReloadAddreses}
                                // openModal={openModal}
                            />
                        </Grid.Column>
                    ))}
                </Grid>
            )}
        </div>
    );
}

function Address(props) {
    const {address} = props

    return (
        <div className={'address'}>
            <p>{address.title}</p>
            <p>{address.name}</p>
            <p>{address.address}</p>
            <p>{address.title}</p>
            <p>{address.state}, {address.city} {address.postalCode}</p>
            <p>{address.phone}</p>
            <div className={'actions'}>
                <Button primary>Editar</Button>
                <Button>Eliminar</Button>
            </div>

        </div>
    )
}