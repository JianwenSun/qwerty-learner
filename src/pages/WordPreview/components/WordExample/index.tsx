import WordExampleItem from '../WordExampleItem'
import { UrlPronunciationIconRef } from '@/components/UrlPronunciationIcon'
import { Examples } from '@/models/shanbei'
import { getVocabExamples } from '@/storage/shanbeiStroageApi'
import { Word } from '@/typings'
import { useState, useEffect, useCallback, useRef } from 'react'

type Props = {
  word: Word
  onWordSelect: (selectedWord: string) => void
}

export default function WordExample({ word, onWordSelect }: Props) {
  const [examples, setExamples] = useState<Examples[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setError(null)
        const fetchedExamples = await getVocabExamples(word.id)
        setExamples(fetchedExamples)
      } catch (error) {
        console.error('Error fetching word examples:', error)
        setError('获取词汇例句失败，请稍后重试')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [word.id])

  // 处理单词点击事件
  const handleWordClick = useCallback(
    (word: string) => {
      onWordSelect(word)
    },
    [onWordSelect],
  )

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p>加载中...</p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-4 text-xl font-semibold">词汇例句</div>
      {error ? (
        <div className="text-red-500 dark:text-red-400">{error}</div>
      ) : examples && examples.length > 0 ? (
        <div className="space-y-4">
          {examples.flatMap((example, index) =>
            example.examples.map((subExample, subIndex) => {
              return (
                <WordExampleItem
                  key={`${index}-${subIndex}`}
                  contentEn={subExample.content_en}
                  contentCn={subExample.content_cn}
                  audioUrl={subExample.audio_uk_urls?.[0] || ''}
                  onWordSelect={handleWordClick}
                />
              )
            }),
          )}
        </div>
      ) : (
        <div className="text-gray-500 dark:text-gray-400">暂无词汇例句</div>
      )}
    </div>
  )
}
