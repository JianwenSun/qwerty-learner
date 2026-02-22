import { getPosTypeColor, SENTENCE_FUNCTION_COLOR_MAP } from '@/color'
import type { Sentence } from '@/plugins/wxs/wxs'
import type React from 'react'
import { useState } from 'react'

interface DetailProps {
  sentence: Sentence
}

const Detail: React.FC<DetailProps> = ({ sentence }) => {
  // 提取单词和对应的词性、音标
  const words = sentence.words || []
  const chunks = sentence.chunks || []
  const chinese = sentence.chinese || ''
  const explanation = sentence.explanation || ''

  // 状态管理：控制句子解析弹出层的显示
  const [showExplanation, setShowExplanation] = useState(false)

  return (
    <div className="fixed inset-0 z-50 flex h-full w-full flex-col items-center justify-center bg-[#faf9ff] dark:bg-gray-900">
      <div className="w-full max-w-5xl px-4">
        {/* 短语块及其对应的单词 - 横向布局 */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-6">
          {chunks.map((chunk, index) => {
            // 获取当前短语块对应的单词
            const chunkWords = (chunk.wordIndexes || []).map((wordIndex) => words[wordIndex]).filter(Boolean)

            return (
              <div key={index} className="flex flex-col items-center">
                {/* 单词音标和词性标签 */}
                <div className="mb-2 flex flex-wrap items-center justify-center gap-4">
                  {chunkWords.map((word, wordIndex) => {
                    return (
                      <div key={wordIndex} className="flex flex-col items-center">
                        <span className="text-gray-400">{word.phonetic_us || word.phonetic_uk}</span>
                        <div className="mt-2 inline-flex items-center">
                          <span className={`rounded-full px-3 py-1 text-xs ${getPosTypeColor(word.pos)}`}>{word.posZh}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* 短语块 */}
                <div
                  className={`flex min-w-[60px] max-w-[400px] flex-col items-center justify-center rounded-lg ${
                    SENTENCE_FUNCTION_COLOR_MAP[chunk.sentenceFunction] || 'bg-gray-900'
                  } p-4`}
                >
                  <h3 className="mb-2 text-center text-2xl font-bold text-white">{chunk.content}</h3>
                  <div className="mb-2 h-1 w-3/4 bg-white/50"></div>
                  <p className="text-center text-white">{chunk.sentenceFunction}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* 中文翻译 */}
        <div className="mb-8 text-center text-2xl font-bold text-gray-500 dark:text-white">{chinese}</div>

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

        {/* 句子解析弹出层 */}
        {showExplanation && (
          <div
            className="z-60 fixed inset-0 flex h-full w-full items-center justify-center bg-white/95 dark:bg-gray-900/95"
            onClick={() => setShowExplanation(false)}
          >
            <div
              className="max-h-[80vh] max-w-[80vw] overflow-y-auto rounded-lg bg-white p-6 dark:bg-gray-800"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">句子解析</h3>
                <button
                  className="rounded-full bg-gray-300 px-3 py-1 text-gray-900 hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                  onClick={() => setShowExplanation(false)}
                >
                  ×
                </button>
              </div>
              <div className="whitespace-pre-wrap text-lg text-gray-900 dark:text-white">{explanation}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Detail
