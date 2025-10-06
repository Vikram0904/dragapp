import React, { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";

export default function Task({ task, index, colId, deleteTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(task.content);

  const save = () => {
    if (!text.trim()) return;
    editTask(colId, task.id, text.trim());
    setIsEditing(false);
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`rounded-lg p-3 shadow-sm flex justify-between items-start transition transform ${
            snapshot.isDragging
              ? "ring-2 ring-offset-2 ring-blue-400 dark:ring-blue-600 scale-[1.02]"
              : "hover:shadow-md dark:hover:shadow-gray-800 bg-white dark:bg-darkcard"
          }`}
          style={provided.draggableProps.style}
        >
          <div className="flex-1">
            {isEditing ? (
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onBlur={save}
                onKeyDown={(e) => e.key === "Enter" && save()}
                autoFocus
                className="w-full border rounded px-2 py-1 text-sm bg-gray-50 dark:bg-gray-800 dark:text-gray-100"
              />
            ) : (
              <p
                className="text-sm text-gray-800 dark:text-gray-100 cursor-text"
                onDoubleClick={() => setIsEditing(true)}
                title="Double-click to edit"
              >
                {task.content}
              </p>
            )}
          </div>

          {!isEditing && (
            <button
              onClick={() => deleteTask(colId, task.id)}
              className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              title="Delete"
            >
              ✕
            </button>
          )}
        </div>
      )}
    </Draggable>
  );
}
