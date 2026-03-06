import { useCurrentSentenceChapterList, useSentenceChapterList } from '../../../hooks/useSentenceHooks'
import SentenceChapter from '../SentenceChapter'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { currentSentenceChapterIdAtom, currentSentenceDictionaryIdAtom, sentenceReviewModeInfoAtom } from '@/store'
import type { SentenceDictionary } from '@/typings'
import { useAtom, useSetAtom } from 'jotai'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MajesticonsPaperFoldTextLine from '~icons/majesticons/paper-fold-text-line'

enum Tab {
  Chapters = 'chapters',
  Errors = 'errors',
  Review = 'review',
}

export default function SentenceDictionaryDetail({ dictionary }: { dictionary: SentenceDictionary }) {
  const [currentSentenceChapterId, setCurrentSentenceChapterId] = useAtom(currentSentenceChapterIdAtom)
  const [, setCurrentSentenceDictionaryId] = useAtom(currentSentenceDictionaryIdAtom)
  const [curTab, setCurTab] = useState<Tab>(Tab.Chapters)
  const setSentenceReviewModeInfo = useSetAtom(sentenceReviewModeInfoAtom)
  const navigate = useNavigate()

  const { data: chapters, loading: isLoading } = useSentenceChapterList(dictionary.id)

  const onChangeChapter = useCallback(
    (chapterId: number) => {
      setCurrentSentenceDictionaryId(dictionary.id)
      setCurrentSentenceChapterId(chapterId.toString())
      setSentenceReviewModeInfo((old) => ({ ...old, isReviewMode: false }))
      navigate(`/sentence-typing`)
    },
    [dictionary.id, navigate, currentSentenceChapterId, setCurrentSentenceDictionaryId, setSentenceReviewModeInfo],
  )

  const handleTabChange = useCallback(
    (value: Tab) => {
      if (value !== curTab) {
        setCurTab(value)
      }
    },
    [curTab],
  )

  return (
    <div className="flex flex-col rounded-[4rem] px-4 py-3 pl-5 text-gray-800 dark:text-gray-300">
      <div className="text relative flex h-40 flex-col gap-2">
        <h3 className="text-2xl font-semibold">{dictionary.name}</h3>
        <p className="mt-1">{dictionary.length} 章节</p>
        <p>{dictionary.description}</p>
        <div className="absolute bottom-5 right-4">
          <ToggleGroup type="single" value={curTab} onValueChange={handleTabChange}>
            <ToggleGroupItem
              value={Tab.Chapters}
              disabled={curTab === Tab.Chapters}
              className={`${curTab === Tab.Chapters ? 'text-primary-foreground bg-primary' : ''} disabled:opacity-100`}
            >
              <MajesticonsPaperFoldTextLine className="mr-1.5 text-gray-500" />
              章节选择
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
      <div className="flex pl-0">
        <Tabs value={curTab} className="h-[30rem] w-full ">
          <TabsContent value={Tab.Chapters} className="h-full ">
            <ScrollArea className="h-[30rem] ">
              <div className="flex w-full flex-wrap gap-3">
                {isLoading ? (
                  <div className="flex h-20 w-full items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
                  </div>
                ) : (
                  chapters?.map((chapter) => (
                    <SentenceChapter
                      key={`${chapter.id}`}
                      chapter={chapter}
                      checked={chapter.id.toString() === currentSentenceChapterId}
                      dictionaryId={dictionary.id}
                      onChange={onChangeChapter}
                    />
                  )) || []
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
