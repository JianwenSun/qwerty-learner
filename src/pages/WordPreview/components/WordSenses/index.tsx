import { WordPronunciationIcon, WordPronunciationIconRef } from '@/components/WordPronunciationIcon'
import { Senses } from '@/models/shanbei'
import { getVocabSenses } from '@/storage/shanbeiStroageApi'
import { Word } from '@/typings'
import { useState, useEffect, useCallback, useRef } from 'react'

type Props = {
  word: Word
}

export default function WordSenses({ word }: Props) {
  const [senses, setSenses] = useState<Senses[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setError(null)
        const fetchedSenses = await getVocabSenses(word.id)
        setSenses(fetchedSenses)
      } catch (error) {
        console.error('Error fetching word senses:', error)
        setError('获取单词释义失败，请稍后重试')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [word.id])

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p>加载中...</p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-4 text-lg font-semibold">单词释义</div>
      {error ? (
        <div className="text-red-500 dark:text-red-400">{error}</div>
      ) : senses && senses.length > 0 ? (
        <div className="space-y-4">
          {senses.map((sense, index) => (
            <div key={index} className="space-y-2">
              {sense.senses.map((subSense, subIndex) => {
                return (
                  <div key={subIndex} className="flex items-start">
                    <span
                      className={`mr-2 mt-1 rounded-full bg-gray-100 px-2 py-1 text-sm font-medium text-gray-800 dark:bg-gray-900 dark:text-gray-200`}
                    >
                      {subSense.pos}
                    </span>
                    <div>
                      <div className="text-sm">{subSense.definition_cn}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-500 dark:text-gray-400">暂无单词释义</div>
      )}
    </div>
  )
}
