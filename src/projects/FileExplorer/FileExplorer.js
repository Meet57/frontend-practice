import React, { useEffect, useState } from "react";
import { filesData } from "./data";

export const FileExplorer = () => {
    const [files, setFiles] = useState(null);

    useEffect(() => {
        setFiles(filesData);
    }, []);

    const addFileOrFolder = (parent, type, name) => {
        if (!name) return;

        const newItem = type === "folder"
            ? { name, type: "folder", children: [] }
            : { name, type: "file", size: "1KB" };

        const updateStructure = (node) => {
            if (node.name === parent.name) {
                return { ...node, children: [...(node.children || []), newItem] };
            }
            if (node.children) {
                return { ...node, children: node.children.map(updateStructure) };
            }
            return node;
        };

        setFiles(prevFiles => updateStructure(prevFiles));
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-2">File Explorer</h1>
            {files && <FileOrFolder files={files} addFileOrFolder={addFileOrFolder} level={0} />}
        </div>
    );
};

const FileOrFolder = ({ files, addFileOrFolder, level = 0 }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [newItemType, setNewItemType] = useState(null);
    const [newItemName, setNewItemName] = useState("");

    const handleAdd = () => {
        addFileOrFolder(files, newItemType, newItemName);
        setNewItemType(null);
        setNewItemName("");
    };

    return (
        <div className={`pl-${level * 4}`}>
            <h6 className="flex items-center font-medium cursor-pointer">
                <div onClick={() => setIsOpen(!isOpen)}>
                    {files.type === "folder" ? (
                        <span className="mr-2">{isOpen ? "📂" : "📁"}</span>
                    ) : (
                        <span className="mr-2">📄</span>
                    )}
                    {files.name}
                    {files.type !== "folder" && <span className="ml-2 text-gray-500">[ {files.size} ]</span>}
                </div>
                {files.type === "folder" && (
                    <>
                        <button onClick={() => setNewItemType("file")} className="ml-2 text-sm text-blue-500">📄</button>
                        <button onClick={() => setNewItemType("folder")} className="text-sm text-green-500">📁</button>
                    </>
                )}
            </h6>

            {newItemType && (
                <div className="ml-4 mt-1 flex items-center">
                    <input
                        type="text"
                        placeholder={`Enter ${newItemType} name`}
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                        className="border rounded px-2 py-1 text-sm"
                    />
                    <button onClick={handleAdd} className="ml-2 text-sm text-blue-500">✔</button>
                    <button onClick={() => setNewItemType(null)} className="ml-2 text-sm text-red-500">✖</button>
                </div>
            )}

            {isOpen && files.children && (
                <div>
                    {files.children.map((child) => (
                        <FileOrFolder key={child.name} files={child} addFileOrFolder={addFileOrFolder} level={level + 1} />
                    ))}
                </div>
            )}
        </div>
    );
};