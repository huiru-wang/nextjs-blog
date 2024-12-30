'use client'

import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function CollapsibleCode({ children }) {

  const [isCollapsed, setIsCollapsed] = useState(true)

  const toggleCollapse = () => setIsCollapsed(!isCollapsed)

  return (
    <div className="relative bg-black border rounded-sm border-[var(--border)] shadow-[2px_2px_2px_0_var(--border)]">
      <button
        onClick={toggleCollapse}
        className="absolute top-2 right-2 p-1 text-white"
      >
        {isCollapsed ? <ChevronDown size={24} /> : <ChevronUp size={24} />}
      </button>
      <pre className={`my-0 ${isCollapsed ? 'max-h-16 overflow-hidden' : ''}`}>
        {children}
      </pre>
    </div>
  )
}