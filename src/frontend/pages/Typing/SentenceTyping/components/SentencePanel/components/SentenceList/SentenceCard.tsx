import { UrlPronunciationIcon, UrlPronunciationIconRef } from '@/components/UrlPronunciationIcon'
import { getSentenceSoundUrl, Sentence, SentenceAndSound } from '@/plugins/wxs/wxs'
import { getSentenceSound } from '@/plugins/wxs/wxsApi'
import { isOpenDarkModeAtom, pronunciationConfigAtom } from '@/store'
import { useAtom, useAtomValue } from 'jotai'
import { useCallback, useEffect, useRef, useState } from 'react'

type Prop = {
  sentence: Sentence
  isActive: boolean
  onSelected: (sentenceId: number) => void
}

export default function SentenceCard({ sentence, isActive, onSelected }: Prop) {
  const sentencePronunciationIconRef = useRef<UrlPronunciationIconRef>(null)
  const [isOpenDarkMode] = useAtom(isOpenDarkModeAtom)

  const [currentSentence, setCurrentSentence] = useState<SentenceAndSound>()
  const pronunciationConfig = useAtomValue(pronunciationConfigAtom)

  useEffect(() => {
    const loadCurrentSentence = async () => {
      try {
        const sentenceSoundId = await getSentenceSound(sentence.sentenceId)
        const sentenceSoundUrl = getSentenceSoundUrl(sentenceSoundId, pronunciationConfig)
        setCurrentSentence({ ...sentence, soundUrl: sentenceSoundUrl } as SentenceAndSound)
      } catch (error) {
        console.error('Error loading sentence:', error)
      }
    }

    loadCurrentSentence()
  }, [sentence, pronunciationConfig])

  const onClick = useCallback(() => {
    onSelected(sentence.sentenceId)
    sentencePronunciationIconRef.current?.play()
  }, [onSelected, sentence.sentenceId])

  return (
    <div
      className={`mb-2 flex cursor-pointer select-none items-center rounded-xl p-4 shadow focus:outline-none ${
        isActive ? 'bg-gray-200 dark:bg-gray-700' : 'bg-white dark:bg-gray-700 dark:bg-opacity-20'
      }   `}
      key={sentence.sentenceId}
      onClick={onClick}
    >
      <div className="flex-1">
        <p className={`font-mono text-xl font-normal leading-6 ${isOpenDarkMode ? 'text-gray-50' : 'text-gray-800'}`}>{sentence.content}</p>
        <p className={`mt-2 text-sm ${isOpenDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{sentence.chinese}</p>
      </div>
      <UrlPronunciationIcon url={currentSentence?.soundUrl} className="ml-3 h-8 w-8" ref={sentencePronunciationIconRef} />
    </div>
  )
}
