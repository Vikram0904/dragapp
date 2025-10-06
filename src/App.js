import React, { useEffect, useState } from "react";
import Board from "./components/Board";
import "./index.css";
import "./App.css";

const genId = () =>
  "task-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 6);

const STORAGE_KEY = "dragapp-columns-v1";
const DARK_KEY = "dragapp-theme";

const initialColumns = {
  backlog: {
    id: "backlog",
    name: "Backlog",
    color: "bg-blue-100 dark:bg-blue-900/30",
    items: [
      { id: genId(), content: "Update landing page" },
      { id: genId(), content: "Write hero headline" },
    ],
  },
  selected: {
    id: "selected",
    name: "Selected",
    color: "bg-yellow-100 dark:bg-yellow-900/30",
    items: [{ id: genId(), content: "Design feature card" }],
  },
  running: {
    id: "running",
    name: "Running",
    color: "bg-amber-100 dark:bg-amber-900/30",
    items: [{ id: genId(), content: "Build Kanban UI" }],
  },
  evaluating: {
    id: "evaluating",
    name: "Evaluating",
    color: "bg-indigo-100 dark:bg-indigo-900/30",
    items: [],
  },
  live: {
    id: "live",
    name: "Live",
    color: "bg-green-100 dark:bg-green-900/30",
    items: [{ id: genId(), content: "Project kickoff" }],
  },
};

function App() {
  const [columns, setColumns] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialColumns;
  });
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem(DARK_KEY) === "dark";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(columns));
  }, [columns]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem(DARK_KEY, darkMode ? "dark" : "light");
  }, [darkMode]);

  const addTask = (colId, text) => {
    if (!text.trim()) return;
    const newTask = { id: genId(), content: text.trim() };
    setColumns((prev) => ({
      ...prev,
      [colId]: { ...prev[colId], items: [...prev[colId].items, newTask] },
    }));
  };

  const deleteTask = (colId, taskId) => {
    setColumns((prev) => ({
      ...prev,
      [colId]: { ...prev[colId], items: prev[colId].items.filter((t) => t.id !== taskId) },
    }));
  };

  const editTask = (colId, taskId, newContent) => {
    setColumns((prev) => ({
      ...prev,
      [colId]: {
        ...prev[colId],
        items: prev[colId].items.map((t) =>
          t.id === taskId ? { ...t, content: newContent } : t
        ),
      },
    }));
  };

  const moveTask = (updatedColumns) => setColumns(updatedColumns);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-darkbg transition-colors duration-300 p-6">
      <header className="max-w-6xl mx-auto mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            🚀 DragApp — Kanban Board
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Notion-style minimal board with Dark Mode ✨
          </p>
        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 dark:text-gray-100 text-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          {darkMode ? "🌙 Dark" : "☀️ Light"}
        </button>
      </header>

      <main className="max-w-6xl mx-auto">
        <Board
          columns={columns}
          addTask={addTask}
          deleteTask={deleteTask}
          editTask={editTask}
          onColumnsChange={moveTask}
        />
      </main>
    </div>
  );
}

export default App;
