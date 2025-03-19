import React, { useState, useRef } from "react";

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
        <div className="flex flex-col items-center justify-center p-4">
            <div className="mb-4">
                <input
                    ref={rowRef}
                    type="number"
                    value={grid.row}
                    placeholder="Rows"
                    onChange={makeTable}
                    className="border border-gray-300 p-2 mx-2 rounded-md"
                />
                <input
                    ref={colRef}
                    type="number"
                    value={grid.col}
                    placeholder="Columns"
                    onChange={makeTable}
                    className="border border-gray-300 p-2 mx-2 rounded-md"
                />
            </div>

            <div className="grid grid-cols-1">
                {numbers &&
                    Array.from({ length: grid.row }).map((_, rowIdx) => (
                        <div key={rowIdx} className="flex">
                            {Array.from({ length: grid.col }).map((_, colIdx) => (
                                <div
                                    key={colIdx}
                                    className="w-12 h-12 flex items-center justify-center border border-gray-300"
                                >
                                    {numbers[colIdx][rowIdx]}
                                </div>
                            ))}
                        </div>
                    ))}
            </div>
        </div>
    );
};
