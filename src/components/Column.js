import { Droppable } from "@hello-pangea/dnd";
import Task from "./Task";
import AddTask from "./AddTask";

export default function Column({ colId, column, addTask, deleteTask, editTask }) {
  const maxVisibleTasks = 4;
  const shouldScroll = column.tasks.length > maxVisibleTasks;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 w-72 flex-shrink-0 flex flex-col transition">
      <h2 className="font-semibold text-lg mb-3 flex justify-between items-center">
        {column.name}
        <span className="text-sm text-gray-400">{column.tasks.length}</span>
      </h2>

      <Droppable droppableId={colId}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`space-y-3 ${
              shouldScroll ? "overflow-y-auto" : ""
            } flex-1 min-h-[200px] pr-1`}
            style={{ maxHeight: shouldScroll ? "320px" : "auto" }}
          >
            {column.tasks.map((task, index) => (
              <Task
                key={task.id}
                task={task}
                index={index}
                colId={colId}
                deleteTask={deleteTask}
                editTask={editTask}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <div className="mt-3">
        <AddTask colId={colId} addTask={addTask} />
      </div>
    </div>
  );
}
