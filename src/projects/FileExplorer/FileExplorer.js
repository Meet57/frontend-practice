import React, { useEffect, useState } from "react";
import { filesData } from "./data";

export const FileExplorer = () => {
    const [files, setFiles] = useState(null);

    useEffect(() => {
        setFiles(filesData);
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-2">File Explorer</h1>
            {files && <FileOrFolder files={files} level={0} />}
        </div>
    );
};

const FileOrFolder = ({ files, level = 0 }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`pl-${level * 4}`}>
            <h6 className="flex items-center font-medium cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                {files.type === "folder" ? (
                    <span className="mr-2">{isOpen ? "📂" : "📁"}</span>
                ) : (
                    <span className="mr-2">📄</span>
                )}
                {files.name}
                {files.type !== "folder" && <span className="ml-2 text-gray-500">[ {files.size} ]</span>}
            </h6>

            {isOpen && files.children && (
                <div>
                    {files.children.map((child) => (
                        <FileOrFolder key={child.name} files={child} level={level + 1} />
                    ))}
                </div>
            )}
        </div>
    );
};