import { useState } from 'react'
import ChecklistForm from './ChecklistForm'

export default function ChecklistList({ checklists, onSelect, onCreate, onDelete, onRename }) {
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const handleCreate = (name) => {
    onCreate(name)
    setShowForm(false)
  }

  const handleRename = (name) => {
    if (editingId) {
      onRename(editingId, name)
      setEditingId(null)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Checklists</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          + New
        </button>
      </div>

      {checklists.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg mb-2">No checklists yet</p>
          <p className="text-sm">Create one to get started!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {checklists.map((cl) => {
            const items = cl.items || []
            const checked = items.filter((i) => i.checked).length
            const total = items.length
            const progress = total > 0 ? Math.round((checked / total) * 100) : 0

            return (
              <div
                key={cl.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer group"
                onClick={() => onSelect(cl.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 truncate">{cl.name}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      {total > 0 ? (
                        <>
                          <div className="w-24 bg-gray-200 rounded-full h-1.5">
                            <div
                              className="bg-blue-600 h-1.5 rounded-full transition-all"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-500">{checked}/{total}</span>
                        </>
                      ) : (
                        <span className="text-sm text-gray-400">No items</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => {
                        setEditingId(cl.id)
                      }}
                      className="text-gray-400 hover:text-blue-600 p-2 rounded-lg hover:bg-blue-50 transition-colors text-sm"
                      title="Rename"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(cl.id)}
                      className="text-gray-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors text-sm"
                      title="Delete"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {showForm && (
        <ChecklistForm onSave={handleCreate} onCancel={() => setShowForm(false)} />
      )}
      {editingId && (
        <ChecklistForm
          onSave={handleRename}
          onCancel={() => setEditingId(null)}
          initialName={checklists.find((c) => c.id === editingId)?.name || ''}
        />
      )}
    </div>
  )
}
