import WordExampleItem from '../WordExampleItem'
import { Exts } from '@/models/shanbei'
import { getExtExamples } from '@/storage/shanbeiStroageApi'
import { Word } from '@/typings'
import { useState, useEffect, useCallback } from 'react'

type Props = {
  word: Word
  onWordSelect: (selectedWord: string) => void
}

export default function WordExts({ word, onWordSelect }: Props) {
  const [exts, setExts] = useState<Exts[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setError(null)
        const fetchedExts = await getExtExamples(word.id)
        setExts(fetchedExts)
      } catch (error) {
        console.error('Error fetching word exts:', error)
        setError('获取扩展例句失败，请稍后重试')
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
      <div className="mb-4 text-xl font-semibold">扩展例句</div>
      {error ? (
        <div className="text-red-500 dark:text-red-400">{error}</div>
      ) : exts && exts.length > 0 ? (
        <div className="space-y-4">
          {exts.flatMap((ext, index) =>
            ext.examples.map((example, subIndex) => {
              return (
                <WordExampleItem
                  key={`${index}-${subIndex}`}
                  contentEn={example.content_en}
                  contentCn={example.content_cn}
                  audioUrl={example.audios?.uk_female?.url || ''}
                  onWordSelect={handleWordClick}
                />
              )
            }),
          )}
        </div>
      ) : (
        <div className="text-gray-500 dark:text-gray-400">暂无扩展例句</div>
      )}
    </div>
  )
}
