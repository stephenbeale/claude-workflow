export default function ChecklistItem({ item, onToggle, onDelete, onEdit }) {
  return (
    <li className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-50 group">
      <input
        type="checkbox"
        checked={item.checked}
        onChange={() => onToggle(item.id)}
        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
      />
      <span
        className={`flex-1 text-gray-800 ${item.checked ? 'line-through text-gray-400' : ''}`}
        onDoubleClick={() => onEdit(item.id)}
      >
        {item.text}
      </span>
      <button
        onClick={() => onDelete(item.id)}
        className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-opacity text-sm px-2 py-1"
        title="Delete item"
      >
        ✕
      </button>
    </li>
  )
}
