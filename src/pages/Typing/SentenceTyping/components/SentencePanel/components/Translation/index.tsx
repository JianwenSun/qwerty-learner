import type { Sentence } from '@/plugins/wxs/wxs'
import type React from 'react'

interface TranslationProps {
  sentence: Sentence
}

const Translation: React.FC<TranslationProps> = ({ sentence }) => {
  const chunks = sentence.chunks || []
  const words = sentence.words || []
  const chinese = sentence.chinese || ''

  // 收集所有单词的音标
  const phonetics = words.map((word) => word.phonetic_us || word.phonetic_uk).filter(Boolean)

  return (
    <div className="w-full max-w-4xl rounded-lg bg-white p-6 shadow-lg dark:bg-gray-700">
      {/* 音标 */}
      <div className="mb-4 flex flex-wrap items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
        {phonetics.map((phonetic, index) => (
          <span key={index}>{phonetic}</span>
        ))}
      </div>

      {/* 短语内容 */}
      <div className="mb-4 flex flex-wrap items-center justify-center gap-4">
        {chunks.map((chunk, index) => (
          <div key={index} className="flex flex-col items-center">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">{chunk.content}</span>
            {/* 下划线 */}
            <div className={`mt-2 h-1 ${index % 2 === 0 ? 'w-32 bg-blue-500' : 'w-24 bg-purple-500'}`}></div>
            {/* 句子成分标签 */}
            <span className="mt-2 text-sm text-gray-600 dark:text-gray-400">{chunk.sentenceFunction}</span>
          </div>
        ))}
      </div>

      {/* 中文翻译 */}
      <div className="mt-6 text-center text-lg text-gray-700 dark:text-gray-300">{chinese}</div>
    </div>
  )
}

export default Translation
