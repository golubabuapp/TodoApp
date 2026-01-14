"use client"

import { useState } from "react"
import { Save } from "lucide-react"

interface SettingsPageProps {
  userName: string
  onUpdateUserName: (name: string) => void
}

export default function SettingsPage({ userName, onUpdateUserName }: SettingsPageProps) {
  const [name, setName] = useState(userName)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    if (name.trim()) {
      onUpdateUserName(name)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-foreground mb-8">Settings</h2>

      <div className="bg-card border border-border rounded-xl p-8 space-y-8">
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Profile</h3>
          <p className="text-muted-foreground mb-6">Manage your profile information</p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <button
              onClick={handleSave}
              className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 font-medium"
            >
              <Save size={18} />
              Save Changes
            </button>

            {saved && <p className="text-green-600 text-sm font-medium">Changes saved successfully!</p>}
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <h3 className="text-xl font-semibold text-foreground mb-2">About</h3>
          <div className="space-y-2 text-muted-foreground text-sm">
            <p>TaskHub v1.0</p>
            <p>A simple and powerful task management application</p>
            <p className="mt-4">Your data is stored locally in your browser and never sent to any server.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
