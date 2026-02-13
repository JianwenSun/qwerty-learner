import WordCard from './WordCard'
import { Dictionary, Word } from '@/typings'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { useState, useMemo } from 'react'

type Props = {
  words: Word[]
  dictionary: Dictionary
  onWordClick: (word: Word) => void
  isActive: (word: Word) => boolean
}

export default function WordList({ words, dictionary, onWordClick, isActive }: Props) {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [searchTerm, setSearchTerm] = useState('')

  const pageSizes = [10, 20, 30, 50]

  // 过滤单词
  const filteredWords = useMemo(() => {
    if (!searchTerm) return words
    return words.filter((word) => word.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [words, searchTerm])

  const totalPages = useMemo(() => {
    if (!filteredWords || filteredWords.length === 0) return 1
    return Math.ceil(filteredWords.length / pageSize)
  }, [filteredWords, pageSize])

  const paginatedWords = useMemo(() => {
    if (!filteredWords || filteredWords.length === 0) return []
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    return filteredWords.slice(startIndex, endIndex)
  }, [filteredWords, currentPage, pageSize])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1) // 搜索时重置到第一页
  }

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize)
    setCurrentPage(1) // 重置到第一页
  }

  return (
    <div className="flex h-full flex-col p-0">
      {/* 搜索框 */}
      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="搜索单词..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full rounded-full border border-gray-300 bg-white px-4 py-1 pl-10 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus:ring-indigo-400"
          />
          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm('')
                setCurrentPage(1)
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-gray-200 p-1 text-gray-600 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* 单词列表 */}
      <ScrollArea.Root className="flex-1 select-none overflow-y-auto">
        <ScrollArea.Viewport className="w-full">
          <div className="px-4 pb-4">
            <div className="flex flex-col gap-1">
              {paginatedWords.length > 0 ? (
                paginatedWords.map((word, index) => {
                  return (
                    <WordCard
                      word={word}
                      dictionary={dictionary}
                      key={`${word.name}_${index}`}
                      isActive={isActive(word)}
                      onClick={() => onWordClick(word)}
                    />
                  )
                })
              ) : (
                <div className="flex h-32 items-center justify-center text-gray-500">暂无单词</div>
              )}
            </div>
          </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar className="flex touch-none select-none bg-transparent " orientation="vertical"></ScrollArea.Scrollbar>
      </ScrollArea.Root>

      {/* 分页控制 */}
      <div className="flex items-center justify-between px-4 pb-3 pt-3">
        {/* 每页显示数量选择 */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">每页显示:</span>
          <select
            value={pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            className="rounded-md border border-gray-300 bg-white px-2 py-1 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
          >
            {pageSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {/* 页码控制 */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-900 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
          >
            上一页
          </button>
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-900 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
          >
            下一页
          </button>
        </div>
      </div>
    </div>
  )
}
