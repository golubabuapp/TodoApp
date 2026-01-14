"use client"

import { BarChart3, CheckCircle2, FileText, Zap } from "lucide-react"

interface DashboardProps {
  userName: string
  tasksCount: number
  completedCount: number
  notesCount: number
  onNavigate: (page: string) => void
}

export default function Dashboard({ userName, tasksCount, completedCount, notesCount, onNavigate }: DashboardProps) {
  const completionRate = tasksCount === 0 ? 0 : Math.round((completedCount / tasksCount) * 100)

  const stats = [
    {
      label: "Total Tasks",
      value: tasksCount,
      icon: BarChart3,
      color: "bg-blue-500",
      onClick: () => onNavigate("tasks"),
    },
    {
      label: "Completed",
      value: completedCount,
      icon: CheckCircle2,
      color: "bg-green-500",
      onClick: () => onNavigate("tasks"),
    },
    {
      label: "Notes",
      value: notesCount,
      icon: FileText,
      color: "bg-purple-500",
      onClick: () => onNavigate("notes"),
    },
    {
      label: "Completion Rate",
      value: `${completionRate}%`,
      icon: Zap,
      color: "bg-orange-500",
      onClick: () => onNavigate("tasks"),
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h2 className="text-4xl font-bold text-foreground mb-2">Welcome back, {userName}!</h2>
        <p className="text-muted-foreground text-lg">Here's your productivity overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              onClick={stat.onClick}
              className="bg-card border border-border rounded-xl p-6 cursor-pointer hover:shadow-lg hover:border-primary transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
              <p className="text-muted-foreground text-sm mb-2">{stat.label}</p>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            </div>
          )
        })}
      </div>

      <div className="mt-12 bg-card border border-border rounded-xl p-8">
        <h3 className="text-xl font-semibold text-foreground mb-4">Quick Tips</h3>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex items-start gap-3">
            <span className="text-primary mt-1">•</span>
            <span>Click on the Tasks section to create and manage your daily tasks</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary mt-1">•</span>
            <span>Use Notes to jot down ideas and important information</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary mt-1">•</span>
            <span>Check your Settings to personalize your profile</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary mt-1">•</span>
            <span>Your data is saved automatically in your browser</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
