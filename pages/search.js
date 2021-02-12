import React, {useState, useEffect} from 'react'
import BasicLayout from "../layouts/BasicLayout";
import {useRouter} from "next/router";
import {searchGamesApi} from "../api/game";
import {Loader} from "semantic-ui-react";
import ListGames from "../components/ListGames";


export default function Search() {
    const [games, setGames] = useState(null)
    const {query} = useRouter()

    useEffect(() => {
        document.getElementById('search-game').focus()
    }, [])

    useEffect(() => {
        (async () => {
            if(query.query.length > 0){
                const response = await searchGamesApi(query.query)
                if(response.length > 0){
                    setGames(response)
                } else {
                setGames([])
            }
            }
        })()
    }, [query])
    return (
        <BasicLayout className='search'>
            {
                !games && <Loader active>Buscando juegos</Loader>
            }
            {games && games.length === 0 && (
                <div>
                    <h3>No se han encontrado juegos</h3>
                </div>
            )}
            {games && games.length > 0 && (
                <ListGames games={games}></ListGames>
            )}
        </BasicLayout>
    )

}