import React from 'react'
import ReactPlayer from "react-player/lazy";
import CarrouselScreenShots from "../Game/CarrouselScreenShots";
import moment from 'moment'
import 'moment/locale/es'

export default function InfoGame(props) {
    const {game} = props
    console.log(game)
    return (
        <div className={'info-game'}>
            <ReactPlayer className={'info-game__video'}
                         url={game && game[0].video}
                         controls={true}>

            </ReactPlayer>
            <CarrouselScreenShots title={game.title}
                                  screenshots={game[0].screenshots}></CarrouselScreenShots>
            <div className='info-game__content'>
                <div dangerouslySetInnerHTML={{__html: game[0].summary}}></div>
                <div className='info-game__content-date'>
                    <h4>
                        Fecha de lanzamiento:
                    </h4>
                    <p>{moment(game[0].releaseDate).format('LL')}</p>
                </div>
            </div>

        </div>
    )

}