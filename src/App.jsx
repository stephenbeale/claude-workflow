import { useState } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import ChecklistList from './components/ChecklistList'
import ChecklistView from './components/ChecklistView'

export default function App() {
  const [checklists, setChecklists] = useLocalStorage('checklists', [])
  const [activeId, setActiveId] = useState(null)

  const activeChecklist = checklists.find((c) => c.id === activeId)

  const createChecklist = (name) => {
    setChecklists([...checklists, { id: Date.now().toString(), name, items: [] }])
  }

  const deleteChecklist = (id) => {
    setChecklists(checklists.filter((c) => c.id !== id))
    if (activeId === id) setActiveId(null)
  }

  const renameChecklist = (id, name) => {
    setChecklists(checklists.map((c) => (c.id === id ? { ...c, name } : c)))
  }

  const updateChecklist = (updated) => {
    setChecklists(checklists.map((c) => (c.id === updated.id ? updated : c)))
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="px-4 py-8">
        {activeChecklist ? (
          <ChecklistView
            checklist={activeChecklist}
            onBack={() => setActiveId(null)}
            onUpdate={updateChecklist}
          />
        ) : (
          <ChecklistList
            checklists={checklists}
            onSelect={setActiveId}
            onCreate={createChecklist}
            onDelete={deleteChecklist}
            onRename={renameChecklist}
          />
        )}
      </div>
    </div>
  )
}
