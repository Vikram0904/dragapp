import { useState } from "react";

export default function AddTaskGlobal({ addTask }) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [column, setColumn] = useState("todo");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newTask = {
      id: Date.now(),
      title: title.trim(),
      desc: desc.trim() || "No description",
    };
    addTask(column, newTask);
    setTitle("");
    setDesc("");
    setShowForm(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 w-full max-w-3xl mx-auto">
      {showForm ? (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            className="flex-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-2 text-sm"
          />
          <input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Short description"
            className="flex-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-2 text-sm"
          />
          <select
            value={column}
            onChange={(e) => setColumn(e.target.value)}
            className="rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-2 text-sm"
          >
            <option value="todo">To Do</option>
            <option value="progress">In Progress</option>
            <option value="review">In Review</option>
            <option value="done">Done</option>
          </select>
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Add Task
          </button>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 px-3 py-2 rounded-md text-sm font-medium"
          >
            Cancel
          </button>
        </form>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="border border-dashed border-gray-400 dark:border-gray-600 w-full py-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition text-sm"
        >
          ＋ Add New Task
        </button>
      )}
    </div>
  );
}
