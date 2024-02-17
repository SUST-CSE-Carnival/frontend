import AdminDashBoardHero from '@/components/AdminDashBoardHero'
import React from 'react'

export default function layout({ children }) {
  return (
    <main>
      <AdminDashBoardHero />
      <div>
        { children }
      </div>
    </main>
  )
}
