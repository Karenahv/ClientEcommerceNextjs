import BasicLayout from "../layouts/BasicLayout";
import React, {useState, useEffect} from "react";
import {useRouter} from "next/router";
import {getGameByUrlApi} from "../api/game";
import HeaderGame from "../components/Game/HeaderGame";
import TabsGame from "../components/TabsGame";


export default function Game() {
    const [game, setGame] = useState(null)
    const {query} = useRouter()

    useEffect(() => {
        (async () => {
            const response = await getGameByUrlApi(query.game)
            setGame(response)
        })()
    },[])

    if(!game) {
        return null
    }
    return (
        <BasicLayout className={'game'}>
            <HeaderGame game={game}></HeaderGame>
            <TabsGame game={game}></TabsGame>
        </BasicLayout>
    )
}