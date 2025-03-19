import React, { useState } from "react";

export const ListMover = () => {
    const [left, setLeft] = useState([
        "Mars Rover Missions",
        "SpaceX Starship",
        "Black Hole Imaging",
        "International Space Station",
        "Moon Base Plans",
    ]);

    const [right, setRight] = useState([
        "Wasabi Ice Cream",
        "Garlic Ice Cream",
        "Squid Ink Ice Cream",
        "Bacon Ice Cream",
        "Blue Cheese Ice Cream",
    ]);

    const [selectedList, setSelectedList] = useState([]);

    const moveItems = (to, setTo, from, setFrom, condition) => {
        setTo((prev) => [...prev, ...from.filter(condition)]);
        setFrom((prev) => prev.filter((item) => !condition(item)));
        setSelectedList([]);
    };

    return (
        <div className="flex justify-center gap-6 p-8">
            {/* Left List */}
            <div className="w-64 bg-white shadow-lg rounded-lg p-5 border">
                <h2 className="text-lg font-semibold text-gray-700 mb-3">Space Projects</h2>
                <List elements={left} selectedList={selectedList} setSelectedList={setSelectedList} />
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3 justify-center">
                <Button onClick={() => moveItems(right, setRight, left, setLeft, () => true)}>{">>"}</Button>
                <Button onClick={() => moveItems(right, setRight, left, setLeft, (ele) => selectedList.includes(ele))}>{">"}</Button>
                <Button onClick={() => moveItems(left, setLeft, right, setRight, (ele) => selectedList.includes(ele))}>{"<"}</Button>
                <Button onClick={() => moveItems(left, setLeft, right, setRight, () => true)}>{"<<"}</Button>
            </div>

            {/* Right List */}
            <div className="w-64 bg-white shadow-lg rounded-lg p-5 border">
                <h2 className="text-lg font-semibold text-gray-700 mb-3">Weird Ice Cream Flavors</h2>
                <List elements={right} selectedList={selectedList} setSelectedList={setSelectedList} />
            </div>
        </div>
    );
};

const List = ({ elements, selectedList, setSelectedList }) => {
    const handleCheck = (ele) => {
        setSelectedList((prev) =>
            prev.includes(ele) ? prev.filter((item) => item !== ele) : [...prev, ele]
        );
    };

    return (
        <div className="flex flex-col gap-3">
            {elements.length > 0 ? (
                elements.map((ele) => (
                    <div
                        key={ele}
                        className="flex items-center gap-3 p-2 border rounded-md bg-gray-50 hover:bg-gray-200 transition"
                    >
                        <input
                            type="checkbox"
                            checked={selectedList.includes(ele)}
                            onChange={() => handleCheck(ele)}
                            className="accent-green-600"
                        />
                        <p className="text-gray-700">{ele}</p>
                    </div>
                ))
            ) : (
                <div className="text-red-600 text-lg text-center font-semibold">Nothing Here</div>
            )}
        </div>
    );
};

const Button = ({ children, onClick }) => (
    <button
        onClick={onClick}
        className="p-3 w-12 h-12 flex items-center justify-center rounded-md bg-green-500 text-white text-xl font-bold shadow-md transition hover:bg-green-600 hover:scale-105 active:scale-95"
    >
        {children}
    </button>
);

export default ListMover;
