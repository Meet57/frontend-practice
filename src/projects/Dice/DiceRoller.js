import React, { useRef, useState } from 'react'

export const DiceRoller = () => {
    const [dices, setDices] = useState([])
    const input = useRef(null)

    const handleClick = () => {
        setDices(Array.from({ length: input.current.value }, () => Math.floor(Math.random() * 6) + 1))
    }

    return (
        <div className="flex justify-center items-center flex-col gap-4 p-4">
            <input
                ref={input}
                defaultValue={0}
                type="number"
                className="border border-gray-300 rounded-lg px-4 py-2 w-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button onClick={handleClick} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                Roll
            </button>

            <div className="grid grid-cols-3 gap-4 p-4">
                {
                    dices.length > 0 && (
                        dices.map((n, idx) =>
                            <Dice key={idx} value={n} />
                        )
                    )
                }
            </div>
        </div>
    );
}


const Dice = ({ value }) => {
    const dots = {
        1: [[50, 50]],
        2: [
            [20, 20],
            [80, 80],
        ],
        3: [
            [20, 20],
            [50, 50],
            [80, 80],
        ],
        4: [
            [20, 20],
            [80, 20],
            [20, 80],
            [80, 80],
        ],
        5: [
            [20, 20],
            [80, 20],
            [50, 50],
            [20, 80],
            [80, 80],
        ],
        6: [
            [20, 20],
            [80, 20],
            [20, 50],
            [80, 50],
            [20, 80],
            [80, 80],
        ],
    };

    return (
        <div className="w-24 h-24 bg-white border border-black rounded-lg relative shadow-lg">
            {dots[value]?.map(([x, y], index) => (
                <span
                    key={index}
                    className="w-4 h-4 bg-black rounded-full absolute"
                    style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
                ></span>
            ))}
        </div>
    );
}