"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import Dashboard from "@/components/dashboard"
import TasksPage from "@/components/tasks-page"
import NotesPage from "@/components/notes-page"
import SettingsPage from "@/components/settings-page"

type Page = "dashboard" | "tasks" | "notes" | "settings"

interface Task {
  id: string
  title: string
  description: string
  completed: boolean
  createdAt: string
}

interface Note {
  id: string
  title: string
  content: string
  createdAt: string
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard")
  const [tasks, setTasks] = useState<Task[]>([])
  const [notes, setNotes] = useState<Note[]>([])
  const [userName, setUserName] = useState("User")

  // Load data from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks")
    const savedNotes = localStorage.getItem("notes")
    const savedUserName = localStorage.getItem("userName")

    if (savedTasks) setTasks(JSON.parse(savedTasks))
    if (savedNotes) setNotes(JSON.parse(savedNotes))
    if (savedUserName) setUserName(JSON.parse(savedUserName))
  }, [])

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])

  const addTask = (title: string, description: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      createdAt: new Date().toISOString(),
    }
    setTasks([newTask, ...tasks])
  }

  const toggleTask = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const addNote = (title: string, content: string) => {
    const newNote: Note = {
      id: Date.now().toString(),
      title,
      content,
      createdAt: new Date().toISOString(),
    }
    setNotes([newNote, ...notes])
  }

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  const updateUserName = (newName: string) => {
    setUserName(newName)
    localStorage.setItem("userName", JSON.stringify(newName))
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />

      <main className="pt-20">
        {currentPage === "dashboard" && (
          <Dashboard
            userName={userName}
            tasksCount={tasks.length}
            completedCount={tasks.filter((t) => t.completed).length}
            notesCount={notes.length}
            onNavigate={setCurrentPage}
          />
        )}

        {currentPage === "tasks" && (
          <TasksPage tasks={tasks} onAddTask={addTask} onToggleTask={toggleTask} onDeleteTask={deleteTask} />
        )}

        {currentPage === "notes" && <NotesPage notes={notes} onAddNote={addNote} onDeleteNote={deleteNote} />}

        {currentPage === "settings" && <SettingsPage userName={userName} onUpdateUserName={updateUserName} />}
      </main>
    </div>
  )
}
