import React from 'react'
import ReactPlayer from "react-player/lazy";

export default function InfoGame(props) {
    const {game} = props
    console.log(game)
    return (
        <div className={'info-game'}>
            <ReactPlayer className={'info-game__video'}
                         url={game && game[0].video}
                         controls={true}>

            </ReactPlayer>
        </div>
    )

}