import React, { useState } from "react";
import { Droppable } from "@hello-pangea/dnd";
import Task from "./Task";
import AddTask from "./AddTask";

export default function Column({ colId, column, addTask, deleteTask, editTask }) {
  const [adding, setAdding] = useState(false);

  return (
    <div
      className={`rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 ${column.color} flex flex-col transition`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-darkcard rounded-t-2xl">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{column.name}</h3>
        <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-0.5">
          {column.items.length}
        </span>
      </div>

      <Droppable droppableId={colId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 min-h-[200px] p-3 space-y-3 transition ${
              snapshot.isDraggingOver
                ? "bg-blue-50 dark:bg-blue-900/20"
                : "bg-gray-50 dark:bg-darkbg"
            }`}
          >
            {column.items.map((task, index) => (
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

      <div className="p-3 border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-darkcard rounded-b-2xl">
        {adding ? (
          <AddTask colId={colId} addTask={addTask} onCancel={() => setAdding(false)} />
        ) : (
          <button
            className="w-full py-2 bg-primary text-white rounded-md hover:bg-blue-700 text-sm transition"
            onClick={() => setAdding(true)}
          >
            + Add Task
          </button>
        )}
      </div>
    </div>
  );
}
