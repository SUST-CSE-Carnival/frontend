import PharmacyDashBoardHero from '@/components/PharmacyDashBoardHero'
import React from 'react'

export default function layout({ params, children }) {
  return (
    <main>
      <PharmacyDashBoardHero id={params.id} />
      <div>
        { children }
      </div>
    </main>
  )
}
