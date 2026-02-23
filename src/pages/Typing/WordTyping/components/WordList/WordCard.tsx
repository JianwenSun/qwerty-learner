import PartsOfSpeechListView from '@/components/PartsOfSpeechListView'
import type { WordPronunciationIconRef } from '@/components/WordPronunciationIcon'
import { WordPronunciationIcon } from '@/components/WordPronunciationIcon'
import { isOpenDarkModeAtom, phoneticConfigAtom } from '@/store'
import type { Word } from '@/typings'
import { useAtom, useAtomValue } from 'jotai'
import { useCallback, useRef } from 'react'

type Prop = {
  word: Word
  isActive: boolean
  onSelected: (word: Word) => void
}

export default function WordCard({ word, isActive, onSelected }: Prop) {
  const wordPronunciationIconRef = useRef<WordPronunciationIconRef>(null)
  const phoneticConfig = useAtomValue(phoneticConfigAtom)
  const [isOpenDarkMode] = useAtom(isOpenDarkModeAtom)

  const handleClick = useCallback(() => {
    wordPronunciationIconRef.current?.play()
    onSelected(word)
  }, [onSelected, word])

  return (
    <div
      className={`mb-2 flex cursor-pointer select-none items-center rounded-xl p-4 shadow focus:outline-none ${
        isActive ? 'bg-gray-200 dark:bg-gray-700' : 'bg-white dark:bg-gray-700 dark:bg-opacity-20'
      }   `}
      key={word.name}
      onClick={handleClick}
    >
      <div className="flex-1">
        <p className={`font-mono text-xl font-normal leading-6 ${isOpenDarkMode ? 'text-gray-50' : 'text-gray-800'}`}>
          {word.name}
          {phoneticConfig.type === 'us' && word.usphone && word.usphone.length > 1 && (
            <span className="text-sm font-normal text-gray-600 dark:text-gray-400">{`     [${word.usphone}]`}</span>
          )}
          {phoneticConfig.type === 'uk' && word.ukphone && word.ukphone.length > 1 && (
            <span className="text-sm font-normal text-gray-600 dark:text-gray-400">{`     [${word.ukphone}]`}</span>
          )}
        </p>
        <PartsOfSpeechListView word={word} />
      </div>
      <WordPronunciationIcon word={word} className="h-8 w-8" ref={wordPronunciationIconRef} />
    </div>
  )
}
