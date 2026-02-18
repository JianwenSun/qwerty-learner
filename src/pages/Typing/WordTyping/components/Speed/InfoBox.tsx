import { isOpenDarkModeAtom } from '@/store'
import { useAtom } from 'jotai'
import React from 'react'

const InfoBox: React.FC<InfoBoxProps> = ({ info, description }) => {
  const [isOpenDarkMode] = useAtom(isOpenDarkModeAtom)

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <span
        className={`w-4/5 border-b pb-2 text-center text-xl font-bold ${
          isOpenDarkMode ? 'border-gray-400 text-gray-50' : 'border-gray-800 text-gray-800'
        } transition-colors duration-300`}
      >
        {info}
      </span>
      <span className={`pt-2 text-xs transition-colors duration-300 ${isOpenDarkMode ? 'text-gray-50' : 'text-gray-800'}`}>
        {description}
      </span>
    </div>
  )
}

export default React.memo(InfoBox)

export type InfoBoxProps = {
  info: string
  description: string
}
