import React, { useState, useEffect } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import Board from "./components/Board";

const initialData = {
  todo: [
    { id: "task-1", content: "Learn React basics" },
    { id: "task-2", content: "Install dependencies" },
  ],
  inprogress: [{ id: "task-3", content: "Build drag-and-drop list" }],
  done: [{ id: "task-4", content: "Setup GitHub repo" }],
};

function App() {
  const [columns, setColumns] = useState(() => {
    const saved = localStorage.getItem("columns");
    return saved ? JSON.parse(saved) : initialData;
  });

  useEffect(() => {
    localStorage.setItem("columns", JSON.stringify(columns));
  }, [columns]);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const startCol = columns[source.droppableId];
    const endCol = columns[destination.droppableId];

    if (startCol === endCol) {
      const newTasks = Array.from(startCol);
      const [moved] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, moved);

      setColumns({
        ...columns,
        [source.droppableId]: newTasks,
      });
    } else {
      const startTasks = Array.from(startCol);
      const [moved] = startTasks.splice(source.index, 1);
      const endTasks = Array.from(endCol);
      endTasks.splice(destination.index, 0, moved);

      setColumns({
        ...columns,
        [source.droppableId]: startTasks,
        [destination.droppableId]: endTasks,
      });
    }
  };

  const addTask = (colId, text) => {
    const newTask = { id: `task-${Date.now()}`, content: text };
    setColumns({
      ...columns,
      [colId]: [...columns[colId], newTask],
    });
  };

  const editTask = (colId, taskId, newContent) => {
  const updated = columns[colId].map((t) =>
    t.id === taskId ? { ...t, content: newContent } : t
  );
  setColumns({ ...columns, [colId]: updated });
  };


  const deleteTask = (colId, taskId) => {
    const updated = columns[colId].filter((t) => t.id !== taskId);
    setColumns({ ...columns, [colId]: updated });
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ textAlign: "center" }}>📝 Kanban Board</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Board columns={columns} addTask={addTask} deleteTask={deleteTask} editTask={editTask} />
      </DragDropContext>
    </div>
  );
}

export default App;
