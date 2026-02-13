import Footer from './Footer'
import type React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="pb-safe flex min-h-screen w-full flex-col items-center">
      {children}
      <Footer />
    </main>
  )
}
