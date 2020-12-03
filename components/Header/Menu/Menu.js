import React, {useState, useEffect} from 'react'
import {Button, Container, Grid, Icon, Menu} from 'semantic-ui-react'
import Link from "next/link";
import BasicModal from "../../Modal/BasicModal/BasicModal";
import {useRouter} from "next/router";
import Auth from "../../Auth";
import useAuth from "../../../hooks/useAuth";
import {getmeApi} from "../../../api/user";

export default function MenuWeb() {
    const [showModal, setShowModal] = useState(false)
    const [titleModal, setTitleModal] = useState('Iniciar sesión')
    const [user, setUser] = useState(undefined)
    const {logout, auth} = useAuth()

    const onShowModal = () => setShowModal(true)
    const onCloseModal = () => setShowModal(false)

    useEffect(() => {
        (async () => {
            const response = await getmeApi(logout)
            setUser(response)
        })()
    }, [auth])
    return (
        <div className={"menu"}>
            <Container>
                <Grid>
                    <Grid.Column className={"menu__left"} width={6}>
                        <MenuPlatform></MenuPlatform>
                    </Grid.Column>
                    <Grid.Column className={"menu__right"} width={10}>

                        {user !== undefined &&
                        <MenuOptions
                            onShowModal={onShowModal}
                            user={user} logout={logout}></MenuOptions>}

                    </Grid.Column>
                </Grid>
            </Container>
            <BasicModal show={showModal} setShow={setShowModal} title={titleModal} size={"small"}>
                <Auth onCloseModal={onCloseModal} setTitleModal={setTitleModal}></Auth>

            </BasicModal>
        </div>
    )
}


function MenuPlatform() {
    return (
        <Menu>
            <Link href={"/play-station"}>
                <Menu.Item as={"a"}>
                    PlayStation
                </Menu.Item>
            </Link>
            <Link href={"/xbox"}>
                <Menu.Item as={"a"}>
                    Xbox
                </Menu.Item>
            </Link>
            <Link href={"/switch"}>
                <Menu.Item as={"a"}>
                    Switch
                </Menu.Item>
            </Link>

        </Menu>
    )
}


function MenuOptions(props) {
    const {onShowModal, user, logout} = props
    return (
        <Menu>
            {user ? (
                <>
                    <Link href={'/orders'}>
                        <Menu.Item as='a'>
                            <Icon name={'game'}></Icon>
                            Mis pedidos
                        </Menu.Item>
                    </Link>
                    <Link href={'/wishlist'}>
                        <Menu.Item as='a'>
                            <Icon name={'heart outline'}></Icon>
                            Wish list
                        </Menu.Item>
                    </Link>
                    <Link href={'/account'}>
                        <Menu.Item as='a'>
                            <Icon name={'user outline'}></Icon>
                            {user.name} {user.lastname}
                        </Menu.Item>
                    </Link>
                    <Link href={'/cart'}>
                        <Menu.Item as='a' className={'m-0'}>
                            <Icon name={'cart'}></Icon>

                        </Menu.Item>
                    </Link>
                    <Menu.Item onClick={logout} className={'m-0'}>
                        <Icon name={'power off'}></Icon>
                    </Menu.Item>
                </>
            ) : (

                <Menu.Item onClick={onShowModal}>
                    <Icon name={"user outline"}>
                    </Icon>
                    Mi cuenta
                </Menu.Item>
            )}

        </Menu>

    )
}

