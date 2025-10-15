import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import "./App.css";


export default function App() {
  const [columns, setColumns] = useState({
    todo: {
      name: "To Do",
      tasks: [
        { id: 1, title: "Design landing page", desc: "Start wireframe in Figma" },
        { id: 2, title: "Set up analytics", desc: "Add Google Tag Manager" },
      ],
    },
    progress: {
      name: "In Progress",
      tasks: [{ id: 3, title: "Write documentation", desc: "Update README and wiki" }],
    },
    review: {
      name: "In Review",
      tasks: [{ id: 4, title: "Review the Codes", desc: "Checking the code review" }],
    },

    done: {
      name: "Done",
      tasks: [{ id: 5, title: "Deploy to Netlify", desc: "Live now 🎉" }],
    },
  });

  // Dark mode setup
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [viewMode, setViewMode] = useState("board"); 

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Board logic
  const addTask = (colId, newTask) => {
    setColumns((prev) => ({
      ...prev,
      [colId]: { ...prev[colId], tasks: [...prev[colId].tasks, newTask] },
    }));
  };

  const deleteTask = (colId, taskId) => {
    setColumns((prev) => ({
      ...prev,
      [colId]: {
        ...prev[colId],
        tasks: prev[colId].tasks.filter((t) => t.id !== taskId),
      },
    }));
  };

  const editTask = (colId, taskId, updatedTask) => {
    setColumns((prev) => ({
      ...prev,
      [colId]: {
        ...prev[colId],
        tasks: prev[colId].tasks.map((t) =>
          t.id === taskId ? { ...t, ...updatedTask } : t
        ),
      },
    }));
  };

  const moveTask = (from, to, task) => {
    setColumns((prev) => {
      const updated = { ...prev };
      updated[from].tasks = updated[from].tasks.filter((t) => t.id !== task.id);
      updated[to].tasks = [...updated[to].tasks, task];
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 flex flex-col items-center py-8 px-4 transition-all duration-300">
      {/* Header */}
      <header className="w-full max-w-7xl mb-8 flex justify-between items-center flex-wrap gap-4">
        <div className="text-center flex-1">
          <h1 className="text-3xl sm:text-4xl font-bold mb-1">
            DragBoard — Modern Kanban
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Streamline your daily workflow — inspired by Huly, built by Vikram
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-7xl">
        {/* Kanban Board */}
        <main className="flex-1">
          <Board
            columns={columns}
            setColumns={setColumns} 
            addTask={addTask}
            deleteTask={deleteTask}
            editTask={editTask}
            onColumnsChange={moveTask}
            theme={theme}
            setTheme={setTheme}
            viewMode={viewMode}         
            setViewMode={setViewMode} 
          />
        </main>
      </div>

      {/* Footer */}
      <footer className="mt-10 text-center text-xs text-gray-500 dark:text-gray-400">
        Built with 💙 React + TailwindCSS | © {new Date().getFullYear()} DragBoard
      </footer>
    </div>
  );
}
