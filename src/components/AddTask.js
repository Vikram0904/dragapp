import React, { useState } from "react";

export default function AddTask({ colId, addTask, onCancel }) {
  const [text, setText] = useState("");

  const save = () => {
    if (!text.trim()) return;
    addTask(colId, text.trim());
    setText("");
    onCancel();
  };

  return (
    <div className="space-y-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full border rounded px-2 py-1 text-sm bg-gray-50 dark:bg-gray-800 dark:text-gray-100"
        placeholder="Task title..."
      />
      <div className="flex gap-2">
        <button
          onClick={save}
          className="flex-1 bg-primary text-white py-2 rounded hover:bg-blue-700 text-sm"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="flex-1 bg-gray-200 dark:bg-gray-700 py-2 rounded text-sm text-gray-700 dark:text-gray-200"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
