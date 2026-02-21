import style from './index.module.css'
import { WordContent } from './type'
import { fontSizeConfigAtom } from '@/store'
import { useAtomValue } from 'jotai'

export default function Word({ word, visible = true }: { word: WordContent; visible?: boolean }) {
  const fontSizeConfig = useAtomValue(fontSizeConfigAtom)

  const content = word.content || ''
  const inputWord = word.inputWord || ''
  const wordLength = Math.max(content.length, inputWord.length)

  // 计算每个字母的宽度，基于单词总长度
  const charWidth = 16 // 每个字母的固定宽度
  const totalWidth = wordLength * (charWidth + 4) // 4px 是 marginRight

  const renderBorderColor = () => {
    if (word.hasWrong) {
      if (word.isCurrent) {
        return 'border-red-400'
      }
      return 'border-gray-400'
    } else {
      if (word.isCurrent) {
        return 'border-blue-500'
      } else {
        return 'border-gray-400'
      }
    }
  }

  const renderTextColor = () => {
    if (word.hasWrong === undefined) {
      return 'text-blue-500'
    } else if (word.hasWrong) {
      return 'text-red-400'
    } else {
      return 'text-green-600'
    }
  }

  // 计算需要显示的字母
  const renderContent = () => {
    // 应用文本颜色类名
    return <span className={renderTextColor()}>{inputWord}</span>
  }

  return (
    <span
      className={`m-0 border-b-2 font-mono font-normal duration-0 ${word.hasWrong ? style.wrong : ''} ${renderBorderColor()}`}
      style={{
        width: `${totalWidth}px`,
        height: '40px',
        fontSize: fontSizeConfig.sentenceFont.toString() + 'px',
        display: 'inline-block',
        marginRight: '8px',
        verticalAlign: 'bottom',
        lineHeight: '28px',
        textAlign: 'center',
        paddingBottom: '5px',
      }}
    >
      {renderContent()}
    </span>
  )
}
