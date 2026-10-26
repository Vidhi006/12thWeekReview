import { useState, type ReactNode } from 'react'

export type Note = {
  id: number
  title: string
  content: string
  archived: boolean
  shared: boolean
}
type NoteSearchProps = {
  notes: Note[]
  children: (filteredNotes: Note[]) => ReactNode
}
const NoteSearch = ({ notes, children }: NoteSearchProps) => {
  const [query, setQuery] = useState('')
  const filteredNotes = notes.filter((note) =>
    `${note.title} ${note.content}`.includes(query),
  )

  return (
    <section>
      <label>
        Search notes: {''}
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>
      {filteredNotes.length === 0?(
        <p>No matching notes found</p>
      ):(
        children(filteredNotes)
      )}
    </section>
  )
}

export default NoteSearch
