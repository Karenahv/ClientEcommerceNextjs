import React, {useState, useEffect} from 'react'
import BasicLayout from "../layouts/BasicLayout";
import {useRouter} from "next/router";
import useAuth from "../hooks/useAuth";
import {getmeApi} from "../api/user";
import ChangeNameForm from "../components/Account/ChangeNameForm";
import ChangeEmailForm from "../components/Account/ChangeEmailForm/ChangeEmailForm";
import ChangePasswordForm from "../components/Account/ChangePasswordForm";
import {Icon} from "semantic-ui-react";
import BasicModal from "../components/Modal/BasicModal/BasicModal";
import AddressForm from "../components/Account/AddressForm";
import ListAddress from "../components/Account/ListAddress";


export default function Account() {
    const [user, setUser] = useState(undefined)
    const {auth, logout, setReloadUser} = useAuth()
    const router = useRouter()

    useEffect(() => {
        (async () => {
            const response = await getmeApi(logout)
            setUser(response || null)
        })()
    }, [auth])

    if (user === undefined) return null
    if (!auth && !user) {
        router.replace('/')
        return null
    }
    return (
        <BasicLayout className='account'>
            <Configuration user={user} logout={logout} setReloadUser={setReloadUser}/>
            <Addresses/>
        </BasicLayout>
    )
}

function Configuration(props) {
    const {user, logout, setReloadUser} = props
    return (
        <div className={'account__configuration'}>
            <div className={'title'}>Configuración</div>
            <div className={'data'}><ChangeNameForm user={user} logout={logout} setReloadUser={setReloadUser}/></div>
            <div className={'data'}><ChangeEmailForm user={user} logout={logout} setReloadUser={setReloadUser}/></div>
            <div className={'data'}><ChangePasswordForm user={user} logout={logout}/></div>

        </div>

    )
}

function Addresses() {
    const [showModal, setShowModal] = useState(false)
    const [titleModal, setTitleModal] = useState('')
    const [formModal, setFormModal] = useState(null)
    const [reloadAddresses, setReloadAddresess] = useState(false)

    const openModal = (title, address) => {
        setTitleModal(title)
        setFormModal(<AddressForm
            setReloadAddresess={setReloadAddresess}
            setShowModal={setShowModal}
            newAddress={address ? false: true}
            address = {address ? address: null}
        ></AddressForm>)
        setShowModal(true)
    }
    return (
        <div className={'account__addresses'}>
            <div className={'title'}>Direcciones <Icon name={'plus'} link onClick={() => openModal('Nueva dirección')}/>
            </div>
            <div className={'data'}><ListAddress
                reloadAddresses={reloadAddresses}
                setReloadAddresess={setReloadAddresess}
                openModal={openModal}
            ></ListAddress></div>
            <BasicModal show={showModal} setShow={setShowModal} title={titleModal}>
                {formModal}
            </BasicModal>


        </div>

    )
}