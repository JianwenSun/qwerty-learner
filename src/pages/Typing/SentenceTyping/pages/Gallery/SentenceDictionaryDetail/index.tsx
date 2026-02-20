import { useDeleteWordRecord } from '../../../../../../utils/db'
import SentenceChapter from '../SentenceChapter'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { LessonCourse } from '@/plugins/wxs/wxs'
import { getLessonDetail } from '@/plugins/wxs/wxsApi'
import { currentSentenceChapterAtom, currentSentenceDictionaryIdAtom, sentenceReviewModeInfoAtom } from '@/store'
import type { SentenceDictionary } from '@/typings'
import { useAtom, useSetAtom } from 'jotai'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MajesticonsPaperFoldTextLine from '~icons/majesticons/paper-fold-text-line'

enum Tab {
  Chapters = 'chapters',
  Errors = 'errors',
  Review = 'review',
}

export default function SentenceDictionaryDetail({ dictionary }: { dictionary: SentenceDictionary }) {
  const [currentChapter, setCurrentChapter] = useAtom(currentSentenceChapterAtom)
  const [currentSentenceDictionaryId, setCurrentSentenceDictionaryId] = useAtom(currentSentenceDictionaryIdAtom)
  const [curTab, setCurTab] = useState<Tab>(Tab.Chapters)
  const setSentenceReviewModeInfo = useSetAtom(sentenceReviewModeInfoAtom)
  const navigate = useNavigate()
  const { deleteWordRecord } = useDeleteWordRecord()
  const [reload, setReload] = useState(false)

  const chapter = useMemo(
    () => (dictionary.id === currentSentenceDictionaryId ? currentChapter : 0),
    [currentChapter, currentSentenceDictionaryId, dictionary.id],
  )

  const [chapterDetail, setChapterDetail] = useState<LessonCourse[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadChapterDetail = async () => {
      try {
        setIsLoading(true)
        let detail = await getLessonDetail(Number(dictionary.id))
        setChapterDetail(detail.lesson_courses)
      } catch (error) {
        console.error('Error loading chapter detail:', error)
        setChapterDetail([])
      } finally {
        setIsLoading(false)
      }
    }

    loadChapterDetail()
  }, [dictionary.id, chapter])

  const onDelete = useCallback(
    async (word: string) => {
      await deleteWordRecord(word, dictionary.id)
      setReload((old) => !old)
    },
    [deleteWordRecord, dictionary.id],
  )

  const onChangeChapter = useCallback(
    (chapterId: number) => {
      setCurrentSentenceDictionaryId(dictionary.id)
      setCurrentChapter(chapterId)
      setSentenceReviewModeInfo((old) => ({ ...old, isReviewMode: false }))
      navigate(`/sentence-typing`)
    },
    [dictionary.id, navigate, setCurrentChapter, setCurrentSentenceDictionaryId, setSentenceReviewModeInfo],
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
                  chapterDetail.map((chapter) => (
                    <SentenceChapter
                      key={`${chapter.id}`}
                      chapter={chapter}
                      checked={chapter.id === currentChapter}
                      dictionaryId={dictionary.id}
                      onChange={onChangeChapter}
                    />
                  ))
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
