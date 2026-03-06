import { UrlPronunciationIcon, UrlPronunciationIconRef } from '@/components/UrlPronunciationIcon'
import { useRef, useCallback } from 'react'

interface WordExampleItemProps {
  contentEn: string
  contentCn: string
  audioUrl: string
  onWordSelect: (word: string) => void
}

export default function WordExampleItem({ contentEn, contentCn, audioUrl, onWordSelect }: WordExampleItemProps) {
  // 每个组件都有自己独立的 ref
  const urlPronunciationIconRef = useRef<UrlPronunciationIconRef>(null)

  // 播放发音的函数
  const handlePlay = useCallback(() => {
    if (audioUrl) {
      urlPronunciationIconRef.current?.play()
    }
  }, [audioUrl])

  // 将句子分割成单词和非单词部分
  const renderClickableWords = (text: string) => {
    // 首先处理<vocab>标签
    const parts = text.split(/(<vocab>|<\/vocab>)/)
    const result: JSX.Element[] = []

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]

      if (part === '<vocab>') continue
      if (part === '</vocab>') continue

      const isVocab = /<vocab>/.test(parts[i - 1] || '')

      // 将文本分割成单词
      const words = part.split(/(\s+|[.,!?;:-])/)

      words.forEach((word, j) => {
        // 检查是否是单词（至少有一个字母）
        if (/[a-zA-Z]/.test(word)) {
          result.push(
            <span
              key={`${i}-${j}`}
              className={`cursor-pointer hover:underline ${isVocab ? 'rounded bg-yellow-200 px-1 dark:bg-yellow-800' : ''}`}
              onClick={(e) => {
                // 阻止事件冒泡，避免触发整个句子的发音
                e.stopPropagation()
                onWordSelect(word)
              }}
            >
              {word}
            </span>,
          )
        } else {
          // 非单词部分（空格、标点符号）
          result.push(<span key={`${i}-${j}`}>{word}</span>)
        }
      })
    }

    return result
  }

  return (
    <div
      className="cursor-pointer rounded-lg bg-gray-100 p-3 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
      onClick={handlePlay}
    >
      <div className="flex items-center justify-between font-medium">
        <div>{renderClickableWords(contentEn)}</div>
        {audioUrl && <UrlPronunciationIcon url={audioUrl} className="h-8 w-8" ref={urlPronunciationIconRef} />}
      </div>
      <div className="mt-1 text-gray-600 dark:text-gray-400">{contentCn}</div>
    </div>
  )
}
