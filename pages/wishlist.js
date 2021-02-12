import React, {useEffect, useState} from 'react'
import {forEach, size} from 'lodash'
import BasicLayout from "../layouts/BasicLayout";
import useAuth from "../hooks/useAuth";
import {getFavoriteApi} from "../api/favorite";
import {Loader} from "semantic-ui-react";
import ListGames from "../components/ListGames/ListGames";


export default function Wishlist() {
    const [games, setGames] = useState(null)
    const {auth, logout} = useAuth()

    useEffect(() => {
        (async () => {
            const result = await getFavoriteApi(auth.idUser, logout)
            if (result.length > 0) {
                const gameList = []
                forEach(result, (data) => {
                    gameList.push(data.game)
                })
                setGames(gameList)
            } else {
                setGames([])
            }
        })()
    }, [auth.idUser])
    return (
        <BasicLayout className='wishlist'>
            <div className='wishlist__block'>
                <div className='title'>Lista de deseos</div>
                <div className='data'>
                    <p>
                        {!games && <Loader active>Cargando juegos</Loader>}
                        {games && size(games) === 0 && (
                            <div className='data__not-found'>
                                <h3>No tienes ningún juego en tu lista</h3>
                            </div>
                        )}
                        {size(games) > 0 && <ListGames games={games}/>}
                    </p>
                </div>

            </div>
        </BasicLayout>
    )

}