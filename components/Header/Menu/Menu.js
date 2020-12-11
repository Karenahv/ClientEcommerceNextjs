import React, {useState, useEffect} from 'react'
import {Button, Container, Grid, Icon, Menu} from 'semantic-ui-react'
import Link from "next/link";
import BasicModal from "../../Modal/BasicModal/BasicModal";
import {useRouter} from "next/router";
import Auth from "../../Auth";
import useAuth from "../../../hooks/useAuth";
import {getmeApi} from "../../../api/user";
import {getPlatformsApi} from "../../../api/platform";
import {map} from "lodash";


export default function MenuWeb() {
    const [showModal, setShowModal] = useState(false)
    const [titleModal, setTitleModal] = useState('Iniciar sesión')
    const [platforms, setPlatforms] = useState([])
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

    useEffect(() => {
        (async () => {
            const response = await getPlatformsApi()
            setPlatforms(response || [])
        })()
    }, [])
    return (
        <div className={"menu"}>
            <Container>
                <Grid>
                    <Grid.Column className={"menu__left"} width={6}>
                        <MenuPlatforms platforms={platforms}></MenuPlatforms>
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


function MenuPlatforms(props) {
  const { platforms } = props;

  return (
    <Menu>
      {map(platforms, (platform) => (
        <Link href={`/games/${platform.url}`} key={platform._id}>
          <Menu.Item as="a" name={platform.url}>
            {platform.title}
          </Menu.Item>
        </Link>
      ))}
    </Menu>
  );
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

