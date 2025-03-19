import React, { useRef, useState } from 'react'

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
        <div className='flex flex-col items-center justify-center min-h-screen'>
            <div className="text-4xl font-semibold mb-4">
                <span>{time.h < 10 ? `0${time.h}` : time.h}</span>
                :
                <span>{time.m < 10 ? `0${time.m}` : time.m}</span>
                :
                <span>{time.s < 10 ? `0${time.s}` : time.s}</span>
            </div>
            <div className='flex space-x-4'>
                <button
                    className={`px-6 py-3 text-white rounded-full focus:outline-none ${isRunning ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}`}
                    onClick={controlTimer}
                >
                    {isRunning ? "Stop" : "Start"}
                </button>
                <button
                    className="px-6 py-3 bg-gray-500 text-white rounded-full hover:bg-gray-600 focus:outline-none"
                    onClick={() => {
                        setIsRunning(false)
                        setTime({ h: 0, m: 0, s: 0 })
                        clearInterval(interval.current)
                    }}
                >
                    Reset
                </button>
            </div>
        </div>
    )
}
