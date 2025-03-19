import React, { useState, useEffect } from "react";

export const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [Xturn, setXturn] = useState(false);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
    for (let [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }
    if (!board.includes(null)) setWinner("Draw"); // Check for draw
  }, [board]);

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = Xturn ? "X" : "O";
    setBoard(newBoard);
    setXturn(!Xturn);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXturn(false);
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Tic-Tac-Toe</h1>
      <Board board={board} onCellClick={handleClick} />
      {winner && (
        <h2 className="mt-4 text-2xl font-semibold text-green-500">
          {winner === "Draw" ? "It's a Draw!" : `${winner} Wins!`}
        </h2>
      )}
      <button
        onClick={resetGame}
        className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
      >
        Reset
      </button>
    </div>
  );
};

const Board = ({ board, onCellClick }) => {
  return (
    <div className="grid grid-cols-3 gap-2 mt-4">
      {board.map((cell, index) => (
        <Cell key={index} value={cell} onClick={() => onCellClick(index)} />
      ))}
    </div>
  );
};

const Cell = ({ value, onClick }) => {
  return (
    <button
      className="w-20 h-20 bg-white border-2 border-gray-300 rounded-md text-xl font-bold flex items-center justify-center hover:bg-gray-100 disabled:cursor-not-allowed"
      onClick={onClick}
      disabled={value !== null}
    >
      {value}
    </button>
  );
};
