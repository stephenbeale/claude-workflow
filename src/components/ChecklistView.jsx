import { useState } from 'react'
import ChecklistItem from './ChecklistItem'

export default function ChecklistView({ checklist, onBack, onUpdate }) {
  const [newItem, setNewItem] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')

  const items = checklist.items || []
  const checked = items.filter((i) => i.checked).length
  const total = items.length
  const progress = total > 0 ? Math.round((checked / total) * 100) : 0

  const addItem = (e) => {
    e.preventDefault()
    const trimmed = newItem.trim()
    if (!trimmed) return
    onUpdate({
      ...checklist,
      items: [...items, { id: Date.now().toString(), text: trimmed, checked: false }],
    })
    setNewItem('')
  }

  const toggleItem = (id) => {
    onUpdate({
      ...checklist,
      items: items.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i)),
    })
  }

  const deleteItem = (id) => {
    onUpdate({
      ...checklist,
      items: items.filter((i) => i.id !== id),
    })
  }

  const startEdit = (id) => {
    const item = items.find((i) => i.id === id)
    if (item) {
      setEditingId(id)
      setEditText(item.text)
    }
  }

  const saveEdit = (e) => {
    e.preventDefault()
    const trimmed = editText.trim()
    if (trimmed && editingId) {
      onUpdate({
        ...checklist,
        items: items.map((i) => (i.id === editingId ? { ...i, text: trimmed } : i)),
      })
    }
    setEditingId(null)
    setEditText('')
  }

  const resetAll = () => {
    onUpdate({
      ...checklist,
      items: items.map((i) => ({ ...i, checked: false })),
    })
  }

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={onBack}
        className="text-blue-600 hover:text-blue-800 mb-4 inline-flex items-center gap-1 transition-colors"
      >
        ← Back
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{checklist.name}</h2>
          {total > 0 && (
            <button
              onClick={resetAll}
              className="text-sm text-gray-500 hover:text-orange-600 transition-colors px-3 py-1 rounded-lg hover:bg-orange-50"
            >
              Reset all
            </button>
          )}
        </div>

        {total > 0 && (
          <div className="mb-5">
            <div className="flex justify-between text-sm text-gray-500 mb-1">
              <span>{checked} of {total} done</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <ul className="space-y-1 mb-4">
          {items.map((item) =>
            editingId === item.id ? (
              <li key={item.id} className="py-2 px-3">
                <form onSubmit={saveEdit} className="flex gap-2">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    autoFocus
                    className="flex-1 px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                  />
                  <button type="submit" className="text-blue-600 hover:text-blue-800 text-sm">Save</button>
                  <button type="button" onClick={() => setEditingId(null)} className="text-gray-400 hover:text-gray-600 text-sm">Cancel</button>
                </form>
              </li>
            ) : (
              <ChecklistItem
                key={item.id}
                item={item}
                onToggle={toggleItem}
                onDelete={deleteItem}
                onEdit={startEdit}
              />
            )
          )}
        </ul>

        {items.length === 0 && (
          <p className="text-gray-400 text-center py-6">No items yet. Add one below.</p>
        )}

        <form onSubmit={addItem} className="flex gap-2 mt-4">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add new item..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
          />
          <button
            type="submit"
            disabled={!newItem.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  )
}
