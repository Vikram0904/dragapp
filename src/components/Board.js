import React from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import Column from "./Column";

export default function Board({ columns, addTask, deleteTask, editTask, onColumnsChange }) {
  const handleOnDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    const sourceId = source.droppableId;
    const destId = destination.droppableId;
    const start = columns[sourceId];
    const end = columns[destId];

    if (sourceId === destId) {
      const copied = Array.from(start.items);
      const [moved] = copied.splice(source.index, 1);
      copied.splice(destination.index, 0, moved);
      onColumnsChange({ ...columns, [sourceId]: { ...start, items: copied } });
      return;
    }

    const startItems = Array.from(start.items);
    const endItems = Array.from(end.items);
    const [moved] = startItems.splice(source.index, 1);
    endItems.splice(destination.index, 0, moved);

    onColumnsChange({
      ...columns,
      [sourceId]: { ...start, items: startItems },
      [destId]: { ...end, items: endItems },
    });
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {Object.entries(columns).map(([colId, column]) => (
          <Column
            key={colId}
            colId={colId}
            column={column}
            addTask={addTask}
            deleteTask={deleteTask}
            editTask={editTask}
          />
        ))}
      </div>
    </DragDropContext>
  );
}
