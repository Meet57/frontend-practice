import React, { useState } from "react";

export const MouseFollower = () => {
    const [ballPosition, setBallPosition] = useState({ x: 0, y: 0 });
    const divRef = React.useRef(null);

    const handleMouseMove = (e) => {
        if (divRef.current) {
            // Get the position of the div relative to the viewport
            const rect = divRef.current.getBoundingClientRect();

            // Calculate the mouse position relative to the div
            const mouseX = e.clientX - rect.left - 20;
            const mouseY = e.clientY - rect.top - 20;

            setBallPosition({ x: mouseX, y: mouseY });
        }
    };

    return (
        <div
            ref={divRef}
            className="min-h-[400px] min-w-[400px] border border-gray-400 rounded-lg relative overflow-hidden"
            onMouseMove={handleMouseMove}
        >
            <div
                className="bg-gray-800 absolute rounded-full transition-transform duration-1000 ease-out"
                style={{
                    minHeight: "40px", // Increased size of the ball for visibility
                    minWidth: "40px", // Fixed typo here
                    left: `${ballPosition.x}px`,
                    top: `${ballPosition.y}px`,
                }}
            ></div>
        </div>
    );
};
