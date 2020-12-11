import React, {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import BasicLayout from "../../layouts/BasicLayout";
import {getGamesPlatformApi, getTotalGamesPlatformApi} from "../../api/game";
import {size} from 'lodash'
import {Loader} from "semantic-ui-react";
import ListGames from "../../components/ListGames";
import Pagination from "../../components/Pagination";

const limitPerPage = 10

export default function Platform() {
    const {query} = useRouter()
    const [games, setGames] = useState(null)
    const [totalGames, setTotalGames] = useState(null)

    const getStartItem = () => {
        const currentPage = parseInt(query.page)
        if (!query.page || currentPage === 1) {
            return 0
        } else {
            return currentPage * limitPerPage - limitPerPage
        }


    }
    useEffect(() => {
        (async () => {
            if (query.platform) {
                const response = await getGamesPlatformApi(query.platform, limitPerPage, getStartItem())
                setGames(response)
            }
        })()
    }, [query])

    useEffect(() => {
        (async () => {
            const response = await getTotalGamesPlatformApi(query.platform)
            setTotalGames(response)
        })()
    })

    return (
        <BasicLayout className={'platform'}>
            {!games && <Loader>Cargando juegos</Loader>}
            {games && size(games) === 0 && (
                <div>
                    <h3>No hay juegos</h3>
                </div>
            )
            }
            {size(games) > 0 && <ListGames games={games}></ListGames>}
            {totalGames ? <Pagination
                totalGames={totalGames}
                page={query.page ? parseInt(query.page) : 1}
                limitPerPage={limitPerPage}
            ></Pagination> : null}

        </BasicLayout>
    )

}

