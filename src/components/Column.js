import { Droppable } from "@hello-pangea/dnd";
import Task from "./Task";
import AddTask from "./AddTask";

export default function Column({ colId, column, addTask, deleteTask, editTask }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 w-72 flex-shrink-0 transition">
      <h2 className="font-semibold text-lg mb-3 flex justify-between items-center">
        {column.name}
        <span className="text-sm text-gray-400">{column.tasks.length}</span>
      </h2>

      <Droppable droppableId={colId}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="min-h-[200px] space-y-3"
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

      <AddTask colId={colId} addTask={addTask} />
    </div>
  );
}
