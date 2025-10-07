import { useState } from "react";

export default function AddTask({ colId, addTask }) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      desc: desc.trim() || "No description",
    };

    addTask(colId, newTask);
    setTitle("");
    setDesc("");
    setShowForm(false);
  };

  return (
    <div className="mt-3">
      {showForm ? (
        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-2 text-sm"
          />
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Short description"
            rows="2"
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-2 text-sm"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-1.5 rounded-md"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-sm font-medium py-1.5 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="w-full mt-2 border border-dashed border-gray-400 dark:border-gray-600 rounded-md py-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm transition"
        >
          ＋ Add Task
        </button>
      )}
    </div>
  );
}
