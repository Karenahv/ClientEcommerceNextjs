import React, {useState} from 'react'
import {Image, Modal} from 'semantic-ui-react'
import Slider from 'react-slick'
import {map} from 'lodash'

const settings = {
    className: 'carrousel-screenshots',
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    swipeToSlide: true,

}


export default function CarrouselScreenShots(props) {
    const {screenshots, title} = props
    const [showModal, setShowModal] = useState(false)
    const [urlImage, setUrlImage] = useState(null)

    function openImage(url) {
        setUrlImage(url)
        setShowModal(true)
    }

    return (
        <>
            <Slider{...settings}>
                {
                    map(screenshots, (screen) => (
                        <Image key={screen.id}
                               src={screen.url}
                               alt={screen.name}
                               onClick={() => openImage(screen.url)}
                        />
                    ))}
            </Slider>
            <Modal open={showModal} onClose={() => setShowModal(false)}
                   size='large'>
                <Image src={urlImage} alt={title}/>
            </Modal>
        </>
    )
}
