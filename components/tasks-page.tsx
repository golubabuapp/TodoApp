"use client"

import { useState } from "react"
import { Check, Trash2, Plus } from "lucide-react"

interface Task {
  id: string
  title: string
  description: string
  completed: boolean
  createdAt: string
}

interface TasksPageProps {
  tasks: Task[]
  onAddTask: (title: string, description: string) => void
  onToggleTask: (id: string) => void
  onDeleteTask: (id: string) => void
}

export default function TasksPage({ tasks, onAddTask, onToggleTask, onDeleteTask }: TasksPageProps) {
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [newTaskDesc, setNewTaskDesc] = useState("")

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      onAddTask(newTaskTitle, newTaskDesc)
      setNewTaskTitle("")
      setNewTaskDesc("")
    }
  }

  const pendingTasks = tasks.filter((t) => !t.completed)
  const completedTasks = tasks.filter((t) => t.completed)

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-foreground mb-8">My Tasks</h2>

      <div className="bg-card border border-border rounded-xl p-6 mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-4">Add New Task</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Task title..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddTask()}
            className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <textarea
            placeholder="Task description (optional)..."
            value={newTaskDesc}
            onChange={(e) => setNewTaskDesc(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={handleAddTask}
            className="w-full bg-primary text-primary-foreground py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 font-medium"
          >
            <Plus size={20} />
            Add Task
          </button>
        </div>
      </div>

      {pendingTasks.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">Pending Tasks ({pendingTasks.length})</h3>
          <div className="space-y-3">
            {pendingTasks.map((task) => (
              <div
                key={task.id}
                className="bg-card border border-border rounded-lg p-4 flex items-start gap-4 hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => onToggleTask(task.id)}
                  className="mt-1 w-6 h-6 rounded border-2 border-muted-foreground hover:border-primary transition-colors flex items-center justify-center flex-shrink-0"
                ></button>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground break-words">{task.title}</p>
                  {task.description && (
                    <p className="text-sm text-muted-foreground mt-1 break-words">{task.description}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">{new Date(task.createdAt).toLocaleDateString()}</p>
                </div>
                <button
                  onClick={() => onDeleteTask(task.id)}
                  className="text-destructive hover:bg-destructive/10 p-2 rounded transition-colors flex-shrink-0"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {completedTasks.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Completed ({completedTasks.length})</h3>
          <div className="space-y-3">
            {completedTasks.map((task) => (
              <div
                key={task.id}
                className="bg-card border border-border rounded-lg p-4 flex items-start gap-4 opacity-75 hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => onToggleTask(task.id)}
                  className="mt-1 w-6 h-6 rounded border-2 border-green-500 bg-green-500 flex items-center justify-center flex-shrink-0 flex-none"
                >
                  <Check size={16} className="text-white" />
                </button>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground line-through break-words">{task.title}</p>
                  {task.description && (
                    <p className="text-sm text-muted-foreground mt-1 line-through break-words">{task.description}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">{new Date(task.createdAt).toLocaleDateString()}</p>
                </div>
                <button
                  onClick={() => onDeleteTask(task.id)}
                  className="text-destructive hover:bg-destructive/10 p-2 rounded transition-colors flex-shrink-0"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {tasks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No tasks yet. Create one to get started!</p>
        </div>
      )}
    </div>
  )
}
