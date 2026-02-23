import Footer from './Footer'
import type React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="pb-safe flex grid h-full min-h-screen w-full w-full grid-rows-[15%_65%_20%] flex-col items-center">
      {children}
      {/* <Footer /> */}
    </main>
  )
}
