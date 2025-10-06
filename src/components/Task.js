import React, { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";

function Task({ task, index, colId, deleteTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(task.content);

  const saveEdit = () => {
    if (text.trim()) {
      editTask(colId, task.id, text.trim());
      setIsEditing(false);
    }
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            padding: "12px",
            marginBottom: "8px",
            background: "white",
            borderRadius: "5px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            ...provided.draggableProps.style,
          }}
        >
          {isEditing ? (
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onBlur={saveEdit}
              onKeyDown={(e) => e.key === "Enter" && saveEdit()}
              autoFocus
              style={{
                flex: 1,
                marginRight: "8px",
                padding: "6px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          ) : (
            <span
              style={{ flex: 1, cursor: "pointer" }}
              onDoubleClick={() => setIsEditing(true)}
              title="Double-click to edit"
            >
              {task.content}
            </span>
          )}

          {!isEditing && (
            <button
              onClick={() => deleteTask(colId, task.id)}
              style={{
                background: "red",
                border: "none",
                color: "white",
                borderRadius: "3px",
                padding: "3px 6px",
                cursor: "pointer",
                marginLeft: "6px",
              }}
            >
              ✕
            </button>
          )}
        </div>
      )}
    </Draggable>
  );
}

export default Task;
