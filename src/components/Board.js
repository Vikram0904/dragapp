import { DragDropContext } from "@hello-pangea/dnd";
import Column from "./Column";
import LiveUpdates from "./LiveUpdates";

export default function Board({ columns, addTask, deleteTask, editTask, onColumnsChange }) {
  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    // 🧩 Identify source and destination columns
    const startCol = columns[source.droppableId];
    const endCol = columns[destination.droppableId];

    // 🟦 Drag within same column
    if (startCol === endCol) {
      const updatedTasks = Array.from(startCol.tasks);
      const [movedTask] = updatedTasks.splice(source.index, 1);
      updatedTasks.splice(destination.index, 0, movedTask);

      onColumnsChange(source.droppableId, destination.droppableId, movedTask);
      return;
    }

    // 🟩 Drag between different columns
    const startTasks = Array.from(startCol.tasks);
    const [movedTask] = startTasks.splice(source.index, 1);
    const endTasks = Array.from(endCol.tasks);
    endTasks.splice(destination.index, 0, movedTask);

    onColumnsChange(source.droppableId, destination.droppableId, movedTask);
  };

  return (
    <div className="flex gap-6 overflow-x-auto">
      <DragDropContext onDragEnd={handleDragEnd}>
        {Object.entries(columns).map(([id, col]) => (
          <Column
            key={id}
            colId={id}
            column={col}
            addTask={addTask}
            deleteTask={deleteTask}
            editTask={editTask}
          />
        ))}
      </DragDropContext>

      <LiveUpdates />
    </div>
  );
}
