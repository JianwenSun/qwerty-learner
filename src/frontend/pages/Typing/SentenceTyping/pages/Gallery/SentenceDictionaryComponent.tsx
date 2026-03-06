import SentenceDictionaryDetail from './SentenceDictionaryDetail'
import { useDictionaryStats } from './hooks/useDictionaryStats'
import bookCover from '@/assets/book-cover.png'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import { currentSentenceDictionaryIdAtom } from '@/store'
import type { SentenceDictionary } from '@/typings'
import { calcChapterCount } from '@/utils'
import * as Progress from '@radix-ui/react-progress'
import { useAtomValue } from 'jotai'
import { useMemo, useRef } from 'react'

interface Props {
  dictionary: SentenceDictionary
}

export default function SentenceDictionaryComponent({ dictionary }: Props) {
  const currentSentenceDictionaryId = useAtomValue(currentSentenceDictionaryIdAtom)
  const divRef = useRef<HTMLDivElement>(null)
  const entry = useIntersectionObserver(divRef, {})
  const isVisible = !!entry?.isIntersecting
  const sentenceDictionaryStats = useDictionaryStats(dictionary.id, isVisible)
  const chapterCount = useMemo(() => calcChapterCount(dictionary.length), [dictionary.length])
  const isSelected = currentSentenceDictionaryId === dictionary.id
  const progress = useMemo(
    () => (sentenceDictionaryStats ? Math.ceil((sentenceDictionaryStats.exercisedChapterCount / chapterCount) * 100) : 0),
    [sentenceDictionaryStats, chapterCount],
  )

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          ref={divRef}
          className={`group flex  h-36 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg p-4 text-left shadow-lg focus:outline-none ${
            isSelected ? 'bg-indigo-400' : 'bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700'
          }   `}
          key={dictionary.name}
          role="button"
          // onClick={onClick}
        >
          <div className="relative flex h-full w-full items-center gap-4">
            {/* 左侧图片区域 */}
            <div className="flex-shrink-0">
              <img src={dictionary.icon_url || bookCover} className={`w-20 ${isSelected ? 'opacity-50' : 'opacity-100'}`} />
            </div>

            {/* 右侧文本区域 */}
            <div className="flex flex-1 flex-col items-start justify-center">
              <h1
                className={`mb-1 text-base font-bold  ${
                  isSelected ? 'text-white' : 'text-gray-800 group-hover:text-indigo-400 dark:text-gray-200'
                }`}
              >
                {dictionary.name}
              </h1>
              <TooltipProvider>
                <Tooltip delayDuration={400}>
                  <TooltipTrigger asChild>
                    <p className={`mb-1 max-w-full text-xs ${isSelected ? 'text-white' : 'text-gray-600 dark:text-gray-300'}`}>
                      {dictionary.description}
                    </p>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">{`${dictionary.description}`}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <p className={`mb-0.5 text-sm font-bold  ${isSelected ? 'text-white' : 'text-gray-600 dark:text-gray-200'}`}>
                {dictionary.length} 章
              </p>
              <div className=" flex w-[calc(100%-60px)] items-center pt-2">
                {progress > 0 && (
                  <Progress.Root
                    value={progress}
                    max={100}
                    className={`h-2 w-full rounded-full border  bg-white ${isSelected ? 'border-indigo-600' : 'border-indigo-400'}`}
                  >
                    <Progress.Indicator
                      className={`h-full rounded-full pl-0 ${isSelected ? 'bg-indigo-600' : 'bg-indigo-400'}`}
                      style={{ width: `calc(${progress}% )` }}
                    />
                  </Progress.Root>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="w-[80%] max-w-none !rounded-[20px]">
        <SentenceDictionaryDetail dictionary={dictionary} />
      </DialogContent>
    </Dialog>
  )
}
