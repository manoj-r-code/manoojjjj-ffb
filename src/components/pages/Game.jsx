import React, { useState } from "react";
import "./Game.css";

const initialGrid = [
  [null, "book", null, null, "exit"],
  [null, "book", null, "book", null],
  [null, null, "cat", null, null],
  [null, "book", null, null, null],
  [null, null, null, null, null],
];
const GameBoard = () => {
  const [grid, setGrid] = useState(initialGrid);

  const moveCat = (dx, dy) => {
    const newGrid = grid.map((row) => [...row]);
    let catX, catY;

    // Find the cat
    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {
        if (grid[y][x] === "cat") {
          catX = x;
          catY = y;
        }
      }
    }

    const newX = catX + dx;
    const newY = catY + dy;

    // Bounds check
    if (newX < 0 || newX >= 5 || newY < 0 || newY >= 5) return;

    const target = grid[newY][newX];

    if (target === null || target === "exit") {
      newGrid[catY][catX] = null;
      newGrid[newY][newX] = "cat";
      setGrid(newGrid);

      if (target === "exit") {
        alert("You escaped the couch!");
      }
    } else if (target === "book") {
      // Attempt to push book
      const pushX = newX + dx;
      const pushY = newY + dy;
      if (
        pushX >= 0 &&
        pushX < 5 &&
        pushY >= 0 &&
        pushY < 5 &&
        grid[pushY][pushX] === null
      ) {
        newGrid[pushY][pushX] = "book";
        newGrid[newY][newX] = "cat";
        newGrid[catY][catX] = null;
        setGrid(newGrid);
      }
    }
  };

  const handleKey = (e) => {
    switch (e.key) {
      case "ArrowUp":
        moveCat(0, -1);
        break;
      case "ArrowDown":
        moveCat(0, 1);
        break;
      case "ArrowLeft":
        moveCat(-1, 0);
        break;
      case "ArrowRight":
        moveCat(1, 0);
        break;
      default:
        break;
    }
  };

  return (
    <div tabIndex={0} className="game-board" onKeyDown={handleKey}>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, cellIndex) => (
            <div key={cellIndex} className={`cell ${cell || ""}`}>
              {cell === "cat" && "🐱"}
              {cell === "book" && "📘"}
              {cell === "exit" && "🛋"}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
