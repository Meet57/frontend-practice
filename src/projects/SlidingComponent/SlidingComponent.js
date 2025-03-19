import React, { useState, useRef } from "react";

export const SlidingComponent = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const dragRef = useRef(null);

    const onMouseDown = (e) => {
        const offsetX = e.clientX - position.x;
        const offsetY = e.clientY - position.y;

        const onMouseMove = (moveEvent) => {
            const newX = moveEvent.clientX - offsetX;
            const newY = moveEvent.clientY - offsetY;
            setPosition({ x: newX, y: newY });
        };

        const onMouseUp = () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    };

    return (
        <div className="relative w-full h-[500px] bg-gray-100 border-2 border-gray-300 overflow-hidden">
            <div
                ref={dragRef}
                onMouseDown={onMouseDown}
                className="absolute w-[100px] h-[100px] bg-green-500 text-white flex items-center justify-center cursor-move"
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    inset: 0,
                    contain: 'strict'
                }}
            >
                <span className="text-center pointer-events-none">Drag Me!</span>
            </div>
        </div>
    );
};
