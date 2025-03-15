import React, { useState, useEffect } from "react";
import "./TicApp.css"

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
    <div className="game">
      <h1>Tic-Tac-Toe</h1>
      <Board board={board} onCellClick={handleClick} />
      {winner && <h2>{winner === "Draw" ? "It's a Draw!" : `${winner} Wins!`}</h2>}
      <button onClick={resetGame} className="reset-btn">Reset</button>
    </div>
  );
};

const Board = ({ board, onCellClick }) => {
  return (
    <div className="board">
      {board.map((cell, index) => (
        <Cell key={index} value={cell} onClick={() => onCellClick(index)} />
      ))}
    </div>
  );
};

const Cell = ({ value, onClick }) => {
  return (
    <button className="cell" onClick={onClick} disabled={value !== null}>
      {value}
    </button>
  );
};
