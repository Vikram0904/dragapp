import React from "react";
import Column from "./Column";

function Board({ columns, addTask, deleteTask, editTask }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
      {Object.entries(columns).map(([colId, tasks]) => (
        <Column
          key={colId}
          colId={colId}
          tasks={tasks}
          addTask={addTask}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      ))}
    </div>
  );
}


export default Board;
