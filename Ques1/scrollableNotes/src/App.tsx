import { Fragment, useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import './App.css'

type Note = {
  id:number,
  text : string
}
type Coordinates = {
  x: number
  y: number
}

type MouseTrackerProps = {
  children:(coordinates: Coordinates)=>ReactNode
}
function MouseTracker({ children }: MouseTrackerProps) {
  const [coordinates, setCoordinates] = useState({ x:0, y:0})
  return (
    <div onMouseMove={(event) =>setCoordinates({x:event.clientX, y:event.clientY })}>
      {children(coordinates)}
    </div>
  )
}
function ScrollableNotesWithModal() {
  const [notes, setNotes] = useState<Note[]>([])
  const [draft, setDraft] = useState('')
  const [noteToDelete, setNoteToDelete] = useState<Note | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const confirmDeleteRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!noteToDelete) return
    confirmDeleteRef.current?.focus()
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setNoteToDelete(null)
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [noteToDelete])

  const addNote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const text = draft
    if(!text) {
      inputRef.current?.focus()
      return
    }

    setNotes((currentNotes) => [
      ...currentNotes,
      { id: Date.now(), text },
    ])
    setDraft('')
    inputRef.current?.focus()

    
  }

  const deleteNote = () => {
    if(!noteToDelete)return
    setNotes((currentNotes) =>
      currentNotes.filter((note) => note.id !== noteToDelete.id),
    )
    setNoteToDelete(null)
    inputRef.current?.focus()
  }

  return (
    <>
    <MouseTracker>
      {({x, y})=>(
        <div>
          <h1>Scrollable Notes</h1>
          <p>Mouse position:{x},{y}</p>
          <form onSubmit={addNote}>
            <label htmlFor="new-note">New note: </label>
            <input
              id="new-note"
              onChange={(event) => setDraft(event.target.value)}
              ref={inputRef}
              value={draft}
            />
            <button type="submit">Add note</button>
          </form>
          <h2>Notes({notes.length})</h2>
          <div>
            {notes.map((note) => (
              <Fragment key={note.id}>
                <p>{note.text}</p>
                <button
                  onClick={() => setNoteToDelete(note)}
                  type="button"
                >
                  Delete
                </button>
              </Fragment>
            ))}
          </div>
        </div>
      )}
    </MouseTracker>
    {noteToDelete &&
      createPortal(
        <div
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setNoteToDelete(null)
              inputRef.current?.focus()
            }
          }}
        >
          <div>
            <p>Are you sure you want to delete “{noteToDelete.text}”?</p>
            <div >
              <button
                onClick={() => {
                  setNoteToDelete(null)
                  inputRef.current?.focus()
                }}
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={deleteNote}
                ref={confirmDeleteRef}
                type="button"
              >
                Delete
              </button>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  )
}

export default ScrollableNotesWithModal
