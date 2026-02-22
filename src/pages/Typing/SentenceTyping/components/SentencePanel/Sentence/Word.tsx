import style from './index.module.css'
import { WordContent } from './type'
import { fontSizeConfigAtom } from '@/store'
import { useAtomValue } from 'jotai'
import { useMemo } from 'react'

// 计算文本宽度的工具函数
const calculateTextWidth = (text: string, fontSize: number, font: string = 'monospace') => {
  // 创建一个隐藏的 canvas 元素
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  if (!context) {
    // 如果无法获取 context，返回一个默认值
    return text.length * (fontSize * 0.6)
  }

  // 设置字体样式
  context.font = `${fontSize}px ${font}`

  // 测量文本宽度
  const metrics = context.measureText(text)
  return metrics.width
}

export default function Word({ word, visible = true }: { word: WordContent; visible?: boolean }) {
  const fontSizeConfig = useAtomValue(fontSizeConfigAtom)

  const content = word.content || ''
  const inputWord = word.inputWord || ''

  // 使用 Canvas API 精确计算文本宽度
  const textWidth = useMemo(() => {
    const baseWidth = calculateTextWidth(content, fontSizeConfig.sentenceFont)
    // 添加一些内边距
    return Math.max(20, baseWidth + 8) // 8px 是左右内边距之和
  }, [content, fontSizeConfig.sentenceFont])

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
        height: '40px',
        fontSize: fontSizeConfig.sentenceFont.toString() + 'px',
        display: 'inline-flex',
        alignItems: 'center',
        marginRight: '8px',
        verticalAlign: 'bottom',
        lineHeight: '28px',
        textAlign: 'center',
        paddingBottom: '5px',
        minWidth: `${textWidth}px`,
        paddingLeft: '4px',
        paddingRight: '4px',
        maxWidth: '100%',
        wordBreak: 'break-all',
      }}
    >
      {renderContent()}
    </span>
  )
}
