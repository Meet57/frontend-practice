import React, { useState } from "react";

const style = {
    background: {
        minHeight: "400px",
        minWidth: "400px",
        border: "1px solid gray",
        borderRadius: "15px",
        position: "relative",
        overflow: "hidden"
    },
    ball: {
        minHeight: "40px", // Increased size of the ball for visibility
        minWidth: "40px", // Fixed typo here
        backgroundColor: "#333",
        position: "absolute",
        borderRadius: "50%",
        transition: "transform 1s ease-out", // Smooth transition for ball movement
    },
};

export const MouseFollower = () => {
    const [ballPosition, setBallPosition] = useState({ x: 0, y: 0 });
    const divRef = React.useRef(null);

    const handleMouseMove = (e) => {
        if (divRef.current) {
            // Get the position of the div relative to the viewport
            const rect = divRef.current.getBoundingClientRect();

            // Calculate the mouse position relative to the div
            const mouseX = e.clientX - rect.left - 20;
            const mouseY = e.clientY - rect.top -20;

            setBallPosition({ x: mouseX, y: mouseY });
        }
    };

    return (
        <div
            ref={divRef}
            style={style.background}
            onMouseMove={handleMouseMove}
        >
            <div
                style={{
                    ...style.ball,
                    left: `${ballPosition.x}px`,
                    top: `${ballPosition.y}px`,
                }}
            ></div>
        </div>
    );
};
