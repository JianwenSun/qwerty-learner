import Tooltip from '@/components/Tooltip'
import { SoundIcon } from '@/components/WordPronunciationIcon/SoundIcon'
import useSpeech from '@/hooks/useSpeech'
import { isTextSelectableAtom, pronunciationConfigAtom } from '@/store'
import { POS_TYPE_COLOR_MAP, POS_TYPE_MAP, type Pos } from '@/typings'
import { useAtomValue } from 'jotai'
import { useCallback, useMemo } from 'react'

export type PartsOfSpeechProps = {
  pos: Pos
  showTrans?: boolean
}

// 默认颜色
const defaultPosColor = 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'

function PartsOfSpeech({ pos, showTrans = true }: PartsOfSpeechProps) {
  const isTextSelectable = useAtomValue(isTextSelectableAtom)
  const pronunciationConfig = useAtomValue(pronunciationConfigAtom)
  let isShowTransRead = window.speechSynthesis && pronunciationConfig.isTransRead
  const speechOptions = useMemo(() => ({ volume: pronunciationConfig.transVolume }), [pronunciationConfig.transVolume])
  const { speak, speaking } = useSpeech(pos.definition || '', speechOptions)

  const handleClickSoundIcon = useCallback(() => {
    speak(true)
  }, [speak])

  // 防御性编程：确保 pos.type 存在
  if (!pos || !pos.type) {
    return null
  }

  // 获取当前词性的类型信息
  const posType = POS_TYPE_MAP[pos.type] || { name: pos.type, displayName: pos.type }
  // 获取当前词性的颜色类名
  const colorClassName = POS_TYPE_COLOR_MAP[pos.type] || defaultPosColor

  return (
    <div
      className={`relative inline-flex flex-col items-center justify-center rounded-lg px-5 py-2 pr-8 transition-colors duration-300 ${
        isTextSelectable && 'select-text'
      } ${colorClassName} ${!showTrans && 'pointer-events-none opacity-0'}`}
    >
      {isShowTransRead && (
        <div className="absolute right-1 top-1">
          <Tooltip content="朗读释义" className="h-4 w-4 cursor-pointer">
            <SoundIcon animated={speaking} onClick={handleClickSoundIcon} className="h-5 w-5" />
          </Tooltip>
        </div>
      )}
      <span className="text-sm font-medium">
        {posType.displayName} / {posType.name}
      </span>
      <div className="my-1 flex w-full items-center px-2">
        <div className="bg-dashed h-px flex-1 bg-current opacity-50"></div>
      </div>
      <span className="text-xs">{pos.definition || ''}</span>
    </div>
  )
}

export default PartsOfSpeech
