import React, {useState, useEffect} from 'react'

export default function Timer() {
    const [timer, setTimer] = useState(60)

    const start = () => {
        setInterval(() => {
            setTimer(timer => timer - 1)
            console.log('timer value:', timer)
        }, 1000)
    }

    useEffect(() => {
        start()
    }, [])
    return (
        <p>
            {timer}
        </p>
    )

}