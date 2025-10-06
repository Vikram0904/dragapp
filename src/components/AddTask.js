import React, { useState } from "react";

function AddTask({ colId, addTask, setAdding }) {
  const [text, setText] = useState("");

  const saveTask = () => {
    if (text.trim()) {
      addTask(colId, text.trim());
      setText("");
      setAdding(false);
    }
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <input
        type="text"
        placeholder="New task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "5px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
      <div style={{ display: "flex", gap: "5px" }}>
        <button
          onClick={saveTask}
          style={{
            flex: 1,
            padding: "8px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Save
        </button>
        <button
          onClick={() => setAdding(false)}
          style={{
            flex: 1,
            padding: "8px",
            background: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AddTask;
