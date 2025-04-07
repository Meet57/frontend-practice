import React, { useState } from 'react';

function Chess2() {
    const [showLabel, setShowLabel] = useState(true);

    return (
        <div className="flex flex-col items-center p-4">
            <button
                onClick={() => setShowLabel(!showLabel)}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded shadow"
            >
                Toggle
            </button>

            <div className="grid grid-rows-9 gap-0">
                {Array.from({ length: 9 }, (_, rowIdx) => (
                    <div className="grid grid-cols-9" key={rowIdx}>
                        {Array.from({ length: 9 }, (_, colIdx) => (
                            <Box
                                key={`${rowIdx}-${colIdx}`}
                                colIdx={colIdx}
                                rowIdx={rowIdx}
                                showLabel={showLabel}
                                color={(colIdx + rowIdx) % 2 === 0 ? 'bg-black' : 'bg-white'}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

const Box = ({ colIdx, rowIdx, showLabel, color }) => {

    if ((colIdx === 0 || rowIdx === 0)) {
        return (
            <div className="h-10 w-10 flex items-center justify-center">
                {
                    showLabel && !(colIdx === 0 && rowIdx === 0) ?
                        colIdx === 0 ? rowIdx : String.fromCharCode(64 + colIdx)
                        :
                        ""
                }
            </div>
        );
    }

    return <div className={`h-10 w-10 ${color} border`}></div>;
};

export default Chess2;
