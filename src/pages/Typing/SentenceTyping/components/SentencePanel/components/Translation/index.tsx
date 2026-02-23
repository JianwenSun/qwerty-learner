import type { Sentence } from '@/plugins/wxs/wxs'
import type React from 'react'

interface TranslationProps {
  sentence: Sentence
}

const Translation: React.FC<TranslationProps> = ({ sentence }) => {
  const practices = sentence.practices || []
  const chinese = sentence.chinese || ''

  // 过滤掉完整句子的practice项，只保留单词或短语的practice项
  const practiceItems = practices.filter((item) => item.content !== sentence.content)

  // 如果 practiceItems 为空，使用 practices 作为 fallback
  const displayItems = practiceItems.length > 0 ? practiceItems : practices

  // 获取完整句子的practice项
  const fullSentencePractice = practices.find((item) => item.content === sentence.content)

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

  return (
    <div className="w-full max-w-4xl rounded-lg bg-white p-6 shadow-lg dark:bg-gray-700">
      {/* 音标 */}
      <div className="mb-4 flex flex-wrap items-center justify-center gap-4 text-gray-600 dark:text-gray-400">
        {displayItems.map((item, index) => (
          <span key={index}>{item.phonetic_us || item.phonetic_uk}</span>
        ))}
      </div>

      {/* 短语内容 */}
      <div className="mb-4 flex flex-wrap items-center justify-center gap-4">
        {displayItems.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">{item.content}</span>
            {/* 下划线 */}
            <div className={`mt-2 h-1 w-full ${colors[index % colors.length]}`}></div>
          </div>
        ))}
      </div>

      {/* 中文翻译 */}
      <div className="mt-6 text-center text-lg text-gray-700 dark:text-gray-300">{chinese}</div>
    </div>
  )
}

export default Translation
