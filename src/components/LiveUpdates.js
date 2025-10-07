import React from "react";

export default function LiveUpdates() {
  const updates = [
    { title: "Vikram updated the Kanban board UI", time: "Just now" },
    { title: "New task added: ‘Setup Firebase Sync’", time: "5 mins ago" },
    { title: "User testing completed on mobile layout", time: "1 hr ago" },
    { title: "Dark mode successfully integrated", time: "Yesterday" },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 min-w-[260px] max-h-[500px] overflow-y-auto border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-900 dark:text-gray-100">
        📰 Live Updates
      </h3>

      <ul className="space-y-3">
        {updates.map((update, i) => (
          <li key={i} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/40 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
            <p className="font-medium text-gray-800 dark:text-gray-100">
              {update.title}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {update.time}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
