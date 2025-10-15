import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { XCircle, Sun, Moon, List, LayoutGrid } from "lucide-react";

export default function Board({
  columns,
  setColumns,
  addTask,
  deleteTask,
  editTask,
  onColumnsChange,
  theme,
  setTheme,
}) {
  const [viewMode, setViewMode] = useState("board");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", desc: "", colId: "todo" });

  // ✅ Drag + Drop
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
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
        >
          + Add New Task
        </button>

        {/* Theme + View Toggle */}
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

      {/* Main Area */}
      <DragDropContext onDragEnd={handleDragEnd}>
        {viewMode === "board" ? (
          // ✅ Board View
          <div className="flex flex-wrap gap-6 justify-center">
            {Object.entries(columns).map(([colId, column]) => (
              <Droppable key={colId} droppableId={colId}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`rounded-2xl p-4 w-72 flex flex-col transition-all ${
                      snapshot.isDraggingOver
                        ? "bg-blue-100 dark:bg-gray-700"
                        : "bg-gray-200 dark:bg-gray-800"
                    }`}
                  >
                    <h2 className="font-semibold text-lg mb-3 flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        {colId === "todo" && (
                          <span className="flex items-center gap-2 text-blue-600 font-medium">
                            <i className="far fa-circle"></i> To Do
                          </span>
                        )}
                        {colId === "progress" && (
                          <span className="flex items-center gap-2 text-yellow-600 font-medium">
                            <i className="fas fa-hourglass-half"></i> In Progress
                          </span>
                        )}
                        {colId === "review" && (
                          <span className="flex items-center gap-2 text-purple-600 font-medium">
                            <i className="fas fa-eye"></i> Review
                          </span>
                        )}
                        {colId === "done" && (
                          <span className="flex items-center gap-2 text-green-600 font-medium">
                            <i className="fas fa-check-circle"></i> Done
                          </span>
                        )}
                      </span>
                      <span
                          className={`px-2 py-[2px] text-sm rounded-full ${
                            colId === "todo"
                              ? "bg-blue-200 text-blue-600"
                              : colId === "progress"
                              ? "bg-yellow-200 text-yellow-600"
                              : colId === "review"
                              ? "bg-purple-200 text-purple-600"
                              : colId === "done"
                              ? "bg-green-200 text-green-600"
                              : "bg-gray-300 text-gray-700"
                          }`}
                        >
                          {column.tasks.length}
                      </span>
                    </h2>

                    <div
                      className={`flex flex-col gap-3 ${
                        column.tasks.length > 4
                          ? "overflow-y-auto custom-scroll"
                          : "overflow-y-hidden"
                      }`}
                      style={{ height: "320px" }}
                    >
                      {column.tasks.map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`p-3 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-[inset_3px_3px_6px_rgba(0,0,0,0.1)] border-l-4 ${
                                colId === "todo"
                                  ? "border-blue-400"
                                  : colId === "progress"
                                  ? "border-yellow-400"
                                  : colId === "review"
                                  ? "border-purple-400"
                                  : "border-green-400"
                              } hover:shadow-md transition-all`}
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium">{task.title}</p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {task.desc}
                                  </p>
                                </div>
                                <button
                                  onClick={() => deleteTask(colId, task.id)}
                                  className="text-red-400 hover:text-red-500"
                                >
                                  <XCircle size={18} />
                                </button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        ) : (
          // ✅ List View (redesigned, draggable, same icons/colors)
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl shadow p-6 w-full">
            {Object.entries(columns).map(([colId, column]) => (
              <Droppable key={colId} droppableId={colId}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`mb-8 rounded-xl transition-all ${
                      snapshot.isDraggingOver
                        ? "bg-blue-50 dark:bg-gray-700 p-3"
                        : ""
                    }`}
                  >
                    <h2 className="font-semibold text-lg mb-3 flex justify-between items-center border-b border-gray-300 dark:border-gray-700 pb-1">
                      <span className="flex items-center gap-2">
                        {colId === "todo" && (
                          <span className="flex items-center gap-2 text-blue-600 font-medium">
                            <i className="far fa-circle"></i> To Do
                          </span>
                        )}
                        {colId === "progress" && (
                          <span className="flex items-center gap-2 text-yellow-600 font-medium">
                            <i className="fas fa-hourglass-half"></i> In Progress
                          </span>
                        )}
                        {colId === "review" && (
                          <span className="flex items-center gap-2 text-purple-600 font-medium">
                            <i className="fas fa-eye"></i> Review
                          </span>
                        )}
                        {colId === "done" && (
                          <span className="flex items-center gap-2 text-green-600 font-medium">
                            <i className="fas fa-check-circle"></i> Done
                          </span>
                        )}
                      </span>
                      <span
                          className={`px-2 py-[2px] text-sm rounded-full ${
                            colId === "todo"
                              ? "bg-blue-200 text-blue-600"
                              : colId === "progress"
                              ? "bg-yellow-200 text-yellow-600"
                              : colId === "review"
                              ? "bg-purple-200 text-purple-600"
                              : colId === "done"
                              ? "bg-green-200 text-green-600"
                              : "bg-gray-300 text-gray-700"
                          }`}
                        >
                          {column.tasks.length}
                      </span>
                    </h2>

                    {column.tasks.length === 0 && (
                      <p className="text-sm text-gray-400 italic mt-3">
                        No tasks
                      </p>
                    )}

                    <div className="space-y-3 mt-3">
                      {column.tasks.map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`p-3 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-[inset_3px_3px_6px_rgba(0,0,0,0.1)] border-l-4 ${
                                colId === "todo"
                                  ? "border-blue-400"
                                  : colId === "progress"
                                  ? "border-yellow-400"
                                  : colId === "review"
                                  ? "border-purple-400"
                                  : "border-green-400"
                              } hover:shadow-md transition-all`}
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium">{task.title}</p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {task.desc}
                                  </p>
                                </div>
                                <button
                                  onClick={() => deleteTask(colId, task.id)}
                                  className="text-red-400 hover:text-red-500"
                                >
                                  <XCircle size={18} />
                                </button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        )}
      </DragDropContext>
    </div>
  );
}
