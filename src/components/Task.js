import { Draggable } from "@hello-pangea/dnd";

export default function Task({ task, index, colId, deleteTask }) {
  return (
    <Draggable draggableId={String(task.id)} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-3 shadow-sm hover:shadow-md transition cursor-grab"
        >
          <div className="flex justify-between items-center mb-1">
            <h3 className="font-medium text-sm">{task.title}</h3>
            <button
              onClick={() => deleteTask(colId, task.id)}
              className="text-red-500 text-xs font-bold hover:text-red-700"
            >
              ✕
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">{task.desc}</p>
        </div>
      )}
    </Draggable>
  );
}
