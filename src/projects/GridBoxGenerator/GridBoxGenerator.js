import React, { useState, useRef } from "react";
import "./GridApp.css";

export const GridBoxGenerator = () => {
    const [grid, setGrid] = useState({ row: 0, col: 0 });
    const [numbers, setNumbers] = useState(null);
    const rowRef = useRef(null);
    const colRef = useRef(null);

    const makeTable = () => {
        const rowValue = parseInt(rowRef.current.value) || 0;
        const colValue = parseInt(colRef.current.value) || 0;
        setGrid({ row: rowValue, col: colValue });

        let total = rowValue * colValue;
        let arr = Array.from({ length: total }, (_, i) => i + 1);
        let subArray = Array.from({ length: total / rowValue }, (_, i) => {
            let a = arr.slice(i * rowValue, i * rowValue + rowValue);
            return i % 2 === 0 ? a : a.reverse();
        });
        console.log(subArray);

        setNumbers(subArray);
    };

    return (
        <div className="main">
            <div className="form">
                <input
                    ref={rowRef}
                    type="number"
                    value={grid.row}
                    placeholder="Rows"
                    onChange={makeTable}
                />
                <input
                    ref={colRef}
                    type="number"
                    value={grid.col}
                    placeholder="Columns"
                    onChange={makeTable}
                />
            </div>

            <div className="grid">
                {numbers &&
                    Array.from({ length: grid.row }).map((_, rowIdx) => (
                        <div key={rowIdx} className="row">
                            {Array.from({ length: grid.col }).map(
                                (_, colIdx) => (
                                    <div key={colIdx} className="cellx">
                                        {numbers[colIdx][rowIdx]}
                                    </div>
                                )
                            )}
                        </div>
                    ))}
            </div>
        </div>
    );
};