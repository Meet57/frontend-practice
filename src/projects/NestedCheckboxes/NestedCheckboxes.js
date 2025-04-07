import React, { useEffect, useState } from "react";

export const NestedCheckboxes = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        setData(checkboxesData);
    }, []);

    const toggleCheck = (id) => {
        setData((prevData) => {
            // Recursively updates the checked state of a node and all its children
            const updateChecked = (nodes) => {
                return nodes.map((node) => {
                    if (node.id === id) {
                        const newChecked = !node.checked;
                        return {
                            ...node,
                            checked: newChecked,
                            children: node.children ? checkAllKids(node.children, newChecked) : node.children,
                        };
                    }
                    if (node.children) {
                        return {
                            ...node,
                            children: updateChecked(node.children),
                        };
                    }
                    return node;
                });
            };

            // Function to check/uncheck all children recursively
            const checkAllKids = (children, value) => {
                return children.map((child) => ({
                    ...child,
                    checked: value,
                    children: child.children ? checkAllKids(child.children, value) : child.children,
                }));
            };

            let updatedData = updateChecked(prevData);

            // Function to update the intermediate (indeterminate) state
            const updateIntermediate = (nodes) => {
                return nodes.map((node) => {
                    if (node.children) {
                        const allChecked = node.children.every((child) => child.checked);
                        const someChecked = node.children.some((child) => child.checked || child.indeterminate);

                        return {
                            ...node,
                            checked: allChecked,
                            indeterminate: (someChecked && !allChecked), // Set intermediate state
                            children: updateIntermediate(node.children),
                        };
                    }
                    return { ...node, indeterminate: false }; // Leaf nodes are never indeterminate
                });
            };

            updatedData = updateIntermediate(updatedData);
            return [...updatedData]; // Return a fresh array to trigger re-render
        });
    };

    return (
        <div>
            {data &&
                data.map((element) => (
                    <CheckBox toggleCheck={toggleCheck} key={element.id} element={element} level={0} />
                ))}
        </div>
    );
};

const CheckBox = ({ element, level, toggleCheck }) => {
    const checkboxRef = React.useRef(null);

    useEffect(() => {
        if (checkboxRef.current) {
            checkboxRef.current.indeterminate = element.indeterminate;
        }
    }, [element.indeterminate]);

    return (
        <div className={`pl-${Math.min(level * 4, 64)}`}>
            <input
                ref={checkboxRef}
                type="checkbox"
                onChange={() => toggleCheck(element.id)}
                className="mr-2"
                checked={element.checked}
            />
            {element.name}
            {element.children &&
                element.children.map((ele) => (
                    <CheckBox toggleCheck={toggleCheck} key={ele.id} element={ele} level={level + 1} />
                ))}
        </div>
    );
};

const checkboxesData = [
    {
        id: 1,
        name: "Electronics",
        checked: false,
        indeterminate: false,
        children: [
            {
                id: 2,
                name: "Mobile phones",
                checked: false,
                indeterminate: false,
                children: [
                    { id: 3, name: "iPhone", checked: false, indeterminate: false },
                    { id: 4, name: "Android", checked: false, indeterminate: false },
                ],
            },
            {
                id: 5,
                name: "Laptops",
                checked: false,
                indeterminate: false,
                children: [
                    { id: 6, name: "MacBook", checked: false, indeterminate: false },
                    { id: 7, name: "Surface Pro", checked: false, indeterminate: false },
                ],
            },
        ],
    },
    {
        id: 8,
        name: "Books",
        checked: false,
        indeterminate: false,
        children: [
            { id: 9, name: "Fiction", checked: false, indeterminate: false },
            { id: 10, name: "Non-fiction", checked: false, indeterminate: false },
        ],
    },
    { id: 11, name: "Toys", checked: false, indeterminate: false },
];

export default NestedCheckboxes;