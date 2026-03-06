import { SentenceTypingContext } from '../../../../store'
import { useContext, useEffect, useState } from 'react'

export default function Progress({ className }: { className?: string }) {
  // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
  const { state } = useContext(SentenceTypingContext)!
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState(0)

  const colorSwitcher: { [key: number]: string } = {
    0: 'bg-green-500 dark:bg-green-400',
    1: 'bg-green-500 dark:bg-green-400',
    2: 'bg-green-500 dark:bg-green-400',
  }

  useEffect(() => {
    const newProgress = Math.floor((state.chapterData.index / state.chapterData.sentences.length) * 100)
    setProgress(newProgress)
    const colorPhase = Math.floor(newProgress / 33.4)
    setPhase(colorPhase)
  }, [state.chapterData.index, state.chapterData.sentences.length])

  return (
    <div className={`w-1/2 ${className}`}>
      <div className="mb-6 flex h-1 overflow-hidden rounded-xl bg-gray-300 text-xs transition-all duration-300 dark:bg-gray-600">
        <div
          style={{ width: `${progress}%` }}
          className={`flex flex-col justify-center whitespace-nowrap rounded-xl text-center text-white shadow-none transition-all duration-300 ${colorSwitcher[phase]}`}
        ></div>
      </div>
    </div>
  )
}
