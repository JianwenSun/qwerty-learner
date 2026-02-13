import { UrlPronunciationIcon, UrlPronunciationIconRef } from '@/components/UrlPronunciationIcon'
import { Examples } from '@/models/shanbei'
import { getVocabExamples } from '@/storage/shanbeiStroageApi'
import { Word } from '@/typings'
import { useState, useEffect, useCallback, useRef } from 'react'

type Props = {
  word: Word
  onWordSelect: (selectedWord: string) => void
}

export default function WordExample({ word, onWordSelect }: Props) {
  const urlPronunciationIconRef = useRef<UrlPronunciationIconRef>(null)

  const [examples, setExamples] = useState<Examples[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handlePlay = useCallback(() => {
    urlPronunciationIconRef.current?.play()
  }, [])

  const handleClick = useCallback(() => {
    handlePlay()
  }, [handlePlay])

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
              onClick={() => handleWordClick(word)}
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
                <div key={`${index}-${subIndex}`} className="rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
                  <div className="flex items-center justify-between font-medium">
                    <div>{renderClickableWords(subExample.content_en)}</div>
                    <UrlPronunciationIcon url={subExample.audio_uk_urls?.[0] || ''} className="h-8 w-8" ref={urlPronunciationIconRef} />
                  </div>
                  <div className="mt-1 text-gray-600 dark:text-gray-400">{subExample.content_cn}</div>
                </div>
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
