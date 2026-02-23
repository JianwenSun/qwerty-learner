import type { Sentence } from '@/plugins/wxs/wxs'
import type React from 'react'
import { useState } from 'react'

interface DetailProps {
  sentence: Sentence
}

const CustomDetail: React.FC<DetailProps> = ({ sentence }) => {
  // 提取单词和对应的词性、音标
  const practices = sentence.practices || []
  const chinese = sentence.chinese || ''
  const explanation = sentence.explanation || ''

  // 状态管理：控制句子解析弹出层的显示
  const [showExplanation, setShowExplanation] = useState(false)

  // 颜色数组，用于为不同的短语块添加不同的颜色
  const colors = [
    'bg-red-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-blue-500',
    'bg-yellow-500',
    'bg-orange-500',
    'bg-pink-500',
    'bg-teal-500',
    'bg-indigo-500',
    'bg-cyan-500',
  ]

  // 过滤掉完整句子的practice项，只保留单词或短语的practice项
  const practiceItems = practices.filter((item) => item.content !== sentence.content)

  // 如果 practiceItems 为空，使用 practices 作为 fallback
  const displayItems = practiceItems.length > 0 ? practiceItems : practices

  // 获取完整句子的practice项
  const fullSentencePractice = practices.find((item) => item.content === sentence.content)

  return (
    <div className="fixed inset-0 z-50 flex h-full w-full flex-col items-center justify-center bg-[#faf9ff] dark:bg-gray-900">
      <div className="w-full max-w-5xl px-4">
        {/* 音标 */}
        <div className="mb-8 text-center text-2xl text-gray-400">
          {displayItems.map((item, index) => (
            <span key={index} className="mr-4">
              {item.phonetic_us || item.phonetic_uk}
            </span>
          ))}
        </div>

        {/* 英文句子，每个部分用不同颜色的下划线标记 */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
          {displayItems.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-4xl font-bold text-white">{item.content}</span>
              <span className={`block h-1 w-full ${colors[index % colors.length]} mt-2`}></span>
            </div>
          ))}
        </div>

        {/* 语法成分分析 */}
        {fullSentencePractice && <div className="mb-4 text-center text-xl text-gray-400">{fullSentencePractice.part_of_speech}</div>}

        {/* 中文翻译 */}
        <div className="mb-8 text-center text-3xl font-bold text-white">{chinese}</div>

        {/* 句子解析按钮 */}
        {explanation && (
          <div className="mb-8 flex items-center justify-center">
            <button
              className="flex items-center justify-center rounded bg-green-700 px-4 py-2 text-white transition-colors hover:bg-green-600"
              onClick={() => setShowExplanation(true)}
            >
              句子解析
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CustomDetail
