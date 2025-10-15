import { Draggable } from "@hello-pangea/dnd";
import { XCircle } from "lucide-react";

export default function Task({ task, colId, index, deleteTask, borderColor, shadowClass }) {
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`p-3 bg-gray-100 dark:bg-gray-700 rounded-lg border-l-4 ${borderColor} transform transition-all duration-200 ease-out ${shadowClass} hover:-translate-y-1`}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium">{task.title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{task.desc}</p>
            </div>
            <button
              onClick={() => deleteTask(colId, task.id)}
              className="text-red-400 hover:text-red-500"
            >
              <XCircle size={18} />
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
}
