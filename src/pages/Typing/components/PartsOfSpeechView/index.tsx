import { isTextSelectableAtom } from '@/store'
import { POS_TYPE_COLOR_MAP, POS_TYPE_MAP, type Pos } from '@/typings'
import { useAtomValue } from 'jotai'

export type PartsOfSpeechViewProps = {
  pos: Pos
}

// 默认颜色
const defaultPosColor = 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'

function PartsOfSpeechView({ pos }: PartsOfSpeechViewProps) {
  const isTextSelectable = useAtomValue(isTextSelectableAtom)

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
      className={`relative inline-flex flex-row items-center justify-center pr-8 transition-colors ${isTextSelectable && 'select-text'}`}
    >
      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${colorClassName}`}>
        {posType.displayName} / {posType.name}
      </span>

      <span className="ml-2">{pos.definition || ''}</span>
    </div>
  )
}

export default PartsOfSpeechView
