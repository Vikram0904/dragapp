import { useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import Column from "./Column";
import AddTaskModal from "./AddTaskModal";
import { List, LayoutGrid, Sun, Moon } from "lucide-react";

export default function Board({
  columns,
  setColumns,
  addTask,
  deleteTask,
  editTask,
  theme,
  setTheme,
}) {
  const [viewMode, setViewMode] = useState("board");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const startColId = source.droppableId;
    const endColId = destination.droppableId;
    const startCol = columns[startColId];
    const endCol = columns[endColId];

    if (startColId === endColId) {
      const newTasks = Array.from(startCol.tasks);
      const [movedTask] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, movedTask);
      setColumns({
        ...columns,
        [startColId]: { ...startCol, tasks: newTasks },
      });
    } else {
      const startTasks = Array.from(startCol.tasks);
      const [movedTask] = startTasks.splice(source.index, 1);
      const endTasks = Array.from(endCol.tasks);
      endTasks.splice(destination.index, 0, movedTask);
      setColumns({
        ...columns,
        [startColId]: { ...startCol, tasks: startTasks },
        [endColId]: { ...endCol, tasks: endTasks },
      });
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
        >
          + Add New Task
        </button>

        {/* Theme + View toggle */}
        <div className="flex gap-3">
          <button
            onClick={() =>
              setViewMode(viewMode === "board" ? "list" : "board")
            }
            className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition flex items-center gap-2"
          >
            {viewMode === "board" ? (
              <>
                <List size={18} />
                <span className="text-sm font-medium">List View</span>
              </>
            ) : (
              <>
                <LayoutGrid size={18} />
                <span className="text-sm font-medium">Board View</span>
              </>
            )}
          </button>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>

      {/* Columns */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex flex-wrap gap-6 justify-center">
          {Object.entries(columns).map(([colId, column]) => (
            <Column
              key={colId}
              colId={colId}
              column={column}
              deleteTask={deleteTask}
              viewMode={viewMode}
            />
          ))}
        </div>
      </DragDropContext>

      {/* Add Task Modal */}
      {isModalOpen && (
        <AddTaskModal
          addTask={addTask}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
