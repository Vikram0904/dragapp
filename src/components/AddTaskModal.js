import { useState } from "react";
import { XCircle } from "lucide-react";

export default function AddTaskModal({ addTask, closeModal }) {
  const [newTask, setNewTask] = useState({ title: "", desc: "", colId: "todo" });

  const handleAdd = () => {
    if (!newTask.title.trim()) return;
    addTask(newTask.colId, { id: Date.now(), title: newTask.title, desc: newTask.desc });
    setNewTask({ title: "", desc: "", colId: "todo" });
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-md relative">
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
        >
          <XCircle size={22} />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Add New Task</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600 dark:text-gray-300">Task Title</label>
            <input
              type="text"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter task title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600 dark:text-gray-300">Description</label>
            <textarea
              rows="3"
              value={newTask.desc}
              onChange={(e) => setNewTask({ ...newTask, desc: e.target.value })}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Write a short description..."
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-600 dark:text-gray-300">Add to Column</label>
            <select
              value={newTask.colId}
              onChange={(e) => setNewTask({ ...newTask, colId: e.target.value })}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="todo">To Do</option>
              <option value="progress">In Progress</option>
              <option value="review">Review</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 mt-5">
            <button
              onClick={closeModal}
              className="px-4 py-2 rounded-md bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
            >
              Add Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
