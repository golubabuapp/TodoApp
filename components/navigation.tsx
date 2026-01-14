"use client"

import { CheckSquare, Home, FileText, Settings } from "lucide-react"

type Page = "dashboard" | "tasks" | "notes" | "settings"

interface NavigationProps {
  currentPage: Page
  onPageChange: (page: Page) => void
}

export default function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "tasks", label: "Tasks", icon: CheckSquare },
    { id: "notes", label: "Notes", icon: FileText },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 bg-card border-b border-border shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">TaskHub</h1>

        <div className="flex gap-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.id
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id as Page)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <Icon size={20} />
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
