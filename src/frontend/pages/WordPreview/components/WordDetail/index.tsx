import WordDetailPopup from '../WordDetailPopup'
import WordExample from '../WordExample'
import WordExts from '../WordExts'
import { Word } from '@/typings'
import { useState, useCallback } from 'react'

type Props = {
  word: Word
}

export default function WordDetail({ word }: Props) {
  const [selectedWord, setSelectedWord] = useState<string | null>(null)
  const [isDetailVisible, setIsDetailVisible] = useState(false)

  // 处理单词选择
  const handleWordSelect = useCallback((word: string) => {
    setSelectedWord(word)
    setIsDetailVisible(true)
  }, [])

  // 处理关闭解释视图
  const handleCloseDetail = useCallback(() => {
    setIsDetailVisible(false)
    setSelectedWord(null)
  }, [])

  return (
    <div className="relative flex h-full flex-col">
      {/* 单词名称 */}
      <div className="mb-4 text-2xl font-bold">{word.name}</div>

      {/* 垂直堆叠显示三个组件 */}
      <div className="flex-1 space-y-4 overflow-auto">
        {/* <WordSenses word={word} /> */}
        <WordExample word={word} onWordSelect={handleWordSelect} />
        <WordExts word={word} onWordSelect={handleWordSelect} />
      </div>

      {/* 底部弹出的解释视图 */}
      <WordDetailPopup selectedWord={selectedWord} isVisible={isDetailVisible} onClose={handleCloseDetail} />
    </div>
  )
}
