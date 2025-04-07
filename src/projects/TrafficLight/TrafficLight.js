import React, { useEffect, useRef, useState } from "react";

export const TrafficLight = () => {
    const [color, setColor] = useState("red");
    const timer = useRef(null);
    const count = useRef(0);

    useEffect(() => {
        const lightSequence = ["red", "green", "yellow"];
        const timeDurations = { red: 4000, green: 3000, yellow: 500 };

        const startCycle = () => {
            timer.current = setTimeout(() => {
                count.current = (count.current + 1) % 3;
                setColor(lightSequence[count.current]);
                startCycle();
            }, timeDurations[color]);
        };

        startCycle();

        return () => clearTimeout(timer.current);
    }, [color]);

    return (
        <div className="flex flex-col border border-white w-fit rounded p-4 gap-6 bg-gray-700">
            <div className={`border-4 border-red-200 rounded-full w-16 h-16 ${color === "red" ? "bg-red-800" : "bg-red-100"}`}></div>
            <div className={`border-4 border-yellow-200 rounded-full w-16 h-16 ${color === "yellow" ? "bg-yellow-800" : "bg-yellow-100"}`}></div>
            <div className={`border-4 border-green-200 rounded-full w-16 h-16 ${color === "green" ? "bg-green-800" : "bg-green-100"}`}></div>
        </div>
    );
};