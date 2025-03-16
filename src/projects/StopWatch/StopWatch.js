import React, { useRef, useState } from 'react'
import "./StopWatch.css"

export const StopWatch = () => {
    const [time, setTime] = useState({ h: 0, m: 0, s: 0 })
    const [isRunning, setIsRunning] = useState(false)
    const interval = useRef(null)

    const controlTimer = () => {
        if (!isRunning) {
            let { h, m, s } = time
            interval.current = setInterval(() => {
                s++
                if (s === 60) {
                    s = 0
                    m += 1
                }
                if (m === 60) {
                    m = 0
                    h += 1
                }
                console.log({ h, m, s })
                setTime({ h, m, s })
            }, 1000);
        } else {
            clearInterval(interval.current)
        }
        setIsRunning(!isRunning)
    }

    return (
        <div className='stopwatch'>
            <div className="time">
                <span>{time.h}</span>
                :
                <span>{time.m}</span>
                :
                <span>{time.s}</span>
            </div>
            <div className='buttons'>
                <button className={isRunning ? "active" : ""} onClick={controlTimer}>
                    {isRunning ? "Stop" : "Start"}
                </button>
                <button onClick={() => { setIsRunning(false) || setTime({ h: 0, m: 0, s: 0 }) || clearInterval(interval.current) }}>Reset</button>
            </div>
        </div>
    )
}
