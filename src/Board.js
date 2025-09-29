import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

/* ---------- helpers ---------- */
const STORAGE_KEY = "dragapp-board-v1";

const genId = () =>
  "task-" +
  Date.now().toString(36) +
  "-" +
  Math.random().toString(36).slice(2, 6);

/* load from localStorage or default structure */
const getInitialData = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      /* ignore parse error */
    }
  }

  return {
    backlog: {
      id: "backlog",
      name: "Backlog",
      items: [
        {
          id: genId(),
          title: "Update landing page",
          description: "Change CTA text",
        },
        {
          id: genId(),
          title: "Fix login bug",
          description: "Mobile auth issue",
        },
      ],
    },
    selected: {
      id: "selected",
      name: "Selected",
      items: [
        {
          id: genId(),
          title: "Design dashboard",
          description: "Create wireframe",
        },
      ],
    },
    running: {
      id: "running",
      name: "Running",
      items: [
        { id: genId(), title: "Build Kanban UI", description: "Drag & drop" },
      ],
    },
    evaluating: {
      id: "evaluating",
      name: "Evaluating",
      items: [],
    },
    live: {
      id: "live",
      name: "Live",
      items: [
        {
          id: genId(),
          title: "Project kickoff",
          description: "Initial meeting",
        },
      ],
    },
  };
};

/* ---------- AddTaskForm (small controlled form) ---------- */
function AddTaskForm({ columns, onAdd }) {
  const colKeys = Object.keys(columns);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [columnId, setColumnId] = useState(colKeys[0] || "");

  useEffect(() => {
    // if columns change, ensure select has a valid value
    if (!columnId && colKeys.length) setColumnId(colKeys[0]);
  }, [columns]); // eslint-disable-line

  const onSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newTask = {
      id: genId(),
      title: title.trim(),
      description: description.trim(),
    };
    onAdd(columnId, newTask);
    setTitle("");
    setDescription("");
  };

  return (
    <form
      onSubmit={onSubmit}
      style={{ display: "flex", gap: 8, marginBottom: 12 }}
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title (required)"
        style={{ padding: 8, flex: 1 }}
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Short description (optional)"
        style={{ padding: 8, width: 240 }}
      />
      <select
        value={columnId}
        onChange={(e) => setColumnId(e.target.value)}
        style={{ padding: 8 }}
      >
        {Object.entries(columns).map(([id, col]) => (
          <option key={id} value={id}>
            {col.name}
          </option>
        ))}
      </select>
      <button type="submit" style={{ padding: "8px 12px" }}>
        Add
      </button>
    </form>
  );
}

/* ---------- Board component ---------- */
export default function Board() {
  const [columns, setColumns] = useState(getInitialData);

  // persist on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(columns));
  }, [columns]);

  // add a new task into a column
  const addTask = (columnId, task) => {
    setColumns((prev) => ({
      ...prev,
      [columnId]: { ...prev[columnId], items: [...prev[columnId].items, task] },
    }));
  };

  // handle drag end (same column reorder / move between columns)
  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return; // dropped outside

    const sourceId = source.droppableId;
    const destId = destination.droppableId;

    if (sourceId === destId) {
      const copied = Array.from(columns[sourceId].items);
      const [moved] = copied.splice(source.index, 1);
      copied.splice(destination.index, 0, moved);
      setColumns((prev) => ({
        ...prev,
        [sourceId]: { ...prev[sourceId], items: copied },
      }));
    } else {
      const sourceItems = Array.from(columns[sourceId].items);
      const destItems = Array.from(columns[destId].items);
      const [moved] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, moved);
      setColumns((prev) => ({
        ...prev,
        [sourceId]: { ...prev[sourceId], items: sourceItems },
        [destId]: { ...prev[destId], items: destItems },
      }));
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <AddTaskForm columns={columns} onAdd={addTask} />

      <DragDropContext onDragEnd={onDragEnd}>
        <div
          style={{
            display: "flex",
            gap: 16,
            alignItems: "flex-start",
            overflowX: "auto",
          }}
        >
          {Object.entries(columns).map(([colId, column]) => (
            <Droppable droppableId={colId} key={colId}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    background: snapshot.isDraggingOver ? "#eaf6ff" : "#f5f7fa",
                    padding: 12,
                    width: 300,
                    minHeight: 400,
                    borderRadius: 8,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                    flex: "0 0 300px",
                  }}
                >
                  <h3
                    style={{
                      marginTop: 0,
                      textTransform: "uppercase",
                      fontSize: 13,
                    }}
                  >
                    {column.name}
                  </h3>

                  {column.items.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(prov, snap) => (
                        <div
                          ref={prov.innerRef}
                          {...prov.draggableProps}
                          {...prov.dragHandleProps}
                          style={{
                            userSelect: "none",
                            padding: 12,
                            marginBottom: 8,
                            background: "#fff",
                            border: "1px solid #e6e9ee",
                            borderRadius: 6,
                            boxShadow: snap.isDragging
                              ? "0 6px 18px rgba(0,0,0,0.12)"
                              : "none",
                            ...prov.draggableProps.style,
                          }}
                        >
                          <div style={{ fontWeight: 600 }}>{task.title}</div>
                          {task.description && (
                            <div
                              style={{
                                fontSize: 12,
                                color: "#555",
                                marginTop: 6,
                              }}
                            >
                              {task.description}
                            </div>
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
