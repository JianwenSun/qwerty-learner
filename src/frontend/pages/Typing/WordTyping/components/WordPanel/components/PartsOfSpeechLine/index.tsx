import PartsOfSpeech from '../PartsOfSpeech'
import { fontSizeConfigAtom, isOpenDarkModeAtom, isTextSelectableAtom, pronunciationConfigAtom } from '@/store'
import { Word, WordWithIndex } from '@/typings'
import { useAtomValue } from 'jotai'

export type PartsOfSpeechLineProps = {
  word: WordWithIndex | Word
  showTrans?: boolean
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

function PartsOfSpeechLine({ word, showTrans = true, onMouseEnter, onMouseLeave }: PartsOfSpeechLineProps) {
  const isTextSelectable = useAtomValue(isTextSelectableAtom)
  const fontSizeConfig = useAtomValue(fontSizeConfigAtom)
  const isOpenDarkMode = useAtomValue(isOpenDarkModeAtom)

  const shouldShow = showTrans && word.pos && word.pos.length > 0

  return (
    <div
      className={`mb-4 mt-4 flex flex-row items-center justify-center space-x-3
        ${isTextSelectable && 'select-text'} ${isOpenDarkMode ? 'text-white text-opacity-80' : 'text-gray-600'} `}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ fontSize: fontSizeConfig.translateFont.toString() + 'px' }}
    >
      {word.pos?.map((pos, index) => (
        <PartsOfSpeech key={pos.type || index} pos={pos} showTrans={shouldShow} />
      ))}
    </div>
  )
}

export default PartsOfSpeechLine
