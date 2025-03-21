import { useState } from "react";

export function Chess() {
    const [boxN, setBoxN] = useState(9);
    const [selected, setSelected] = useState({ row: -1, col: -1 });

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <input
                type="number"
                className="border p-2 w-20 text-center rounded-md"
                value={boxN}
                min="1"
                max="20"
                onChange={(e) => setBoxN(Number(e.target.value))}
            />

            <div className="border-2 border-black-500 p-2">
                {Array.from({ length: boxN }).map((_, rowIndex) => (
                    <div key={rowIndex} className="flex">
                        {Array.from({ length: boxN }).map((_, colIndex) => (
                            <div
                                key={colIndex}
                                className={`h-12 w-12 flex items-center justify-center border ${(rowIndex + colIndex) % 2 === 0 ? "bg-black" : "bg-white"
                                    }`}
                                onClick={() => setSelected({ row: rowIndex, col: colIndex })}
                            >
                                {selected.row === rowIndex && selected.col === colIndex && (
                                    <Piece />
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

const Piece = () => (
    <div className="h-8 w-8 flex item-center justify-center text-2xl">
        👑
    </div>
);
