import React from "react";
import Board from "./Board";
import "./index.css";

function App() {
  return (
    <div style={{ fontFamily: "Inter, Arial, sans-serif" }}>
      <header style={{ textAlign: "center", padding: "18px 0" }}>
        <h1>Daily Report Board</h1>
      </header>

      <Board />
    </div>
  );
}

export default App;
