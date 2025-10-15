import { Droppable } from "@hello-pangea/dnd";
import Task from "./Task";

export default function Column({ colId, column, deleteTask, viewMode }) {
  const columnStyles = {
    todo: { border: "border-blue-400", bg: "bg-blue-200 text-blue-600", color: "text-blue-600", shadow: "hover:shadow-[0_4px_10px_rgba(59,130,246,0.4)]" },
    progress: { border: "border-yellow-400", bg: "bg-yellow-200 text-yellow-600", color: "text-yellow-600", shadow: "hover:shadow-[0_4px_10px_rgba(250,204,21,0.4)]" },
    review: { border: "border-purple-400", bg: "bg-purple-200 text-purple-600", color: "text-purple-600", shadow: "hover:shadow-[0_4px_10px_rgba(168,85,247,0.4)]" },
    done: { border: "border-green-400", bg: "bg-green-200 text-green-600", color: "text-green-600", shadow: "hover:shadow-[0_4px_10px_rgba(34,197,94,0.4)]" },
  };

  const icons = {
    todo: <i className="far fa-circle"></i>,
    progress: <i className="fas fa-hourglass-half"></i>,
    review: <i className="fas fa-eye"></i>,
    done: <i className="fas fa-check-circle"></i>,
  };

  return (
    <Droppable droppableId={colId}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`rounded-2xl p-4 transition-all ${
            viewMode === "board" ? "w-72 flex flex-col" : "w-full mb-8 bg-gray-100 dark:bg-gray-800 shadow p-6"
          } ${snapshot.isDraggingOver ? "bg-blue-100 dark:bg-gray-700" : "bg-gray-200 dark:bg-gray-800"}`}
        >
          {/* Column Header */}
          <h2 className={`font-semibold text-lg mb-3 flex justify-between items-center ${viewMode === "list" ? "border-b border-gray-300 dark:border-gray-700 pb-1" : ""}`}>
            <span className="flex items-center gap-2">
              <span className={`${columnStyles[colId].color} font-medium flex items-center gap-1`}>
                {icons[colId]} {colId === "todo" ? "To Do" : colId === "progress" ? "In Progress" : colId === "review" ? "Review" : "Done"}
              </span>
            </span>
            <span className={`px-2 py-[2px] text-sm rounded-full ${columnStyles[colId].bg}`}>
              {column.tasks.length}
            </span>
          </h2>

          {/* Tasks */}
          {column.tasks.length === 0 ? (
            <p className="text-sm text-gray-400 italic mt-3">No tasks</p>
          ) : viewMode === "board" ? (
            <div
              className={`flex flex-col gap-3 ${column.tasks.length > 4 ? "overflow-y-auto custom-scroll" : "overflow-y-hidden"}`}
              style={{ height: "320px" }}
            >
              {column.tasks.map((task, index) => (
                <Task
                  key={task.id}
                  task={task}
                  colId={colId}
                  index={index}
                  deleteTask={deleteTask}
                  borderColor={columnStyles[colId].border}
                  shadowClass={columnStyles[colId].shadow} // ✅ add shadow for board view
                />
              ))}
              {provided.placeholder}
            </div>
          ) : (
            // List View
            <div className="space-y-3 mt-3">
              {column.tasks.map((task, index) => (
                <Task
                  key={task.id}
                  task={task}
                  colId={colId}
                  index={index}
                  deleteTask={deleteTask}
                  borderColor={columnStyles[colId].border}
                  shadowClass={columnStyles[colId].shadow} // ✅ shadow also for list view
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </div>
      )}
    </Droppable>
  );
}
