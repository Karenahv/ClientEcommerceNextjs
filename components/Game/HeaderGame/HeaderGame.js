import React, {useEffect, useState} from "react";
import {Button, Grid, Icon, Image} from "semantic-ui-react";
import {addFavoriteApi, isFavoriteApi} from "../../../api/favorite";
import useAuth from "../../../hooks/useAuth";
import classNames from 'classnames'


export default function HeaderGame(props) {
    const {game} = props
    const {poster, title} = game[0]
    return (
        <Grid className={'header-game'}>
            <Grid.Column mobile={16} tablet={6} computer={5}>
                <Image src={poster.url} alt={title} fluid></Image>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={10} computer={11}>
                <Info game={game}></Info>
            </Grid.Column>
        </Grid>
    )

}

function Info(props) {
    const {game} = props
    const {title, summary, precio, discount} = game[0]
    const [isFavorite, setIsFavorite] = useState(false)
    const [reloadFavorite, setReloadFavorite] = useState(false)
    const {auth, logout} =useAuth()

    useEffect(() => {
        (async () =>{
            const response = await isFavoriteApi(auth.idUser, game[0].id, logout)
            if(response.length>0){
                setIsFavorite(true)
            } else {
                setIsFavorite(false)
            }
            setReloadFavorite(false)
        })()
    },[game, reloadFavorite])

    const addFavorite = async () => {
        if(auth){
            const result = await addFavoriteApi(auth.idUser, game[0].id, logout)
            if (result){
                setReloadFavorite(true)
            }

        }

    }

    const deleteFavorite = () => {

    }

    return (
        <>
            <div className='header-game__title'>
                {title}
                <Icon name={isFavorite ? 'heart': 'heart outline'} className={classNames({
                    like: isFavorite
                })} link
                onClick={isFavorite ? deleteFavorite: addFavorite}></Icon>
            </div>
            <div className={'header-game__delivery'}>Entreta en 24 horas</div>
            <div className={'header-game__summary'} dangerouslySetInnerHTML={{__html: summary}}>
            </div>
            <div className='header-game__buy'>
                <div className='header-game__buy-price'>
                    <p>Precio de venta: {precio}€</p>
                    <div className='header-game__buy-price-actions'>
                        <p>-{discount}%</p>
                        <p>{(precio - Math.floor(precio * discount) / 100).toFixed(2)}€</p>
                    </div>
                </div>
                <Button header-game__buy-btn>
                    Comprar
                </Button>
            </div>

        </>
    )

}