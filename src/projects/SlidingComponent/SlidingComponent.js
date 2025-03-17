import React, { useState, useRef } from "react";

export const SlidingComponent = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 }); // Position of the div
    const dragRef = useRef(null); // Reference to the draggable div

    const onMouseDown = (e) => {
        // Calculate the initial offset between mouse position and the div's current position
        const offsetX = e.clientX - position.x;
        const offsetY = e.clientY - position.y;

        const onMouseMove = (moveEvent) => {
            // Calculate new position based on mouse move
            const newX = Math.max(
                0,
                Math.min(moveEvent.clientX - offsetX, 400)
            );
            const newY = Math.max(
                0,
                Math.min(moveEvent.clientY - offsetY, 400)
            );

            setPosition({ x: newX, y: newY });
        };

        const onMouseUp = () => {
            window.removeEventListener("mousemove", onMouseMove); // Remove mousemove listener
            window.removeEventListener("mouseup", onMouseUp); // Remove mouseup listener
        };

        window.addEventListener("mousemove", onMouseMove); // Listen for mouse movement
        window.addEventListener("mouseup", onMouseUp); // Listen for mouse release
    };

    return (
        <div
            style={{
                width: "500px",
                height: "500px",
                backgroundColor: "#f0f0f0",
                border: "2px solid #ddd",
                position: "relative",
                overflow: "hidden", // Keep the div within container bounds
            }}
        >
            <div
                ref={dragRef}
                onMouseDown={onMouseDown} // Start dragging when mouse is pressed
                style={{
                    width: "100px",
                    height: "100px",
                    backgroundColor: "#4CAF50",
                    position: "absolute",
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    cursor: "move", // Indicate it's draggable
                }}
            >
                <span style={{ color: "white", padding: "30px" }}>
                    Drag Me!
                </span>
            </div>
        </div>
    );
};
