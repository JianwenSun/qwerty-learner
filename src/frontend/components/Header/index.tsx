import type { PropsWithChildren } from 'react'
import type React from 'react'

const Header: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <header className="container z-20 mx-auto w-full px-1 py-1">
      <div className="flex w-full flex-col items-end justify-end space-y-3 lg:flex-row lg:space-y-0">
        <nav className="my-card on element flex w-auto content-center items-center justify-end space-x-3 rounded-xl bg-white p-3 transition-colors duration-300 dark:bg-gray-800">
          {children}
        </nav>
      </div>
    </header>
  )
}

export default Header
