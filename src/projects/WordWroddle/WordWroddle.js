import React, { useEffect, useState } from "react";
import { fetchRandomWord } from "./server.ts";

export function WordWroddle() {
    const [target, setTarget] = useState(null);
    const [inputs, setInputs] = useState(
        Array(5)
            .fill("")
            .map(() => Array(5).fill(""))
    );
    const [attempt, setAttempt] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [feedback, setFeedback] = useState(Array(5).fill(Array(5).fill("")));

    useEffect(() => {
        const storedTarget = localStorage.getItem("target");
        if (!storedTarget) {
            fetchRandomWord().then((res) => {
                const word = res.data.content.toUpperCase();
                setTarget(word);
                localStorage.setItem("target", word);
            });
        } else {
            setTarget(storedTarget.toUpperCase());
        }
    }, []);

    const updateInput = (row, col, value) => {
        if (gameOver || row !== attempt || !/^[a-zA-Z]?$/.test(value)) return;

        let newInputs = [...inputs];
        newInputs[row][col] = value.toUpperCase();
        setInputs(newInputs);

        if (col === 4) checkWord(newInputs[row]);
    };

    const checkWord = (wordArray) => {
        const word = wordArray.join("");
        if (word.length !== 5) return;

        let newFeedback = Array(5).fill("wrong");

        for (let i = 0; i < 5; i++) {
            if (word[i] === target[i]) newFeedback[i] = "correct";
            else if (target.includes(word[i])) newFeedback[i] = "misplaced";
        }

        let newFeedbackState = [...feedback];
        newFeedbackState[attempt] = newFeedback;
        setFeedback(newFeedbackState);

        if (word === target) {
            setGameOver(true);
            alert("🎉 You Win!");
        } else if (attempt === 4) {
            setGameOver(true);
            alert(`Game Over! The correct word was: ${target}`);
        } else {
            setAttempt(attempt + 1);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            {inputs.map((row, rowIdx) => (
                <div key={rowIdx} className="flex gap-2 mb-2">
                    {row.map((letter, colIdx) => (
                        <input
                            key={colIdx}
                            className={`w-12 h-12 text-center text-2xl font-bold uppercase border rounded 
                                ${feedback[rowIdx][colIdx] === "correct" ? "bg-green-500 text-white" : ""} 
                                ${feedback[rowIdx][colIdx] === "misplaced" ? "bg-yellow-500 text-white" : ""} 
                                ${feedback[rowIdx][colIdx] === "wrong" ? "bg-gray-600 text-white" : "bg-gray-200"}`}
                            maxLength={1}
                            value={letter}
                            onChange={(e) => updateInput(rowIdx, colIdx, e.target.value)}
                            disabled={gameOver || rowIdx !== attempt}
                        />
                    ))}
                </div>
            ))}
            <p className="mt-4 text-lg">Target: {gameOver ? target : "?????"}</p>
        </div>
    );
}
