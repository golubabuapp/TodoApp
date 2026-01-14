"use client"

import { useState } from "react"
import { Trash2, Plus } from "lucide-react"

interface Note {
  id: string
  title: string
  content: string
  createdAt: string
}

interface NotesPageProps {
  notes: Note[]
  onAddNote: (title: string, content: string) => void
  onDeleteNote: (id: string) => void
}

export default function NotesPage({ notes, onAddNote, onDeleteNote }: NotesPageProps) {
  const [newNoteTitle, setNewNoteTitle] = useState("")
  const [newNoteContent, setNewNoteContent] = useState("")

  const handleAddNote = () => {
    if (newNoteTitle.trim()) {
      onAddNote(newNoteTitle, newNoteContent)
      setNewNoteTitle("")
      setNewNoteContent("")
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-foreground mb-8">My Notes</h2>

      <div className="bg-card border border-border rounded-xl p-6 mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-4">Create New Note</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Note title..."
            value={newNoteTitle}
            onChange={(e) => setNewNoteTitle(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <textarea
            placeholder="Write your note here..."
            value={newNoteContent}
            onChange={(e) => setNewNoteContent(e.target.value)}
            rows={5}
            className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={handleAddNote}
            className="w-full bg-primary text-primary-foreground py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 font-medium"
          >
            <Plus size={20} />
            Save Note
          </button>
        </div>
      </div>

      {notes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow flex flex-col"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-foreground text-lg break-words flex-1">{note.title}</h3>
                <button
                  onClick={() => onDeleteNote(note.id)}
                  className="text-destructive hover:bg-destructive/10 p-2 rounded transition-colors flex-shrink-0"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <p className="text-muted-foreground text-sm flex-1 whitespace-pre-wrap break-words">{note.content}</p>
              <p className="text-xs text-muted-foreground mt-4">
                {new Date(note.createdAt).toLocaleDateString()} {new Date(note.createdAt).toLocaleTimeString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No notes yet. Create one to get started!</p>
        </div>
      )}
    </div>
  )
}
