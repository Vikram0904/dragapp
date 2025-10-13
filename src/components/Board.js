import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { XCircle } from "lucide-react";


export default function Board({ columns, addTask, deleteTask, editTask, onColumnsChange,  theme,
  setTheme,}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", desc: "", colId: "todo" });

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    addTask(newTask.colId, {
      id: Date.now(),
      title: newTask.title,
      desc: newTask.desc,
    });

    setIsModalOpen(false);
    setNewTask({ title: "", desc: "", colId: "todo" });
  };

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const startColId = source.droppableId;
    const endColId = destination.droppableId;

    const task = columns[startColId].tasks[source.index];
    onColumnsChange(startColId, endColId, task);
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

      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
      >
        {theme === "dark" ? "🌙" : "☀️"}
      </button>
    </div>

      {/* Drag and Drop Columns */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex flex-wrap gap-6 justify-center">
          {Object.entries(columns).map(([colId, column]) => (
            <Droppable key={colId} droppableId={colId}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gray-200 dark:bg-gray-800 rounded-2xl p-4 w-72 flex flex-col column-hover"
                >
                <h2 className="font-semibold text-lg mb-3 flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    {colId === "todo" && (
                      <span className="status-badge status-todo">
                        <i className="far fa-circle status-icon"></i> To Do
                      </span>
                    )}
                    {colId === "progress" && (
                      <span className="status-badge status-progress">
                        <i className="fas fa-hourglass-half status-icon"></i> In Progress
                      </span>
                    )}
                    {colId === "review" && (
                      <span className="status-badge status-review">
                        <i className="fas fa-eye status-icon"></i> Review
                      </span>
                    )}
                    {colId === "done" && (
                      <span className="status-badge status-done">
                        <i className="fas fa-check-circle status-icon"></i> Done
                      </span>
                    )}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full 
                      ${
                        colId === "todo"
                          ? "bg-gray-300 text-gray-700"
                          : colId === "progress"
                          ? "bg-blue-200 text-blue-900"
                          : colId === "review"
                          ? "bg-yellow-200 text-yellow-900"
                          : "bg-green-200 text-green-900"
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
                    style={{
                      height: "320px", // consistent column height
                    }}
                  >
                    {column.tasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                        {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`p-3 rounded-xl flex justify-between items-start shadow-md

                            ${
                              colId === "todo"
                                ? "bg-gray-100 dark:bg-gray-700 ticket-shadow-todo"
                                : colId === "progress"
                                ? "bg-gray-100 dark:bg-gray-700 ticket-shadow-progress"
                                : colId === "review"
                                ? "bg-gray-100 dark:bg-gray-700 ticket-shadow-review"
                                : "bg-gray-100 dark:bg-gray-700 ticket-shadow-done"
                            }
                            ${index === 0 ? "mt-[10px]" : ""}
                          `}
                        >
                          <div>
                            <p className="font-medium">{task.title}</p>
                            <p className="text-xs text-gray-500">{task.desc}</p>
                          </div>
                          <button
                            onClick={() => deleteTask(colId, task.id)}
                            className="text-red-400 hover:text-red-500 p-1 rounded-full hover:bg-red-500/10 transition"
                          >
                            <XCircle size={18} />
                          </button>

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
      </DragDropContext>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <form
            onSubmit={handleAddTask}
            className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 w-[420px] max-w-[90%] transform transition-all scale-100 animate-popIn"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xl"
            >
              ×
            </button>

            {/* Title */}
            <h3 className="text-xl font-semibold text-center mb-4 relative">
              Add New Task
              <span className="block w-16 h-[2px] mx-auto mt-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
            </h3>

            {/* Title Field */}
            <input
              type="text"
              placeholder="Task Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition"
            />

            {/* Description Field */}
            <textarea
              placeholder="Description"
              value={newTask.desc}
              onChange={(e) => setNewTask({ ...newTask, desc: e.target.value })}
              className="w-full px-3 py-2 mt-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition min-h-[90px]"
            />

            {/* Select Column */}
            <select
              value={newTask.colId}
              onChange={(e) => setNewTask({ ...newTask, colId: e.target.value })}
              className="w-full px-3 py-2 mt-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none transition"
            >
              {Object.entries(columns).map(([id, col]) => (
                <option key={id} value={id}>
                  {col.name}
                </option>
              ))}
            </select>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
