import { useState }from 'react'
import NoteSearch,{ type Note }from './NoteSearch'

type NoteView = 'all'|'archived'|'shared'

const notes: Note[] = [
  {
    id: 1,
    title: 'shopping',
    content: 'milk',
    archived: false,
    shared: false,
  },
  {
    id: 2,
    title: 'project',
    content: 'team meeting',
    archived: false,
    shared: true,
  },
  {
    id: 3,
    title: 'books',
    content: 'find a new book',
    archived: true,
    shared: false,
  },
]
const App = () => {
  const [view, setView] = useState<NoteView>('all')
  const visibleNotes = notes.filter((note) => {
    if (view === 'archived') return note.archived
    if (view === 'shared') return note.shared
    return true
  })
  return (
    <div>
      <h1>Fundoo Notes</h1>
      <label>
        Notes view:{' '}
        <select
          value={view}
          onChange={(event) => setView(event.target.value as NoteView)}
        >
          <option value="all">All Notes</option>
          <option value="archived">Archived Notes</option>
          <option value="shared">Shared Notes</option>
        </select>
      </label>         
      <NoteSearch notes={visibleNotes}>
        {(filteredNotes) => (
          <ul>
            {filteredNotes.map((note) => (
              <li key={note.id}>
                <h2>{note.title}</h2>
                <p>{note.content}</p>
              </li>
            ))}
          </ul>
        )}
      </NoteSearch>
    </div>
  )
}

export default App